"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type User = { id: string; email: string; name: string | null; isPro: boolean } | null;

export default function Nav({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (p: string) => pathname === p || (p !== "/" && pathname.startsWith(p));

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };

  return (
    <nav className="nav">
      <Link href="/" className="logo flex items-center gap-[11px] text-inherit no-underline" style={{ fontWeight: 600 }}>
        <div className="logomark"><span>S</span></div>
        <div className="flex flex-col leading-tight">
          <span style={{ fontWeight: 500, fontSize: 15 }}>Startup Growth Hacks</span>
          <span className="mono" style={{ fontSize: 9, color: "var(--text-faint)", marginTop: 1 }}>startupgrowthhacks.com</span>
        </div>
      </Link>

      <div className="nav-links">
        <Link href="/" className={isActive("/") && pathname === "/" ? "active" : ""}>Tactics</Link>
        <Link href="/leaderboard" className={isActive("/leaderboard") ? "active" : ""}>Leaderboard</Link>
        {user && <Link href="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link>}
      </div>

      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" />
        {user ? (
          user.isPro ? (
            <Link href="/dashboard" className="btn" style={{ fontSize: 12 }}>
              <span style={{ color: "var(--accent-3)" }}>● PRO</span>
            </Link>
          ) : (
            <Link href="/unlock" className="cta-pro">
              Unlock all 464 — <span className="price-tag">£49</span>
            </Link>
          )
        ) : (
          <>
            <Link href="/signin" className="btn" style={{ fontSize: 12 }}>Sign in</Link>
            <Link href="/unlock" className="cta-pro">
              Unlock all 464 — <span className="price-tag">£49</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
