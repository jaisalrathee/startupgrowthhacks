import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isLocked, firstWord, rest } from "@/lib/lock";
import { getPlaylist, PLAYLISTS, accentVar } from "@/lib/playlists";
import { canonical, SITE, breadcrumb, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlaylist(slug);
  if (!p) return { title: "Not found" };
  const url = canonical(`/playlists/${p.slug}`);
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.description.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      title: `${p.title} · Startup Growth Hacks playlist`,
      description: p.description.slice(0, 200),
      url,
      type: "article",
      images: DEFAULT_OG_IMAGE,
    },
  };
}

function initials(s: string) {
  return s.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function tintFor(cat: string) {
  return ({ Traffic: "var(--accent)", Conversion: "var(--accent-3)", Retention: "var(--accent-2)", Monetization: "var(--accent-warn)", Referral: "var(--accent)", "AI GEO": "var(--accent-2)", Strategy: "var(--accent-warn)" } as Record<string, string>)[cat] || "var(--text)";
}

export default async function PlaylistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playlist = getPlaylist(slug);
  if (!playlist) notFound();

  const [tactics, user] = await Promise.all([
    prisma.tactic.findMany({
      where: { id: { in: playlist.tacticIds } },
      include: { _count: { select: { votes: true, comments: true } } },
    }),
    getCurrentUser(),
  ]);
  const pro = !!user?.isPro;

  // Preserve the playlist order
  const byId = new Map(tactics.map((t) => [t.id, t]));
  const ordered = playlist.tacticIds.map((id) => byId.get(id)).filter(Boolean) as typeof tactics;

  const accent = accentVar(playlist);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: playlist.title,
    description: playlist.description,
    url: canonical(`/playlists/${playlist.slug}`),
    numberOfItems: ordered.length,
    itemListOrder: "ItemListOrderAscending",
    itemListElement: ordered.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(`/hacks/${t.slug}`),
      name: t.tactic,
    })),
  };
  const breadcrumbLd = breadcrumb([
    { name: "Home", url: SITE.url },
    { name: "Playlists", url: `${SITE.url}/playlists` },
    { name: playlist.title, url: canonical(`/playlists/${playlist.slug}`) },
  ]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <nav className="mono" style={{ color: "var(--text-faint)", marginBottom: 12, fontSize: 11 }}>
        <Link href="/playlists" style={{ color: "var(--text-faint)" }}>← All playlists</Link>
      </nav>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>{playlist.emoji}</div>
        <div className="mono" style={{ color: accent, fontSize: 10, marginBottom: 8 }}>
          {playlist.subtitle} · {ordered.length} hacks · run top-to-bottom
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.02, margin: "0 0 18px", letterSpacing: "-0.04em" }}>
          {playlist.title}
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 16, lineHeight: 1.6, maxWidth: 680 }}>
          {playlist.description}
        </p>
      </section>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ordered.map((t, i) => {
          const locked = isLocked(t.id, pro);
          const fw = firstWord(t.tactic);
          const remainder = rest(t.tactic);
          const totalVotes = t.baseVotes + t._count.votes;
          return (
            <Link
              key={t.id}
              href={`/hacks/${t.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 44px minmax(0, 1fr) auto",
                gap: 14,
                alignItems: "center",
                padding: "16px 18px",
                borderRadius: 10,
                background: "var(--bg-soft)",
                border: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
                transition: "background .15s, border-color .15s, transform .15s",
              }}
              className="playlist-row"
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-faint)", textAlign: "center", letterSpacing: "-0.02em" }}>
                {i + 1}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, display: "grid", placeItems: "center", background: "var(--bg-elev)", border: "1px solid var(--line)", fontWeight: 700, fontSize: 12, color: locked ? "var(--text-faint)" : tintFor(t.category) }}>
                {locked ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                  </svg>
                ) : initials(t.tactic)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>
                  {locked ? (<>{fw}<span className="blurred-rest">{remainder}</span></>) : t.tactic}
                </div>
                <div className="mono" style={{ color: "var(--text-faint)", fontSize: 10, marginTop: 4 }}>
                  {t.category} · {t.channel} · <span style={{ color: t.impact === "High" ? "var(--accent-3)" : "var(--text-faint)" }}>{t.impact} impact</span>
                </div>
              </div>
              <div className="mono" style={{ color: "var(--text-faint)", fontSize: 11 }}>▲ {totalVotes}</div>
            </Link>
          );
        })}
      </div>

      <section style={{ marginTop: 48, padding: "28px 20px", borderRadius: 12, background: "var(--bg-soft)", border: "1px solid var(--line)", textAlign: "center" }}>
        <div className="mono" style={{ color: "var(--text-faint)", fontSize: 10, marginBottom: 8 }}>Need a custom playbook?</div>
        <p style={{ fontSize: 16, color: "var(--text)", maxWidth: 540, margin: "0 auto 16px", lineHeight: 1.5 }}>
          These playlists are a starting point. For a playbook tailored to your specific business, stage, and ICP, book a strategy session.
        </p>
        <Link href="/book" className="btn primary" style={{ padding: "12px 22px", fontSize: 14, fontWeight: 600 }}>
          Book a 1:1 with Jaisal →
        </Link>
      </section>
    </div>
  );
}
