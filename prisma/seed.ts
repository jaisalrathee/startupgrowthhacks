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

const SAMPLE_AUTHORS = [
  "Maya R.", "Devon K.", "Priya S.", "Alex T.", "Jordan M.",
  "Sam W.", "Riley P.", "Noor A.", "Chen L.", "Kai O.",
];
const SAMPLE_LINES = [
  "Ran this for two weeks — CAC dropped 31%. Crucial that the seed list was clean.",
  "Worked great on B2C, flat on B2B. YMMV.",
  "We saw a 2x lift but only after we narrowed the audience further. Don't skip step 3.",
  "Surprised how well this still works in 2026. Underrated.",
  "Setup took longer than the article suggests, budget half a day.",
  "Combined this with a lifecycle email and trial→paid jumped 14%.",
  "Tried twice. Second time we got the creative right and it printed.",
  "This is table stakes for ecom — if you're not doing it, you're leaving money.",
  "The watch-out is real. Burned $4k before I tightened the targeting.",
  "Pairs nicely with anchor pricing on the same page.",
];

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

    // seed sample anonymous comments
    const cCount = h % 5;
    for (let i = 0; i < cCount; i++) {
      const authorName = SAMPLE_AUTHORS[(h + i * 7) % SAMPLE_AUTHORS.length];
      const body = SAMPLE_LINES[(h + i * 11) % SAMPLE_LINES.length];
      const existing = await prisma.comment.findFirst({
        where: { tacticId: t.id, authorName, body },
      });
      if (!existing) {
        await prisma.comment.create({
          data: {
            tacticId: t.id,
            authorName,
            body,
            createdAt: new Date(Date.now() - ((h % 30) + i) * 86400000),
          },
        });
      }
    }
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
