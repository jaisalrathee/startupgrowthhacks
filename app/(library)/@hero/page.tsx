import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function HeroSlot() {
  const [count, user] = await Promise.all([prisma.tactic.count(), getCurrentUser()]);
  const isPro = !!user?.isPro;

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

      {!isPro && (
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <Link href="/unlock" className="hero-cta">
            <span className="hero-cta-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Get Full Access
              <span className="hero-cta-price">
                <span className="hero-cta-strike">£100</span>
                £49
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14 M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
