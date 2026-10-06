import { motion, useReducedMotion } from "motion/react";

/*
 * Line-art illustrations for the platform grid. Thin grey strokes, electric-blue
 * blocks and logo-gold accents, each with one small looping motion.
 * Decorative: every SVG is aria-hidden.
 */
const LINE = "#c9cbd6";
const BLUE = "#1f3dff";
const SOFT = "#8c9bff";
const GOLD = "#c29e61";

const loop = (reduce, t) => (reduce ? { duration: 0 } : { repeat: Infinity, ...t });

/** 1. Instant verification: a gauge sweeps while a progress row fills in. */
export function VerifyArt() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true" fill="none">
      <rect x="92" y="28" width="136" height="88" rx="4" stroke={BLUE} strokeWidth="1.5" />
      <path d="M118 104a42 42 0 0 1 84 0" stroke={LINE} strokeWidth="6" />
      <motion.path
        d="M118 104a42 42 0 0 1 84 0"
        stroke={BLUE}
        strokeWidth="6"
        initial={{ pathLength: 0.15 }}
        animate={reduce ? { pathLength: 0.7 } : { pathLength: [0.15, 0.85, 0.15] }}
        transition={loop(reduce, { duration: 4, ease: "easeInOut" })}
      />
      <motion.line
        x1="160" y1="104" x2="160" y2="70" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"
        style={{ originX: "160px", originY: "104px" }}
        initial={{ rotate: -60 }}
        animate={reduce ? { rotate: 30 } : { rotate: [-60, 60, -60] }}
        transition={loop(reduce, { duration: 4, ease: "easeInOut" })}
      />
      <circle cx="160" cy="104" r="4" fill={BLUE} />
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.rect
          key={i} x={96 + i * 11} y="132" width="8" height="8" rx="1"
          fill={i < 8 ? BLUE : SOFT}
          initial={{ opacity: 0.2 }}
          animate={reduce ? { opacity: 1 } : { opacity: [0.2, 1, 1, 0.2] }}
          transition={loop(reduce, { duration: 4, delay: i * 0.12, times: [0, 0.2, 0.8, 1] })}
        />
      ))}
      <rect x="96" y="150" width="128" height="14" rx="2" stroke={LINE} />
      <rect x="99" y="153" width="10" height="8" fill={BLUE} />
      <rect x="40" y="56" width="28" height="28" rx="3" stroke={LINE} />
      <path d="m47 70 5 5 9-10" stroke={BLUE} strokeWidth="2" />
      <rect x="252" y="56" width="28" height="28" rx="3" stroke={LINE} />
      <path d="m259 70 5 5 9-10" stroke={GOLD} strokeWidth="2" />
      <path d="M68 70h24M228 70h24" stroke={LINE} strokeDasharray="2 3" />
    </svg>
  );
}

/** 2. Tamper-proof ledger: blocks linked in a row, a pulse travels the chain. */
export function LedgerArt() {
  const reduce = useReducedMotion();
  const xs = [36, 108, 180, 252];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true" fill="none">
      <line x1="20" y1="100" x2="300" y2="100" stroke={LINE} />
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 22} y="74" width="44" height="52" rx="4" fill={i === 2 ? BLUE : "#fff"} stroke={i === 2 ? BLUE : LINE} strokeWidth="1.5" />
          {[84, 94, 104, 114].map((y, k) => (
            <rect key={y} x={x - 14} y={y} width={k % 2 ? 18 : 28} height="4" rx="1" fill={i === 2 ? "#fff" : k === 0 ? GOLD : LINE} />
          ))}
        </g>
      ))}
      <motion.rect
        y="96" width="10" height="8" rx="1" fill={GOLD}
        initial={{ x: 14 }}
        animate={reduce ? { x: 150 } : { x: [14, 296] }}
        transition={loop(reduce, { duration: 3.2, ease: "linear" })}
      />
      <path d="M160 40v28M160 132v28" stroke={LINE} strokeDasharray="2 3" />
      <rect x="146" y="20" width="28" height="20" rx="3" stroke={LINE} />
      <rect x="146" y="160" width="28" height="20" rx="3" stroke={LINE} />
      <circle cx="160" cy="30" r="3" fill={BLUE} />
      <circle cx="160" cy="170" r="3" fill={GOLD} />
    </svg>
  );
}

/** 3. Open and connected: a hub with lines out to nodes, packets flowing in. */
export function NetworkArt() {
  const reduce = useReducedMotion();
  const nodes = [
    [40, 50], [40, 100], [40, 150], [280, 44], [280, 100], [280, 156],
  ];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true" fill="none">
      {nodes.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} C ${x < 160 ? 110 : 210} ${y}, ${x < 160 ? 120 : 200} 100, ${x < 160 ? 136 : 184} 100`} stroke={LINE} />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`p${i}`} r="3.5" fill={i % 2 ? GOLD : BLUE}
          initial={{ cx: x, cy: y, opacity: 0 }}
          animate={reduce ? { opacity: 0 } : { cx: [x, x < 160 ? 136 : 184], cy: [y, 100], opacity: [0, 1, 0] }}
          transition={loop(reduce, { duration: 2.4, delay: i * 0.4, ease: "easeIn" })}
        />
      ))}
      <rect x="136" y="76" width="48" height="48" rx="6" fill={BLUE} />
      <circle cx="160" cy="100" r="13" stroke="#fff" strokeWidth="2" />
      <circle cx="160" cy="100" r="7" stroke="#fff" strokeWidth="2" />
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          {i % 3 === 0 ? (
            <rect x={x - 7} y={y - 7} width="14" height="14" rx="2" stroke={i < 3 ? BLUE : GOLD} strokeWidth="1.5" fill="#fff" />
          ) : (
            <circle cx={x} cy={y} r="7" stroke={i % 2 ? GOLD : SOFT} strokeWidth="1.5" fill="#fff" />
          )}
        </g>
      ))}
    </svg>
  );
}

/** 4. Identity and access: a target with a scanning ring and an ID card. */
export function IdentityArt() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="62" stroke={LINE} />
      <circle cx="100" cy="100" r="44" stroke={LINE} strokeDasharray="3 4" />
      <motion.circle
        cx="100" cy="100" r="62" stroke={BLUE} strokeWidth="2" pathLength={1} strokeDasharray="0.18 0.82"
        style={{ originX: "100px", originY: "100px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={loop(reduce, { duration: 6, ease: "linear" })}
      />
      <circle cx="100" cy="100" r="22" fill={BLUE} />
      <circle cx="100" cy="100" r="10" stroke="#fff" strokeWidth="2" />
      <path d="M162 100h34" stroke={LINE} strokeDasharray="2 3" />
      <rect x="196" y="66" width="92" height="68" rx="6" stroke={GOLD} strokeWidth="1.5" fill="#fff" />
      <circle cx="218" cy="92" r="9" stroke={GOLD} strokeWidth="1.5" />
      <path d="M208 116c3-6 7-8 10-8s7 2 10 8" stroke={GOLD} strokeWidth="1.5" />
      {[86, 98, 110].map((y, i) => (
        <motion.rect
          key={y} x="238" y={y} height="5" rx="1" fill={i === 0 ? BLUE : LINE}
          initial={{ width: 8 }}
          animate={reduce ? { width: 36 } : { width: [8, 40 - i * 8, 8] }}
          transition={loop(reduce, { duration: 3, delay: i * 0.3, ease: "easeInOut" })}
        />
      ))}
    </svg>
  );
}
