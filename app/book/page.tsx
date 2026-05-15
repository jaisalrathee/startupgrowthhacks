import type { Metadata } from "next";
import BookForm from "../_components/BookForm";

export const metadata: Metadata = {
  title: "Book a 1:1 growth call with Jaisal",
  description:
    "Spend 30–60 minutes with Jaisal on your growth strategy. Pick the package — free intro, 60-min deep dive, or a full custom playbook for your business.",
  openGraph: {
    title: "Book a 1:1 growth call with Jaisal — Startup Growth Hacks",
    description:
      "Real conversation, real ideas. Pick the package and we'll get on a call within 5 days.",
    type: "website",
  },
};

const PACKAGES = [
  {
    id: "intro",
    name: "Intro Call",
    duration: "20 min",
    price: "Free",
    pricePill: "Free",
    description: "A quick chemistry call. You bring the top growth question; I give you the most useful angle I see in 20 minutes.",
    features: [
      "Best for solo founders + early-stage teams",
      "One specific growth question",
      "Honest answer — yes/no fit for deeper work",
    ],
    cta: "Book free intro →",
    primary: false,
  },
  {
    id: "strategy",
    name: "Strategy Session",
    duration: "60 min",
    price: "£249",
    pricePill: "Most booked",
    description: "Deep-dive on your specific funnel: acquisition, activation, retention, or pricing. You walk out with 5+ ranked plays and the exact playbook to ship them.",
    features: [
      "Pre-call audit of your site + funnel",
      "Live 60-min strategy call",
      "Written summary + 5 ranked plays delivered within 48h",
      "2 weeks of follow-up Slack/email",
    ],
    cta: "Book strategy session →",
    primary: true,
  },
  {
    id: "deep-dive",
    name: "Custom Playbook",
    duration: "2 weeks",
    price: "£1,499",
    pricePill: "Founder-flat fee",
    description: "I act as your fractional growth lead for two weeks. Audit, prioritise, write the playbook, and stay close while you ship the first 3 plays.",
    features: [
      "Full audit: acquisition, conversion, retention, pricing",
      "20-page bespoke growth playbook for your business",
      "Two 60-min calls + async daily Slack",
      "Live during implementation of first 3 plays",
      "30-day post-engagement check-in",
    ],
    cta: "Book deep-dive →",
    primary: false,
  },
];

export default function BookPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 20px 80px" }}>
      <section style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="mono" style={{ color: "var(--text-dim)", fontSize: 11, letterSpacing: "0.18em" }}>
          § 03 — Work directly with me
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.02, margin: "16px 0 14px", letterSpacing: "-0.045em" }}>
          Spend an hour with <span className="gradient-text">Jaisal</span>
          <br />on your growth.
        </h1>
        <p className="sub" style={{ color: "var(--text-dim)", fontSize: 17, maxWidth: 620, margin: "0 auto", lineHeight: 1.5 }}>
          I&apos;ve advised <b style={{ color: "var(--text)" }}>50+ early-stage startups</b> on growth — from $0 MRR to first $1M ARR. The playbook isn&apos;t in a course; it&apos;s a conversation specific to your stage, your ICP, your funnel.
        </p>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginBottom: 56 }}>
        {PACKAGES.map((p) => (
          <div
            key={p.id}
            style={{
              position: "relative",
              padding: "28px 24px 26px",
              borderRadius: 14,
              border: p.primary ? "1px solid transparent" : "1px solid var(--line)",
              background: p.primary
                ? "linear-gradient(var(--bg-soft),var(--bg-soft)) padding-box, linear-gradient(135deg, #7ad0ff, #b39dff, #ff8fc8, #ffb86b) border-box"
                : "var(--bg-soft)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {p.pricePill && (
              <div
                className="mono"
                style={{
                  position: "absolute",
                  top: -10,
                  left: 20,
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontSize: 10,
                  background: p.primary ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-elev)",
                  color: p.primary ? "#0a0b0d" : "var(--text-dim)",
                  border: p.primary ? "none" : "1px solid var(--line)",
                  fontWeight: 700,
                }}
              >
                {p.pricePill}
              </div>
            )}
            <div className="mono" style={{ color: "var(--text-faint)", fontSize: 10, marginBottom: 6 }}>
              {p.duration}
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", margin: "0 0 8px" }}>{p.name}</h3>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 14, lineHeight: 1 }}>
              {p.price === "Free" ? <span className="gradient-text">{p.price}</span> : p.price}
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.5, margin: "0 0 16px" }}>{p.description}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "grid", gap: 8, flex: 1 }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: "flex", gap: 9, fontSize: 13, lineHeight: 1.5 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-3)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M20 6 L9 17 L4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={`#book?package=${p.id}`}
              className={p.primary ? "btn primary" : "btn"}
              style={{ padding: "12px 18px", justifyContent: "center", textAlign: "center" }}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </section>

      <section id="book" style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="mono" style={{ color: "var(--text-dim)", textAlign: "center", marginBottom: 8 }}>
          § The booking form
        </div>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", textAlign: "center", letterSpacing: "-0.035em", margin: "0 0 14px" }}>
          Tell me about your business.
        </h2>
        <p style={{ color: "var(--text-dim)", textAlign: "center", fontSize: 15, marginBottom: 32 }}>
          The more context you give, the more useful the call. I&apos;ll reply within 24 hours with calendar times.
        </p>
        <BookForm />
      </section>

      <section style={{ marginTop: 80, padding: "32px 20px", borderRadius: 14, background: "var(--bg-soft)", border: "1px solid var(--line)", textAlign: "center" }}>
        <div className="mono" style={{ color: "var(--text-faint)", fontSize: 10, marginBottom: 12 }}>What founders say</div>
        <p style={{ fontStyle: "italic", fontSize: 17, maxWidth: 640, margin: "0 auto 12px", lineHeight: 1.55, color: "var(--text)" }}>
          &ldquo;30 minutes with Jaisal reset our entire growth roadmap. We killed two channels we&apos;d been propping up for 6 months and 3x&apos;d the budget on the one he flagged. ROAS doubled in 6 weeks.&rdquo;
        </p>
        <div style={{ fontSize: 13, color: "var(--text-dim)" }}>— founder, B2B SaaS · Series A</div>
      </section>
    </div>
  );
}
