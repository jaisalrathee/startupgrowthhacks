"use client";

import { useState, useTransition } from "react";
import { signinAction, signupAction } from "../actions";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [err, setErr] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const submit = (fd: FormData) => {
    setErr(null);
    start(async () => {
      const res = await (mode === "signup" ? signupAction(fd) : signinAction(fd));
      if (res && "error" in res && res.error) setErr(res.error);
    });
  };

  return (
    <form action={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {mode === "signup" && (
        <input type="text" name="name" placeholder="Name (optional)" maxLength={40} />
      )}
      <input type="email" name="email" placeholder="you@startup.com" required autoComplete="email" />
      <input type="password" name="password" placeholder={mode === "signup" ? "Password (6+ chars)" : "Password"} required minLength={6} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
      {err && (
        <div style={{ padding: 10, borderRadius: 6, background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff8888", fontSize: 13 }}>{err}</div>
      )}
      <button className="btn primary" type="submit" disabled={pending} style={{ padding: "14px 22px", fontSize: 15, fontWeight: 600, justifyContent: "center" }}>
        {pending ? "…" : mode === "signup" ? "Create account →" : "Sign in →"}
      </button>
    </form>
  );
}
