"use client";

import { useEffect, useRef } from "react";

// Brand gradient palette — same conic stops as the logomark.
const COLORS = ["#7ad0ff", "#b39dff", "#ff8fc8", "#ffb86b", "#79f0c6"];

export default function CursorSparks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch devices (no real cursor) and respect motion preferences.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let lastSpawnTime = 0;
    let lastX = -1;
    let lastY = -1;
    let active = 0;
    const MIN_INTERVAL = 28; // ~35 fps spawn cap
    const MAX_CONCURRENT = 35;

    const spawnSpark = (x: number, y: number, intensity = 1) => {
      if (active >= MAX_CONCURRENT) return;
      const spark = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 4 + Math.random() * 8 * intensity;
      const angle = Math.random() * Math.PI * 2;
      const distance = 18 + Math.random() * 38 * intensity;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 8; // slight upward bias (sparks rise)
      const duration = 520 + Math.random() * 380;
      const rotation = (Math.random() - 0.5) * 80;

      spark.style.cssText = `
        position: fixed;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle at 35% 35%, ${color}, transparent 72%);
        box-shadow: 0 0 ${size * 1.8}px ${color}aa, 0 0 ${size * 4}px ${color}55;
        mix-blend-mode: screen;
        opacity: 0.95;
        transform-origin: center;
        --sgh-dx: ${dx}px;
        --sgh-dy: ${dy}px;
        --sgh-rot: ${rotation}deg;
        animation: sgh-spark-fade ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        will-change: transform, opacity;
      `;
      container.appendChild(spark);
      active++;
      setTimeout(() => {
        spark.remove();
        active--;
      }, duration + 50);
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawnTime < MIN_INTERVAL) return;

      // Skip micro-movements (e.g. trackpad jitter while idle).
      if (lastX !== -1) {
        const moveDist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (moveDist < 3) return;

        // Faster cursor = more sparks per emit (intensity scales 1 → 1.6)
        const speed = Math.min(moveDist / 8, 1);
        const intensity = 1 + speed * 0.6;
        spawnSpark(e.clientX, e.clientY, intensity);
        // Occasionally double-spawn on fast movement for extra trail
        if (speed > 0.5 && Math.random() < 0.5) {
          spawnSpark(e.clientX, e.clientY, intensity * 0.8);
        }
      } else {
        spawnSpark(e.clientX, e.clientY);
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastSpawnTime = now;
    };

    // Burst on click — extra delight.
    const onClick = (e: MouseEvent) => {
      // Skip if click is on a form input or button to avoid blocking focus visuals.
      const target = e.target as HTMLElement;
      if (target?.matches?.("input, textarea, select")) return;
      for (let i = 0; i < 10; i++) {
        spawnSpark(e.clientX, e.clientY, 1.4);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true, capture: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}
    />
  );
}
