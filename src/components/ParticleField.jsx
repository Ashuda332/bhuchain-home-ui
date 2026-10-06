import { useEffect, useRef } from "react";

/**
 * Drifting gold dust on a <canvas>. ~70 particles, paused when off-screen or
 * when the tab is hidden. With reduced motion it draws a single static frame.
 */
export default function ParticleField({ className = "", density = 70 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let parts = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(density * Math.min(1, (w * h) / (1280 * 800)) + 20);
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.12,
        t: Math.random() * Math.PI * 2,
        s: Math.random() * 0.02 + 0.005,
        gold: Math.random() > 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          p.t += p.s;
          if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
        }
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.t));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(226,196,130,${a})` : `rgba(220,218,214,${a * 0.7})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (reduce) return;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && visible) raf = requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
