import Link from "next/link";
import { pickScene } from "@/lib/illustrations";
import { firstWord, rest } from "@/lib/lock";
import VoteButton from "./VoteButton";
import SaveButton from "./SaveButton";
import CommentSection from "./CommentSection";
import EmailRequestForm from "./EmailRequestForm";
import PaywallCard from "./PaywallCard";

type RelatedTactic = {
  id: number;
  slug: string;
  tactic: string;
  category: string;
  channel: string;
  impact: string;
  baseVotes: number;
};

export type HackDetailProps = {
  tactic: {
    id: number;
    slug: string;
    tactic: string;
    category: string;
    channel: string;
    stage: string;
    difficulty: string;
    impact: string;
    cost: string;
    effort: string;
    biz: string;
    how: string;
    example: string;
    tip: string;
    bestFor: string;
    baseVotes: number;
  };
  totalVotes: number;
  totalComments: number;
  comments: Array<{ id: string; authorName: string; body: string; createdAt: string }>;
  locked: boolean;
  isAuthed: boolean;
  userHasVoted: boolean;
  userHasSaved: boolean;
  deepDive: {
    playbook: string[];
    metrics: string[];
    tools: Array<string | { name: string; url: string }>;
    timeline: string;
    benchmarks: string;
    pitfalls: string[];
    related: RelatedTactic[];
    realExample?: { attribution: string; story: string } | null;
  };
};

function toolHost(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}
function normalizeTool(t: string | { name: string; url: string }): { name: string; url: string | null } {
  if (typeof t === "string") return { name: t, url: null };
  return { name: t.name, url: t.url };
}

