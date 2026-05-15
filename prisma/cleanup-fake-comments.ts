/**
 * Deletes seeded fake comments from the DB.
 * Identifies them by the exact 10 sample author names used by the original seed,
 * which are unlikely to collide with real user comments (real anon users would
 * have to deliberately type one of these exact strings).
 * Idempotent — safe to run on every deploy.
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const SEED_AUTHORS = [
  "Maya R.", "Devon K.", "Priya S.", "Alex T.", "Jordan M.",
  "Sam W.", "Riley P.", "Noor A.", "Chen L.", "Kai O.",
];

async function main() {
  const result = await prisma.comment.deleteMany({
    where: {
      userId: null,
      authorName: { in: SEED_AUTHORS },
    },
  });
  console.log(`[cleanup-fake-comments] removed ${result.count} seeded comments`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
