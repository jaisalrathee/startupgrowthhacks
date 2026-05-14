import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "../_components/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="center-narrow">
      <h1>Welcome back.</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: 28 }}>
        Pick up where you left off — your saved hacks, votes, and PRO access.
      </p>
      <AuthForm mode="signin" />
      <p style={{ marginTop: 22, fontSize: 13, color: "var(--text-dim)" }}>
        Don&apos;t have an account? <Link href="/signup" style={{ color: "var(--accent)" }}>Create one</Link>
      </p>
    </div>
  );
}
