// Hand-drawn SVG illustration library routed by keyword matching.
// Each scene is a JSX fragment wrapped inside <svg viewBox="0 0 540 220" filter="url(#rough)">.

import type { ReactNode } from "react";

const sketch = "stroke-current fill-none stroke-linecap-round stroke-linejoin-round";

function S({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 540 220" filter="url(#rough)" className="w-full h-full">
      {children}
    </svg>
  );
}

export const SCENES: Record<string, ReactNode> = {
  lookalike: (
    <S>
      <g transform="translate(60,40)">
        <circle stroke="var(--accent)" fill="rgba(122,208,255,0.25)" strokeWidth={2.5} cx={60} cy={70} r={40} />
        <text x={36} y={76} fill="currentColor" style={{ fontWeight: 600, fontSize: 14 }}>seed</text>
        <path stroke="currentColor" fill="none" strokeWidth={2} strokeDasharray="4 4" d="M110 50 L200 30 M110 90 L200 110 M110 70 L200 70" />
      </g>
      <g transform="translate(310,30)">
        {[[30,20,"var(--accent-2)"],[90,40,"var(--accent-3)"],[50,70,"var(--accent)"],[130,80,"var(--accent-warn)"],[40,120,"var(--accent-2)"],[110,130,"var(--accent-3)"],[160,40,"var(--accent)"],[170,120,"var(--accent-warn)"]].map(([x,y,c],i)=>(
          <circle key={i} stroke={c as string} fill="none" strokeWidth={2} cx={x as number} cy={y as number} r={12}/>
        ))}
      </g>
    </S>
  ),
  video: (
    <S>
      <g transform="translate(160,40)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={220} height={140} rx={8} />
        <path stroke="var(--accent-3)" fill="rgba(121,240,198,0.25)" strokeWidth={2.5} d="M85 45 L150 75 L85 105 Z" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M0 120 L220 120" />
        <circle stroke="var(--accent-warn)" fill="var(--accent-warn)" strokeWidth={2} cx={30} cy={120} r={6} />
      </g>
    </S>
  ),
  retarget: (
    <S>
      <g transform="translate(80,60)">
        <ellipse stroke="var(--accent)" fill="none" strokeWidth={2.5} cx={60} cy={50} rx={55} ry={32} />
        <circle stroke="var(--accent-2)" fill="rgba(179,157,255,0.3)" strokeWidth={2.5} cx={60} cy={50} r={18} />
        <circle fill="currentColor" cx={60} cy={50} r={6} />
      </g>
      <g transform="translate(260,30)">
        <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M0 80 Q60 0 180 80" />
        <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M165 75 L180 80 L175 95" />
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={160} y={80} width={100} height={60} rx={6} />
        <text x={178} y={118} fill="currentColor" style={{ fontStyle: "italic", fontSize: 16 }}>come back</text>
      </g>
    </S>
  ),
  funnel: (
    <S>
      <g transform="translate(180,30)">
        <path stroke="var(--accent)" fill="none" strokeWidth={2.5} d="M0 0 L180 0 L120 70 L120 150 L60 150 L60 70 Z" />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2} cx={40} cy={-15} r={8} />
        <circle stroke="var(--accent-3)" fill="none" strokeWidth={2} cx={90} cy={-22} r={8} />
        <circle stroke="var(--accent-warn)" fill="none" strokeWidth={2} cx={140} cy={-15} r={8} />
        <circle stroke="var(--accent-3)" fill="rgba(121,240,198,0.3)" strokeWidth={2.5} cx={90} cy={180} r={14} />
        <text x={83} y={186} fill="currentColor" style={{ fontWeight: 600, fontSize: 16 }}>$</text>
      </g>
    </S>
  ),
  abtest: (
    <S>
      <g transform="translate(70,40)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={180} height={140} rx={6} />
        <text x={78} y={35} fill="currentColor" style={{ fontWeight: 600, fontSize: 28 }}>A</text>
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M20 60 L160 60 M20 80 L130 80 M20 100 L150 100" />
        <rect stroke="var(--accent-3)" fill="none" strokeWidth={2} x={55} y={115} width={70} height={18} rx={3} />
      </g>
      <g transform="translate(290,40)">
        <rect stroke="var(--accent-2)" fill="none" strokeWidth={2.5} x={0} y={0} width={180} height={140} rx={6} />
        <text x={78} y={35} fill="currentColor" style={{ fontWeight: 600, fontSize: 28 }}>B</text>
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M20 60 L160 60 M20 80 L130 80 M20 100 L150 100" />
        <rect stroke="var(--accent-warn)" fill="rgba(255,184,107,0.3)" strokeWidth={2} x={55} y={115} width={70} height={18} rx={3} />
      </g>
    </S>
  ),
  landing: (
    <S>
      <g transform="translate(100,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={340} height={170} rx={8} />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M0 28 L340 28" />
        <circle fill="var(--accent-warn)" cx={14} cy={14} r={4} />
        <circle fill="var(--accent-3)" cx={28} cy={14} r={4} />
        <circle fill="var(--accent)" cx={42} cy={14} r={4} />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M30 55 L260 55 M30 75 L200 75" />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.2)" strokeWidth={2} x={30} y={100} width={120} height={32} rx={4} />
        <text x={50} y={121} fill="currentColor" style={{ fontStyle: "italic", fontSize: 14 }}>Start free →</text>
      </g>
    </S>
  ),
  form: (
    <S>
      <g transform="translate(150,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={240} height={170} rx={8} />
        <rect stroke="currentColor" fill="none" strokeWidth={2} x={20} y={25} width={200} height={28} rx={3} />
        <rect stroke="currentColor" fill="none" strokeWidth={2} x={20} y={65} width={200} height={28} rx={3} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.25)" strokeWidth={2.5} x={20} y={110} width={200} height={36} rx={4} />
        <text x={78} y={133} fill="currentColor" style={{ fontSize: 15 }}>Get started</text>
      </g>
    </S>
  ),
  cart: (
    <S>
      <g transform="translate(120,40)">
        <path stroke="var(--accent)" fill="none" strokeWidth={2.5} d="M0 0 L25 0 L40 90 L160 90 L180 30 L40 30" />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2.5} cx={60} cy={115} r={12} />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2.5} cx={140} cy={115} r={12} />
        <path stroke="var(--accent-warn)" fill="none" strokeWidth={3} strokeLinecap="round" d="M210 30 L260 0 M260 30 L210 0" />
        <text x={206} y={-10} fill="var(--accent-warn)" style={{ fontStyle: "italic", fontSize: 14 }}>abandoned</text>
      </g>
    </S>
  ),
  pricing: (
    <S>
      <g transform="translate(60,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={20} width={130} height={160} rx={6} />
        <text x={36} y={55} fill="currentColor" style={{ fontWeight: 500, fontSize: 24 }}>£9</text>
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.2)" strokeWidth={2.5} x={150} y={0} width={130} height={200} rx={6} />
        <text x={180} y={40} fill="currentColor" style={{ fontWeight: 700, fontSize: 26 }}>£29</text>
        <rect stroke="var(--accent-3)" fill="none" strokeWidth={2.5} x={300} y={20} width={130} height={160} rx={6} />
        <text x={332} y={55} fill="currentColor" style={{ fontWeight: 500, fontSize: 24 }}>£99</text>
      </g>
    </S>
  ),
  email: (
    <S>
      <g transform="translate(140,40)">
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.1)" strokeWidth={2.5} x={0} y={0} width={260} height={140} rx={6} />
        <path stroke="var(--accent-2)" fill="none" strokeWidth={2.5} d="M0 0 L130 90 L260 0" />
      </g>
    </S>
  ),
  network: (
    <S>
      <circle stroke="var(--accent)" fill="rgba(122,208,255,0.18)" strokeWidth={2.5} cx={270} cy={110} r={24} />
      <text x={260} y={116} fill="currentColor" style={{ fontWeight: 600, fontSize: 13 }}>you</text>
      <g stroke="var(--accent-2)" fill="none" strokeWidth={2}>
        <circle cx={120} cy={50} r={16} /><circle cx={420} cy={50} r={16} />
        <circle cx={80} cy={170} r={16} /><circle cx={460} cy={170} r={16} />
        <circle cx={170} cy={110} r={14} /><circle cx={370} cy={110} r={14} />
        <circle cx={270} cy={30} r={14} /><circle cx={270} cy={190} r={14} />
      </g>
      <g stroke="currentColor" fill="none" strokeWidth={1.5} strokeDasharray="4 5">
        <path d="M270 110 L120 50" /><path d="M270 110 L420 50" />
        <path d="M270 110 L80 170" /><path d="M270 110 L460 170" />
        <path d="M270 110 L170 110" /><path d="M270 110 L370 110" />
        <path d="M270 110 L270 30" /><path d="M270 110 L270 190" />
      </g>
    </S>
  ),
  loop: (
    <S>
      <g transform="translate(270,110)">
        <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M -60 0 A 60 60 0 1 1 60 0" />
        <path stroke="var(--accent)" fill="none" strokeWidth={2.5} d="M 60 0 A 60 60 0 1 1 -60 0" />
        <path stroke="var(--accent-2)" fill="rgba(179,157,255,0.18)" strokeWidth={2.5} d="M 0 -8 C -8 -22 -28 -22 -28 -4 C -28 12 0 28 0 28 C 0 28 28 12 28 -4 C 28 -22 8 -22 0 -8 Z" />
      </g>
    </S>
  ),
  search: (
    <S>
      <g transform="translate(90,60)">
        <circle stroke="var(--accent)" fill="none" strokeWidth={3} cx={60} cy={60} r={50} />
        <path stroke="var(--accent)" fill="none" strokeWidth={4} strokeLinecap="round" d="M96 96 L140 140" />
        <text x={32} y={68} fill="currentColor" style={{ fontStyle: "italic", fontSize: 18 }}>how to</text>
      </g>
    </S>
  ),
  article: (
    <S>
      <g transform="translate(100,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={160} height={170} rx={4} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.2)" strokeWidth={2} x={14} y={14} width={132} height={50} />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M14 80 L146 80 M14 95 L130 95 M14 110 L140 110 M14 125 L120 125 M14 140 L138 140 M14 155 L100 155" />
      </g>
    </S>
  ),
  backlink: (
    <S>
      <g transform="translate(100,80)">
        <path stroke="var(--accent)" fill="none" strokeWidth={3} d="M40 30 C 20 30 0 50 0 70 C 0 90 20 110 40 110 L80 110" />
        <path stroke="var(--accent)" fill="none" strokeWidth={3} d="M40 30 L80 30" />
        <path stroke="var(--accent-3)" fill="none" strokeWidth={3} d="M120 70 L240 70" />
        <path stroke="var(--accent-2)" fill="none" strokeWidth={3} d="M280 30 L240 30 C 220 30 200 50 200 70 C 200 90 220 110 240 110 L280 110" />
        <path stroke="var(--accent-2)" fill="none" strokeWidth={3} d="M280 30 L320 30 C 340 30 360 50 360 70 C 360 90 340 110 320 110 L280 110" />
      </g>
    </S>
  ),
  cohort: (
    <S>
      <g transform="translate(80,40)">
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M0 140 L380 140 M0 140 L0 0" />
        <path stroke="var(--accent)" fill="none" strokeWidth={2.5} d="M0 20 C 60 60 120 80 200 90 C 280 100 340 105 380 108" />
        <path stroke="var(--accent-2)" fill="none" strokeWidth={2.5} d="M0 40 C 60 90 120 110 200 115 C 280 120 340 122 380 124" />
        <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M0 60 C 60 110 120 125 200 128 C 280 130 340 131 380 132" />
      </g>
    </S>
  ),
  bars: (
    <S>
      <g transform="translate(100,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={110} width={50} height={50} />
        <rect stroke="var(--accent-2)" fill="none" strokeWidth={2.5} x={65} y={80} width={50} height={80} />
        <rect stroke="var(--accent-3)" fill="none" strokeWidth={2.5} x={130} y={40} width={50} height={120} />
        <rect stroke="var(--accent-warn)" fill="rgba(255,184,107,0.25)" strokeWidth={2.5} x={195} y={0} width={50} height={160} />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} d="M0 145 L260 0" />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} d="M245 5 L260 0 L255 20" />
      </g>
    </S>
  ),
  ai: (
    <S>
      <g transform="translate(180,40)">
        <rect stroke="var(--accent-2)" fill="none" strokeWidth={2.5} x={20} y={20} width={140} height={100} rx={8} />
        <rect stroke="var(--accent)" fill="none" strokeWidth={2} x={50} y={50} width={80} height={40} />
        <text x={68} y={78} fill="currentColor" style={{ fontStyle: "italic", fontWeight: 500, fontSize: 20 }}>AI</text>
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M0 40 L20 40 M0 60 L20 60 M0 80 L20 80 M0 100 L20 100" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M160 40 L180 40 M160 60 L180 60 M160 80 L180 80 M160 100 L180 100" />
      </g>
    </S>
  ),
  target: (
    <S>
      <g transform="translate(190,30)">
        <circle stroke="var(--accent)" fill="none" strokeWidth={2.5} cx={80} cy={80} r={78} />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2.5} cx={80} cy={80} r={55} />
        <circle stroke="var(--accent-3)" fill="none" strokeWidth={2.5} cx={80} cy={80} r={32} />
        <circle stroke="var(--accent-warn)" fill="rgba(255,184,107,0.3)" strokeWidth={2.5} cx={80} cy={80} r={10} />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} d="M -30 -20 L 75 75" />
      </g>
    </S>
  ),
  megaphone: (
    <S>
      <g transform="translate(70,60)">
        <path stroke="var(--accent)" fill="rgba(122,208,255,0.15)" strokeWidth={2.5} d="M0 50 L0 90 L20 90 L20 50 Z" />
        <path stroke="var(--accent)" fill="rgba(122,208,255,0.15)" strokeWidth={2.5} d="M20 30 L160 0 L160 140 L20 110 Z" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M180 40 Q200 70 180 100" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M200 20 Q230 70 200 120" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M220 5 Q260 70 220 135" />
      </g>
    </S>
  ),
  gift: (
    <S>
      <g transform="translate(180,40)">
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.2)" strokeWidth={2.5} x={0} y={30} width={180} height={120} rx={4} />
        <path stroke="var(--accent-warn)" fill="none" strokeWidth={3} d="M90 30 L90 150" />
        <path stroke="var(--accent-warn)" fill="rgba(255,184,107,0.3)" strokeWidth={2.5} d="M90 30 C 70 10 50 20 60 35 C 65 42 78 36 90 30 Z M90 30 C 110 10 130 20 120 35 C 115 42 102 36 90 30 Z" />
      </g>
    </S>
  ),
  badge: (
    <S>
      <g transform="translate(220,30)">
        <path stroke="var(--accent-warn)" fill="rgba(255,184,107,0.3)" strokeWidth={3} d="M50 0 L100 30 L100 100 L50 140 L0 100 L0 30 Z" />
        <path stroke="var(--accent-2)" fill="none" strokeWidth={2.5} d="M30 70 L45 85 L75 50" />
      </g>
    </S>
  ),
  lock: (
    <S>
      <g transform="translate(220,30)">
        <path stroke="var(--accent)" fill="none" strokeWidth={3} d="M30 70 Q30 20 70 20 Q110 20 110 70" />
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.25)" strokeWidth={2.5} x={10} y={70} width={120} height={100} rx={6} />
        <circle fill="var(--accent-2)" cx={70} cy={115} r={8} />
      </g>
    </S>
  ),
  share: (
    <S>
      <g transform="translate(140,40)">
        <circle stroke="var(--accent)" fill="rgba(122,208,255,0.3)" strokeWidth={2.5} cx={30} cy={30} r={22} />
        <circle stroke="var(--accent-2)" fill="rgba(179,157,255,0.3)" strokeWidth={2.5} cx={220} cy={30} r={22} />
        <circle stroke="var(--accent-3)" fill="rgba(121,240,198,0.3)" strokeWidth={2.5} cx={220} cy={130} r={22} />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} strokeDasharray="4 4" d="M52 30 L198 30" />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} strokeDasharray="4 4" d="M52 30 L198 130" />
      </g>
    </S>
  ),
  document: (
    <S>
      <g transform="translate(160,30)">
        <path stroke="var(--accent)" fill="rgba(122,208,255,0.08)" strokeWidth={2.5} d="M0 0 L160 0 L220 50 L220 180 L0 180 Z" />
        <path stroke="var(--accent)" fill="none" strokeWidth={2.5} d="M160 0 L160 50 L220 50" />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M20 80 L200 80 M20 100 L180 100 M20 120 L200 120 M20 140 L170 140" />
      </g>
    </S>
  ),
  globe: (
    <S>
      <g transform="translate(190,30)">
        <circle stroke="var(--accent)" fill="none" strokeWidth={2.5} cx={80} cy={80} r={74} />
        <path stroke="var(--accent)" fill="none" strokeWidth={2} d="M6 80 L154 80" />
        <path stroke="var(--accent)" fill="none" strokeWidth={2} d="M80 6 L80 154" />
        <ellipse stroke="var(--accent)" fill="none" strokeWidth={2} cx={80} cy={80} rx={40} ry={74} />
        <ellipse stroke="var(--accent)" fill="none" strokeWidth={2} cx={80} cy={80} rx={74} ry={40} />
      </g>
    </S>
  ),
  metric: (
    <S>
      <g transform="translate(60,30)">
        <text x={0} y={80} fill="var(--accent)" style={{ fontWeight: 700, fontSize: 60 }}>+47%</text>
        <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M260 140 L300 100 L340 110 L380 60 L420 70 L460 20" />
        <circle fill="var(--accent-3)" cx={460} cy={20} r={5} />
      </g>
    </S>
  ),
  stars: (
    <S>
      <g stroke="var(--accent-warn)" fill="rgba(255,184,107,0.35)" strokeWidth={2.5}>
        <path d="M100 90 L112 116 L140 120 L120 140 L124 168 L100 154 L76 168 L80 140 L60 120 L88 116 Z" />
        <path d="M200 90 L212 116 L240 120 L220 140 L224 168 L200 154 L176 168 L180 140 L160 120 L188 116 Z" />
        <path d="M300 90 L312 116 L340 120 L320 140 L324 168 L300 154 L276 168 L280 140 L260 120 L288 116 Z" />
        <path d="M400 90 L412 116 L440 120 L420 140 L424 168 L400 154 L376 168 L380 140 L360 120 L388 116 Z" />
      </g>
    </S>
  ),
  testimonial: (
    <S>
      <g transform="translate(100,40)">
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.08)" strokeWidth={2.5} x={0} y={0} width={340} height={140} rx={8} />
        <text x={10} y={50} fill="var(--accent)" style={{ fontSize: 48 }}>&ldquo;</text>
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M50 50 L320 50 M50 70 L300 70 M50 90 L260 90" />
        <circle stroke="var(--accent-2)" fill="rgba(179,157,255,0.3)" strokeWidth={2} cx={40} cy={115} r={12} />
      </g>
    </S>
  ),
  checklist: (
    <S>
      <g transform="translate(150,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={240} height={170} rx={6} />
        <g transform="translate(20,28)">
          <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.3)" strokeWidth={2} x={0} y={0} width={20} height={20} rx={3} />
          <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M4 10 L9 14 L17 4" />
          <path stroke="currentColor" fill="none" strokeWidth={2} d="M34 12 L180 12" />
        </g>
        <g transform="translate(20,60)">
          <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.3)" strokeWidth={2} x={0} y={0} width={20} height={20} rx={3} />
          <path stroke="var(--accent-3)" fill="none" strokeWidth={2.5} d="M4 10 L9 14 L17 4" />
          <path stroke="currentColor" fill="none" strokeWidth={2} d="M34 12 L160 12" />
        </g>
        <g transform="translate(20,92)">
          <rect stroke="var(--accent-2)" fill="none" strokeWidth={2} x={0} y={0} width={20} height={20} rx={3} />
          <path stroke="currentColor" fill="none" strokeWidth={2} d="M34 12 L200 12" />
        </g>
      </g>
    </S>
  ),
  progress: (
    <S>
      <g transform="translate(50,90)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={440} height={40} rx={20} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.45)" strokeWidth={2.5} x={0} y={0} width={280} height={40} rx={20} />
        <text x={180} y={-10} fill="currentColor" style={{ fontStyle: "italic", fontSize: 16 }}>63% done</text>
      </g>
    </S>
  ),
  clock: (
    <S>
      <g transform="translate(190,30)">
        <circle stroke="var(--accent-warn)" fill="none" strokeWidth={3} cx={80} cy={80} r={72} />
        <path stroke="var(--accent-warn)" fill="none" strokeWidth={3} d="M80 80 L80 28" />
        <path stroke="var(--accent-warn)" fill="none" strokeWidth={3} d="M80 80 L120 100" />
      </g>
    </S>
  ),
  waitlist: (
    <S>
      <g transform="translate(80,80)">
        <circle stroke="var(--accent)" fill="none" strokeWidth={2.5} cx={20} cy={30} r={20} />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2.5} cx={80} cy={30} r={20} />
        <circle stroke="var(--accent-3)" fill="none" strokeWidth={2.5} cx={140} cy={30} r={20} />
        <circle stroke="var(--accent-warn)" fill="rgba(255,184,107,0.25)" strokeWidth={2.5} cx={200} cy={30} r={20} />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} d="M230 30 L290 30 M278 22 L290 30 L278 38" />
      </g>
    </S>
  ),
  ad: (
    <S>
      <g transform="translate(120,40)">
        <rect stroke="var(--accent-2)" fill="none" strokeWidth={2.5} x={0} y={0} width={140} height={140} rx={6} />
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.15)" strokeWidth={2} x={14} y={14} width={112} height={60} />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M20 90 L120 90 M20 105 L100 105 M20 120 L80 120" />
      </g>
      <g transform="translate(310,50)">
        <rect stroke="var(--accent-3)" fill="none" strokeWidth={2.5} x={0} y={0} width={140} height={120} rx={6} />
        <circle stroke="var(--accent-warn)" fill="rgba(255,184,107,0.2)" strokeWidth={2} cx={40} cy={40} r={18} />
        <path stroke="currentColor" fill="none" strokeWidth={2} d="M14 80 L126 80 M14 95 L100 95" />
      </g>
    </S>
  ),
  social: (
    <S>
      <g transform="translate(80,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={160} height={160} rx={10} />
        <circle stroke="var(--accent-2)" fill="none" strokeWidth={2} cx={25} cy={25} r={10} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.18)" strokeWidth={2} x={14} y={50} width={132} height={70} />
        <path stroke="var(--accent-warn)" fill="rgba(255,184,107,0.35)" strokeWidth={2} d="M30 140 C 22 130 22 118 32 118 C 38 118 40 124 40 124 C 40 124 42 118 48 118 C 58 118 58 130 50 140 L40 148 Z" />
      </g>
    </S>
  ),
  signup: (
    <S>
      <g transform="translate(150,40)">
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.1)" strokeWidth={2.5} x={0} y={0} width={240} height={40} rx={20} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.4)" strokeWidth={2.5} x={160} y={-2} width={84} height={44} rx={22} />
        <text x={172} y={26} fill="currentColor" style={{ fontStyle: "italic", fontSize: 14 }}>Notify me</text>
      </g>
    </S>
  ),
  exitintent: (
    <S>
      <g transform="translate(80,40)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={120} height={140} rx={4} />
        <path stroke="var(--accent-warn)" fill="none" strokeWidth={3} d="M130 70 L260 70 M240 60 L260 70 L240 80" />
      </g>
      <g transform="translate(310,30)">
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.18)" strokeWidth={2.5} x={0} y={0} width={160} height={160} rx={8} />
        <text x={18} y={35} fill="currentColor" style={{ fontStyle: "italic", fontSize: 18 }}>Wait!</text>
      </g>
    </S>
  ),
  checkout: (
    <S>
      <g transform="translate(150,40)">
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.1)" strokeWidth={2.5} x={0} y={0} width={240} height={140} rx={10} />
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.25)" strokeWidth={2.5} x={20} y={20} width={60} height={40} rx={4} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.3)" strokeWidth={2} x={140} y={95} width={80} height={30} rx={4} />
        <text x={166} y={115} fill="currentColor" style={{ fontSize: 14 }}>Pay</text>
      </g>
    </S>
  ),
  coupon: (
    <S>
      <g transform="translate(100,50)">
        <path stroke="var(--accent-warn)" fill="rgba(255,184,107,0.2)" strokeWidth={2.5} d="M0 0 L260 0 L260 50 Q245 60 245 70 Q245 80 260 90 L260 140 L0 140 L0 90 Q15 80 15 70 Q15 60 0 50 Z" />
        <path stroke="currentColor" fill="none" strokeWidth={2} strokeDasharray="4 4" d="M90 10 L90 130" />
        <text x={20} y={85} fill="var(--accent-warn)" style={{ fontWeight: 700, fontSize: 34 }}>20%</text>
      </g>
    </S>
  ),
  upsell: (
    <S>
      <g transform="translate(100,50)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={40} width={90} height={80} rx={4} />
        <text x={34} y={88} fill="currentColor" style={{ fontSize: 18 }}>£9</text>
        <path stroke="var(--accent-3)" fill="none" strokeWidth={3} d="M100 80 L150 80 M138 70 L150 80 L138 90" />
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.2)" strokeWidth={2.5} x={160} y={10} width={120} height={140} rx={4} />
        <text x={190} y={80} fill="currentColor" style={{ fontWeight: 700, fontSize: 26 }}>£29</text>
      </g>
    </S>
  ),
  chat: (
    <S>
      <g transform="translate(80,40)">
        <path stroke="var(--accent)" fill="rgba(122,208,255,0.15)" strokeWidth={2.5} d="M0 10 Q0 0 10 0 L140 0 Q150 0 150 10 L150 80 Q150 90 140 90 L40 90 L20 110 L25 90 L10 90 Q0 90 0 80 Z" />
      </g>
      <g transform="translate(260,60)">
        <path stroke="var(--accent-3)" fill="rgba(121,240,198,0.2)" strokeWidth={2.5} d="M180 10 Q180 0 170 0 L20 0 Q10 0 10 10 L10 80 Q10 90 20 90 L140 90 L160 110 L155 90 L170 90 Q180 90 180 80 Z" />
      </g>
    </S>
  ),
  layers: (
    <S>
      <g transform="translate(160,40)">
        <path stroke="var(--accent)" fill="rgba(122,208,255,0.15)" strokeWidth={2.5} d="M110 0 L220 50 L110 100 L0 50 Z" />
        <path stroke="var(--accent-2)" fill="rgba(179,157,255,0.15)" strokeWidth={2.5} d="M110 50 L220 100 L110 150 L0 100 Z" />
        <path stroke="var(--accent-3)" fill="rgba(121,240,198,0.18)" strokeWidth={2.5} d="M110 100 L220 150 L110 200 L0 150 Z" />
      </g>
    </S>
  ),
  notification: (
    <S>
      <g transform="translate(200,40)">
        <path stroke="var(--accent-warn)" fill="rgba(255,184,107,0.2)" strokeWidth={2.5} d="M70 20 C 30 20 30 60 30 90 C 30 110 20 120 10 130 L130 130 C 120 120 110 110 110 90 C 110 60 110 20 70 20 Z" />
        <circle stroke="var(--accent-2)" fill="var(--accent-2)" strokeWidth={2} cx={105} cy={35} r={14} />
        <path stroke="currentColor" fill="none" strokeWidth={2.5} d="M55 140 Q70 155 85 140" />
      </g>
    </S>
  ),
  poll: (
    <S>
      <g transform="translate(110,40)">
        <rect stroke="currentColor" fill="none" strokeWidth={2.5} x={0} y={0} width={320} height={32} rx={4} />
        <rect stroke="var(--accent)" fill="rgba(122,208,255,0.4)" strokeWidth={2.5} x={0} y={0} width={220} height={32} rx={4} />
        <rect stroke="currentColor" fill="none" strokeWidth={2.5} x={0} y={44} width={320} height={32} rx={4} />
        <rect stroke="var(--accent-2)" fill="rgba(179,157,255,0.4)" strokeWidth={2.5} x={0} y={44} width={80} height={32} rx={4} />
        <rect stroke="currentColor" fill="none" strokeWidth={2.5} x={0} y={88} width={320} height={32} rx={4} />
        <rect stroke="var(--accent-3)" fill="rgba(121,240,198,0.4)" strokeWidth={2.5} x={0} y={88} width={26} height={32} rx={4} />
      </g>
    </S>
  ),
  heatmap: (
    <S>
      <g transform="translate(80,30)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={0} width={320} height={170} rx={6} />
        <circle fill="rgba(255,107,107,0.25)" cx={80} cy={60} r={32} />
        <circle fill="rgba(255,107,107,0.4)" cx={80} cy={60} r={20} />
        <circle fill="rgba(255,107,107,0.7)" cx={80} cy={60} r={10} />
        <circle fill="rgba(255,184,107,0.2)" cx={200} cy={100} r={40} />
        <circle fill="rgba(121,240,198,0.4)" cx={250} cy={40} r={22} />
      </g>
    </S>
  ),
  partner: (
    <S>
      <g transform="translate(70,40)">
        <rect stroke="var(--accent)" fill="none" strokeWidth={2.5} x={0} y={20} width={140} height={120} rx={6} />
        <text x={40} y={90} fill="currentColor" style={{ fontWeight: 700, fontSize: 24 }}>A</text>
        <path stroke="var(--accent-3)" fill="none" strokeWidth={3} d="M160 80 L240 80 M180 60 L160 80 L180 100 M220 60 L240 80 L220 100" />
        <rect stroke="var(--accent-2)" fill="none" strokeWidth={2.5} x={260} y={20} width={140} height={120} rx={6} />
        <text x={300} y={90} fill="currentColor" style={{ fontWeight: 700, fontSize: 24 }}>B</text>
      </g>
    </S>
  ),
};

