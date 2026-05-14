#!/usr/bin/env node
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const email = (process.argv[2] || "").trim().toLowerCase();
if (!email) { console.error("Usage: node scripts/make-pro.mjs <email>"); process.exit(1); }

const password = process.env.NEW_USER_PASSWORD || "changeme-on-first-login";
const p = new PrismaClient();
try {
  const existing = await p.user.findUnique({ where: { email } });
  if (existing) {
    await p.user.update({ where: { email }, data: { isPro: true } });
    console.log(`✓ Upgraded existing user ${email} → PRO`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await p.user.create({ data: { email, passwordHash, isPro: true } });
    console.log(`✓ Created new PRO user ${email} (initial password: ${password})`);
  }
} finally {
  await p.$disconnect();
}
