import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * One-shot admin endpoint to grant PRO. Protected by AUTH_SECRET.
 * Usage: curl -X POST "$URL/api/admin/promote?token=$AUTH_SECRET&email=foo@bar.com"
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const expected = process.env.AUTH_SECRET || "";

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({ where: { email }, data: { isPro: true } });
    return NextResponse.json({ ok: true, action: "upgraded", email });
  }
  const passwordHash = await bcrypt.hash("changeme-on-first-login", 10);
  await prisma.user.create({ data: { email, passwordHash, isPro: true } });
  return NextResponse.json({ ok: true, action: "created", email, initialPassword: "changeme-on-first-login" });
}
