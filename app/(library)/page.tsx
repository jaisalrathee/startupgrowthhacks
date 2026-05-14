import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HackDetail from "@/app/_components/HackDetail";
import { loadHackBundle } from "@/lib/hackData";

export default async function HomePage() {
  const first = await prisma.tactic.findFirst({
    orderBy: { id: "asc" },
    select: { slug: true },
  });
  if (!first) notFound();
  const bundle = await loadHackBundle(first.slug);
  if (!bundle) notFound();
  return <HackDetail {...bundle} />;
}
