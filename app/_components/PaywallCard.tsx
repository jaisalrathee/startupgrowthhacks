import Link from "next/link";

export default function PaywallCard({ isAuthed }: { isAuthed: boolean }) {
  const items = [
    "All 464 deep-dive hacks — hand-illustrated, with the how, example & gotcha",
    "Email-to-inbox any hack — receive the full playbook in your inbox",
    "Full leaderboard + community comments — upvote and discuss",
    "Free weekly updates — new hacks added every Monday, forever",
    "Save & organize hacks in your dashboard",
  ];
  return (
    <div className="paywall">
      <div style={{ width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px", background: "linear-gradient(135deg, var(--accent), var(--accent-2))", display: "grid", placeItems: "center", boxShadow: "0 8px 24px -8px rgba(122,208,255,0.6)" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0b0d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        </svg>
      </div>
      <h3>Unlock all 464 growth hacks</h3>
      <p style={{ color: "var(--text-dim)", fontSize: 14, maxWidth: 460, margin: "0 auto 22px" }}>
        The full playbook — every how, example, gotcha, and illustration. Yours forever, one payment.
      </p>
      <div className="price-row">
        <span className="price-old">£100</span>
        <span className="price-new">£49</span>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(121,240,198,0.15)", border: "1px solid rgba(121,240,198,0.4)", color: "var(--accent-3)", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>
        ● SAVE £51 · 51% off launch week
      </div>
      <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 18 }}>
        <b style={{ color: "var(--text)" }}>One-time payment.</b> No subscription, no renewals, lifetime access.
      </div>
      <div className="checklist">
        {items.map((line) => (
          <div className="item" key={line}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 L9 17 L4 12"/></svg>
            <span>{line}</span>
          </div>
        ))}
      </div>
      <Link href={isAuthed ? "/unlock" : "/signup?next=/unlock"} className="btn primary" style={{ padding: "14px 28px", fontSize: 15, fontWeight: 700 }}>
        Get full access for £49 →
      </Link>
      <div className="mono" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 16, color: "var(--text-faint)", fontSize: 10 }}>
        <span>✓ 30-day refund</span><span>✓ Lifetime access</span><span>✓ Pay once</span>
      </div>
    </div>
  );
}
