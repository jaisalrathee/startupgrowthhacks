"use client";

import { useState, useTransition } from "react";
import { addCommentAction } from "../actions";

type Comment = { id: string; authorName: string; body: string; createdAt: string };

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
  const d = Math.floor(h / 24); if (d < 30) return d + "d ago";
  return Math.floor(d / 30) + "mo ago";
}

export default function CommentSection({ tacticId, comments, isAuthed }: { tacticId: number; comments: Comment[]; isAuthed: boolean }) {
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useState(comments);
  const [, start] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    const fd = new FormData();
    fd.set("body", body);
    if (name) fd.set("name", name);
    const optimistic: Comment = {
      id: "tmp-" + Date.now(),
      authorName: name || "You",
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };
    setList((l) => [optimistic, ...l]);
    setBody("");
    start(async () => { await addCommentAction(tacticId, fd); });
  };

  return (
    <div style={{ marginTop: 32 }}>
      <div className="section-label">Discussion · {list.length}</div>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {!isAuthed && (
          <input
            type="text" placeholder="Your name (optional)"
            value={name} onChange={(e) => setName(e.target.value)}
            maxLength={40}
          />
        )}
        <textarea
          placeholder="What worked, what didn't, what'd you change…"
          value={body} onChange={(e) => setBody(e.target.value)}
          maxLength={500} required style={{ minHeight: 70 }}
        />
        <button type="submit" className="btn primary" style={{ alignSelf: "flex-end" }}>Post comment</button>
      </form>

      {list.length === 0 && (
        <div style={{ color: "var(--text-faint)", fontStyle: "italic", padding: "8px 0" }}>
          Be the first to share how this hack worked for you.
        </div>
      )}
      {list.map((c) => (
        <div key={c.id} className="comment-card">
          <div className="who">
            <div className="avatar">
              {c.authorName.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <span className="mono">{c.authorName}</span>
            <span className="mono" style={{ color: "var(--text-faint)" }}>· {timeAgo(c.createdAt)}</span>
          </div>
          <div className="body">{c.body}</div>
        </div>
      ))}
    </div>
  );
}
