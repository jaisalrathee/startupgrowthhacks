import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://startupgrowthhacks.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tactics = await prisma.tactic.findMany({ select: { slug: true } });
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/unlock`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...tactics.map((t) => ({
      url: `${BASE}/hacks/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
