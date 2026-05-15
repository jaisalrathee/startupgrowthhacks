import { prisma } from "@/lib/prisma";
import Inbox from "@/app/_components/Inbox";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LibraryLayout({
  children,
  hero,
}: {
  children: React.ReactNode;
  hero: React.ReactNode;
}) {
  const [tactics, user] = await Promise.all([
    prisma.tactic.findMany({
      select: {
        id: true, slug: true, tactic: true, category: true, channel: true,
        stage: true, impact: true, cost: true, effort: true, difficulty: true,
        baseVotes: true, _count: { select: { votes: true } },
      },
      orderBy: { id: "asc" },
    }),
    getCurrentUser(),
  ]);
  const lite = tactics.map((t) => ({
    id: t.id, slug: t.slug, tactic: t.tactic, category: t.category,
    channel: t.channel, stage: t.stage, impact: t.impact, cost: t.cost,
    effort: t.effort, difficulty: t.difficulty,
    votes: t.baseVotes + t._count.votes,
  }));

  // Shuffle (Fisher-Yates) so the "All" view feels alive instead of category-clustered.
  // Filtering by category, sorting by trending/top/newest, or searching still applies
  // its own order on top of this.
  for (let i = lite.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lite[i], lite[j]] = [lite[j], lite[i]];
  }

  return (
    <>
      {hero}
      <Inbox tactics={lite} isPro={!!user?.isPro}>{children}</Inbox>
    </>
  );
}