export default function HackDetail({
  tactic: t,
  totalVotes,
  comments,
  locked,
  isAuthed,
  userHasVoted,
  userHasSaved,
  deepDive,
}: HackDetailProps) {
  const biz = (() => { try { return JSON.parse(t.biz) as string[]; } catch { return []; } })();
  return (
    <article style={{ padding: "0 4px 60px" }}>
      <div className="illus-wrap" style={{ height: 240, marginBottom: 24 }}>
        {pickScene(t)}
      </div>

      <div className="mono" style={{ color: "var(--text-faint)", marginBottom: 8 }}>
        § Tactic № {String(t.id).padStart(3, "0")} — {t.category}
        {locked && <span className="lock-pill" style={{ marginLeft: 10 }}>Locked</span>}
      </div>
      <h2 style={{ fontWeight: 700, fontSize: "clamp(26px, 4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 10px" }}>
        {locked ? (<>{firstWord(t.tactic)}<span className="blurred-rest">{rest(t.tactic)}</span></>) : t.tactic}
      </h2>

      <div className="detail-tags">
        <span className="pill cat">{t.category}</span>
        <span className="pill">{t.channel}</span>
        <span className="pill">{t.stage}</span>
        <span className={`pill impact-${t.impact.toLowerCase()}`}>Impact · {t.impact}</span>
        <span className="pill">{t.difficulty}</span>
        <span className="pill">Cost · {t.cost}</span>
        <span className="pill">Effort · {t.effort}</span>
      </div>

      {locked ? (
        <>
          <div className="section" style={{ marginTop: 20 }}>
            <div className="section-label">How it works</div>
            <p>{firstWord(t.how)}<span className="blurred-rest">{rest(t.how)}</span></p>
          </div>
          <PaywallCard isAuthed={isAuthed} />
        </>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat"><div className="label">Stage</div><div className="value">{t.stage}</div></div>
            <div className="stat"><div className="label">Difficulty</div><div className="value">{t.difficulty}</div></div>
            <div className="stat"><div className="label">Cost</div><div className="value">{t.cost}</div></div>
            <div className="stat"><div className="label">Effort</div><div className="value">{t.effort}</div></div>
          </div>
          <div className="section"><div className="section-label">How it works</div><p>{t.how}</p></div>

          {deepDive.playbook.length > 0 && (
            <div className="section">
              <div className="section-label">Step-by-step playbook</div>
              <ol style={{ paddingLeft: 0, listStyle: "none", margin: 0, display: "grid", gap: 12 }}>
                {deepDive.playbook.map((step, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 6, display: "grid", placeItems: "center",
                      background: "var(--bg-soft)", border: "1px solid var(--line)",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", fontWeight: 700,
                    }}>{i + 1}</div>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {(deepDive.timeline || deepDive.benchmarks) && (
            <div className="section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {deepDive.timeline && (
                <div className="stat" style={{ padding: 16 }}>
                  <div className="label">Timeline</div>
                  <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}>{deepDive.timeline}</div>
                </div>
              )}
              {deepDive.benchmarks && (
                <div className="stat" style={{ padding: 16 }}>
                  <div className="label">Benchmarks</div>
                  <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}>{deepDive.benchmarks}</div>
                </div>
              )}
            </div>
          )}

          <div className="section example"><div className="section-label">In the wild</div><p>{t.example}</p></div>

          {deepDive.realExample && (
            <div
              className="section"
              style={{
                padding: 20,
                borderRadius: 12,
                border: "1px solid rgba(121,240,198,0.35)",
                background: "linear-gradient(135deg, rgba(121,240,198,0.06), rgba(122,208,255,0.06))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span className="mono" style={{
                  fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--accent-3)", padding: "4px 8px", borderRadius: 4,
                  background: "rgba(121,240,198,0.12)", border: "1px solid rgba(121,240,198,0.3)",
                }}>
                  Real-world case
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                  {deepDive.realExample.attribution}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "var(--text)" }}>
                {deepDive.realExample.story}
              </p>
            </div>
          )}

          {(deepDive.metrics.length > 0 || deepDive.tools.length > 0) && (
            <div className="section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
              {deepDive.metrics.length > 0 && (
                <div>
                  <div className="section-label">Metrics to watch</div>
                  <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0, display: "grid", gap: 6 }}>
                    {deepDive.metrics.map((m) => (
                      <li key={m} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14 }}>
                        <span style={{ color: "var(--accent-3)", flexShrink: 0, marginTop: 6, width: 4, height: 4, borderRadius: "50%", background: "var(--accent-3)" }} />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {deepDive.tools.length > 0 && (
                <div>
                  <div className="section-label">Top tools for this</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                    {deepDive.tools.map((raw) => {
                      const tool = normalizeTool(raw);
                      const host = tool.url ? toolHost(tool.url) : null;
                      const inner = (
                        <>
                          {host ? (
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                              alt=""
                              width={22}
                              height={22}
                              style={{ borderRadius: 4, flexShrink: 0, background: "var(--bg-elev)" }}
                            />
                          ) : (
                            <div style={{ width: 22, height: 22, borderRadius: 4, background: "var(--bg-elev)", flexShrink: 0 }} />
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tool.name}</div>
                            {host && (
                              <div className="mono" style={{ fontSize: 9, color: "var(--text-faint)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{host}</div>
                            )}
                          </div>
                          {tool.url && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-faint)", flexShrink: 0 }}>
                              <path d="M7 17 L17 7 M9 7 L17 7 L17 15"/>
                            </svg>
                          )}
                        </>
                      );
                      const baseStyle: React.CSSProperties = {
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: "1px solid var(--line)",
                        background: "var(--bg-soft)",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "transform .15s, border-color .15s",
                      };
                      if (tool.url) {
                        return (
                          <a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={baseStyle}
                            className="tool-card"
                          >
                            {inner}
                          </a>
                        );
                      }
                      return <div key={tool.name} style={baseStyle}>{inner}</div>;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="section tip"><div className="section-label">Pro tip · watch-out</div><p>{t.tip}</p></div>

          {deepDive.pitfalls.length > 0 && (
            <div className="section">
              <div className="section-label">Common failure modes</div>
              <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0, display: "grid", gap: 10 }}>
                {deepDive.pitfalls.map((p, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 6, background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.15)" }}>
                    <span style={{ color: "#ff8888", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 2 }}>✗</span>
                    <span style={{ fontSize: 14, lineHeight: 1.5 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="section"><div className="section-label">Best for</div><p>{t.bestFor}</p></div>

          {biz.length > 0 && (
            <div className="section">
              <div className="section-label">Works for</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {biz.map((b) => (<span key={b} className="pill">{b}</span>))}
              </div>
            </div>
          )}

          {deepDive.related.length > 0 && (
            <div className="section">
              <div className="section-label">Pairs well with</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
                {deepDive.related.map((r) => (
                  <Link key={r.id} href={`/hacks/${r.slug}`} style={{ display: "block", padding: 14, borderRadius: 8, border: "1px solid var(--line)", background: "var(--bg-soft)", textDecoration: "none", color: "inherit" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{r.tactic}</div>
                    <div className="mono" style={{ color: "var(--text-faint)", marginTop: 4, fontSize: 10 }}>
                      {r.category} · {r.channel} · ▲ {r.baseVotes}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 20, paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
            <VoteButton tacticId={t.id} initialCount={totalVotes} initialVoted={userHasVoted} isAuthed={isAuthed} />
            <SaveButton tacticId={t.id} initialSaved={userHasSaved} isAuthed={isAuthed} />
            <EmailRequestForm tacticId={t.id} tactic={t.tactic} />
          </div>
          <CommentSection tacticId={t.id} comments={comments} isAuthed={isAuthed} />
        </>
      )}
    </article>
  );
}
