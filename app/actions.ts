"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, getCurrentUser, hashPassword, requireUser, verifyPassword } from "@/lib/auth";

export async function signupAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string) ?? "";
  const name = ((formData.get("name") as string) ?? "").trim();

  if (!email || !password || password.length < 6) {
    return { error: "Email and a password of 6+ characters are required." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "That email is already registered. Sign in instead." };

  const user = await prisma.user.create({
    data: { email, passwordHash: await hashPassword(password), name: name || null },
  });
  await createSession(user.id);
  redirect("/dashboard");
}

export async function signinAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string) ?? "";
  if (!email || !password) return { error: "Email and password required." };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "No account for that email." };
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return { error: "Incorrect password." };
  await createSession(user.id);
  redirect("/dashboard");
}

export async function signoutAction() {
  await destroySession();
  redirect("/");
}

export async function toggleVoteAction(tacticId: number) {
  const user = await requireUser();
  const existing = await prisma.vote.findUnique({
    where: { userId_tacticId: { userId: user.id, tacticId } },
  });
  if (existing) {
    await prisma.vote.delete({ where: { id: existing.id } });
  } else {
    await prisma.vote.create({ data: { userId: user.id, tacticId } });
  }
  revalidatePath("/leaderboard");
  revalidatePath(`/hacks/[slug]`, "page");
}

export async function toggleSaveAction(tacticId: number) {
  const user = await requireUser();
  const existing = await prisma.savedHack.findUnique({
    where: { userId_tacticId: { userId: user.id, tacticId } },
  });
  if (existing) {
    await prisma.savedHack.delete({ where: { id: existing.id } });
  } else {
    await prisma.savedHack.create({ data: { userId: user.id, tacticId } });
  }
  revalidatePath("/dashboard");
  revalidatePath(`/hacks/[slug]`, "page");
}

export async function addCommentAction(tacticId: number, formData: FormData) {
  const body = ((formData.get("body") as string) ?? "").trim();
  const fallbackName = ((formData.get("name") as string) ?? "").trim();
  if (!body) return;
  const user = await getCurrentUser();
  await prisma.comment.create({
    data: {
      tacticId,
      body: body.slice(0, 500),
      authorName: user?.name || user?.email?.split("@")[0] || fallbackName || "Anonymous",
      userId: user?.id ?? null,
    },
  });
  revalidatePath(`/hacks/[slug]`, "page");
  revalidatePath("/leaderboard");
}

export async function emailRequestAction(tacticId: number, formData: FormData) {
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) return { error: "Valid email required." };
  const user = await getCurrentUser();
  await prisma.emailRequest.create({
    data: { tacticId, email, userId: user?.id ?? null },
  });
  return { ok: true };
}

export async function newsletterSignupAction(formData: FormData) {
  const email = ((formData.get("email") as string) ?? "").trim().toLowerCase();
  const source = ((formData.get("source") as string) ?? "newsletter").trim();
  if (!email || !email.includes("@")) return { error: "Valid email required." };
  const user = await getCurrentUser();
  await prisma.emailRequest.create({
    data: { tacticId: 0, email, userId: user?.id ?? null },
  }).catch(() => null);
  // Log source via console for now; in production this would push to ConvertKit/Resend/etc.
  console.log(`[newsletter] ${source}: ${email}`);
  return { ok: true };
}

export async function purchaseUnlockAction() {
  const user = await requireUser();
  await prisma.user.update({ where: { id: user.id }, data: { isPro: true } });
  redirect("/dashboard?unlocked=1");
}
