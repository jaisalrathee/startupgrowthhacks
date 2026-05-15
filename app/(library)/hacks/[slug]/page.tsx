import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HackDetail from "@/app/_components/HackDetail";
import { loadHackBundle } from "@/lib/hackData";
import { canonical, SITE, breadcrumb, DEFAULT_OG_IMAGE } from "@/lib/seo";

// Fully dynamic — no static params. Lets us build without DB access.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await prisma.tactic.findUnique({ where: { slug } });
  if (!t) return { title: "Not found" };
  const desc = (t.how || "").slice(0, 155);
  return {
    title: t.tactic,
    description: desc,
    openGraph: { title: t.tactic, description: desc, type: "article", images: DEFAULT_OG_IMAGE },
    alternates: { canonical: `https://startupgrowthhacks.com/hacks/${t.slug}` },
    keywords: [t.tactic, t.category, t.channel, t.stage, "growth hack", "startup growth"],
  };
}

export default async function HackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = await loadHackBundle(slug);
  if (!bundle) notFound();

  const { tactic: t } = bundle;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.tactic,
    description: (t.how || "").slice(0, 200),
    author: { "@type": "Organization", name: "Startup Growth Hacks" },
    publisher: { "@type": "Organization", name: "Startup Growth Hacks" },
    mainEntityOfPage: `https://startupgrowthhacks.com/hacks/${t.slug}`,
    articleSection: t.category,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `How does ${t.tactic} work?`, acceptedAnswer: { "@type": "Answer", text: t.how } },
      { "@type": "Question", name: `What's an example of ${t.tactic} in the wild?`, acceptedAnswer: { "@type": "Answer", text: t.example } },
      { "@type": "Question", name: `What should I watch out for with ${t.tactic}?`, acceptedAnswer: { "@type": "Answer", text: t.tip } },
      { "@type": "Question", name: `Who is ${t.tactic} best for?`, acceptedAnswer: { "@type": "Answer", text: t.bestFor } },
    ],
  };

  const breadcrumbLd = breadcrumb([
    { name: "Home", url: SITE.url },
    { name: t.category, url: `${SITE.url}/?category=${encodeURIComponent(t.category)}` },
    { name: t.tactic, url: `${SITE.url}/hacks/${t.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <HackDetail {...bundle} />
    </>
  );
}
