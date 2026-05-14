import { prisma } from "@/lib/prisma";

export default async function HeroSlot() {
  const count = await prisma.tactic.count();
  return (
    <section className="hero">
      <div className="mono" style={{ color: "var(--text-dim)", fontSize: 11, letterSpacing: "0.18em" }}>
        § 01 — startupgrowthhacks.com
        <span style={{ marginLeft: 12, padding: "2px 10px", borderRadius: 999, background: "rgba(122,208,255,0.12)", color: "var(--accent)", border: "1px solid rgba(122,208,255,0.25)", display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span className="live-dot" /> {count} hacks · live
        </span>
      </div>
      <h1>
        Steal the<br />
        <span className="gradient-text">growth hacks</span>
        <br />behind every unicorn.
      </h1>
      <p className="sub">
        <b>No fluff.</b> {count} hand-illustrated growth plays — the how, the example, the gotcha. Stuff that actually moved the number.
      </p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, padding: "6px 14px", borderRadius: 999, background: "var(--bg-soft)", border: "1px solid var(--line)", fontSize: 12, color: "var(--text-dim)" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-warn)" }} />
        Updated weekly · operators only
      </div>
    </section>
  );
}
