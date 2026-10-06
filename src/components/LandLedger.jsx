import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { blockHash, shortHash } from "../lib/hash.js";
import { toOdia } from "../lib/odia.js";

/**
 * Hero scene: an isometric map of land plots (with the Mahanadi running through).
 * A survey line sweeps the map, one plot rises and turns into a gold block, and
 * that block is appended to the ledger beside the map. Sealed plots keep a gold
 * edge, so the map slowly fills up as a registry would.
 *
 * Pure CSS 3D + Motion. Plot numbers use Odia numerals. All data is illustrative.
 */

const N = 6; // 6 × 6 plots
const CYCLE = 3600; // ms per plot
const BASE = [6, 9, 12]; // resting heights (px) for fields
const LIFT = 64;


// Deterministic "random" so the map looks the same on every load.
const rand = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function buildTiles() {
  const tiles = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = y * N + x;
      // The river runs diagonally across the map.
      const water = x + y === N - 1 || x + y === N;
      tiles.push({
        i,
        x,
        y,
        water,
        plot: 100 + i * 3 + Math.floor(rand(i) * 3),
        h: water ? 0 : BASE[Math.floor(rand(i + 7) * BASE.length)],
        tone: 1 + Math.floor(rand(i + 3) * 3),
      });
    }
  }
  return tiles;
}

