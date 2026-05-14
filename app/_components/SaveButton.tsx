"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleSaveAction } from "../actions";

export default function SaveButton({ tacticId, initialSaved, isAuthed }: { tacticId: number; initialSaved: boolean; isAuthed: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [, start] = useTransition();
  const router = useRouter();

  const onClick = () => {
    if (!isAuthed) { router.push("/signin?next=" + encodeURIComponent(location.pathname)); return; }
    setSaved((s) => !s);
    start(async () => { await toggleSaveAction(tacticId); });
  };

  return (
    <button className="btn" onClick={onClick} aria-label={saved ? "Unsave" : "Save"} style={saved ? { color: "var(--accent-warn)", borderColor: "rgba(255,184,107,0.4)" } : {}}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
