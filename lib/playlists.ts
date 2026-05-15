// Curated playlists — hand-picked collections of hacks for specific founder situations.
// Each is a slug → metadata + ordered list of tactic IDs.

export type Playlist = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  accent: "cyan" | "purple" | "mint" | "orange" | "pink";
  tacticIds: number[];
};

export const PLAYLISTS: Playlist[] = [
  {
    slug: "first-90-days",
    title: "First 90 days",
    subtitle: "Pre-launch → first paying customer",
    emoji: "🌱",
    accent: "mint",
    description:
      "You have an idea, a half-built product, and zero customers. This is the order in which 90% of founders should ship growth — validation first, then acquisition, then activation. Skip the fancy stuff until the foundation is real.",
    tacticIds: [444, 11, 423, 425, 426, 436, 9, 25, 79, 50, 47, 60],
  },
  {
    slug: "crank-up-conversion",
    title: "Crank up conversion",
    subtitle: "Your funnel leaks. Plug it.",
    emoji: "🎯",
    accent: "cyan",
    description:
      "Sub-2% landing-page CVR? Lift it before you spend another dollar on traffic. Run these in order — biggest-impact CRO plays at the top, micro-optimizations at the bottom. Expect a 30-60% lift if your funnel hasn't been touched in a year.",
    tacticIds: [428, 445, 446, 8, 56, 22, 23, 80, 91, 92, 452, 461, 462, 463, 464],
  },
  {
    slug: "b2b-saas-series-a",
    title: "B2B SaaS · Series A",
    subtitle: "Pipeline → predictable revenue",
    emoji: "📈",
    accent: "purple",
    description:
      "You raised, you have product-market fit, and now growth needs to be repeatable. These are the 15 plays that turn a founder-led sales motion into a scalable acquisition + activation system. Run with a growth or marketing team of 2-4.",
    tacticIds: [1, 432, 434, 435, 26, 37, 21, 22, 51, 65, 95, 99, 100, 426, 456, 457, 458],
  },
  {
    slug: "ecom-q4",
    title: "Ecom · Q4 season",
    subtitle: "Black Friday → New Year revenue blitz",
    emoji: "🛍️",
    accent: "orange",
    description:
      "Q4 is 40% of annual revenue for most ecom. These 10 plays compound — ship them in this order starting October 1 to maximize the holiday window. Past the season? Save this for next year and run them anyway.",
    tacticIds: [6, 2, 22, 73, 442, 443, 449, 450, 5, 41, 78],
  },
  {
    slug: "indie-hacker-leverage",
    title: "Indie hacker · max leverage",
    subtitle: "One person, sustainable growth",
    emoji: "⚡",
    accent: "pink",
    description:
      "You're solo, you have a day job, and you have 5 hours a week. These are the highest-leverage plays — low effort, high ceiling, no team required. Skip everything that needs sales reps or paid budgets.",
    tacticIds: [436, 11, 423, 424, 425, 427, 12, 28, 30, 32, 47, 60, 63, 90],
  },
  {
    slug: "retention-rescue",
    title: "Retention rescue",
    subtitle: "Stop the leaky bucket",
    emoji: "💚",
    accent: "mint",
    description:
      "Your acquisition is fine but customers churn within 30 days. This is the diagnostic + repair playbook — find the activation drop-off, ship the fix, layer in lifecycle messaging, build the comeback flow. 20-40 percentage-point retention lifts on the targeted cohort are realistic.",
    tacticIds: [10, 41, 92, 93, 27, 29, 38, 46, 100, 117, 429, 438, 441, 459, 460],
  },
];

export function getPlaylist(slug: string): Playlist | undefined {
  return PLAYLISTS.find((p) => p.slug === slug);
}

const ACCENT_TO_VAR: Record<Playlist["accent"], string> = {
  cyan: "var(--accent)",
  purple: "var(--accent-2)",
  mint: "var(--accent-3)",
  orange: "var(--accent-warn)",
  pink: "#ff8fc8",
};

export function accentVar(p: Playlist): string {
  return ACCENT_TO_VAR[p.accent];
}
