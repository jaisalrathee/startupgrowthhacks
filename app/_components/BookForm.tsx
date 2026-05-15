"use client";

import { useEffect, useState, useTransition } from "react";
import { bookCallAction } from "../actions";

const STAGES = ["Pre-launch", "Early traction (<$10k MRR)", "Growth ($10k–100k MRR)", "Scale ($100k+ MRR)"];
const BUDGETS = ["None right now", "<£1k / mo", "£1–5k / mo", "£5k+ / mo"];

export default function BookForm() {
  const [pkg, setPkg] = useState<string>("intro");
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  // Pre-fill from #book?package=... hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apply = () => {
      const hash = window.location.hash || "";
      const m = hash.match(/[#&?]package=([\w-]+)/);
      if (m) setPkg(m[1]);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  if (done) {
    return (
      <div style={{ padding: 24, borderRadius: 12, background: "rgba(121,240,198,0.08)", border: "1px solid rgba(121,240,198,0.3)", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>✓ Got it.</div>
        <p style={{ color: "var(--text-dim)", margin: 0, fontSize: 14, lineHeight: 1.5 }}>
          I&apos;ll reply within 24 hours with calendar times. If urgent, hit me on{" "}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            X
          </a>
          .
        </p>
      </div>
    );
  }

  const submit = (fd: FormData) => {
    setErr(null);
    fd.set("package", pkg);
    start(async () => {
      const r = await bookCallAction(fd);
      if (r?.error) setErr(r.error);
      else setDone(true);
    });
  };

  const PackageRadio = ({ id, label, sub }: { id: string; label: string; sub: string }) => (
    <label
      style={{
        display: "block",
        padding: 14,
        borderRadius: 8,
        border: `1px solid ${pkg === id ? "var(--accent)" : "var(--line)"}`,
        background: pkg === id ? "rgba(122,208,255,0.08)" : "var(--bg-soft)",
        cursor: "pointer",
        flex: 1,
        minWidth: 160,
      }}
    >
      <input
        type="radio"
        name="package-pick"
        value={id}
        checked={pkg === id}
        onChange={() => setPkg(id)}
        style={{ display: "none" }}
      />
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{label}</div>
      <div className="mono" style={{ fontSize: 9, color: "var(--text-faint)" }}>{sub}</div>
    </label>
  );

  return (
    <form action={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label className="section-label" style={{ marginBottom: 8 }}>Package</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <PackageRadio id="intro" label="Intro Call" sub="20 min · Free" />
          <PackageRadio id="strategy" label="Strategy Session" sub="60 min · £249" />
          <PackageRadio id="deep-dive" label="Custom Playbook" sub="2 weeks · £1,499" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <input type="text" name="name" placeholder="Your name *" required maxLength={60} />
        <input type="email" name="email" placeholder="you@startup.com *" required />
      </div>

      <input type="text" name="company" placeholder="Company / product (optional)" maxLength={80} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <select name="stage" defaultValue="">
          <option value="">Stage —</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="budget" defaultValue="">
          <option value="">Growth budget —</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <textarea
        name="topic"
        required
        placeholder="What's the one growth question you most want help with? *"
        maxLength={1000}
        style={{ minHeight: 110, resize: "vertical" }}
      />

      {err && (
        <div style={{ padding: 10, borderRadius: 6, background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff8888", fontSize: 13 }}>{err}</div>
      )}

      <button type="submit" className="btn primary" disabled={pending} style={{ padding: "16px 22px", fontSize: 15, fontWeight: 700, justifyContent: "center" }}>
        {pending ? "Sending…" : "Send booking request →"}
      </button>

      <p className="mono" style={{ fontSize: 10, color: "var(--text-faint)", textAlign: "center" }}>
        Reply within 24 hours · No commitment until you confirm the time
      </p>

      <style jsx>{`
        select {
          padding: 12px 14px;
          border-radius: 6px;
          background: var(--bg-elev);
          border: 1px solid var(--line);
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
          outline: none;
          width: 100%;
          letter-spacing: -0.3px;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a93a0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
        }
        select:focus { border-color: var(--accent); }
      `}</style>
    </form>
  );
}
