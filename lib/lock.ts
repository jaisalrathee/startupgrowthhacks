// 10 hand-picked free previews — one top-voted hack from each of the 7 categories,
// plus the original 3 to keep existing deep links indexable.
export const FREE_IDS = new Set<number>([
  1,    // Traffic — 1% Lookalike from High-LTV Customers
  2,    // Traffic — Video-View Retargeting Tiers
  3,    // Traffic — Interest-Stack Narrowing
  49,   // Conversion — Alternatives Pages
  100,  // Retention — Post-Purchase Education Sequence (top of leaderboard)
  108,  // Referral — Free Plan With Branded Output
  152,  // AI GEO — Original Research as Citation Bait
  249,  // Monetisation — Free Forever Tier
  277,  // Traffic — Mutual Connection Warm Intros (#3 on leaderboard)
  355,  // Strategy — Pirate Metrics (AARRR) Dashboard
]);
export function isLocked(id: number, isPro: boolean): boolean {
  return !isPro && !FREE_IDS.has(id);
}
export function firstWord(s: string): string {
  return (s.trim().split(/\s+/)[0] || "").replace(/[—,.:;!?]+$/g, "");
}
export function rest(s: string): string {
  const i = s.indexOf(" ");
  return i === -1 ? "" : s.slice(i);
}
