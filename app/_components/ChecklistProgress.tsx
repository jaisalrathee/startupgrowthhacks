"use client";

import { useEffect, useState } from "react";
import { CRO_CHECKLIST, TOTAL_ITEMS } from "@/lib/croChecklist";

const STORAGE_KEY = "sgh_cro_checked";

function readChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export default function ChecklistProgress() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const recompute = () => {
      const checked = readChecked();
      let count = 0;
      for (const s of CRO_CHECKLIST) for (const i of s.items) if (checked[i.id]) count++;
      setDone(count);
    };
    recompute();
    window.addEventListener("storage", recompute);
    window.addEventListener("sgh:checklist-updated", recompute);
    return () => {
      window.removeEventListener("storage", recompute);
      window.removeEventListener("sgh:checklist-updated", recompute);
    };
  }, []);

  const pct = Math.round((done / TOTAL_ITEMS) * 100);
  const allDone = done === TOTAL_ITEMS;

  const reset = () => {
    if (!confirm("Reset all checkmarks?")) return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("sgh:checklist-updated"));
  };

  return (
    <div
      style={{
        background: "var(--bg-soft)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "18px 22px",
        marginBottom: 36,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          {allDone ? "🎯 You've shipped the whole checklist." : `Your progress`}
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-dim)" }}>
          {done} / {TOTAL_ITEMS} <span style={{ color: allDone ? "var(--accent-3)" : "var(--accent)" }}>{pct}%</span>
          {done > 0 && (
            <button
              onClick={reset}
              style={{
                marginLeft: 12,
                background: "transparent",
                border: "none",
                color: "var(--text-faint)",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 0.5,
              }}
            >
              reset
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          height: 8,
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: allDone
              ? "var(--accent-3)"
              : "linear-gradient(90deg, var(--accent), var(--accent-2))",
            transition: "width .25s ease",
          }}
        />
      </div>
    </div>
  );
}
