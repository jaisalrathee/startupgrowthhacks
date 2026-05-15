import type { Metadata } from "next";
import "./globals.css";
import Nav from "./_components/Nav";
import Modals from "./_components/Modals";
import CursorSparks from "./_components/CursorSparks";
import { getCurrentUser } from "@/lib/auth";
import { WEBSITE_SCHEMA, ORG_SCHEMA, PERSON_SCHEMA, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Startup Growth Hacks — 464 growth plays for 2026",
    template: "%s · Startup Growth Hacks",
  },
  description: SITE.description,
  keywords: [
    "startup growth hacks", "growth marketing", "conversion rate optimization",
    "CRO checklist", "user retention", "user activation", "cold email tactics",
    "landing page CRO", "SaaS growth", "growth playbook", "growth advisor",
    "AI GEO", "generative engine optimization", "ChatGPT search SEO",
    "pricing strategy", "B2B SaaS growth", "early-stage startup growth",
  ],
  alternates: { canonical: SITE.url },
  authors: [{ name: SITE.author, url: `${SITE.url}/book` }],
  creator: SITE.author,
  publisher: SITE.name,
  openGraph: {
    title: "Steal the growth hacks behind every unicorn",
    description:
      "464 hand-illustrated startup growth hacks. Every play with the how, the example, and the gotcha. No fluff.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Growth Hacks — 464 plays for 2026",
    description: "The unfair growth playbook for ambitious founders.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "marketing",
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
        {/* Site-wide entity graph — WebSite + Organization + Person — referenced by every page schema for AI engine citation trust */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [WEBSITE_SCHEMA, { ...ORG_SCHEMA, "@context": "https://schema.org" }, { ...PERSON_SCHEMA, "@context": "https://schema.org" }],
            }),
          }}
        />
        <Nav user={user} />
        {children}
        <Modals isAuthed={!!user} />
        <CursorSparks />
      </body>
    </html>
  );
}
