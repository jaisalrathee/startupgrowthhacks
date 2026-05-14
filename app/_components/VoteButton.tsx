"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleVoteAction } from "../actions";

export default function VoteButton({ tacticId, initialCount, initialVoted, isAuthed }: { tacticId: number; initialCount: number; initialVoted: boolean; isAuthed: boolean }) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [, start] = useTransition();
  const router = useRouter();

  const onClick = () => {
    if (!isAuthed) { router.push("/signin?next=" + encodeURIComponent(location.pathname)); return; }
    const newVoted = !voted;
    setVoted(newVoted);
    setCount((c) => c + (newVoted ? 1 : -1));
    start(async () => { await toggleVoteAction(tacticId); });
  };

  return (
    <button className={`upvote ${voted ? "voted" : ""}`} onClick={onClick} aria-label="Upvote">
      <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5 L4 14 L9 14 L9 20 L15 20 L15 14 L20 14 Z" />
      </svg>
      <span>{count}</span>
      {voted && <span style={{ color: "var(--text-faint)", marginLeft: 2 }}>· voted</span>}
    </button>
  );
}
