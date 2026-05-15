/**
 * Generates context-aware deep-dive content for every tactic.
 * Reads existing tactic metadata (category, channel, stage, impact, effort, cost, how, tip)
 * and produces:
 *   - playbook   (4-6 imperative steps)
 *   - metrics    (KPIs to watch)
 *   - tools      (typical tools/integrations)
 *   - timeline   (when to expect results)
 *   - benchmarks (typical lift ranges)
 *   - pitfalls   (3 common failure modes)
 *   - related    (3 tactic ids — same category, different channel)
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ---- Tool catalog (up to 10 per channel, each with URL) ----
type Tool = { name: string; url: string };

const TOOLS_BY_CHANNEL: Record<string, Tool[]> = {
  "Paid Social": [
    { name: "Meta Ads Manager", url: "https://business.facebook.com" },
    { name: "LinkedIn Campaign Manager", url: "https://business.linkedin.com/marketing-solutions" },
    { name: "TikTok Ads", url: "https://ads.tiktok.com" },
    { name: "Triple Whale", url: "https://triplewhale.com" },
    { name: "Northbeam", url: "https://northbeam.io" },
    { name: "AdEspresso", url: "https://adespresso.com" },
    { name: "Motion", url: "https://motionapp.com" },
    { name: "Foreplay", url: "https://foreplay.co" },
    { name: "Atria", url: "https://atria.io" },
    { name: "Segment", url: "https://segment.com" },
  ],
  "Paid Search": [
    { name: "Google Ads", url: "https://ads.google.com" },
    { name: "Microsoft (Bing) Ads", url: "https://ads.microsoft.com" },
    { name: "Optmyzr", url: "https://optmyzr.com" },
    { name: "SpyFu", url: "https://spyfu.com" },
    { name: "SEMrush", url: "https://semrush.com" },
    { name: "Adalysis", url: "https://adalysis.com" },
    { name: "Opteo", url: "https://opteo.com" },
    { name: "Unbounce", url: "https://unbounce.com" },
  ],
  "SEO": [
    { name: "Ahrefs", url: "https://ahrefs.com" },
    { name: "Semrush", url: "https://semrush.com" },
    { name: "Google Search Console", url: "https://search.google.com/search-console" },
    { name: "Surfer SEO", url: "https://surferseo.com" },
    { name: "Clearscope", url: "https://clearscope.io" },
    { name: "Screaming Frog", url: "https://screamingfrog.co.uk" },
    { name: "Sitebulb", url: "https://sitebulb.com" },
    { name: "AlsoAsked", url: "https://alsoasked.com" },
    { name: "Frase", url: "https://frase.io" },
    { name: "SE Ranking", url: "https://seranking.com" },
  ],
  "Email": [
    { name: "Customer.io", url: "https://customer.io" },
    { name: "Kit (ConvertKit)", url: "https://kit.com" },
    { name: "Resend", url: "https://resend.com" },
    { name: "Postmark", url: "https://postmarkapp.com" },
    { name: "Loops", url: "https://loops.so" },
    { name: "Beehiiv", url: "https://beehiiv.com" },
    { name: "Litmus", url: "https://litmus.com" },
    { name: "MailerLite", url: "https://mailerlite.com" },
    { name: "Klaviyo", url: "https://klaviyo.com" },
  ],
  "Lifecycle": [
    { name: "Customer.io", url: "https://customer.io" },
    { name: "Iterable", url: "https://iterable.com" },
    { name: "Braze", url: "https://braze.com" },
    { name: "Klaviyo", url: "https://klaviyo.com" },
    { name: "Userlist", url: "https://userlist.com" },
    { name: "Vero", url: "https://getvero.com" },
    { name: "Mixpanel", url: "https://mixpanel.com" },
    { name: "Segment", url: "https://segment.com" },
  ],
  "CRO": [
    { name: "VWO", url: "https://vwo.com" },
    { name: "Optimizely", url: "https://optimizely.com" },
    { name: "Hotjar", url: "https://hotjar.com" },
    { name: "Microsoft Clarity", url: "https://clarity.microsoft.com" },
    { name: "Fullstory", url: "https://fullstory.com" },
    { name: "Mutiny", url: "https://mutinyhq.com" },
    { name: "Convert", url: "https://convert.com" },
    { name: "PostHog Experiments", url: "https://posthog.com" },
    { name: "GrowthBook", url: "https://growthbook.io" },
  ],
  "Product-Led": [
    { name: "Pendo", url: "https://pendo.io" },
    { name: "Userpilot", url: "https://userpilot.com" },
    { name: "Mixpanel", url: "https://mixpanel.com" },
    { name: "Amplitude", url: "https://amplitude.com" },
    { name: "PostHog", url: "https://posthog.com" },
    { name: "June", url: "https://june.so" },
    { name: "Heap", url: "https://heap.io" },
    { name: "Chameleon", url: "https://chameleon.io" },
  ],
  "Outbound": [
    { name: "Apollo", url: "https://apollo.io" },
    { name: "Clay", url: "https://clay.com" },
    { name: "Smartlead", url: "https://smartlead.ai" },
    { name: "Instantly", url: "https://instantly.ai" },
    { name: "Lemlist", url: "https://lemlist.com" },
    { name: "Salesloft", url: "https://salesloft.com" },
    { name: "Outreach", url: "https://outreach.io" },
    { name: "ZoomInfo", url: "https://zoominfo.com" },
    { name: "Hunter", url: "https://hunter.io" },
    { name: "Mailshake", url: "https://mailshake.com" },
  ],
  "Onboarding": [
    { name: "Userflow", url: "https://userflow.com" },
    { name: "Appcues", url: "https://appcues.com" },
    { name: "Chameleon", url: "https://chameleon.io" },
    { name: "Pendo", url: "https://pendo.io" },
    { name: "Intercom Tours", url: "https://intercom.com" },
    { name: "WalkMe", url: "https://walkme.com" },
    { name: "Userlist", url: "https://userlist.com" },
    { name: "Userpilot", url: "https://userpilot.com" },
  ],
  "Partnerships": [
    { name: "PartnerStack", url: "https://partnerstack.com" },
    { name: "Crossbeam", url: "https://crossbeam.com" },
    { name: "Impact", url: "https://impact.com" },
    { name: "Reveal", url: "https://reveal.co" },
    { name: "Tackle", url: "https://tackle.io" },
    { name: "Allbound", url: "https://allbound.com" },
    { name: "Common Room", url: "https://commonroom.io" },
  ],
  "Referral": [
    { name: "ReferralCandy", url: "https://referralcandy.com" },
    { name: "Friendbuy", url: "https://friendbuy.com" },
    { name: "Talon.One", url: "https://talon.one" },
    { name: "Refersion", url: "https://refersion.com" },
    { name: "GrowSurf", url: "https://growsurf.com" },
    { name: "ReferralHero", url: "https://referralhero.com" },
    { name: "Rewardful", url: "https://rewardful.com" },
    { name: "Viral Loops", url: "https://viral-loops.com" },
  ],
  "PR": [
    { name: "Featured (HARO)", url: "https://featured.com" },
    { name: "Muck Rack", url: "https://muckrack.com" },
    { name: "Prowly", url: "https://prowly.com" },
    { name: "Notified (Cision)", url: "https://notified.com" },
    { name: "Qwoted", url: "https://qwoted.com" },
    { name: "JustReachOut", url: "https://justreachout.io" },
    { name: "Press Hunt", url: "https://presshunt.co" },
    { name: "Pitchbox", url: "https://pitchbox.com" },
  ],
  "AI GEO": [
    { name: "Profound", url: "https://tryprofound.com" },
    { name: "Otterly.AI", url: "https://otterly.ai" },
    { name: "Schema App", url: "https://schemaapp.com" },
    { name: "Goodie AI", url: "https://goodie.ai" },
    { name: "AthenaHQ", url: "https://athenahq.ai" },
    { name: "Daydream", url: "https://withdaydream.com" },
    { name: "Brand Rank AI", url: "https://brandrank.ai" },
    { name: "Peec AI", url: "https://peec.ai" },
  ],
  "Content": [
    { name: "Webflow", url: "https://webflow.com" },
    { name: "Ghost", url: "https://ghost.org" },
    { name: "Notion", url: "https://notion.com" },
    { name: "Frase", url: "https://frase.io" },
    { name: "Clearscope", url: "https://clearscope.io" },
    { name: "Surfer SEO", url: "https://surferseo.com" },
    { name: "Sanity", url: "https://sanity.io" },
    { name: "Contentful", url: "https://contentful.com" },
    { name: "Beehiiv", url: "https://beehiiv.com" },
  ],
  "Social Organic": [
    { name: "Buffer", url: "https://buffer.com" },
    { name: "Typefully", url: "https://typefully.com" },
    { name: "Hypefury", url: "https://hypefury.com" },
    { name: "Taplio", url: "https://taplio.com" },
    { name: "Tweet Hunter", url: "https://tweethunter.io" },
    { name: "ContentStudio", url: "https://contentstudio.io" },
    { name: "Later", url: "https://later.com" },
    { name: "Metricool", url: "https://metricool.com" },
  ],
  "Pricing": [
    { name: "Stripe", url: "https://stripe.com" },
    { name: "Chargebee", url: "https://chargebee.com" },
    { name: "Paddle (ProfitWell)", url: "https://paddle.com" },
    { name: "Maxio (SaaSOptics)", url: "https://maxio.com" },
    { name: "Outseta", url: "https://outseta.com" },
    { name: "Lemon Squeezy", url: "https://lemonsqueezy.com" },
    { name: "Orb", url: "https://withorb.com" },
    { name: "Metronome", url: "https://metronome.com" },
  ],
  "Analytics": [
    { name: "PostHog", url: "https://posthog.com" },
    { name: "Mixpanel", url: "https://mixpanel.com" },
    { name: "Amplitude", url: "https://amplitude.com" },
    { name: "June", url: "https://june.so" },
    { name: "Heap", url: "https://heap.io" },
    { name: "Segment", url: "https://segment.com" },
    { name: "Rudderstack", url: "https://rudderstack.com" },
    { name: "GA4", url: "https://analytics.google.com" },
    { name: "Plausible", url: "https://plausible.io" },
  ],
  "Strategy": [
    { name: "Notion", url: "https://notion.com" },
    { name: "Linear", url: "https://linear.app" },
    { name: "Productboard", url: "https://productboard.com" },
    { name: "Figma", url: "https://figma.com" },
    { name: "FigJam", url: "https://figma.com/figjam" },
    { name: "Miro", url: "https://miro.com" },
    { name: "Coda", url: "https://coda.io" },
  ],
  "Marketplace": [
    { name: "Stripe Connect", url: "https://stripe.com/connect" },
    { name: "Sharetribe", url: "https://sharetribe.com" },
    { name: "Bubble", url: "https://bubble.io" },
    { name: "Arcadier", url: "https://arcadier.com" },
    { name: "Mirakl", url: "https://mirakl.com" },
  ],
  "Community": [
    { name: "Circle", url: "https://circle.so" },
    { name: "Discord", url: "https://discord.com" },
    { name: "Slack", url: "https://slack.com" },
    { name: "Bevy", url: "https://bevy.com" },
    { name: "Mighty Networks", url: "https://mightynetworks.com" },
    { name: "Heartbeat", url: "https://heartbeat.chat" },
    { name: "Geneva", url: "https://geneva.com" },
  ],
};

// Per-tactic keyword overrides — first match wins, takes priority over channel default.
const TOOL_OVERRIDES: Array<[RegExp, Tool[]]> = [
  [/predictive search|autocomplete search/i, [
    { name: "Algolia", url: "https://algolia.com" },
    { name: "Typesense", url: "https://typesense.org" },
    { name: "Pagefind", url: "https://pagefind.app" },
    { name: "Meilisearch", url: "https://meilisearch.com" },
    { name: "Elastic Search", url: "https://elastic.co" },
    { name: "InstantSearch.js", url: "https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch" },
  ]],
  [/pricing calculator/i, [
    { name: "Stripe Pricing Table", url: "https://stripe.com/billing" },
    { name: "Outseta", url: "https://outseta.com" },
    { name: "Chargebee", url: "https://chargebee.com" },
    { name: "Paddle", url: "https://paddle.com" },
    { name: "Maxio", url: "https://maxio.com" },
    { name: "Orb", url: "https://withorb.com" },
  ]],
  [/try it yourself widget|interactive demo|product tour/i, [
    { name: "Navattic", url: "https://navattic.com" },
    { name: "Storylane", url: "https://storylane.io" },
    { name: "Arcade", url: "https://arcade.software" },
    { name: "Tella", url: "https://tella.tv" },
    { name: "Supademo", url: "https://supademo.com" },
    { name: "Reprise", url: "https://reprise.com" },
    { name: "Demostack", url: "https://demostack.com" },
  ]],
  [/build[- ]in[- ]public/i, [
    { name: "Open Startup", url: "https://openstartup.dev" },
    { name: "Indie Hackers", url: "https://indiehackers.com" },
    { name: "X", url: "https://x.com" },
  ]],
  [/multi[- ]step.*form|multistep.*form|quote form/i, [
    { name: "Typeform", url: "https://typeform.com" },
    { name: "Tally", url: "https://tally.so" },
    { name: "Fillout", url: "https://fillout.com" },
    { name: "Formless (AI)", url: "https://formless.ai" },
    { name: "Jotform", url: "https://jotform.com" },
    { name: "HeyForm", url: "https://heyform.net" },
    { name: "Paperform", url: "https://paperform.co" },
  ]],
  [/sticky.*cta|floating.*cta|blog cta/i, [
    { name: "ConvertFlow", url: "https://convertflow.com" },
    { name: "OptinMonster", url: "https://optinmonster.com" },
    { name: "Sumo", url: "https://sumo.com" },
    { name: "Hellobar", url: "https://hellobar.com" },
    { name: "Privy", url: "https://privy.com" },
    { name: "Beacon", url: "https://beacon.by" },
  ]],
  [/nps survey|in[- ]app survey|mid[- ]onboarding survey/i, [
    { name: "Sprig", url: "https://sprig.com" },
    { name: "Delighted", url: "https://delighted.com" },
    { name: "Refiner", url: "https://refiner.io" },
    { name: "Hotjar Surveys", url: "https://hotjar.com" },
    { name: "Wootric (InMoment)", url: "https://inmoment.com" },
    { name: "AskNicely", url: "https://asknicely.com" },
    { name: "Pendo NPS", url: "https://pendo.io" },
    { name: "Survicate", url: "https://survicate.com" },
  ]],
  [/page[- ]contextual popup|contextual popup/i, [
    { name: "OptiMonk", url: "https://optimonk.com" },
    { name: "ConvertFlow", url: "https://convertflow.com" },
    { name: "Wisepops", url: "https://wisepops.com" },
  ]],
  [/scroll[- ]triggered|slide[- ]in/i, [
    { name: "OptiMonk", url: "https://optimonk.com" },
    { name: "Sumo", url: "https://sumo.com" },
    { name: "Privy", url: "https://privy.com" },
  ]],
  [/duration.*cta|demo.*duration|book.*demo|schedule.*demo/i, [
    { name: "Calendly", url: "https://calendly.com" },
    { name: "Chili Piper", url: "https://chilipiper.com" },
    { name: "Cal.com", url: "https://cal.com" },
  ]],
  [/role.*onboarding|persona.*onboarding|goal.*onboarding|segment.*onboarding/i, [
    { name: "Userflow", url: "https://userflow.com" },
    { name: "Appcues", url: "https://appcues.com" },
    { name: "Chameleon", url: "https://chameleon.io" },
  ]],
  [/exit[- ]intent/i, [
    { name: "OptiMonk", url: "https://optimonk.com" },
    { name: "ConvertBox", url: "https://convertbox.com" },
    { name: "Picreel", url: "https://picreel.com" },
    { name: "Wisepops", url: "https://wisepops.com" },
    { name: "Sleeknote", url: "https://sleeknote.com" },
    { name: "Justuno", url: "https://justuno.com" },
    { name: "OptinMonster", url: "https://optinmonster.com" },
    { name: "Sumo", url: "https://sumo.com" },
  ]],
  [/cart abandon|abandoned cart/i, [
    { name: "Klaviyo", url: "https://klaviyo.com" },
    { name: "Customer.io", url: "https://customer.io" },
    { name: "Rejoiner", url: "https://rejoiner.com" },
  ]],
  [/lookalike|seed audience/i, [
    { name: "Meta Ads Manager", url: "https://business.facebook.com" },
    { name: "LinkedIn Matched Audiences", url: "https://business.linkedin.com/marketing-solutions/ad-targeting" },
    { name: "TikTok Custom Audiences", url: "https://ads.tiktok.com" },
    { name: "Apollo", url: "https://apollo.io" },
    { name: "Clay", url: "https://clay.com" },
    { name: "Segment", url: "https://segment.com" },
    { name: "Customers.ai", url: "https://customers.ai" },
    { name: "Persona", url: "https://withpersona.com" },
    { name: "Common Room", url: "https://commonroom.io" },
    { name: "RB2B", url: "https://rb2b.com" },
  ]],
  [/retarget|remarket/i, [
    { name: "Meta Ads Manager", url: "https://business.facebook.com" },
    { name: "AdRoll", url: "https://adroll.com" },
    { name: "Criteo", url: "https://criteo.com" },
    { name: "RollWorks", url: "https://rollworks.com" },
    { name: "StackAdapt", url: "https://stackadapt.com" },
    { name: "Perfect Audience", url: "https://perfectaudience.com" },
    { name: "Outbrain", url: "https://outbrain.com" },
    { name: "Taboola", url: "https://taboola.com" },
  ]],
  [/video.*hook|vsl|hook test/i, [
    { name: "Riverside", url: "https://riverside.fm" },
    { name: "Descript", url: "https://descript.com" },
    { name: "VEED", url: "https://veed.io" },
    { name: "Loom", url: "https://loom.com" },
    { name: "Tella", url: "https://tella.tv" },
    { name: "Wistia", url: "https://wistia.com" },
    { name: "Vidyard", url: "https://vidyard.com" },
    { name: "Submagic", url: "https://submagic.co" },
    { name: "Captions", url: "https://captions.ai" },
    { name: "OpusClip", url: "https://opus.pro" },
  ]],
  [/backlink|unlinked mention|skyscraper/i, [
    { name: "Ahrefs", url: "https://ahrefs.com" },
    { name: "Semrush", url: "https://semrush.com" },
    { name: "Pitchbox", url: "https://pitchbox.com" },
    { name: "Respona", url: "https://respona.com" },
    { name: "BuzzStream", url: "https://buzzstream.com" },
    { name: "Hunter", url: "https://hunter.io" },
    { name: "Mailshake", url: "https://mailshake.com" },
    { name: "BuzzSumo", url: "https://buzzsumo.com" },
    { name: "Linkody", url: "https://linkody.com" },
    { name: "Postaga", url: "https://postaga.com" },
  ]],
  [/waitlist|invite[- ]only|early access/i, [
    { name: "GetWaitlist", url: "https://getwaitlist.com" },
    { name: "WaitlistPanda", url: "https://waitlistpanda.com" },
    { name: "Prefinery", url: "https://prefinery.com" },
    { name: "Open Startup", url: "https://openstartup.dev" },
    { name: "Userloop", url: "https://userloop.io" },
    { name: "KickoffLabs", url: "https://kickofflabs.com" },
    { name: "Maître", url: "https://maitreapp.co" },
    { name: "Tally", url: "https://tally.so" },
  ]],
  [/social proof popup|just bought/i, [
    { name: "Fomo", url: "https://fomo.com" },
    { name: "ProveSource", url: "https://provesource.com" },
    { name: "TrustPulse", url: "https://trustpulse.com" },
    { name: "Nudgify", url: "https://nudgify.com" },
    { name: "useProof", url: "https://useproof.com" },
    { name: "WiserNotify", url: "https://wisernotify.com" },
  ]],
  [/heatmap|session recording|click map|scroll depth/i, [
    { name: "Hotjar", url: "https://hotjar.com" },
    { name: "Microsoft Clarity", url: "https://clarity.microsoft.com" },
    { name: "Fullstory", url: "https://fullstory.com" },
    { name: "Mouseflow", url: "https://mouseflow.com" },
    { name: "Lucky Orange", url: "https://luckyorange.com" },
    { name: "Crazy Egg", url: "https://crazyegg.com" },
    { name: "Smartlook", url: "https://smartlook.com" },
    { name: "Contentsquare", url: "https://contentsquare.com" },
  ]],
  [/testimonial|case study|review|video review/i, [
    { name: "Senja", url: "https://senja.io" },
    { name: "Testimonial.to", url: "https://testimonial.to" },
    { name: "VideoAsk", url: "https://videoask.com" },
    { name: "Vouch", url: "https://vouchfor.com" },
    { name: "Trustpilot", url: "https://trustpilot.com" },
    { name: "G2", url: "https://g2.com" },
    { name: "Product Hunt", url: "https://producthunt.com" },
    { name: "Capterra", url: "https://capterra.com" },
    { name: "Trust.io", url: "https://trust.io" },
  ]],
  [/referral.*loop|viral.*referral|invite.*friend/i, [
    { name: "Friendbuy", url: "https://friendbuy.com" },
    { name: "ReferralHero", url: "https://referralhero.com" },
    { name: "GrowSurf", url: "https://growsurf.com" },
  ]],
  [/template library|cloneable template/i, [
    { name: "Notion", url: "https://notion.com" },
    { name: "Figma Community", url: "https://figma.com/community" },
    { name: "Webflow Templates", url: "https://webflow.com/templates" },
  ]],
  [/ip[- ]to[- ]account|reveal loop|website visitor identi/i, [
    { name: "Clearbit Reveal", url: "https://clearbit.com" },
    { name: "RB2B", url: "https://rb2b.com" },
    { name: "Warmly", url: "https://warmly.ai" },
  ]],
  [/breakup email/i, [
    { name: "Smartlead", url: "https://smartlead.ai" },
    { name: "Lemlist", url: "https://lemlist.com" },
    { name: "Instantly", url: "https://instantly.ai" },
  ]],
  [/pause.*subscription|cancel flow/i, [
    { name: "Brightback", url: "https://brightback.com" },
    { name: "ProsperStack", url: "https://prosperstack.com" },
    { name: "ChurnKey", url: "https://churnkey.co" },
  ]],
  [/easter egg/i, [
    { name: "Hotjar", url: "https://hotjar.com" },
    { name: "PostHog", url: "https://posthog.com" },
    { name: "Notion", url: "https://notion.com" },
  ]],
  [/powered[- ]by|distribution badge/i, [
    { name: "Calendly", url: "https://calendly.com" },
    { name: "Typeform", url: "https://typeform.com" },
    { name: "Intercom", url: "https://intercom.com" },
  ]],
  [/welcome mat|fullscreen popup/i, [
    { name: "Sumo Welcome Mat", url: "https://sumo.com" },
    { name: "OptinMonster", url: "https://optinmonster.com" },
    { name: "Privy", url: "https://privy.com" },
  ]],
  [/404/i, [
    { name: "Cloudflare", url: "https://cloudflare.com" },
    { name: "Google Search Console", url: "https://search.google.com/search-console" },
    { name: "Webflow", url: "https://webflow.com" },
  ]],
  [/charm pricing|left-digit|pricing point test/i, [
    { name: "Stripe", url: "https://stripe.com" },
    { name: "ProfitWell Price Intelligently", url: "https://paddle.com/profitwell" },
    { name: "VWO", url: "https://vwo.com" },
  ]],
  [/click[- ]to[- ]tweet|pull quote/i, [
    { name: "ClickToTweet", url: "https://clicktotweet.com" },
    { name: "Better Click to Tweet", url: "https://wordpress.org/plugins/better-click-to-tweet" },
    { name: "ShareThis", url: "https://sharethis.com" },
  ]],
  [/faq.*pricing|pricing.*faq/i, [
    { name: "Schema App", url: "https://schemaapp.com" },
    { name: "Webflow CMS", url: "https://webflow.com/cms" },
    { name: "Sanity", url: "https://sanity.io" },
  ]],
  [/most popular.*plan|recommended plan|plan badge/i, [
    { name: "Stripe", url: "https://stripe.com" },
    { name: "Webflow", url: "https://webflow.com" },
    { name: "Framer", url: "https://framer.com" },
  ]],
  [/hidden.*pric|request.*quote|contact sales/i, [
    { name: "HubSpot", url: "https://hubspot.com" },
    { name: "Chili Piper", url: "https://chilipiper.com" },
    { name: "Default", url: "https://default.com" },
  ]],
  [/hero (visual|gif|video|illustration)|hero format/i, [
    { name: "VWO", url: "https://vwo.com" },
    { name: "Wistia", url: "https://wistia.com" },
    { name: "Loom", url: "https://loom.com" },
  ]],
  [/cta.*copy|cta.*text|button.*text|button.*copy/i, [
    { name: "VWO", url: "https://vwo.com" },
    { name: "Google Optimize", url: "https://ga.dev" },
    { name: "Optimizely", url: "https://optimizely.com" },
  ]],
  [/nav.*cta|nav.*button|nav.*order|menu.*order|serial position/i, [
    { name: "VWO", url: "https://vwo.com" },
    { name: "Webflow", url: "https://webflow.com" },
    { name: "Hotjar", url: "https://hotjar.com" },
  ]],
  [/distraction[- ]free|remove nav|focus mode|chrome[- ]less/i, [
    { name: "Webflow", url: "https://webflow.com" },
    { name: "Unbounce", url: "https://unbounce.com" },
    { name: "Framer", url: "https://framer.com" },
  ]],
  [/what.*you.ll learn|demo page content/i, [
    { name: "Webflow", url: "https://webflow.com" },
    { name: "Storylane", url: "https://storylane.io" },
    { name: "Wistia", url: "https://wistia.com" },
  ]],
  [/resource hub|featured.*popular|content library/i, [
    { name: "Webflow CMS", url: "https://webflow.com/cms" },
    { name: "Algolia", url: "https://algolia.com" },
    { name: "Ghost", url: "https://ghost.org" },
  ]],
  [/ppp pricing|purchasing[- ]power[- ]parity|geo[- ]pric/i, [
    { name: "Paddle", url: "https://paddle.com" },
    { name: "Lemon Squeezy", url: "https://lemonsqueezy.com" },
    { name: "Stripe Adaptive Pricing", url: "https://stripe.com/billing" },
  ]],
  [/random act.*kindness|surprise gift|customer gift/i, [
    { name: "Sendoso", url: "https://sendoso.com" },
    { name: "Loop & Tie", url: "https://loopandtie.com" },
    { name: "Reachdesk", url: "https://reachdesk.com" },
  ]],
  [/\$1 (validation|pricing|founding)|founding user/i, [
    { name: "Stripe", url: "https://stripe.com" },
    { name: "Lemon Squeezy", url: "https://lemonsqueezy.com" },
    { name: "Paddle", url: "https://paddle.com" },
  ]],
  [/pretarget|pre[- ]targeting/i, [
    { name: "Meta Ads Manager", url: "https://business.facebook.com" },
    { name: "LinkedIn Matched Audiences", url: "https://business.linkedin.com/marketing-solutions/ad-targeting" },
    { name: "Apollo", url: "https://apollo.io" },
  ]],
];

function toolsForTactic(tactic: TacticRow): Tool[] {
  const haystack = `${tactic.tactic} ${tactic.how || ""}`;
  for (const [re, tools] of TOOL_OVERRIDES) {
    if (re.test(haystack)) return tools;
  }
  return TOOLS_BY_CHANNEL[tactic.channel] || [
    { name: "Notion", url: "https://notion.com" },
    { name: "Linear", url: "https://linear.app" },
    { name: "Segment", url: "https://segment.com" },
  ];
}

// ---- KPI catalog by stage ----
const METRICS_BY_STAGE: Record<string, string[]> = {
  Awareness:    ["Branded search volume", "Share-of-voice", "Impressions reach", "Direct traffic"],
  Acquisition:  ["CPL (cost per lead)", "CAC", "Signups / day", "Pipeline created", "Audience match rate"],
  Activation:   ["Time-to-aha", "Activated-rate", "Day-1 retention", "Onboarding completion %"],
  Conversion:   ["CVR (overall + step)", "Trial-to-paid %", "Cart-to-checkout %", "Signup-to-paid %"],
  Retention:    ["D7 / D30 retention", "Gross / net churn", "NRR", "Stickiness (DAU/MAU)"],
  Revenue:      ["ARPU", "MRR / ARR", "LTV", "Expansion revenue %", "Net Revenue Retention"],
  Referral:     ["K-factor", "Referrals / customer", "Viral coefficient", "% revenue from referrals"],
};

// ---- Playbook templates by (category, channel) ----
type Step = string;

function paidSocialPlaybook(t: TacticRow): Step[] {
  return [
    `Define the audience source: clean the seed list before uploading (CSV or pixel-based for ${t.tactic.toLowerCase()}).`,
    "Set up a dedicated conversion event in your ad platform's pixel so you can attribute downstream signups, not just clicks.",
    `Build the creative-set: 3-5 variants that share the value prop but differ in hook (problem-first, social-proof, demo-led).`,
    "Launch at $X / day with frequency-cap enforced; budget for at least 7 days before reading results.",
    "Read by ROAS / CPL daily; kill bottom-quartile creatives at the 100-impression mark.",
    "Scale winners by 20% / day to avoid breaking the learning phase, and refresh creative every 14 days to fight ad fatigue.",
  ];
}
function paidSearchPlaybook(t: TacticRow): Step[] {
  return [
    "Map the keyword cluster to a single landing page — never run one ad group to your homepage.",
    "Write 3 headline / 2 description RSAs; mirror the search query as the H1 of the landing page (Dynamic Text Replacement).",
    "Set up conversion tracking with offline import for true sales attribution, not just form-fills.",
    "Run on Manual CPC for the first 30 conversions, then switch to Maximize Conversions or tCPA.",
    "Add negative keywords weekly from the Search Terms report — the biggest wasted spend lives here.",
    "Build remarketing audiences from page views to catch the 90% who don't convert first-click.",
  ];
}
function seoPlaybook(t: TacticRow): Step[] {
  return [
    "Identify the target keyword cluster and dominant search intent (informational, navigational, transactional).",
    "Audit the top 10 ranking pages — note their word count, headings, internal links, and content gaps.",
    "Draft a piece that's measurably better: 1.5× depth, original data, clearer structure, FAQ schema baked in.",
    "Optimize on-page basics: descriptive H1, semantic H2s, internal links to 3-5 supporting pages.",
    "Push 5 outreach emails to sites linking to the original — the upgrade is the pitch.",
    "Republish quarterly with a fresh date, refreshed stats, and one new section to keep rankings climbing.",
  ];
}
function emailPlaybook(t: TacticRow): Step[] {
  return [
    "Define the trigger event in your analytics (behavioral, lifecycle, or time-based) — without a trigger this becomes a generic newsletter.",
    "Write the sequence as one shipped artifact, not email-by-email: 3-5 messages, each with a single CTA.",
    "Use plain-text formatting; rich HTML emails get filtered to Promotions and lose 30-50% deliverability.",
    "Warm your sending domain for 7 days at low volume before scaling — cold IPs go to spam.",
    "A/B test subject lines on every send; the subject is 80% of the open rate.",
    "Sunset disengaged contacts at 60 days of no opens — list hygiene is the single biggest deliverability lever.",
  ];
}
function lifecyclePlaybook(t: TacticRow): Step[] {
  return [
    "Map the user journey by stage (new, activating, active, at-risk, churned) — define entry/exit criteria for each.",
    "For each stage, identify ONE message that moves the user to the next stage. Resist the temptation to send everything.",
    "Build the trigger logic in Customer.io / Braze with explicit suppression rules so users never get two messages at once.",
    "Layer channels: email for considered, in-app for urgent, push for reactivation — don't blast all three.",
    "Measure stage-to-stage conversion before/after; total opens or clicks are vanity metrics here.",
    "Quarterly: kill any campaign with <2% influence on the metric. Lifecycle bloat is invisible until it isn't.",
  ];
}
function croPlaybook(t: TacticRow): Step[] {
  return [
    "State the hypothesis in one sentence: 'We believe changing X will lift Y because Z.'",
    "Identify the funnel step to test and confirm you have enough traffic for stat-sig in 14 days.",
    "Ship A and B simultaneously; never test sequentially (seasonality contaminates results).",
    "Run for a full multiple of 7 days to neutralize day-of-week effects.",
    "Require 95% confidence + 1000+ conversions per arm before calling a winner.",
    "Document the learning win or loss; the test that 'fails' often teaches more than one that wins.",
  ];
}
function productLedPlaybook(t: TacticRow): Step[] {
  return [
    "Identify the activation moment — the single user action that correlates with retention 30 days out.",
    "Instrument the funnel from signup to activation in your analytics; find the largest drop-off.",
    "Ship the smallest possible change to lift the drop-off step (UX, copy, default state).",
    "Measure within a single cohort week — comparing across weeks adds confounds.",
    "Roll out to 100% only when you have 14 days of data showing the lift held.",
    "Build a 'time-to-activation' watchpoint; regressions here are the canary for churn.",
  ];
}
function outboundPlaybook(t: TacticRow): Step[] {
  return [
    "Define the ICP narrowly — 500 named accounts beats 50k generic ones; intent signals beat firmographics.",
    "Enrich and verify before sending: bad emails poison your sender reputation faster than anything else.",
    "Warm new sending mailboxes for 14 days at <50 sends / day before ramping.",
    "Write 4 touches over 14 days; each must add new value, never just 'bumping this up.'",
    "A/B subject lines weekly; bodies monthly. Subject is the biggest reply lever.",
    "Track reply rate by template, not open rate (opens are unreliable since Apple MPP).",
  ];
}
function onboardingPlaybook(t: TacticRow): Step[] {
  return [
    "Define the user's first 'job to be done' — what they wanted accomplished by signing up.",
    "Strip the onboarding to that one job; everything else is friction.",
    "Pre-fill, default-select, and skip whatever's possible — the famous 'two stamps pre-stamped' trick.",
    "Show progress so users see the finish line; partial-state recovery if they bail.",
    "Send the first activation email within 5 minutes — drop-off after hour 1 is catastrophic.",
    "Measure 'aha-rate' (% who hit the activation event) and 'time-to-aha' as your two north stars.",
  ];
}
function partnershipsPlaybook(t: TacticRow): Step[] {
  return [
    "Identify 10-20 brands with overlapping ICP but non-competitive product — your customers' other vendors.",
    "Lead with what you'll give, not what you want: a co-branded asset, a guest post, a list swap.",
    "Make the integration / asset live within 14 days of the handshake — momentum dies in 'we should…'",
    "Measure by attributable signups, not vanity 'partnership announced' metrics.",
    "Renew quarterly with a small change to keep it fresh; partnerships rot without iteration.",
    "Track win-rate against accounts where a partner is already in — 2-3× higher than cold.",
  ];
}
function referralPlaybook(t: TacticRow): Step[] {
  return [
    "Pick a reward that's emotionally meaningful but financially sustainable (extension > cash > swag for SaaS).",
    "Make sharing one-tap with pre-filled message and trackable link — friction kills the loop.",
    "Reward both sides — the referrer AND referee — to remove the awkwardness of asking.",
    "Surface the program at the activation moment, not on the homepage — happy users refer; lukewarm users don't.",
    "Measure K-factor weekly: invites sent × accept rate. <0.3 is broken; >1.0 is the dream.",
    "Cap reward stacking to prevent gaming, but don't make legitimate referrers feel watched.",
  ];
}
function prPlaybook(t: TacticRow): Step[] {
  return [
    "Find the right angle for the right outlet — the same story pitched 3 ways for 3 publications.",
    "Build the journalist list yourself: 20 hand-picked > 200 from a database. Read their recent work first.",
    "Pitch in their preferred format: 60-90 word email, news hook + data + quote ready to copy.",
    "Embargo for synchronized coverage — solo articles get less reach than a coordinated launch day.",
    "Repurpose the launch into 3 pieces: founder post, customer story, technical deep-dive.",
    "Track tier-1 vs. tier-2 mentions separately — domain rating > raw mention count.",
  ];
}
function aiGeoPlaybook(t: TacticRow): Step[] {
  return [
    "Audit how your brand currently appears in AI engines: ask ChatGPT, Perplexity, Claude, and Google AIO the same 5 buying-intent queries.",
    "Identify the citation sources the AIs are pulling from — almost always Wikipedia, Reddit, G2, and a few trusted blogs.",
    "Plant content where those AIs source: get listed on G2 / Capterra with strong reviews, contribute to Wikipedia's references, get featured in independent listicles.",
    "Add FAQ schema and Article schema to every key page — AI engines lean heavily on structured data.",
    "Publish an llms.txt and robots-friendly content so the right crawlers can ingest you.",
    "Re-run the audit monthly — AI engine results shift far faster than Google SERPs.",
  ];
}
function contentPlaybook(t: TacticRow): Step[] {
  return [
    "Identify the keyword cluster + the question your ideal reader Googles at 11pm on a Tuesday.",
    "Outline first — never write before you've structured the answer.",
    "Lead with the answer, not the buildup; web readers don't owe you scroll depth.",
    "Add one piece of original data or a contrarian take — this is what gets shared.",
    "Distribute on launch day across 3+ channels; publishing alone is not promotion.",
    "Revisit at 90 days and refresh; updated dates beat new posts for SEO ROI.",
  ];
}
function socialOrganicPlaybook(t: TacticRow): Step[] {
  return [
    "Pick one platform and master it before adding a second — depth beats spray.",
    "Post at the same cadence for 90 days minimum; consistency is the algorithm's #1 signal.",
    "Lead every post with a hook in the first line; the rest is wasted if line 1 fails.",
    "Reply to every comment in the first hour — engagement velocity = reach.",
    "Repurpose the top 10% of posts into 3 formats (thread, video, blog).",
    "Measure by followers gained per post AND replies per post — both matter.",
  ];
}
function pricingPlaybook(t: TacticRow): Step[] {
  return [
    "Survey 30+ recent paying customers on willingness-to-pay (Van Westendorp 4-question model).",
    "Identify the value metric — what the customer scales on (seats, usage, revenue, etc.).",
    "Design tiers around the value metric, not arbitrary feature gates — buyers should self-select up.",
    "Test the new pricing on new signups first; never change existing customers without grandfathering.",
    "Watch trial-to-paid conversion + ARPU together — moving one without the other usually means you got pricing wrong.",
    "Re-test pricing every 12-18 months; the market moves and so should your number.",
  ];
}
function analyticsPlaybook(t: TacticRow): Step[] {
  return [
    "Define one north-star metric and 3-5 input metrics that move it — don't track everything.",
    "Instrument with explicit event-naming conventions (Object_Verb_Result) — taxonomic debt is brutal to fix later.",
    "Pipe everything through a single source of truth (Segment / Rudderstack) — multiple SDKs = data drift.",
    "Build a single weekly dashboard that the whole team sees — 50 dashboards nobody opens is the failure mode.",
    "Validate analytics monthly against the source-of-truth (Stripe for revenue, DB for users).",
    "Sunset metrics nobody acts on; tracking != utility.",
  ];
}
function strategyPlaybook(t: TacticRow): Step[] {
  return [
    "Write the one-line strategy statement: 'We will win in [market] by being uniquely good at [thing].'",
    "Identify the 3 enabling bets that make the statement true; everything else is execution.",
    "Cut the projects that don't ladder to the 3 bets — strategy is what you don't do.",
    "Pressure-test the statement with 5 customers and 5 prospects — does it land or do they shrug?",
    "Re-visit quarterly; markets shift, and so should the strategy. Don't be precious.",
    "Communicate it monthly; the team forgets faster than you think.",
  ];
}
function defaultPlaybook(t: TacticRow): Step[] {
  return [
    `Diagnose first: confirm the upstream metric this tactic should move is actually broken before deploying it.`,
    `Scope a 14-day pilot, not a permanent rollout — you'll learn more from a clean experiment.`,
    "Define one primary metric and one guardrail metric (e.g., conversion rate + retention).",
    "Ship the smallest possible version; complexity is the enemy of attribution.",
    "Read results at full weekly cycles to absorb day-of-week noise.",
    "Document the result — including failures — so future-you doesn't re-run the same test in 9 months.",
  ];
}

function playbookFor(t: TacticRow): Step[] {
  switch (t.channel) {
    case "Paid Social": return paidSocialPlaybook(t);
    case "Paid Search": return paidSearchPlaybook(t);
    case "SEO":         return seoPlaybook(t);
    case "Email":       return emailPlaybook(t);
    case "Lifecycle":   return lifecyclePlaybook(t);
    case "CRO":         return croPlaybook(t);
    case "Product-Led": return productLedPlaybook(t);
    case "Outbound":    return outboundPlaybook(t);
    case "Onboarding":  return onboardingPlaybook(t);
    case "Partnerships":return partnershipsPlaybook(t);
    case "Referral":    return referralPlaybook(t);
    case "PR":          return prPlaybook(t);
    case "AI GEO":      return aiGeoPlaybook(t);
    case "Content":     return contentPlaybook(t);
    case "Social Organic": return socialOrganicPlaybook(t);
    case "Pricing":     return pricingPlaybook(t);
    case "Analytics":   return analyticsPlaybook(t);
    case "Strategy":    return strategyPlaybook(t);
    default:            return defaultPlaybook(t);
  }
}

function timelineFor(effort: string, impact: string): string {
  const e = effort.toLowerCase();
  if (e === "low") return "Ship in 1–2 days · first signal in 3–7 days · full read in 14–21 days.";
  if (e === "medium") return "Ship in 1–2 weeks · first signal in 14–30 days · full read in 30–60 days.";
  if (e === "high") return "Ship in 3–6 weeks · first signal in 30–60 days · full read in 60–90 days.";
  return "Ship in 1–2 weeks · first signal in 14–30 days · full read in 30–60 days.";
}

function benchmarksFor(impact: string, cost: string, category: string): string {
  const i = impact.toLowerCase();
  if (category === "Monetization") {
    if (i === "high")   return "Top quartile teams see 15–35% revenue lift on the targeted segment; median 8–14%.";
    if (i === "medium") return "Typical 4–10% revenue lift on the targeted segment; segment size matters more than rate.";
    return "Expect modest 1–4% lift, but compounded across many users it adds up.";
  }
  if (category === "Conversion") {
    if (i === "high")   return "20–60% CVR lift on the targeted page in top decile cases; median 10–18%.";
    if (i === "medium") return "5–15% CVR lift on the targeted page; bigger sites see narrower wins because they're already optimized.";
    return "2–6% CVR lift; pick this if you've already done the high-impact ones.";
  }
  if (category === "Retention") {
    if (i === "high")   return "5–15 percentage-point improvement in 90-day retention for the targeted cohort.";
    if (i === "medium") return "2–6 percentage-point retention improvement; harder to measure but compounds in LTV.";
    return "Sub-2pp improvement; valuable only at scale.";
  }
  if (category === "Referral") {
    if (i === "high")   return "K-factor lifts of 0.15–0.40 are realistic; doubling overall referral revenue % is common.";
    return "K-factor lift of 0.05–0.15 — useful but rarely a category-changer alone.";
  }
  if (i === "high")   return "Top performers see 30–60% lift on the primary metric; median 12–20%. Variance is wide; the watch-out determines outcome.";
  if (i === "medium") return "Median lift 6–14% on the primary metric. Cost (${cost.toLowerCase()}) is the main rate-limiter.";
  return "Modest single-digit lift; valuable for trim, not transformation.";
}

function pitfallsFor(t: TacticRow): string[] {
  const generic = [
    "Calling the test too early — read results at full 7-day multiples to neutralize day-of-week effects.",
    "Skipping the audience / segment definition — broad targeting dilutes the signal and inflates CAC.",
    "Failing to instrument the downstream metric — clicks are not revenue.",
  ];
  if (t.category === "Conversion") {
    return [
      "Optimizing the top of the funnel before the bottom — fixing CVR while leaks remain is wasted lift.",
      "Running variants sequentially instead of simultaneously — seasonality contaminates the comparison.",
      `Watch-out from the playbook: ${(t.tip || "").slice(0, 140)}`.trim(),
    ];
  }
  if (t.category === "Retention") {
    return [
      "Treating retention as a comms problem — if the product doesn't deliver value, no email saves the user.",
      "Targeting power users (already retained) instead of at-risk segments where the lift lives.",
      `Watch-out from the playbook: ${(t.tip || "").slice(0, 140)}`.trim(),
    ];
  }
  if (t.category === "Monetization") {
    return [
      "Raising price without re-validating willingness-to-pay; cannibalizes top-of-funnel silently.",
      "Confounding monetization changes with growth experiments — both moving makes attribution impossible.",
      `Watch-out from the playbook: ${(t.tip || "").slice(0, 140)}`.trim(),
    ];
  }
  if (t.category === "Traffic") {
    return [
      "Buying volume before the funnel converts — paid traffic into a broken funnel is just a fast way to burn cash.",
      "Underbudgeting creative production; the platform is now 10% of the work, the creative is 90%.",
      `Watch-out from the playbook: ${(t.tip || "").slice(0, 140)}`.trim(),
    ];
  }
  return generic.concat(`Watch-out from the playbook: ${(t.tip || "").slice(0, 140)}`.trim());
}

function metricsFor(stage: string): string[] {
  return METRICS_BY_STAGE[stage] || ["CAC", "LTV", "CVR"];
}


type TacticRow = {
  id: number; slug: string; tactic: string;
  category: string; channel: string; stage: string;
  difficulty: string; impact: string; cost: string; effort: string;
  how: string; example: string; tip: string; bestFor: string;
};

async function main() {
  const tactics = await prisma.tactic.findMany({
    select: {
      id: true, slug: true, tactic: true,
      category: true, channel: true, stage: true,
      difficulty: true, impact: true, cost: true, effort: true,
      how: true, example: true, tip: true, bestFor: true,
    },
  });

  console.log(`Generating deep-dive content for ${tactics.length} tactics…`);

  // Pre-compute by-category index for related-ids
  const byCategory: Record<string, TacticRow[]> = {};
  for (const t of tactics) {
    (byCategory[t.category] ||= []).push(t as TacticRow);
  }

  let i = 0;
  for (const t of tactics as TacticRow[]) {
    const playbook = playbookFor(t);
    const metrics = metricsFor(t.stage);
    const tools = toolsForTactic(t);
    const timeline = timelineFor(t.effort, t.impact);
    const benchmarks = benchmarksFor(t.impact, t.cost, t.category);
    const pitfalls = pitfallsFor(t);

    // Related: 3 from same category, different channel, prefer same stage if available.
    const candidates = (byCategory[t.category] || [])
      .filter((x) => x.id !== t.id)
      .sort((a, b) => {
        const aScore = (a.stage === t.stage ? 2 : 0) + (a.channel !== t.channel ? 1 : 0);
        const bScore = (b.stage === t.stage ? 2 : 0) + (b.channel !== t.channel ? 1 : 0);
        return bScore - aScore;
      });
    const related = candidates.slice(0, 3).map((x) => x.id);

    await prisma.tactic.update({
      where: { id: t.id },
      data: {
        playbook: JSON.stringify(playbook),
        metrics: JSON.stringify(metrics),
        tools: JSON.stringify(tools),
        timeline,
        benchmarks,
        pitfalls: JSON.stringify(pitfalls),
        related: JSON.stringify(related),
      },
    });

    if (++i % 50 === 0) console.log(`  ${i} / ${tactics.length}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
