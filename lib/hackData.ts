import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isLocked as checkLocked } from "@/lib/lock";

function parseJsonArr<T = string>(s: string | null | undefined): T[] {
  if (!s) return [];
  try { return JSON.parse(s) as T[]; } catch { return []; }
}

export async function loadHackBundle(slug: string) {
  const t = await prisma.tactic.findUnique({
    where: { slug },
    include: {
      _count: { select: { votes: true, comments: true } },
      comments: { orderBy: { createdAt: "desc" }, take: 30 },
    },
  });
  if (!t) return null;
  const user = await getCurrentUser();
  const [userVote, userSave] = user
    ? await Promise.all([
        prisma.vote.findUnique({ where: { userId_tacticId: { userId: user.id, tacticId: t.id } }, select: { id: true } }),
        prisma.savedHack.findUnique({ where: { userId_tacticId: { userId: user.id, tacticId: t.id } }, select: { id: true } }),
      ])
    : [null, null];

  // Resolve related-tactic refs (titles + slugs) so the UI can link them
  const relatedIds = parseJsonArr<number>(t.related);
  const related = relatedIds.length
    ? await prisma.tactic.findMany({
        where: { id: { in: relatedIds } },
        select: { id: true, slug: true, tactic: true, category: true, channel: true, impact: true, baseVotes: true },
      })
    : [];

  return {
    tactic: t,
    totalVotes: t.baseVotes + t._count.votes,
    totalComments: t._count.comments,
    comments: t.comments.map((c) => ({ id: c.id, authorName: c.authorName, body: c.body, createdAt: c.createdAt.toISOString() })),
    locked: checkLocked(t.id, !!user?.isPro),
    isAuthed: !!user,
    userHasVoted: !!userVote,
    userHasSaved: !!userSave,
    deepDive: {
      playbook: parseJsonArr(t.playbook),
      metrics: parseJsonArr(t.metrics),
      tools: parseJsonArr(t.tools),
      timeline: t.timeline ?? "",
      benchmarks: t.benchmarks ?? "",
      pitfalls: parseJsonArr(t.pitfalls),
      related,
    },
  };
}
