import { motion, useReducedMotion } from "motion/react";

/**
 * Large animated version of the BhuChain logo for the hero.
 *
 * Geometry mirrors the official logo (public/brand/logo-original.webp):
 * silver ring left, gold ring right, interlocked (gold over silver at the top
 * crossing, silver over gold at the bottom), rings broken behind the wordmark,
 * and the श्री mark sitting above the wordmark.
 *
 * Sequence: rings draw in → श्री de-blurs in → wordmark wipes in → a light
 * sheen keeps orbiting the rings and sweeping the gold.
 */
const ease = [0.22, 1, 0.36, 1];

// viewBox units
const VB_W = 1012;
const VB_H = 720;
const SILVER = { cx: 430, cy: 360, r: 230 };
const GOLD = { cx: 562, cy: 364, r: 228 };
const GAP = { y: 299, h: 152 }; // band where the rings break for the wordmark
const STROKE = 27;

export default function BrandEmblem({ className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  const from = (v) => (reduce ? false : v);

  const ring = (c, grad, d) => (
    <motion.circle
      cx={c.cx}
      cy={c.cy}
      r={c.r}
      fill="none"
      stroke={`url(#${grad})`}
      strokeWidth={STROKE}
      strokeLinecap="round"
      transform={`rotate(-90 ${c.cx} ${c.cy})`}
      initial={from({ pathLength: 0, opacity: 0 })}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ pathLength: { duration: 1.8, delay: delay + d, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: delay + d } }}
    />
  );

  // A short bright dash that keeps orbiting a ring.
  const sheen = (c, d, dur) =>
    reduce ? null : (
      <motion.circle
        cx={c.cx}
        cy={c.cy}
        r={c.r}
        fill="none"
        stroke="#f6eed6"
        strokeWidth={STROKE * 0.45}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.06 0.94"
        filter="url(#be-soft)"
        initial={{ strokeDashoffset: 0, opacity: 0 }}
        animate={{ strokeDashoffset: [0, -1], opacity: 0.55 }}
        transition={{
          strokeDashoffset: { duration: dur, repeat: Infinity, ease: "linear", delay: delay + d },
          opacity: { duration: 1, delay: delay + d },
        }}
      />
    );

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="be-gold" x1="0" y1="0" x2="1" y2="1">
            {/* sampled from the official logo */}
            <stop offset="0" stopColor="#eddeb1" />
            <stop offset=".3" stopColor="#c29e61" />
            <stop offset=".55" stopColor="#9e7e49" />
            <stop offset=".8" stopColor="#ddbb8e" />
            <stop offset="1" stopColor="#8f7240" />
          </linearGradient>
          <linearGradient id="be-silver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dad2ce" />
            <stop offset=".35" stopColor="#9d9996" />
            <stop offset=".6" stopColor="#4d4b4a" />
            <stop offset=".85" stopColor="#bbb7b4" />
            <stop offset="1" stopColor="#666261" />
          </linearGradient>
          <filter id="be-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="be-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <mask id="be-gap" maskUnits="userSpaceOnUse" x="-50" y="-50" width={VB_W + 100} height={VB_H + 100}>
            <rect x="-50" y="-50" width={VB_W + 100} height={VB_H + 100} fill="#fff" />
            <rect x="-50" y={GAP.y} width={VB_W + 100} height={GAP.h} fill="#000" />
          </mask>
          {/* region around the lower crossing, where silver is drawn on top */}
          <clipPath id="be-cross">
            <circle cx="496" cy="583" r="46" />
          </clipPath>
        </defs>

        {/* soft glow behind the rings */}
        <motion.g
          initial={from({ opacity: 0 })}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 2, delay: delay + 0.8 }}
          filter="url(#be-glow)"
        >
          <circle cx={SILVER.cx} cy={SILVER.cy} r={SILVER.r} fill="none" stroke="#bbb7b4" strokeOpacity=".3" strokeWidth={STROKE} />
          <circle cx={GOLD.cx} cy={GOLD.cy} r={GOLD.r} fill="none" stroke="#c29e61" strokeOpacity=".6" strokeWidth={STROKE} />
        </motion.g>

        <g mask="url(#be-gap)">
          {ring(SILVER, "be-silver", 0)}
          {ring(GOLD, "be-gold", 0.25)}
          {/* interlock: silver over gold at the bottom crossing */}
          <motion.g
            clipPath="url(#be-cross)"
            initial={from({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 1.9 }}
          >
            <circle cx={SILVER.cx} cy={SILVER.cy} r={SILVER.r} fill="none" stroke="url(#be-silver)" strokeWidth={STROKE} />
          </motion.g>
          {sheen(SILVER, 2.2, 9)}
          {sheen(GOLD, 2.6, 7)}
        </g>
      </svg>

      {/* श्री mark */}
      <motion.div
        aria-hidden="true"
        className="mask-shri bg-gold shimmer absolute"
        style={{ left: "43.6%", top: "26.4%", width: "11%", height: "15.4%" }}
        initial={from({ opacity: 0, scale: 0.85, filter: "blur(12px)" })}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: delay + 1.0, ease }}
      />

      {/* BHUCHAIN wordmark: wipes in left → right, then the gold keeps shimmering */}
      <motion.div
        aria-hidden="true"
        className="mask-wordmark bg-gold shimmer absolute"
        style={{ left: "9.1%", top: "43.4%", width: "81.8%", height: "16.9%" }}
        initial={from({ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" })}
        animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
        transition={{ duration: 1.3, delay: delay + 1.3, ease }}
      />
    </div>
  );
}