export default function LandLedger({ className = "" }) {
  const reduce = useReducedMotion();
  const tiles = useMemo(buildTiles, []);
  const order = useMemo(
    () => tiles.filter((t) => !t.water).map((t) => t.i).sort((a, b) => rand(a + 99) - rand(b + 99)),
    [tiles]
  );

  const [active, setActive] = useState(reduce ? order[0] : -1);
  const [phase, setPhase] = useState(reduce ? "lift" : "idle"); // idle → scan → lift
  const [sealed, setSealed] = useState(() => new Set());
  const [chain, setChain] = useState([]);
  const step = useRef(0);
  const blockNo = useRef(0);
  const prevHash = useRef("0".repeat(64));

  // Seal one plot per cycle.
  useEffect(() => {
    if (reduce) return;
    let timers = [];
    let alive = true;

    const run = () => {
      const k = step.current % order.length;
      const idx = order[k];
      step.current += 1;
      if (k === 0 && step.current > 1) setSealed(new Set()); // start a fresh survey
      setActive(idx);
      setPhase("scan");
      timers.push(setTimeout(() => alive && setPhase("lift"), 700));
      timers.push(
        setTimeout(async () => {
          const tile = tiles[idx];
          blockNo.current += 1;
          const n = blockNo.current;
          const prev = prevHash.current;
          const hash = await blockHash(n, prev, `plot ${tile.plot}`);
          if (!alive) return;
          prevHash.current = hash;
          const block = { n, plot: tile.plot, hash, prev };
          setChain((c) => [block, ...c].slice(0, 3));
          setSealed((s) => new Set(s).add(idx));
          setPhase("idle");
        }, 2300)
      );
    };

    const start = setTimeout(run, 1400); // after the map has risen
    const loop = setInterval(run, CYCLE);
    return () => {
      alive = false;
      clearTimeout(start);
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, [reduce, order, tiles]);

  return (
    <div className={`relative ${className}`}>
      {/* The map */}
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] [perspective:1800px]" aria-hidden="true">
        <div className="preserve-3d absolute left-1/2 top-[46%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2">
        <div className="preserve-3d absolute inset-0" style={{ transform: "rotateX(57deg) rotateZ(45deg)" }}>
          {/* ground shadow + survey grid */}
          <div
            className="absolute -inset-[6%] rounded-[28px]"
            style={{
              background:
                "radial-gradient(closest-side, var(--c-glow), transparent), repeating-linear-gradient(0deg, transparent 0 calc(100%/12 - 1px), var(--c-field-edge) calc(100%/12 - 1px) calc(100%/12)), repeating-linear-gradient(90deg, transparent 0 calc(100%/12 - 1px), var(--c-field-edge) calc(100%/12 - 1px) calc(100%/12))",
              transform: "translateZ(-2px)",
            }}
          />
          <div className="preserve-3d grid h-full w-full gap-[3%]" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
            {tiles.map((t) => (
              <Tile
                key={t.i}
                tile={t}
                reduce={reduce}
                lifted={active === t.i && phase === "lift"}
                scanning={active === t.i && phase === "scan"}
                sealed={sealed.has(t.i) || (reduce && t.i === order[0])}
              />
            ))}
          </div>
          {/* survey sweep */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-y-[-4%] w-[22%]"
              style={{
                background: "linear-gradient(90deg, transparent, rgb(237 222 177 / 0.35), transparent)",
                transform: "translateZ(16px)",
              }}
              initial={{ left: "-25%" }}
              animate={{ left: ["-25%", "105%"] }}
              transition={{ duration: CYCLE / 1000, repeat: Infinity, ease: "linear", delay: 1.4 }}
            />
          )}
        </div>
        </div>
      </div>

      {/* The ledger the plots are written to */}
      <div className="relative z-10 mx-auto -mt-4 w-full max-w-[360px] lg:-mt-14 lg:mr-0 lg:w-[320px]">
        <div className="rounded-2xl border border-line bg-surface/85 p-4 shadow-soft backdrop-blur-md">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-ink">Ledger</p>
            <p className="text-xs text-muted">sample data</p>
          </div>
          {chain.length === 0 && <p className="py-4 text-center text-xs text-muted">Surveying plots…</p>}
          <ol className="mt-3 space-y-2" aria-label="Sample ledger entries">
            <AnimatePresence initial={false}>
              {chain.map((b, i) => (
                <motion.li
                  key={b.n}
                  layout
                  initial={{ opacity: 0, y: -14, scale: 0.96 }}
                  animate={{ opacity: 1 - i * 0.18, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 ${
                    i === 0 ? "border-accent/50 bg-surface-2" : "border-line"
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-semibold text-accent-ink" style={{ background: "var(--gold-face)" }}>
                    {b.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-ink">
                      Plot <span className="font-odia">{toOdia(b.plot)}</span> sealed
                    </span>
                    <span className="block truncate font-mono text-[11px] text-muted">{shortHash(b.hash)}</span>
                  </span>
                  {i === 0 && <span className="h-2 w-2 rounded-full bg-verify" aria-hidden="true" />}
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </div>
  );
}

function Tile({ tile, lifted, scanning, sealed, reduce }) {
  const h = lifted ? LIFT : tile.h;
  const top = tile.water
    ? "var(--c-water)"
    : lifted
      ? "var(--gold-face)"
      : `var(--c-field-${tile.tone})`;
  const side = lifted ? "#8f7240" : tile.water ? "var(--c-water)" : "var(--c-field-side)";
  const side2 = lifted ? "#6f5830" : "var(--c-field-side)";
  const t = reduce ? "none" : "transform 0.9s cubic-bezier(.2,.9,.25,1.15), height 0.9s cubic-bezier(.2,.9,.25,1.15), width 0.9s cubic-bezier(.2,.9,.25,1.15), background 0.4s";

  return (
    <motion.div
      className="preserve-3d relative"
      initial={reduce ? false : { opacity: 0, z: -60 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.8, delay: (tile.x + tile.y) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* front side (+y) */}
      <div
        className="absolute left-0 top-full w-full origin-top"
        style={{ height: h, background: side, transform: "rotateX(90deg)", transition: t, filter: "brightness(0.85)" }}
      />
      {/* right side (+x) */}
      <div
        className="absolute left-full top-0 h-full origin-left"
        style={{ width: h, background: side2, transform: "rotateY(-90deg)", transition: t, filter: "brightness(0.7)" }}
      />
      {/* top */}
      <div
        className="absolute inset-0 grid place-items-center rounded-[3px]"
        style={{
          background: top,
          transform: `translateZ(${h}px)`,
          transition: t,
          boxShadow: scanning
            ? "0 0 0 2px #eddeb1, 0 0 24px 4px rgb(237 222 177 / .6)"
            : sealed
              ? "inset 0 0 0 1.5px #c29e61"
              : "inset 0 0 0 1px var(--c-field-edge)",
        }}
      >
        {!tile.water && (
          <span
            className={`font-odia text-[9px] sm:text-[10px] ${lifted ? "font-bold text-[#1a1408]" : "text-muted/70"}`}
            style={{ transform: "rotateZ(-45deg)" }}
          >
            {toOdia(tile.plot)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
