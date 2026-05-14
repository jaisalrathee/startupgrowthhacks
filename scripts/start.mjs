#!/usr/bin/env node
/**
 * Production start: run pending Prisma migrations against the mounted volume,
 * seed if the DB is empty, then hand off to Next.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const url = process.env.DATABASE_URL || "";
const isFile = url.startsWith("file:");
if (isFile) {
  // Ensure the directory exists (Railway volumes mount at /data)
  const path = url.replace(/^file:/, "");
  const dir = dirname(path);
  if (dir && dir !== "." && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`[start] created ${dir}`);
  }
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", ...opts });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exited ${code}`))));
  });
}

async function dbIsEmpty() {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const p = new PrismaClient();
    const count = await p.tactic.count();
    await p.$disconnect();
    return count === 0;
  } catch {
    return true;
  }
}

try {
  console.log("[start] migrate deploy…");
  await run("npx", ["prisma", "migrate", "deploy"]);
  if (await dbIsEmpty()) {
    console.log("[start] DB empty — seeding…");
    await run("npx", ["tsx", "prisma/seed.ts"]);
    await run("npx", ["tsx", "prisma/seed-cro.ts"]);
    await run("npx", ["tsx", "prisma/generate-deep-dive.ts"]);
  } else {
    console.log("[start] DB has data, skipping seed.");
  }
} catch (e) {
  console.error("[start] migration/seed failed:", e?.message || e);
  process.exit(1);
}

console.log("[start] launching next…");
const port = process.env.PORT || "3000";
const next = spawn("npx", ["next", "start", "-p", port], { stdio: "inherit" });
next.on("exit", (c) => process.exit(c ?? 0));
