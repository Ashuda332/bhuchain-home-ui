import { useEffect, useRef } from "react";

/**
 * Pixel "candle" bars that flicker into view around the cursor and drift away,
 * plus a few ambient bursts. Drawn on a <canvas> that fills its parent.
 * Decorative only; paused off-screen; disabled with reduced motion.
 */
const STEP = 7; // horizontal grid (bar 4px + gap 3px)
const SEG = 5; // segment height
const SEG_GAP = 2;

export default function PixelField({
  className = "",
  colors = ["#1f3dff", "#8c9bff", "#c29e61", "#eddeb1", "#9d9996"],
  ambient = 1, // ambient bursts per second
  spread = 70, // cluster radius around the cursor (px)
  maxAlpha = 0.9,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true, lastMove = 0, lastAmbient = 0;
    let bars = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (cx, cy, strength = 1) => {
      const n = 4 + Math.floor(Math.random() * 7 * strength);
      const base = Math.round((cx + (Math.random() - 0.5) * spread) / STEP) * STEP;
      for (let i = 0; i < n; i++) {
        const segs = 2 + Math.floor(Math.random() * 9);
        bars.push({
          x: base + (i - n / 2) * STEP + Math.round((Math.random() - 0.5) * 2) * STEP,
          y: cy + (Math.random() - 0.5) * spread - (segs * (SEG + SEG_GAP)) / 2,
          segs,
          mask: Array.from({ length: segs }, () => Math.random() > 0.15),
          color: colors[Math.floor(Math.random() * colors.length)],
          born: performance.now() + i * 25,
          life: 900 + Math.random() * 900,
          vy: -(Math.random() * 0.25 + 0.05),
          peak: (0.45 + Math.random() * 0.55) * maxAlpha * strength,
        });
      }
      if (bars.length > 600) bars = bars.slice(-600);
    };

    const onMove = (e) => {
      const now = performance.now();
      if (now - lastMove < 55) return;
      lastMove = now;
      const r = canvas.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top, 1);
    };

    const frame = (now) => {
      ctx.clearRect(0, 0, w, h);
      if (ambient && now - lastAmbient > 1000 / ambient) {
        lastAmbient = now;
        spawn(Math.random() * w, Math.random() * h, 0.55);
      }
      bars = bars.filter((b) => now - b.born < b.life);
      for (const b of bars) {
        const t = (now - b.born) / b.life;
        if (t < 0) continue;
        const a = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        b.y += b.vy;
        ctx.globalAlpha = Math.max(0, a * b.peak);
        ctx.fillStyle = b.color;
        for (let s = 0; s < b.segs; s++) {
          if (b.mask[s]) ctx.fillRect(b.x, b.y + s * (SEG + SEG_GAP), 4, SEG);
        }
      }
      ctx.globalAlpha = 1;
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    host.addEventListener("pointermove", onMove);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && visible) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [colors, ambient, spread, maxAlpha]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
