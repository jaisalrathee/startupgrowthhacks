import type { Metadata } from "next";
import Link from "next/link";
import { PLAYLISTS, accentVar } from "@/lib/playlists";
import { canonical, SITE, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curated playlists — hand-picked growth playbooks",
  description:
    "Curated growth-hack playbooks for specific founder situations: first 90 days, B2B SaaS Series A, ecom Q4, indie hacker leverage, retention rescue. Each playlist is an ordered sequence of 10-17 hacks tuned to that moment.",
  alternates: { canonical: canonical("/playlists") },
  openGraph: {
    title: "Curated growth playbooks · 6 playlists for specific founder moments",
    description: "Run them top-to-bottom. First 90 days. CRO sprint. Series A scale. Q4 ecom. Indie hacker. Retention rescue.",
    url: canonical("/playlists"),
    type: "website",
    images: DEFAULT_OG_IMAGE,
  },
};

export default function PlaylistsIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Curated growth-hack playlists",
    description: "Hand-picked playbooks for specific founder situations.",
    url: canonical("/playlists"),
    isPartOf: { "@id": `${SITE.url}#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "Unordered",
      numberOfItems: PLAYLISTS.length,
      itemListElement: PLAYLISTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: canonical(`/playlists/${p.slug}`),
        name: p.title,
      })),
    },
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 20px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <section style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="mono" style={{ color: "var(--text-dim)", fontSize: 11, letterSpacing: "0.18em" }}>
          § Curated playlists
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(34px, 5.5vw, 64px)", lineHeight: 1.02, margin: "14px 0 12px", letterSpacing: "-0.04em" }}>
          Hand-picked playbooks<br />for <span className="gradient-text">your situation</span>.
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.5 }}>
          464 hacks is a lot. Each playlist is an ordered sequence of 10-15 hacks tuned to a specific founder moment — pre-launch, post-PMF, Q4 ecom rush, retention crisis. Run them top-to-bottom.
        </p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {PLAYLISTS.map((p) => (
          <Link
            key={p.slug}
            href={`/playlists/${p.slug}`}
            style={{
              display: "block",
              padding: 24,
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "var(--bg-soft)",
              textDecoration: "none",
              color: "inherit",
              transition: "transform .15s, border-color .15s",
              position: "relative",
              overflow: "hidden",
            }}
            className="playlist-card"
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accentVar(p)}, transparent 70%)`,
                opacity: 0.25,
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{p.emoji}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", margin: "0 0 6px", color: "var(--text)" }}>
                {p.title}
              </h3>
              <div className="mono" style={{ color: accentVar(p), fontSize: 10, marginBottom: 12 }}>
                {p.subtitle} · {p.tacticIds.length} hacks
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                {p.description.slice(0, 200)}…
              </p>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Open playlist
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14 M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
