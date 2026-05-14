"use client";

import { useState, useTransition } from "react";
import { emailRequestAction } from "../actions";

export default function EmailRequestForm({ tacticId, tactic }: { tacticId: number; tactic: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [, start] = useTransition();

  if (!open && !sent) {
    return (
      <button className="btn primary" onClick={() => setOpen(true)}>
        <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
        </svg>
        Email this to me
      </button>
    );
  }

  if (sent) {
    return (
      <div style={{ padding: "10px 14px", borderRadius: 6, background: "rgba(121,240,198,0.08)", border: "1px solid rgba(121,240,198,0.3)", color: "var(--accent-3)", fontSize: 13 }}>
        ✓ Sent to <b>{email}</b> — check your inbox.
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    const fd = new FormData(); fd.set("email", email);
    start(async () => {
      const r = await emailRequestAction(tacticId, fd);
      if (r?.ok) setSent(true);
    });
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      <input
        type="email" placeholder="you@startup.com" required
        value={email} onChange={(e) => setEmail(e.target.value)}
        style={{ width: 220 }}
      />
      <button type="submit" className="btn primary">Send →</button>
    </form>
  );
}
