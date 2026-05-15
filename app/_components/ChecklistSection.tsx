"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChecklistSection as Section } from "@/lib/croChecklist";

const STORAGE_KEY = "sgh_cro_checked";

function readChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function writeChecked(state: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Broadcast for the progress bar to update.
  window.dispatchEvent(new Event("sgh:checklist-updated"));
}

export default function ChecklistSection({ section }: { section: Section }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(readChecked());
    const onStorage = () => setChecked(readChecked());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeChecked(next);
      return next;
    });
  };

  const sectionDone = section.items.filter((i) => checked[i.id]).length;
  const sectionTotal = section.items.length;
  const sectionPct = Math.round((sectionDone / sectionTotal) * 100);

  return (
    <section id={section.id} style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.025em", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{section.emoji}</span> {section.title}
        </h2>
        <div className="mono" style={{ color: "var(--text-faint)", fontSize: 11 }}>
          {sectionDone} / {sectionTotal}{" "}
          <span style={{ color: sectionPct === 100 ? "var(--accent-3)" : "var(--text-faint)" }}>
            {sectionPct === 100 ? "✓ complete" : `${sectionPct}%`}
          </span>
        </div>
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 18, maxWidth: 680, lineHeight: 1.5 }}>
        {section.description}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {section.items.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <li
              key={item.id}
              style={{
                background: "var(--bg-soft)",
                border: `1px solid ${isChecked ? "rgba(121,240,198,0.4)" : "var(--line)"}`,
                borderRadius: 10,
                padding: "14px 16px",
                transition: "background .15s, border-color .15s, opacity .2s",
                opacity: isChecked ? 0.7 : 1,
              }}
            >
              <label style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 12, cursor: "pointer", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  aria-label={item.text}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `1.5px solid ${isChecked ? "var(--accent-3)" : "var(--line)"}`,
                    background: isChecked ? "var(--accent-3)" : "var(--bg-elev)",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    marginTop: 1,
                    transition: "background .15s, border-color .15s",
                    flexShrink: 0,
                    position: "relative",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--text)",
                      textDecoration: isChecked ? "line-through" : "none",
                      textDecorationColor: "var(--text-faint)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </div>
                  {item.detail && (
                    <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-dim)", lineHeight: 1.55 }}>
                      {item.detail}
                    </p>
                  )}
                  {item.relatedHackSlug && (
                    <Link
                      href={`/hacks/${item.relatedHackSlug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 8,
                        fontSize: 11,
                        color: "var(--accent)",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      → deep dive
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 L17 7 M9 7 L17 7 L17 15" />
                      </svg>
                    </Link>
                  )}
                </div>
              </label>

              {/* Visible checkmark inside the box */}
              <style jsx>{`
                input[type="checkbox"]:checked::after {
                  content: '';
                  display: block;
                  width: 5px;
                  height: 9px;
                  border: solid #0a0b0d;
                  border-width: 0 2px 2px 0;
                  transform: rotate(45deg) translate(-1px, -1px);
                }
              `}</style>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
