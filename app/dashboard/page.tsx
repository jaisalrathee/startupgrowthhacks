import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { signoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ unlocked?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?next=/dashboard");
  const { unlocked } = await searchParams;

  const [saved, votes, requests, fullUser] = await Promise.all([
    prisma.savedHack.findMany({
      where: { userId: user.id },
      include: { tactic: { select: { id: true, slug: true, tactic: true, category: true, channel: true, impact: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.vote.findMany({
      where: { userId: user.id },
      include: { tactic: { select: { id: true, slug: true, tactic: true, category: true } } },
      orderBy: { createdAt: "desc" }, take: 20,
    }),
    prisma.emailRequest.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.user.findUnique({ where: { id: user.id }, select: { isPro: true, createdAt: true } }),
  ]);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 20px 80px" }}>
      {unlocked && (
        <div style={{ padding: 16, borderRadius: 8, background: "rgba(121,240,198,0.1)", border: "1px solid rgba(121,240,198,0.4)", color: "var(--accent-3)", marginBottom: 24, fontSize: 14 }}>
          Welcome to PRO. All 464 hacks unlocked — save the ones you&apos;ll actually ship.
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        <div>
          <div className="mono" style={{ color: "var(--text-dim)" }}>§ Dashboard</div>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em", margin: "8px 0 4px" }}>
            Hey, {user.name || user.email.split("@")[0]}.
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14, margin: 0 }}>
            {fullUser?.isPro ? (
              <><span style={{ color: "var(--accent-3)" }}>● PRO</span> · joined {fullUser.createdAt.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</>
            ) : (
              <><span style={{ color: "var(--accent-warn)" }}>● Free</span> · 3 of 464 hacks unlocked · <Link href="/unlock" style={{ color: "var(--accent)", textDecoration: "underline" }}>get all for £49 →</Link></>
            )}
          </p>
        </div>
        <form action={signoutAction}>
          <button className="btn" type="submit">Sign out</button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 40 }}>
        <Stat label="Saved hacks" value={saved.length} />
        <Stat label="Upvotes given" value={votes.length} />
        <Stat label="Emailed playbooks" value={requests.length} />
        <Stat label="Plan" value={fullUser?.isPro ? "PRO" : "Free"} />
      </div>

      <Section title="Saved hacks">
        {saved.length === 0 ? (
          <Empty hint="Click the bookmark icon on any hack to save it here." />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {saved.map((s) => (
              <Link key={s.id} href={`/hacks/${s.tactic.slug}`} className="email-row" style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 14 }}>
                <div className="email-body">
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.tactic.tactic}</div>
                  <div className="mono" style={{ color: "var(--text-faint)", marginTop: 4 }}>
                    {s.tactic.category} · {s.tactic.channel}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section title="Recent upvotes">
        {votes.length === 0 ? <Empty hint="Hacks you upvote will appear here." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {votes.map((v) => (
              <Link key={v.id} href={`/hacks/${v.tactic.slug}`} style={{ display: "flex", justifyContent: "space-between", padding: 12, border: "1px solid var(--line-soft)", borderRadius: 6, textDecoration: "none", color: "inherit" }}>
                <span style={{ fontSize: 14 }}>▲ {v.tactic.tactic}</span>
                <span className="mono" style={{ color: "var(--text-faint)" }}>{v.tactic.category}</span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div className="section-label" style={{ marginBottom: 14 }}>{title}</div>
      {children}
    </section>
  );
}
function Empty({ hint }: { hint: string }) {
  return <div style={{ padding: 24, textAlign: "center", color: "var(--text-faint)", fontSize: 13, border: "1px dashed var(--line)", borderRadius: 8 }}>{hint}</div>;
}
