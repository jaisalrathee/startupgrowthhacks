import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

async function main() {
  const raw = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/tactics.json"), "utf-8")
  ) as Array<Record<string, any>>;

  console.log(`Seeding ${raw.length} tactics…`);

  // de-dupe slugs in case two tactics generate the same
  const seenSlugs = new Set<string>();
  for (const t of raw) {
    let slug = slugify(t.tactic);
    let i = 1;
    while (seenSlugs.has(slug)) {
      slug = `${slugify(t.tactic)}-${++i}`;
    }
    seenSlugs.add(slug);

    const h = hash(t.tactic);
    const impactMult = t.impact === "High" ? 1.7 : t.impact === "Medium" ? 1.0 : 0.5;
    const baseVotes = Math.round(((h % 180) + 5) * impactMult);

    await prisma.tactic.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        slug,
        tactic: t.tactic,
        category: t.category,
        channel: t.channel,
        stage: t.stage,
        difficulty: t.difficulty,
        impact: t.impact,
        cost: t.cost,
        effort: t.effort,
        biz: JSON.stringify(t.biz || []),
        how: t.how || "",
        example: t.example || "",
        tip: t.tip || "",
        bestFor: t.bestFor || "",
        baseVotes,
      },
    });
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
