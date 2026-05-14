export const FREE_IDS = new Set<number>([1, 2, 3]);
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
