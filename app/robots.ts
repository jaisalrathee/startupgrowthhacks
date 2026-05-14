import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/signin", "/signup", "/unlock"] },
      // Welcome AI crawlers for GEO
      { userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "OAI-SearchBot"], allow: "/" },
    ],
    sitemap: "https://startupgrowthhacks.com/sitemap.xml",
    host: "https://startupgrowthhacks.com",
  };
}
