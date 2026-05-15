import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Startup Growth Hacks — 464 hand-illustrated growth plays for 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0b0d",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Inter, system-ui",
          letterSpacing: "-0.04em",
        }}
      >
        {/* Cyan orb */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(122,208,255,0.45), transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Purple orb */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: -180,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(179,157,255,0.4), transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        {/* Logomark + wordmark row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "conic-gradient(from 0deg, #7ad0ff, #b39dff, #ff8fc8, #ffb86b, #79f0c6, #7ad0ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0b0d",
              fontSize: 30,
              fontWeight: 800,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -8px rgba(122,208,255,0.5)",
            }}
          >
            S
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ color: "#e9ecef", fontSize: 26, fontWeight: 600 }}>
              Startup Growth Hacks
            </span>
            <span style={{ color: "#5b636f", fontSize: 14, marginTop: 2, fontFamily: "monospace", letterSpacing: 1 }}>
              startupgrowthhacks.com
            </span>
          </div>
        </div>

        {/* Big headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#e9ecef",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 0.98,
          }}
        >
          <span>Steal the</span>
          <span
            style={{
              backgroundImage: "linear-gradient(110deg, #7ad0ff 0%, #b39dff 22%, #ff8fc8 42%, #ffb86b 60%, #79f0c6 80%, #7ad0ff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            growth hacks
          </span>
          <span>behind every unicorn.</span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: "auto",
            color: "#8a93a0",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(122,208,255,0.12)",
              border: "1px solid rgba(122,208,255,0.3)",
              color: "#7ad0ff",
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            464 HACKS · LIVE
          </span>
          <span>·</span>
          <span>The how, the example, the gotcha. No fluff.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
