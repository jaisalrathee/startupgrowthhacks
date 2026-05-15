"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = { id: string; email: string; name: string | null; isPro: boolean } | null;

export default function Nav({ user }: { user: User }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (p: string) => pathname === p || (p !== "/" && pathname.startsWith(p));

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };

  return (
    <>
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
          <Link href="/book" className={isActive("/book") ? "active" : ""}>Book a call</Link>
          {user && <Link href="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link>}
        </div>

        <div className="nav-right">
          <button className="theme-toggle nav-desktop-only" onClick={toggleTheme} aria-label="Toggle theme" />
          {user ? (
            user.isPro ? (
              <Link href="/dashboard" className="btn nav-desktop-only" style={{ fontSize: 12 }}>
                <span style={{ color: "var(--accent-3)" }}>● PRO</span>
              </Link>
            ) : (
              <Link href="/unlock" className="cta-pro nav-desktop-only">
                Unlock all 464 — <span className="price-tag">£49</span>
              </Link>
            )
          ) : (
            <>
              <Link href="/signin" className="btn nav-desktop-only" style={{ fontSize: 12 }}>Sign in</Link>
              <Link href="/unlock" className="cta-pro nav-desktop-only">
                Unlock all 464 — <span className="price-tag">£49</span>
              </Link>
            </>
          )}

          {/* Mobile burger */}
          <button
            className="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`burger-bar ${menuOpen ? "top" : ""}`} />
            <span className={`burger-bar ${menuOpen ? "mid" : ""}`} />
            <span className={`burger-bar ${menuOpen ? "bot" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation">
          <div className="mobile-menu-links">
            <Link href="/" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              <span>Tactics</span>
              <span className="mono mobile-menu-meta">464</span>
            </Link>
            <Link href="/leaderboard" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              <span>Leaderboard</span>
              <span className="mono mobile-menu-meta">Top 50</span>
            </Link>
            <Link href="/book" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              <span>Book a call</span>
              <span className="mono mobile-menu-meta" style={{ color: "var(--accent)" }}>1:1 with Jaisal</span>
            </Link>
            {user && (
              <Link href="/dashboard" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                <span>Dashboard</span>
                {user.isPro ? <span className="mono mobile-menu-meta" style={{ color: "var(--accent-3)" }}>● PRO</span> : null}
              </Link>
            )}
          </div>

          <div className="mobile-menu-actions">
            {!user && (
              <Link href="/signin" className="btn" onClick={() => setMenuOpen(false)} style={{ justifyContent: "center", padding: "14px 18px" }}>
                Sign in
              </Link>
            )}
            {user && !user.isPro && (
              <Link href="/unlock" className="cta-pro" onClick={() => setMenuOpen(false)} style={{ justifyContent: "center", padding: "14px 18px", textAlign: "center" }}>
                Unlock all 464 — <span className="price-tag">£49</span>
              </Link>
            )}
            {!user && (
              <Link href="/unlock" className="cta-pro" onClick={() => setMenuOpen(false)} style={{ justifyContent: "center", padding: "14px 18px", textAlign: "center" }}>
                Unlock all 464 — <span className="price-tag">£49</span>
              </Link>
            )}
            <button
              className="btn"
              onClick={() => { toggleTheme(); }}
              style={{ justifyContent: "center", padding: "14px 18px" }}
            >
              Toggle theme
            </button>
          </div>

          <div className="mobile-menu-foot mono">startupgrowthhacks.com</div>
        </div>
      )}
    </>
  );
}
