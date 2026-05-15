// CRO checklist content — server-rendered for SEO, client wraps for interactivity.
// Last reviewed: 2026 — items reflect current Core Web Vitals (INP), AI agent browsing,
// passkeys, modern privacy expectations, and post-Apple-MPP analytics realities.

export type ChecklistItem = {
  id: string;
  text: string;
  detail?: string;
  // Optional link to a related hack in the library — internal linking for SEO + utility.
  relatedHackSlug?: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  items: ChecklistItem[];
};

export const CRO_CHECKLIST: ChecklistSection[] = [
  {
    id: "landing-essentials",
    title: "Landing page essentials",
    description: "The non-negotiables. Skip these and nothing below matters.",
    emoji: "🎯",
    items: [
      { id: "lpe-1", text: "LCP under 2.5s, INP under 200ms, CLS under 0.1 on mobile 4G", detail: "Core Web Vitals are now a ranking factor in both Google and most AI-search citations. INP replaced FID in 2024 — measure responsiveness, not just first input. Run PageSpeed Insights monthly." },
      { id: "lpe-2", text: "Above-the-fold copy answers 'what is this?' in 5 seconds", detail: "Show your headline to a stranger for 5 seconds. If they can't describe the product, rewrite it." },
      { id: "lpe-3", text: "Primary CTA is visible above the fold without scrolling", detail: "On mobile and desktop both. If the user has to scroll to find your CTA, you've lost half of them." },
      { id: "lpe-4", text: "Social proof (logos, count, or quote) within one scroll", detail: "Customer logos, '4,200+ founders use this', or a single strong testimonial.", relatedHackSlug: "showcase-customer-logos-case-studies-or-testimonials-for-risk-reversal" },
      { id: "lpe-5", text: "One conversion goal per page", detail: "Multiple competing CTAs reduce conversion. Pick one — signup OR demo OR newsletter, not all three." },
      { id: "lpe-6", text: "WCAG 2.2 AA accessibility baseline (contrast, keyboard nav, alt text)", detail: "Beyond ethics: AI agents and screen readers fail your conversion funnel if your site isn't accessible. Use axe DevTools — fix everything 'serious' or 'critical'." },
      { id: "lpe-7", text: "AI agent compatible: works without mouse/scroll, has semantic HTML", detail: "By 2026, Operator, Claude, and ChatGPT agents complete signups on behalf of users. If your form needs hover-revealed state or canvas rendering, agents bounce. Use real <button>, <form>, <label>." },
      { id: "lpe-8", text: "No broken links, weekly check", detail: "Use Ahrefs or Screaming Frog. Broken links destroy trust and tank SEO." },
      { id: "lpe-9", text: "Favicon, Open Graph image, and X Card image all set", detail: "OG image shows on link-shares; favicon shows in tabs. AI engines also surface OG images in citations now." },
      { id: "lpe-10", text: "Page works with JavaScript disabled (or has SSR fallback)", detail: "AI crawlers like GPTBot and PerplexityBot still don't reliably execute JS. If your hero loads via client-side JS, you're invisible to them." },
    ],
  },
  {
    id: "hero-section",
    title: "Hero section",
    description: "The first 600 pixels do 80% of the work.",
    emoji: "🦸",
    items: [
      { id: "hs-1", text: "Headline is benefit-led, not feature-led", detail: "'Ship faster' beats 'AI-powered project tool'. Lead with the outcome the customer gets — not your tech stack." },
      { id: "hs-2", text: "Subheadline adds clarity — does NOT repeat the headline", detail: "Most subheads are wasted. Use it to address the specific pain or specific audience." },
      { id: "hs-3", text: "CTA button copy uses verb + outcome", detail: "'Start free trial' > 'Sign up'. 'Get my growth report' > 'Submit'.", relatedHackSlug: "cta-button-copy-framing-test" },
      { id: "hs-4", text: "CTA button color strongly contrasts the background", detail: "Bright accent on neutral. The isolation effect drives clicks. Verified weekly via Hotjar / Clarity heatmaps.", relatedHackSlug: "a-b-test-cta-button-colors" },
      { id: "hs-5", text: "Hero visual shows the product, not stock photography", detail: "Screenshot, GIF, short video, or interactive demo. Stock images destroy credibility instantly in 2026 — AI-generated images even more so.", relatedHackSlug: "hero-visual-format-multi-test" },
      { id: "hs-6", text: "Secondary CTA for hesitant visitors (Learn more / See demo)", detail: "Some buyers need 3 clicks of context. Give them a path that's not the primary one.", relatedHackSlug: "test-any-secondary-ctas-on-your-homepage" },
      { id: "hs-7", text: "Mobile hero is under 500px tall — visitor sees something below the fold", detail: "Mobile users who hit a full-screen hero with nothing below assume the page is empty." },
      { id: "hs-8", text: "Headline tested across at least 3 variants quarterly", detail: "Run a 2-week A/B test each quarter. Headline changes routinely lift CVR 10-30%.", relatedHackSlug: "test-headline-variations" },
    ],
  },
  {
    id: "pricing-page",
    title: "Pricing page",
    description: "Often the second-most-visited page on your site. Treat it like the front door.",
    emoji: "💰",
    items: [
      { id: "pp-1", text: "Maximum 3 tiers (4 if you have an enterprise tier)", detail: "Hick's law: more choices = more hesitation. 3 plans converts better than 5.", relatedHackSlug: "experiment-with-pricing-tiers-feature-comparisons-and-plan-visibility" },
      { id: "pp-2", text: "'Most Popular' or 'Recommended' badge on the middle tier", detail: "Bandwagon effect — most buyers pick the badged one. Steer toward your healthiest plan.", relatedHackSlug: "most-popular-plan-badge" },
      { id: "pp-3", text: "Monthly vs annual toggle, annual savings emphasised", detail: "'Save 2 months' is more compelling than '17% off'. Show the savings, not the percentage.", relatedHackSlug: "highlight-discounts-for-annual-billing-vs-display-annual-only-vs-monthly-annual" },
      { id: "pp-4", text: "Geo-aware pricing (purchasing-power parity for non-US/EU)", detail: "Stripe Adaptive Pricing, Paddle, and Lemon Squeezy now do this natively. Captures 3-5x more international conversion without cannibalising premium markets.", relatedHackSlug: "purchasing-power-parity-pricing" },
      { id: "pp-5", text: "FAQ section addresses cancel, refund, exceed-plan, and AI usage questions", detail: "Pre-emptively answer the 5 most-common sales emails. For AI products: clarify token limits, data-retention policy, and model upgrade path.", relatedHackSlug: "pricing-page-faq-for-objections" },
      { id: "pp-6", text: "Money-back guarantee or refund window clearly displayed", detail: "Even a 14-day refund offer lifts conversion 5-15%. Loss aversion is a buying force." },
      { id: "pp-7", text: "Risk reversal (No credit card / Cancel anytime / Free 14 days)", detail: "Visible on every tier. The mental barrier of 'what if I commit' kills more sales than price." },
      { id: "pp-8", text: "Tested charm pricing (£99 vs £97 vs £100)", detail: "The left-digit effect makes £99 read 25% cheaper than £100. Test it against round.", relatedHackSlug: "charm-pricing-left-digit-test" },
    ],
  },
  {
    id: "signup-forms",
    title: "Signup forms & lead capture",
    description: "Every field is a tax on conversion. Make each one earn its place.",
    emoji: "📝",
    items: [
      { id: "sf-1", text: "Top-of-funnel forms have 4 or fewer fields", detail: "Each extra field drops conversion 7-11%. If you don't need it on day one, don't ask for it." },
      { id: "sf-2", text: "Passkey signup option offered first", detail: "By 2026 every major browser supports passkeys (WebAuthn). They convert 2-4x better than passwords and eliminate the password-forgot funnel entirely. Use Apple/Google/Microsoft passkey + SSO before falling back to password." },
      { id: "sf-3", text: "SSO options (Google, Apple, Microsoft) above password", detail: "30-50% of users prefer SSO when offered first. Cuts password friction forever." },
      { id: "sf-4", text: "Email field auto-focused on page load (with autocomplete='email')", detail: "Saves a click. Tiny but compounds across thousands of visitors. Proper autocomplete also enables passkey/credentials API." },
      { id: "sf-5", text: "Inline validation, not on-submit", detail: "Show errors as the user types, not after they click submit and get a wall of red." },
      { id: "sf-6", text: "Mobile keyboard types match input (type='email', 'tel', 'number')", detail: "On mobile, the wrong keyboard for an email field is a silent conversion killer." },
      { id: "sf-7", text: "Submit button shows loading state and prevents double-submit", detail: "Stop the second-click problem. Disable + change text to 'Creating account…' on submit." },
      { id: "sf-8", text: "Field labels above inputs (not placeholders alone)", detail: "Placeholder-only labels disappear when the user types. Causes form abandonment, accessibility failures, and breaks autofill." },
      { id: "sf-9", text: "Multi-step forms have a visible progress bar", detail: "Progress bars lift completion rates 10-25% on longer forms by reducing perceived effort.", relatedHackSlug: "turn-complex-pricing-table-into-a-multistep-form" },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding & activation",
    description: "Most churn happens in the first 24 hours. Earn the second session.",
    emoji: "🚀",
    items: [
      { id: "ob-1", text: "First 'aha moment' fires within 5 minutes of signup", detail: "Identify the single action that correlates with retention. Get the user there immediately.", relatedHackSlug: "simplify-your-saas-onboarding-flow" },
      { id: "ob-2", text: "AI-assisted setup: auto-detect / pre-fill what you can", detail: "In 2026, asking 'What's your company name?' when the user signed up with a work email is friction. Use Clearbit/Apollo enrichment or LLM inference to pre-fill 60-80% of fields." },
      { id: "ob-3", text: "Progress indicator visible during multi-step setup", detail: "Show '3 of 5 steps complete' so the user sees the finish line." },
      { id: "ob-4", text: "Skip option for power users", detail: "Forcing every new user through a 5-step tour kills your fastest activators." },
      { id: "ob-5", text: "Empty states are guided, not blank", detail: "First-run empty screens should suggest a first action, not show 'No items yet'." },
      { id: "ob-6", text: "First action defaulted or templated", detail: "Pre-fill the new project name with a smart default. Removes blank-page paralysis.", relatedHackSlug: "artificial-progress-head-start" },
      { id: "ob-7", text: "Welcome email arrives within 60 seconds (via Resend/Postmark, not SendGrid)", detail: "Beyond 5 minutes and the user has lost context. Modern transactional ESPs (Resend, Postmark, Loops) have far better deliverability than legacy options." },
      { id: "ob-8", text: "Activation event explicitly tracked + segmented in analytics", detail: "Define the event (e.g. 'shipped 1 invoice', 'invited 1 teammate'). Without this you can't optimise." },
      { id: "ob-9", text: "Quick-win celebrated visibly with micro-animation", detail: "'You sent your first message ✓' triggers a positive feedback loop and reinforces retention.", relatedHackSlug: "highlight-quick-wins-during-onboarding" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile-specific",
    description: "65%+ of B2C and 40%+ of B2B traffic is now mobile-first. Treat it as the primary experience.",
    emoji: "📱",
    items: [
      { id: "mb-1", text: "All tap targets are at least 44×44 pixels (Apple HIG / WCAG 2.2)", detail: "Smaller targets cause mis-taps and bounce. WCAG 2.2 now formalises the 24×24 minimum, but Apple's 44px is still the conversion-optimal target." },
      { id: "mb-2", text: "Input fields have font-size 16px or larger (prevents iOS auto-zoom)", detail: "Anything smaller still triggers iOS Safari to zoom on focus in 2026. Looks broken." },
      { id: "mb-3", text: "Primary CTA accessible without scrolling on mobile", detail: "Sticky bottom CTAs work well. Or a thumb-zone position in the lower-third." },
      { id: "mb-4", text: "Burger menu has 5 or fewer top-level items", detail: "Information architecture matters more on mobile. Cut ruthlessly." },
      { id: "mb-5", text: "Tested on a real iPhone and Android device — not just Chrome devtools", detail: "Touch events, hover quirks, gesture conflicts, and Safari-specific bugs only show up on real hardware. Browserstack works if you don't have devices." },
      { id: "mb-6", text: "Total page weight under 1MB on initial load", detail: "Even 5G users hate bloat (and many are on metered plans). Lazy-load below the fold. Avoid React bundles over 300KB gzipped." },
      { id: "mb-7", text: "Works in Safari Lockdown Mode and DuckDuckGo mobile", detail: "Privacy-first browsers are 8-12% of traffic by 2026. If your site relies on third-party JS or fingerprinting, it breaks here silently." },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & measurement",
    description: "What you don't measure, you can't optimise. Wire this up before shipping anything else.",
    emoji: "📊",
    items: [
      { id: "an-1", text: "Privacy-first analytics installed (PostHog, Plausible, or Fathom)", detail: "GDPR/CCPA/UK GDPR + Apple's MPP and Safari ITP make cookie-based analytics increasingly unreliable. Privacy-first tools also avoid the cookie-banner conversion hit." },
      { id: "an-2", text: "Server-side event tracking for revenue + activation events", detail: "Client-side tracking misses 30-40% of events in 2026 (ad blockers, MPP, ITP, agents). Critical events (signup, payment, activation) should fire server-side." },
      { id: "an-3", text: "Funnel from landing → signup → activation visible in one dashboard", detail: "Drop-off step is your highest-impact place to fix." },
      { id: "an-4", text: "Session recording tool installed (Microsoft Clarity is free, or Hotjar)", detail: "Watch 20 sessions a week. You'll find a UX bug or rage-click within 30 minutes.", relatedHackSlug: "optimize-individual-blog-pages-for-conversions-and-engagement" },
      { id: "an-5", text: "Heatmap on every key conversion page", detail: "See where attention dies. The fix is often a hero CTA mid-page that nobody scrolls to." },
      { id: "an-6", text: "A/B test framework set up (PostHog Experiments or GrowthBook)", detail: "Wire it before you have traffic. Reduces friction when you're ready to test. Note: Google Optimize is dead — don't use it." },
      { id: "an-7", text: "North-star metric defined + visible on team dashboard", detail: "Pick one (signups, MRR, activation rate). Make it visible. Optimise toward it ruthlessly." },
      { id: "an-8", text: "Cookie consent banner (only if required — minimise its CVR impact)", detail: "If you must show one (EU/UK/CA traffic + cookie-based tracking): make it small, default to 'reject all' = same user experience, no dark patterns. Better: switch to cookieless analytics and skip the banner entirely." },
    ],
  },
  {
    id: "ai-personalisation",
    title: "AI search, agents & personalisation",
    description: "By 2026, 30%+ of buying-intent queries happen in ChatGPT, Perplexity, Claude, and Google AIO — not Google search. If you don't show up there, you don't exist.",
    emoji: "🤖",
    items: [
      { id: "ai-1", text: "FAQPage + Article schema on every key page", detail: "ChatGPT search, Perplexity, Claude, and Google AIO cite pages with structured data 3-5x more often than pages without. Cheap, durable, high-leverage." },
      { id: "ai-2", text: "llms.txt published at /llms.txt with site overview + key URLs", detail: "The robots.txt for AI engines. Tells LLM crawlers how to cite your content. Set up in 5 minutes, multi-year benefit." },
      { id: "ai-3", text: "Test queries on ChatGPT Search, Perplexity, Claude, Google AIO weekly", detail: "Search your product name and your top-of-funnel keywords. Track whether AI engines cite you, what they cite, and whether they cite competitors instead. Track in a sheet." },
      { id: "ai-4", text: "Real-name authorship + entity signals (LinkedIn, Wikipedia, Crunchbase)", detail: "AI engines cite from sources they trust. Verified founder LinkedIn, Crunchbase listing, and (where you qualify) Wikipedia entries dramatically lift citation rate." },
      { id: "ai-5", text: "Dynamic content swaps based on traffic source (UTM-aware)", detail: "Paid social visitors see a different headline than organic. 10-30% lifts on targeted segments.", relatedHackSlug: "personalize-demo-page-messaging-based-on-visitor-data" },
      { id: "ai-6", text: "Personalisation by visitor's industry/role when known", detail: "Detect via Clearbit (now HubSpot Breeze), RB2B, or self-declared. Show 'SaaS-specific' messaging vs 'agency-specific'." },
      { id: "ai-7", text: "AI agent friendly: clear CTAs, semantic HTML, no dark patterns", detail: "Operator, Claude Computer Use, and ChatGPT agents are completing form-fills and signups on behalf of users by 2026. If your CTA is a JS-only div without proper button semantics, agents skip you." },
    ],
  },
];

export const TOTAL_ITEMS = CRO_CHECKLIST.reduce((acc, s) => acc + s.items.length, 0);
