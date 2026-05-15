// CRO checklist content — server-rendered for SEO, client wraps for interactivity.

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
      { id: "lpe-1", text: "Page loads in under 2 seconds on 3G mobile", detail: "Use PageSpeed Insights. Every 100ms of load time costs you ~1% in conversions." },
      { id: "lpe-2", text: "Above-the-fold copy answers 'what is this?' in 5 seconds", detail: "Show your headline to a stranger for 5 seconds. If they can't describe the product, rewrite it." },
      { id: "lpe-3", text: "Primary CTA is visible above the fold without scrolling", detail: "On mobile and desktop both. If the user has to scroll to find your CTA, you've lost half of them." },
      { id: "lpe-4", text: "Social proof (logos, count, or quote) within one scroll", detail: "Customer logos, '4,200+ founders use this', or a single strong testimonial.", relatedHackSlug: "showcase-customer-logos-case-studies-or-testimonials-for-risk-reversal" },
      { id: "lpe-5", text: "One conversion goal per page", detail: "Multiple competing CTAs reduce conversion. Pick one — signup OR demo OR newsletter, not all three." },
      { id: "lpe-6", text: "No broken links (run a check weekly)", detail: "Use Ahrefs or Screaming Frog. Broken links destroy trust and SEO." },
      { id: "lpe-7", text: "Favicon + Open Graph image set", detail: "OG image shows on link-shares; favicon shows in tabs. Both signal 'real product'." },
      { id: "lpe-8", text: "Page works with JavaScript disabled (for crawlers)", detail: "If your hero loads via JS, AI engines and some crawlers see a blank page." },
    ],
  },
  {
    id: "hero-section",
    title: "Hero section",
    description: "The first 600 pixels do 80% of the work.",
    emoji: "🦸",
    items: [
      { id: "hs-1", text: "Headline is benefit-led, not feature-led", detail: "'Ship faster' beats 'AI-powered project tool'. Lead with the outcome the customer gets." },
      { id: "hs-2", text: "Subheadline adds clarity — does NOT repeat the headline", detail: "Most subheads are wasted. Use it to address the specific pain or audience." },
      { id: "hs-3", text: "CTA button copy uses verb + outcome", detail: "'Start free trial' > 'Sign up'. 'Get my growth report' > 'Submit'.", relatedHackSlug: "cta-button-copy-framing-test" },
      { id: "hs-4", text: "CTA button color strongly contrasts the background", detail: "Bright orange/green on dark, or vivid color on cream. The isolation effect drives clicks.", relatedHackSlug: "a-b-test-cta-button-colors" },
      { id: "hs-5", text: "Hero visual shows the product, not a stock photo", detail: "Screenshot, GIF, or short video. Stock images destroy credibility instantly.", relatedHackSlug: "hero-visual-format-multi-test" },
      { id: "hs-6", text: "Secondary CTA for hesitant visitors (Learn more / See demo)", detail: "Some buyers need 3 clicks of context. Give them a path that's not the primary one.", relatedHackSlug: "test-any-secondary-ctas-on-your-homepage" },
      { id: "hs-7", text: "Mobile hero is under 500px tall — visitor sees something below the fold", detail: "Mobile users who hit a full-screen hero with nothing below assume the page is empty." },
      { id: "hs-8", text: "Headline tested across at least 3 variants", detail: "Run a 2-week A/B test. Headline changes routinely lift CVR 10-30%.", relatedHackSlug: "test-headline-variations" },
    ],
  },
  {
    id: "pricing-page",
    title: "Pricing page",
    description: "Often the second-most-visited page on your site. Treat it like the front door.",
    emoji: "💰",
    items: [
      { id: "pp-1", text: "Maximum 3 tiers (4 if you have an enterprise tier)", detail: "Hick's law: more choices = more hesitation. 3 plans converts better than 5.", relatedHackSlug: "experiment-with-pricing-tiers-feature-comparisons-and-plan-visibility" },
      { id: "pp-2", text: "'Most Popular' or 'Recommended' badge on the middle tier", detail: "Bandwagon effect — most buyers pick the badged one. Use this to steer toward your healthiest plan.", relatedHackSlug: "most-popular-plan-badge" },
      { id: "pp-3", text: "Monthly vs annual toggle, annual savings emphasised", detail: "'Save 2 months' is more compelling than '17% off'. Show the savings, not the percentage.", relatedHackSlug: "highlight-discounts-for-annual-billing-vs-display-annual-only-vs-monthly-annual" },
      { id: "pp-4", text: "FAQ section addresses cancel, refund, and exceed-plan questions", detail: "Pre-emptively answer the 5 most-common sales emails. Cuts inbound questions, lifts CVR.", relatedHackSlug: "pricing-page-faq-for-objections" },
      { id: "pp-5", text: "Money-back guarantee or refund window clearly displayed", detail: "Even a 14-day refund offer lifts conversion 5-15%. Loss aversion is a buying force." },
      { id: "pp-6", text: "Risk reversal (No credit card / Cancel anytime / Free 14 days)", detail: "Visible on every tier. The mental barrier of 'what if I commit' kills more sales than price." },
      { id: "pp-7", text: "Tested charm pricing ($99 vs $97 vs $100)", detail: "The left-digit effect makes $99 read 25% cheaper than $100. Test it against round.", relatedHackSlug: "charm-pricing-left-digit-test" },
      { id: "pp-8", text: "Anchor with highest price first, not lowest", detail: "Show $99 → $29 → $9, not $9 → $29 → $99. The high anchor makes mid-tier feel reasonable." },
    ],
  },
  {
    id: "signup-forms",
    title: "Signup forms & lead capture",
    description: "Every field is a tax on conversion. Make each one earn its place.",
    emoji: "📝",
    items: [
      { id: "sf-1", text: "Top-of-funnel forms have 4 or fewer fields", detail: "Each extra field drops conversion 7-11%. If you don't need it on day one, don't ask for it." },
      { id: "sf-2", text: "Email field auto-focused on page load", detail: "Saves a click. Tiny but compounds across thousands of visitors." },
      { id: "sf-3", text: "SSO options (Google, Apple, GitHub) above the password field", detail: "30-50% of users prefer SSO when offered first. Cuts password-forgot friction forever." },
      { id: "sf-4", text: "Inline validation, not on-submit", detail: "Show errors as the user types, not after they click submit and get a wall of red." },
      { id: "sf-5", text: "Mobile keyboard types match input (type='email', 'tel', 'number')", detail: "On mobile, the wrong keyboard for an email field is a silent conversion killer." },
      { id: "sf-6", text: "Submit button shows loading state", detail: "Stop the second-click problem. Disable + change text to 'Creating account…' on submit." },
      { id: "sf-7", text: "Field labels above inputs (not placeholders alone)", detail: "Placeholder-only labels disappear when the user starts typing. Causes form errors at scale." },
      { id: "sf-8", text: "Multi-step forms have a visible progress bar", detail: "Progress bars lift completion rates 10-25% on longer forms by reducing perceived effort.", relatedHackSlug: "turn-complex-pricing-table-into-a-multistep-form" },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding & activation",
    description: "Most churn happens in the first 24 hours. Earn the second session.",
    emoji: "🚀",
    items: [
      { id: "ob-1", text: "First 'aha moment' fires within 5 minutes of signup", detail: "Identify the single action that correlates with retention. Get the user there immediately.", relatedHackSlug: "simplify-your-saas-onboarding-flow" },
      { id: "ob-2", text: "Progress indicator visible during multi-step setup", detail: "Show '3 of 5 steps complete' so the user sees the finish line." },
      { id: "ob-3", text: "Skip option for power users", detail: "Forcing every new user through a 5-step tour kills your fastest activators." },
      { id: "ob-4", text: "Empty states are guided, not blank", detail: "First-run empty screens should suggest a first action, not show 'No items yet'." },
      { id: "ob-5", text: "First action defaulted or templated", detail: "Pre-fill the new project name with a smart default. Removes the blank-page paralysis.", relatedHackSlug: "artificial-progress-head-start" },
      { id: "ob-6", text: "Welcome email arrives within 60 seconds", detail: "Beyond 5 minutes and the user has lost the context of what they signed up for." },
      { id: "ob-7", text: "Activation event tracked in analytics", detail: "Define it explicitly (e.g. 'shipped 1 invoice', 'invited 1 teammate'). Without this you can't optimise." },
      { id: "ob-8", text: "Quick-win or checkmark celebrated visibly", detail: "'You sent your first message ✓' triggers a positive feedback loop and reinforces retention.", relatedHackSlug: "highlight-quick-wins-during-onboarding" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile-specific",
    description: "60%+ of your traffic is on mobile. Treat it as the primary experience.",
    emoji: "📱",
    items: [
      { id: "mb-1", text: "All tap targets are at least 44×44 pixels", detail: "Apple's HIG minimum. Smaller targets cause mis-taps and bounce." },
      { id: "mb-2", text: "Input fields have font-size 16px or larger (prevents iOS zoom)", detail: "Anything smaller triggers iOS to zoom on tap. Looks broken." },
      { id: "mb-3", text: "Primary CTA accessible without scrolling on mobile", detail: "Sticky bottom CTAs work well. Or a thumb-zone position in the lower-third." },
      { id: "mb-4", text: "Burger menu has 5 or fewer top-level items", detail: "Information architecture matters more on mobile. Cut ruthlessly." },
      { id: "mb-5", text: "Tested on a real iPhone and Android device — not just Chrome devtools", detail: "Touch events, hover quirks, and gesture conflicts only show up on real hardware." },
      { id: "mb-6", text: "Page weight under 1MB total (HTML + CSS + JS + initial images)", detail: "Mobile users on 4G hate bloat. Lazy-load below the fold." },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & measurement",
    description: "What you don't measure, you can't optimise. Wire this up before you ship anything else.",
    emoji: "📊",
    items: [
      { id: "an-1", text: "Pageviews + conversion event tracked (PostHog, Plausible, or GA4)", detail: "Without this, every other optimisation is guesswork." },
      { id: "an-2", text: "Funnel from landing → signup → activation visible in one dashboard", detail: "Drop-off step is your highest-impact place to fix." },
      { id: "an-3", text: "Session recording tool installed (Hotjar or Microsoft Clarity)", detail: "Watch 20 sessions a week. You'll find a UX bug or rage-click within 30 minutes.", relatedHackSlug: "optimize-individual-blog-pages-for-conversions-and-engagement" },
      { id: "an-4", text: "Heatmap on every key conversion page", detail: "See where attention dies. The fix is often a hero CTA mid-page that nobody scrolls to." },
      { id: "an-5", text: "A/B test framework set up (PostHog Experiments, GrowthBook, or VWO)", detail: "Wire it before you have traffic. Reduces friction when you're ready to test." },
      { id: "an-6", text: "North-star metric defined + visible on team dashboard", detail: "Pick one (signups, MRR, activation rate). Make it visible. Optimise toward it ruthlessly." },
    ],
  },
  {
    id: "ai-personalisation",
    title: "AI & personalisation (advanced)",
    description: "Once the basics work, these moves separate good from great.",
    emoji: "🤖",
    items: [
      { id: "ai-1", text: "Dynamic content swaps based on traffic source (UTM-aware)", detail: "Paid social visitors see a different headline than organic. 10-30% lifts on targeted segments.", relatedHackSlug: "personalize-demo-page-messaging-based-on-visitor-data" },
      { id: "ai-2", text: "Personalisation by visitor's industry/role when known", detail: "Detect via Clearbit or self-declared. Show 'SaaS-specific' messaging vs 'agency-specific'." },
      { id: "ai-3", text: "FAQ schema + Article schema on every key page (for AI search)", detail: "ChatGPT search, Perplexity, and Google AIO cite pages with structured data." },
      { id: "ai-4", text: "llms.txt published so AI crawlers know how to cite you", detail: "The new robots.txt for AI engines. Two minutes to set up, multi-year compounding benefit." },
    ],
  },
];

export const TOTAL_ITEMS = CRO_CHECKLIST.reduce((acc, s) => acc + s.items.length, 0);
