import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isLocked, firstWord, rest } from "@/lib/lock";

export const metadata: Metadata = {
  title: "Leaderboard — what's actually working",
  description: "Community-ranked startup growth hacks — upvoted by operators who've shipped them. The top 50 plays winning right now.",
};

function initials(s: string) {
  return s.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function tintFor(cat: string) {
  return ({ Traffic: "var(--accent)", Conversion: "var(--accent-3)", Retention: "var(--accent-2)", Monetization: "var(--accent-warn)", Referral: "var(--accent)", "AI GEO": "var(--accent-2)", Strategy: "var(--accent-warn)" } as Record<string, string>)[cat] || "var(--text)";
}

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const [tactics, user] = await Promise.all([
    prisma.tactic.findMany({
      include: { _count: { select: { votes: true, comments: true } } },
    }),
    getCurrentUser(),
  ]);
  const pro = !!user?.isPro;
  const ranked = tactics
    .map((t) => ({ ...t, totalVotes: t.baseVotes + t._count.votes }))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 50);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 80px" }}>
      <div style={{ padding: "48px 0 32px", textAlign: "center" }}>
        <div className="mono" style={{ color: "var(--text-dim)" }}>§ 02 — Community Leaderboard</div>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.05, margin: "14px 0 10px", letterSpacing: "-0.035em" }}>
          What&apos;s <span className="gradient-text">actually</span><br />working right now.
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 15, maxWidth: 560, margin: "0 auto" }}>
          The growth hacks operators ship and vouch for. Upvote what&apos;s worked for you, leave a note, and see what&apos;s climbing.
        </p>
      </div>

      {ranked.map((t, i) => {
        const rank = i + 1;
        const rankClass = rank <= 3 ? `top t${rank}` : rank <= 10 ? "top" : "";
        const locked = isLocked(t.id, pro);
        const fw = firstWord(t.tactic);
        const remainder = rest(t.tactic);
        return (
          <Link href={`/hacks/${t.slug}`} key={t.id} className={`lb-row ${locked ? "locked" : ""}`}>
            <div className={`lb-rank ${rankClass}`}>{rank}</div>
            <div className="lb-icon" style={{ width: 44, height: 44, borderRadius: 8, display: "grid", placeItems: "center", background: "var(--bg-soft)", border: "1px solid var(--line)", fontWeight: 700, color: locked ? "var(--text-faint)" : tintFor(t.category) }}>
              {locked ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
              ) : initials(t.tactic)}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {locked ? (<>{fw}<span className="blurred-rest">{remainder}</span></>) : t.tactic}
              </div>
              <div className="mono" style={{ color: "var(--text-faint)", marginTop: 4 }}>
                {t.category} · {locked ? <span className="blurred-rest">{t.channel}</span> : t.channel} · <span style={{ color: t.impact === "High" ? "var(--accent-3)" : "var(--text-faint)" }}>{t.impact} impact</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div className="upvote">▲ {t.totalVotes}</div>
              <div className="upvote">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {t._count.comments}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
