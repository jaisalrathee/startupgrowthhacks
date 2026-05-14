"use client";

import { useEffect, useState, useTransition } from "react";
import { newsletterSignupAction } from "../actions";

type Which = null | "timed" | "exit";

const STORAGE_KEY = "sgh_modal_dismissed_until";
const SUPPRESS_HOURS = 24;

export default function Modals({ isAuthed }: { isAuthed: boolean }) {
  const [open, setOpen] = useState<Which>(null);
  const [shownThisSession, setShownThisSession] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (isAuthed) return; // don't nag signed-in users
    if (typeof window === "undefined") return;
    try {
      const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (until && Date.now() < until) return;
    } catch {}

    let suppressed = false;
    const suppress = () => { suppressed = true; };

    const timer = window.setTimeout(() => {
      if (suppressed || shownThisSession) return;
      setOpen("timed");
      setShownThisSession(true);
    }, 10000);

    const onMouseLeave = (e: MouseEvent) => {
      if (suppressed || shownThisSession) return;
      // exit intent: cursor crosses the top edge of the viewport
      if (e.clientY <= 0 && e.relatedTarget == null) {
        window.clearTimeout(timer);
        setOpen("exit");
        setShownThisSession(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      suppress();
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isAuthed, shownThisSession]);

  const dismiss = () => {
    setOpen(null);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + SUPPRESS_HOURS * 3600 * 1000));
    } catch {}
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    const fd = new FormData();
    fd.set("email", email);
    fd.set("source", open === "exit" ? "exit-intent" : "timed");
    start(async () => {
      await newsletterSignupAction(fd);
      setDone(true);
      try { localStorage.setItem(STORAGE_KEY, String(Date.now() + 365 * 24 * 3600 * 1000)); } catch {}
      setTimeout(() => setOpen(null), 1600);
    });
  };

  if (!open) return null;

  const isExit = open === "exit";
  const heading = isExit ? "Before you go —" : "Get a free weekly growth hack.";
  const sub = isExit
    ? "Join 4,200+ founders getting one battle-tested growth hack delivered every Monday. Free, no fluff."
    : "Every Monday, one new growth hack from the library. No spam, unsubscribe anytime.";
  const cta = isExit ? "Send me the playbook" : "Subscribe — it's free";

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}>
      <div className="modal">
        <button className="modal-close" onClick={dismiss} aria-label="Close">×</button>
        <h2>{heading}</h2>
        <p>{sub}</p>
        {done ? (
          <div style={{ padding: "12px 14px", borderRadius: 6, background: "rgba(121,240,198,0.08)", border: "1px solid rgba(121,240,198,0.3)", color: "var(--accent-3)", fontSize: 14 }}>
            You&apos;re in. Check your inbox shortly.
          </div>
        ) : (
          <form onSubmit={submit}>
            <input type="email" required placeholder="you@startup.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            <button type="submit" className="btn primary" disabled={pending} style={{ padding: "14px 18px", fontSize: 15, fontWeight: 700, justifyContent: "center" }}>
              {pending ? "…" : cta}
            </button>
          </form>
        )}
        <div className="modal-foot">4,200+ founders · unsubscribe in 1 click</div>
      </div>
    </div>
  );
}
