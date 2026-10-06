import { useEffect, useRef } from "react";

/**
 * Dark "equalizer" background: segmented blue columns hang from the top and
 * rise from the bottom, rolling like a slow wave. Columns near the cursor
 * brighten and stretch. Decorative; static frame with reduced motion.
 */
const STEP = 9;
const SEG = 6;
const GAP = 3;

export default function PixelWave({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    let mx = -9999, my = -9999;
    const seeds = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seeds.length = 0;
      for (let i = 0; i < Math.ceil(w / STEP) + 1; i++) seeds.push(Math.random());
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (let i = 0; i * STEP < w; i++) {
        const x = i * STEP;
        const s = seeds[i] ?? 0.5;
        const wave = (Math.sin(x * 0.012 + time * 0.7) + Math.sin(x * 0.031 - time * 0.45 + s * 6) * 0.6 + 1.6) / 3.2;
        const near = Math.max(0, 1 - Math.hypot(x - mx, (h / 2) - my) / 260);
        const top = (wave * 0.42 + near * 0.18) * h * (0.55 + s * 0.45);
        const bottom = ((1 - wave) * 0.34 + near * 0.12) * h * (0.4 + (1 - s) * 0.5);
        const alpha = 0.18 + s * 0.35 + near * 0.45;
        for (const [len, fromTop] of [[top, true], [bottom, false]]) {
          const n = Math.floor(len / (SEG + GAP));
          for (let k = 0; k < n; k++) {
            if ((k * 7 + i * 3) % 11 === 0) continue; // a few missing pixels
            const fade = 1 - k / (n + 4);
            ctx.globalAlpha = alpha * fade;
            ctx.fillStyle = (k + i) % 13 === 0 ? "#8c9bff" : "#1f3dff";
            const y = fromTop ? k * (SEG + GAP) : h - (k + 1) * (SEG + GAP);
            ctx.fillRect(x, y, 4, SEG);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      draw(t);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(0);
    if (reduce) return;

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
