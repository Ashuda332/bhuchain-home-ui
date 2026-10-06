import { useEffect, useRef } from "react";

/**
 * Golden dot sweep: two soft, oval bands of light travel outward from the left
 * and right ends of the BHUCHAIN wordmark towards the screen edges, revealing a
 * fixed grid of gold dots as they pass, then fade. Slow, and repeats after a pause.
 *
 * `anchorRef` points at the emblem; the sweep starts at the wordmark's edges
 * and follows the emblem if it moves (e.g. on scroll).
 * Decorative (aria-hidden); off with reduced motion; paused off-screen.
 */
const GAP = 11; // dot grid spacing (px)
const DURATION = 5200; // one sweep, ms
const PAUSE = 2200; // rest between sweeps, ms
const START_DELAY = 2300; // wait for the logo intro

// Where the wordmark sits inside the emblem box (see BrandEmblem.jsx).
const WORD = { cy: 0.518, half: 0.409, h: 0.169 };

export default function GoldDotSweep({ anchorRef, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now() + START_DELAY;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic: fast start, slow drift

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);
      const anchor = anchorRef?.current;
      const elapsed = now - t0;
      if (anchor && elapsed > 0) {
        const cycle = elapsed % (DURATION + PAUSE);
        if (cycle < DURATION) {
          const c = canvas.getBoundingClientRect();
          const a = anchor.getBoundingClientRect();
          const cx = a.left - c.left + a.width / 2;
          const cy = a.top - c.top + a.height * WORD.cy;
          const startOff = a.width * WORD.half; // wordmark edge
          const endOff = Math.max(startOff + 120, w / 2 + 40); // screen edge
          const p = cycle / DURATION;
          const off = startOff + (endOff - startOff) * ease(p);
          const life = Math.min(1, p / 0.12) * (1 - Math.pow(p, 2.2)); // fade in, long fade out
          const bandW = 60 + 50 * p; // band widens slightly as it travels
          const bandH = Math.max(220, a.height * 0.78) * (1 + 0.15 * p);

          // only visit grid cells near the two bands
          const rows = Math.ceil(bandH / GAP) + 2;
          const y0 = Math.round((cy - bandH / 2) / GAP) * GAP;
          for (const side of [-1, 1]) {
            const bx = cx + side * off;
            const x0 = Math.round((bx - bandW * 1.6) / GAP) * GAP;
            for (let x = x0; x <= bx + bandW * 1.6; x += GAP) {
              const dx = (x - bx) / bandW;
              const fx = Math.exp(-dx * dx * 2.2);
              if (fx < 0.04) continue;
              for (let r = 0; r < rows; r++) {
                const y = y0 + r * GAP;
                const dy = (y - cy) / (bandH / 2);
                const fy = Math.max(0, 1 - dy * dy); // oval profile
                const k = fx * fy * life;
                if (k < 0.03) continue;
                const size = 1.2 + k * 1.9;
                ctx.globalAlpha = Math.min(1, 0.15 + k * 1.15);
                ctx.fillStyle = k > 0.55 ? "#eddeb1" : "#c29e61";
                ctx.fillRect(x - size / 2, y - size / 2, size, size);
              }
            }
          }
          ctx.globalAlpha = 1;
        }
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && visible) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [anchorRef]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
