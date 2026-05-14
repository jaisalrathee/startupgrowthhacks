import { prisma } from "@/lib/prisma";
import Inbox from "@/app/_components/Inbox";
import { getCurrentUser } from "@/lib/auth";

export const revalidate = 300;

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
        id: true, slug: true, tactic: true, category: true, channel: true, impact: true,
        baseVotes: true, _count: { select: { votes: true } },
      },
      orderBy: { id: "asc" },
    }),
    getCurrentUser(),
  ]);
  const lite = tactics.map((t) => ({
    id: t.id, slug: t.slug, tactic: t.tactic, category: t.category,
    channel: t.channel, impact: t.impact,
    votes: t.baseVotes + t._count.votes,
  }));

  return (
    <>
      {hero}
      <Inbox tactics={lite} isPro={!!user?.isPro}>{children}</Inbox>
    </>
  );
}
