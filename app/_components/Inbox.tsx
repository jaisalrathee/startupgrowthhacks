"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocked, firstWord, rest } from "@/lib/lock";

export type TacticLite = {
  id: number;
  slug: string;
  tactic: string;
  category: string;
  channel: string;
  impact: string;
  votes: number;
};

const CATEGORIES = [
  "All",
  "Traffic",
  "Conversion",
  "Retention",
  "Monetization",
  "Referral",
  "AI GEO",
  "Strategy",
];

function tintFor(cat: string) {
  return (
    {
      Traffic: "var(--accent)",
      Conversion: "var(--accent-3)",
      Retention: "var(--accent-2)",
      Monetization: "var(--accent-warn)",
      Referral: "var(--accent)",
      "AI GEO": "var(--accent-2)",
      Strategy: "var(--accent-warn)",
    } as Record<string, string>
  )[cat] || "var(--text)";
}

function initials(s: string) {
  return s.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function Inbox({ tactics, children, isPro }: { tactics: TacticLite[]; children: React.ReactNode; isPro: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const pathname = usePathname();
  const onHackPage = pathname?.startsWith("/hacks/") ?? false;
  const activeSlug = onHackPage ? pathname!.slice("/hacks/".length) : null;

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: tactics.length };
    for (const t of tactics) c[t.category] = (c[t.category] || 0) + 1;
    return c;
  }, [tactics]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tactics.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (!q) return true;
      return t.tactic.toLowerCase().includes(q) || t.channel.toLowerCase().includes(q);
    });
  }, [tactics, query, category]);

  return (
    <>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px" }}>
        <div className="flex items-center gap-2 px-4 py-3 rounded-md" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-faint)", flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${tactics.length} growth hacks…`}
            style={{ background: "transparent", border: "none", outline: "none", flex: 1, color: "var(--text)", fontSize: 14 }}
          />
        </div>
      </div>

      <div className="cat-tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={category === c ? "active" : ""}
          >
            {c}
            <span className="count">{counts[c] ?? 0}</span>
          </button>
        ))}
      </div>

      <main className={`app-grid ${onHackPage ? "mobile-show-detail" : "mobile-show-inbox"}`}>
        <aside className="inbox">
          <div className="inbox-head">
            <div className="mono" style={{ color: "var(--text-dim)" }}>
              Inbox <span className="count-pill">{filtered.length}</span>
            </div>
            <div className="mono" style={{ color: "var(--text-faint)" }}>
              1–{Math.min(50, filtered.length)} of {filtered.length}
            </div>
          </div>
          <div className="inbox-list">
            {filtered.slice(0, 100).map((t) => {
              const locked = isLocked(t.id, isPro);
              const fw = firstWord(t.tactic);
              const remainder = rest(t.tactic);
              return (
                <Link
                  key={t.id}
                  href={`/hacks/${t.slug}`}
                  scroll={false}
                  prefetch
                  className={`email-row ${activeSlug === t.slug ? "active" : ""} ${locked ? "locked" : ""}`}
                >
                  <div className="email-icon" style={{ color: locked ? "var(--text-faint)" : tintFor(t.category) }}>
                    {locked ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                      </svg>
                    ) : (
                      initials(t.tactic)
                    )}
                  </div>
                  <div className="email-body">
                    <div className="email-title">
                      {locked ? (
                        <>
                          {fw}
                          <span className="blurred-rest">{remainder}</span>
                        </>
                      ) : (
                        t.tactic
                      )}
                    </div>
                    <div className="email-meta">
                      <span>{t.category}</span>
                      <span className="dot">·</span>
                      {locked ? (
                        <span className="blurred-rest">{t.channel}</span>
                      ) : (
                        <span>{t.channel}</span>
                      )}
                      <span className="dot">·</span>
                      <span style={{ color: t.impact === "High" ? "var(--accent-3)" : "var(--text-faint)" }}>{t.impact}</span>
                    </div>
                  </div>
                  <div className="upvote-mini mono" style={{ alignSelf: "center" }}>▲ {t.votes}</div>
                </Link>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-faint)", fontSize: 13 }}>
                No tactics match — try a different search.
              </div>
            )}
          </div>
        </aside>
        <section className="detail">
          {onHackPage && (
            <Link
              href="/"
              scroll={false}
              className="mobile-back-link"
              style={{ display: "none", alignItems: "center", gap: 6, marginBottom: 16, color: "var(--text-dim)", textDecoration: "none", fontSize: 13 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12 H5 M12 19 L5 12 L12 5"/></svg>
              Browse all {tactics.length} hacks
            </Link>
          )}
          {children}
        </section>
      </main>
    </>
  );
}
