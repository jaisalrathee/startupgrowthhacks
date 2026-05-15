import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { PLAYLISTS } from "@/lib/playlists";

const BASE = "https://startupgrowthhacks.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tactics: { slug: string }[] = [];
  try {
    tactics = await prisma.tactic.findMany({ select: { slug: true } });
  } catch {
    tactics = [];
  }
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/playlists`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cro-checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/unlock`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...PLAYLISTS.map((p) => ({
      url: `${BASE}/playlists/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...tactics.map((t) => ({
      url: `${BASE}/hacks/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