const CATEGORY_DEFAULT: Record<string, string> = {
  Traffic: "megaphone",
  Conversion: "funnel",
  Retention: "loop",
  Monetization: "bars",
  Referral: "network",
  "AI GEO": "ai",
  Strategy: "target",
};

const ROUTES: [RegExp, string][] = [
  [/easter egg|word[- ]of[- ]mouth/i, "gift"],
  [/powered[- ]by|distribution badge/i, "badge"],
  [/welcome mat|fullscreen popup/i, "landing"],
  [/convince your boss|champion enable/i, "email"],
  [/click[- ]to[- ]tweet|pull quote/i, "share"],
  [/404[- ]/i, "form"],
  [/head[- ]start|artificial progress|endowed progress/i, "progress"],
  [/cloneable|template library|template gallery/i, "document"],
  [/locked (premium|feature)|disabled premium/i, "lock"],
  [/unlinked mention/i, "backlink"],
  [/try it yourself|embeddable widget|embed widget/i, "ad"],
  [/pretarget|pre[- ]targeting/i, "retarget"],
  [/reveal loop|ip[- ]to[- ]account|reverse[- ]ip/i, "target"],
  [/build[- ]in[- ]public|building in public/i, "metric"],
  [/breakup email|breakup last[- ]touch/i, "email"],
  [/pause(?!.*pop)|cancel flow|subscription pause/i, "loop"],
  [/skyscraper/i, "article"],
  [/viral waitlist|position[- ]jumping|jumping waitlist/i, "waitlist"],
  [/random act|kindness|surprise gift/i, "gift"],
  [/power[- ]parity|ppp pricing|geo[- ]priced|geo[- ]pricing/i, "globe"],
  [/just bought|live (sales|purchase) popup|social proof popup/i, "stars"],
  [/\$1 (validation|pricing|founding)|founding user pricing/i, "coupon"],
  [/\babandon/i, "cart"],
  [/\bcheckout\b|\bcart\b|add[- ]to[- ]cart/i, "checkout"],
  [/lookalike|seed audience|similar audience/i, "lookalike"],
  [/retarget|remarket|win[- ]back|winback/i, "retarget"],
  [/\bvideo\b|\bvsl\b|\breel\b|tiktok|youtube short|hook test/i, "video"],
  [/podcast|audio show/i, "ai"],
  [/webinar|live demo|live event/i, "chat"],
  [/\bugc\b|user[- ]generated|creator (whitelist|partner|content)|influenc/i, "social"],
  [/spark ad|boost(ed)? post/i, "megaphone"],
  [/social (post|organic)|organic social|engagement bait|viral|comment seed/i, "social"],
  [/\bfunnel\b|drop[- ]?off/i, "funnel"],
  [/a\/?b test|split test|multivariate|hold[- ]?out|holdout/i, "abtest"],
  [/exit[- ]intent|exit pop/i, "exitintent"],
  [/landing page|hero section|above[- ]the[- ]fold|long[- ]form page|sales page/i, "landing"],
  [/\bform\b|lead capture|opt[- ]in|capture page/i, "form"],
  [/\bsignup\b|sign[- ]up|email capture|newsletter signup|notify me/i, "signup"],
  [/waitlist|queue|early access|invite list/i, "waitlist"],
  [/free trial|trial extension|free[- ]?to[- ]?paid|trial conversion/i, "checklist"],
  [/onboarding|activation|first session|aha moment|setup wizard/i, "checklist"],
  [/progress bar|progress indicator|completion meter/i, "progress"],
  [/urgency|countdown|deadline|expir|scarcity|limited time|flash/i, "clock"],
  [/paywall|gated content|members only|premium tier|locked feature/i, "lock"],
  [/\bpric|\btier\b|plan comparison|grandfather|annual discount|usage[- ]based|freemium/i, "pricing"],
  [/discount|coupon|promo code|bogo|% off\b|sale price|flash sale/i, "coupon"],
  [/upsell|cross[- ]sell|order bump|upgrade prompt|expansion revenue/i, "upsell"],
  [/\barpu\b|\bltv\b|\bmrr\b|\barr\b|ltv:cac|monetiz|revenue lift/i, "bars"],
  [/cohort|retention curve|stickiness|dau\/mau/i, "cohort"],
  [/referral|invite|refer[- ]a[- ]friend|word of mouth/i, "network"],
  [/\bgift\b|reward program|free reward/i, "gift"],
  [/partner|co[- ]marketing|integration partner|alliance|joint launch/i, "partner"],
  [/\bseo\b|search engine|\bserp\b|google rank|keyword/i, "search"],
  [/\bblog\b|long[- ]form article|content piece|guest post|listicle/i, "article"],
  [/backlink|link building|\bpr\b link|domain rating|hardo|haro/i, "backlink"],
  [/\bemail\b|drip|sequence|lifecycle email|broadcast|newsletter/i, "email"],
  [/push notif|browser notif|app notification|in[- ]app message/i, "notification"],
  [/live chat|intercom|conversational|chat widget|chatbot/i, "chat"],
  [/testimonial|case study|social proof|customer quote/i, "testimonial"],
  [/\brating\b|\bstars?\b|\bnps\b|\bcsat\b|review/i, "stars"],
  [/heatmap|session recording|click map|scroll depth/i, "heatmap"],
  [/survey|\bpoll\b|feedback form|vote on/i, "poll"],
  [/badge|achievement|milestone|gamif/i, "badge"],
  [/share button|social share|tweet share|share prompt/i, "share"],
  [/\bkpi\b|north star|dashboard|analytics|attribution/i, "metric"],
  [/global|localiz|international|geo[- ]target|country expansion|geo[- ]fence/i, "globe"],
  [/\bllm\b|chatgpt|\bgpt\b|gemini|perplexity|generative|prompt|ai answer|ai citation/i, "ai"],
  [/\bicp\b|persona|positioning|playbook|brand strateg/i, "target"],
  [/\bstack\b|architecture|framework|tech stack/i, "layers"],
  [/whitepaper|template download|pdf download|free report/i, "document"],
  [/\btest\b|experiment|hypothes/i, "abtest"],
  [/audience|segment/i, "lookalike"],
  [/conversion rate|\bcvr\b|conversion lift/i, "metric"],
];

export function pickScene(tactic: { tactic: string; how?: string; channel?: string; category: string }): ReactNode {
  const title = tactic.tactic || "";
  const full = `${title} ${tactic.how || ""} ${tactic.channel || ""}`;
  for (const [re, key] of ROUTES) if (re.test(title)) return SCENES[key];
  for (const [re, key] of ROUTES) if (re.test(full)) return SCENES[key];
  return SCENES[CATEGORY_DEFAULT[tactic.category]] || SCENES.target;
}
