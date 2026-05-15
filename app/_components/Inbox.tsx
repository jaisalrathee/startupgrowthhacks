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
  stage: string;
  impact: string;
  cost: string;
  effort: string;
  difficulty: string;
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

const STAGES = ["Awareness", "Acquisition", "Activation", "Conversion", "Retention", "Revenue", "Referral"];
const IMPACTS = ["High", "Medium", "Low"];
const COSTS = ["Free", "$", "$$", "$$$"];
const EFFORTS = ["Low", "Medium", "High"];

type Sort = "default" | "trending" | "top" | "newest";
const SORTS: Array<{ id: Sort; label: string }> = [
  { id: "default", label: "Default" },
  { id: "trending", label: "🔥 Trending this week" },
  { id: "top", label: "Top voted" },
  { id: "newest", label: "Newest" },
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

// Deterministic pseudo-random "trending" boost — same hack trends within a week, rotates weekly.
function trendingScore(t: TacticLite, weekSeed: number) {
  let h = weekSeed;
  for (let i = 0; i < t.tactic.length; i++) h = ((h << 5) - h + t.tactic.charCodeAt(i)) | 0;
  return Math.abs(h % 100) + (t.impact === "High" ? 60 : t.impact === "Medium" ? 30 : 0) + t.votes * 0.5;
}
function currentWeekSeed(): number {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  return d.getFullYear() * 100 + Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
}

export default function Inbox({ tactics, children, isPro }: { tactics: TacticLite[]; children: React.ReactNode; isPro: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stage, setStage] = useState("");
  const [impact, setImpact] = useState("");
  const [cost, setCost] = useState("");
  const [effort, setEffort] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const pathname = usePathname();
  const onHackPage = pathname?.startsWith("/hacks/") ?? false;
  const activeSlug = onHackPage ? pathname!.slice("/hacks/".length) : null;
  const weekSeed = useMemo(() => currentWeekSeed(), []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: tactics.length };
    for (const t of tactics) c[t.category] = (c[t.category] || 0) + 1;
    return c;
  }, [tactics]);

  const activeFilterCount = (stage ? 1 : 0) + (impact ? 1 : 0) + (cost ? 1 : 0) + (effort ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = tactics.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (stage && t.stage !== stage) return false;
      if (impact && t.impact !== impact) return false;
      if (cost && t.cost !== cost) return false;
      if (effort && t.effort !== effort) return false;
      if (!q) return true;
      return t.tactic.toLowerCase().includes(q) || t.channel.toLowerCase().includes(q);
    });
    if (sort === "trending") {
      list = [...list].sort((a, b) => trendingScore(b, weekSeed) - trendingScore(a, weekSeed));
    } else if (sort === "top") {
      list = [...list].sort((a, b) => b.votes - a.votes);
    } else if (sort === "newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    }
    return list;
  }, [tactics, query, category, stage, impact, cost, effort, sort, weekSeed]);

  const clearFilters = () => { setStage(""); setImpact(""); setCost(""); setEffort(""); setSort("default"); };

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

      {/* Sort + filters bar */}
      <div className="filter-bar">
        <div className="filter-bar-inner">
          <button
            className={`filter-chip ${filtersOpen || activeFilterCount > 0 ? "active" : ""}`}
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18 M6 12h12 M10 18h4"/>
            </svg>
            Filters {activeFilterCount > 0 && <span className="filter-chip-count">{activeFilterCount}</span>}
          </button>

          <span className="filter-divider" />

          {SORTS.map((s) => (
            <button
              key={s.id}
              className={`filter-chip ${sort === s.id ? "active" : ""}`}
              onClick={() => setSort(s.id)}
            >
              {s.label}
            </button>
          ))}

          {(activeFilterCount > 0 || sort !== "default") && (
            <button className="filter-chip filter-chip-clear" onClick={clearFilters}>
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* Filter detail row — collapsible */}
      {filtersOpen && (
        <div className="filter-detail">
          <div className="filter-detail-inner">
            <FilterGroup label="Stage" value={stage} options={STAGES} onChange={setStage} />
            <FilterGroup label="Impact" value={impact} options={IMPACTS} onChange={setImpact} />
            <FilterGroup label="Cost" value={cost} options={COSTS} onChange={setCost} />
            <FilterGroup label="Effort" value={effort} options={EFFORTS} onChange={setEffort} />
          </div>
        </div>
      )}

      <main className={`app-grid ${onHackPage ? "mobile-show-detail" : "mobile-show-inbox"}`}>
        <aside className="inbox">
          <div className="inbox-head">
            <div className="mono" style={{ color: "var(--text-dim)" }}>
              Inbox <span className="count-pill">{filtered.length}</span>
            </div>
            <div className="mono" style={{ color: "var(--text-faint)" }}>
              {sort !== "default" ? SORTS.find((s) => s.id === sort)?.label.replace(/^[^\s]+\s/, "") : `1–${Math.min(50, filtered.length)} of ${filtered.length}`}
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
                No tactics match. <button onClick={clearFilters} style={{ background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", padding: 0, fontSize: 13 }}>Clear filters →</button>
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

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="filter-group">
      <div className="filter-group-label mono">{label}</div>
      <div className="filter-group-chips">
        <button className={`filter-pill ${!value ? "active" : ""}`} onClick={() => onChange("")}>All</button>
        {options.map((o) => (
          <button key={o} className={`filter-pill ${value === o ? "active" : ""}`} onClick={() => onChange(value === o ? "" : o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
