import type { Metadata } from "next";
import Link from "next/link";
import { CRO_CHECKLIST, TOTAL_ITEMS } from "@/lib/croChecklist";
import ChecklistSection from "@/app/_components/ChecklistSection";
import ChecklistProgress from "@/app/_components/ChecklistProgress";
import { canonical, SITE, breadcrumb, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = `CRO Checklist for Startup Founders — ${TOTAL_ITEMS} items across landing pages, apps & funnels`;
const DESCRIPTION = `The free Conversion Rate Optimisation checklist for early-stage startup founders. ${TOTAL_ITEMS} tested items across landing pages, hero sections, pricing, signup forms, onboarding, mobile, analytics, and AI personalisation. Tickable, organised by funnel stage.`;
const URL = canonical("/cro-checklist");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "CRO checklist",
    "conversion rate optimization checklist",
    "conversion rate optimisation checklist",
    "startup CRO",
    "landing page checklist",
    "SaaS conversion checklist",
    "early stage startup CRO",
    "website conversion checklist",
    "app conversion checklist",
    "pricing page CRO",
    "signup form CRO",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "article",
    images: DEFAULT_OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "CRO Checklist for startup founders — 58 actionable items",
    description: "Free, tickable, organised by funnel stage. Built from 464 growth hacks.",
  },
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "What is CRO (conversion rate optimisation)?",
    a: "CRO is the systematic process of increasing the percentage of website visitors who complete a desired action — signing up, booking a demo, or buying. For early-stage startups, CRO usually means iterating on landing pages, signup forms, pricing, and onboarding flows based on data, not opinions.",
  },
  {
    q: "What's a good conversion rate for a startup landing page?",
    a: "It depends on traffic intent and offer. Cold paid traffic to a B2B SaaS landing page typically converts 1-3% to free trial signup. Warm organic traffic can hit 5-15%. Email-list traffic 10-30%. Don't compare against industry averages — compare against your own baseline week-over-week.",
  },
  {
    q: "How long does CRO take to show results?",
    a: "Low-effort tests (CTA copy, button color, headline) can show signal in 7-14 days if you have at least a few hundred conversions per variant. Higher-effort changes (full onboarding redesigns, pricing structure) need 30-60 days for a confident read. Don't call winners before you have statistical significance (95%+ confidence, 1000+ events per arm).",
  },
  {
    q: "Which CRO tools should an early-stage startup use?",
    a: "Start with three: an analytics tool (PostHog or Plausible for events, GA4 for paid attribution), a session-recording tool (Microsoft Clarity is free, Hotjar for more depth), and an experimentation framework (PostHog Experiments is bundled, or GrowthBook self-hosted). Skip enterprise tools like Optimizely until you have meaningful traffic.",
  },
  {
    q: "What's the single highest-impact CRO change for most startups?",
    a: "Rewriting the headline. Specifically: making it benefit-led instead of feature-led, and making sure a stranger can describe your product after 5 seconds of looking at the page. Headline tests routinely lift conversion 10-30%. After that, the next-highest leverage is usually the CTA copy and removing fields from the signup form.",
  },
  {
    q: "Do I need a CRO tool to run this checklist?",
    a: "No. You can complete 80% of this checklist with just your eyes, a phone for mobile testing, and free tools like PageSpeed Insights and Microsoft Clarity. The remaining 20% (A/B testing, advanced personalisation) only matters once you have at least 1,000 weekly visitors.",
  },
];

export default function CROChecklistPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CRO Checklist for Startup Founders",
    description: DESCRIPTION,
    author: { "@type": "Person", name: "Jaisal Rathee", url: "https://startupgrowthhacks.com/book" },
    publisher: { "@type": "Organization", name: "Startup Growth Hacks", url: "https://startupgrowthhacks.com" },
    mainEntityOfPage: URL,
    articleSection: "Conversion Rate Optimisation",
    keywords: "CRO, conversion rate optimization, startup, landing page, SaaS, checklist",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to run a CRO audit on your startup website",
    description: `${TOTAL_ITEMS}-step conversion-rate audit for early-stage startup founders.`,
    totalTime: "PT2H",
    step: CRO_CHECKLIST.map((section, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: section.title,
      text: section.description,
      itemListElement: section.items.map((item, j) => ({
        "@type": "HowToDirection",
        position: j + 1,
        text: item.text,
      })),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article style={{ maxWidth: 880, margin: "0 auto", padding: "48px 20px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumb([
              { name: "Home", url: SITE.url },
              { name: "CRO Checklist", url: URL },
            ])
          ),
        }}
      />

      <header style={{ marginBottom: 40 }}>
        <div className="mono" style={{ color: "var(--text-dim)", fontSize: 11, letterSpacing: "0.18em" }}>
          § Free resource · CRO toolkit
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.04em", margin: "16px 0 18px" }}>
          The CRO Checklist for<br /><span className="gradient-text">early-stage founders</span>.
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 17, lineHeight: 1.55, maxWidth: 680 }}>
          {TOTAL_ITEMS} battle-tested CRO items across landing pages, hero sections, pricing,
          signup forms, onboarding, mobile, and analytics. Tick them as you go — progress is saved
          locally to this device.
        </p>
        <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 10, maxWidth: 680 }}>
          Built from the 464-hack library at{" "}
          <Link href="/" style={{ color: "var(--accent)" }}>Startup Growth Hacks</Link>. Some
          items link to a deeper hack with the full playbook, real examples, and recommended tools.
        </p>
      </header>

      <ChecklistProgress />

      <nav aria-label="Checklist sections" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
        {CRO_CHECKLIST.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              background: "var(--bg-soft)",
              border: "1px solid var(--line)",
              fontSize: 12,
              color: "var(--text-dim)",
              textDecoration: "none",
              letterSpacing: "-0.3px",
            }}
          >
            <span>{s.emoji}</span>
            <span>{s.title}</span>
            <span className="mono" style={{ color: "var(--text-faint)", fontSize: 10 }}>{s.items.length}</span>
          </a>
        ))}
      </nav>

      {CRO_CHECKLIST.map((section) => (
        <ChecklistSection key={section.id} section={section} />
      ))}

      {/* FAQ — also matches FAQPage schema above */}
      <section style={{ marginTop: 64 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ_ITEMS.map((f) => (
            <details
              key={f.q}
              style={{
                background: "var(--bg-soft)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "16px 18px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 15, color: "var(--text)", listStyle: "none" }}>
                {f.q}
              </summary>
              <p style={{ marginTop: 12, color: "var(--text-dim)", fontSize: 14, lineHeight: 1.6 }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section
        style={{
          marginTop: 64,
          padding: "32px 28px",
          borderRadius: 14,
          background: "var(--bg-soft)",
          border: "1px solid var(--line)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="mono" style={{ color: "var(--text-faint)", fontSize: 10, marginBottom: 12 }}>
          Want a custom audit?
        </div>
        <h2 style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-0.035em", margin: "0 0 12px" }}>
          Stuck? Get a <span className="gradient-text">1:1 audit</span> with Jaisal.
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 15, maxWidth: 540, margin: "0 auto 22px", lineHeight: 1.5 }}>
          A 60-minute call walking through your funnel, your numbers, and the exact 5 plays I&apos;d
          ship next. Most founders walk out with a 30-60 day plan and a 10-15% CVR lift target.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="btn primary" style={{ padding: "14px 22px", fontSize: 15, fontWeight: 600 }}>
            Book a strategy session →
          </Link>
          <Link href="/" className="btn" style={{ padding: "14px 22px", fontSize: 15 }}>
            Explore 464 growth hacks
          </Link>
        </div>
      </section>
    </article>
  );
}
