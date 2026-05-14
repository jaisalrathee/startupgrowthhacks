import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "../_components/AuthForm";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <div className="center-narrow">
      <h1>Steal smarter.</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: 28 }}>
        Free account — save hacks, upvote, comment, and email yourself the full playbook.
      </p>
      <AuthForm mode="signup" />
      <p style={{ marginTop: 22, fontSize: 13, color: "var(--text-dim)" }}>
        Already a member? <Link href="/signin" style={{ color: "var(--accent)" }}>Sign in</Link>
      </p>
    </div>
  );
}
