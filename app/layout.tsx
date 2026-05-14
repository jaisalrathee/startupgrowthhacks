import type { Metadata } from "next";
import "./globals.css";
import Nav from "./_components/Nav";
import Modals from "./_components/Modals";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://startupgrowthhacks.com"),
  title: {
    default: "Startup Growth Hacks — 464 growth plays for 2026",
    template: "%s · Startup Growth Hacks",
  },
  description:
    "The deepest indexed library of growth hacks for startups: 464 hand-illustrated plays across acquisition, conversion, retention, monetization, referral, and AI GEO. The how, the example, the gotcha — no fluff.",
  keywords: [
    "startup growth hacks", "growth marketing", "conversion optimization",
    "user retention", "activation", "cold email", "landing page CRO",
    "SaaS growth", "growth playbook", "AI GEO", "generative engine optimization",
  ],
  authors: [{ name: "Startup Growth Hacks" }],
  openGraph: {
    title: "Startup Growth Hacks — 464 growth plays for 2026",
    description:
      "464 hand-illustrated startup growth hacks — every play with the how, the example, and the gotcha. No fluff.",
    url: "https://startupgrowthhacks.com",
    siteName: "Startup Growth Hacks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Growth Hacks — 464 plays for 2026",
    description: "The unfair growth playbook for ambitious founders.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="2" />
            </filter>
          </defs>
        </svg>
        <Nav user={user} />
        {children}
        <Modals isAuthed={!!user} />
      </body>
    </html>
  );
}
