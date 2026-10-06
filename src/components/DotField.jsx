import { useEffect, useRef } from "react";

/**
 * "Dot-matrix ledger" background.
 *
 *  - A precise, faint grid of dots fills the parent.
 *  - On load, the grid boots up once in a ripple from the centre.
 *  - Near the cursor, dots swell and turn to the accent colour with a soft,
 *    trailing spotlight (the light lags the pointer slightly).
 *  - Every few seconds a 3×3 "block" lights up near the edges and links to the
 *    previous one with a thin line, so a quiet chain forms and fades.
 *  - The centre stays calm so headlines remain readable.
 *
 * Decorative (aria-hidden). Pauses off-screen; one still frame with reduced motion.
 */
export default function DotField({
  className = "",
  gap = 16,
  dot = "10 11 13", // rgb of resting dots
  dotAlpha = 0.13,
  accent = "31 61 255", // rgb of the highlight
  radius = 190, // spotlight radius in px
  clearCenter = true, // keep the area behind centred text quiet
  blocks = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0, cols = 0, rows = 0, ox = 0, oy = 0;
    let raf = 0, visible = true;
    const start = performance.now();
    const target = { x: -1e4, y: -1e4 };
    const light = { x: -1e4, y: -1e4, a: 0 }; // trailing spotlight
    let chain = []; // { c, r, born }
    let nextBlock = start + 1800;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / gap);
      rows = Math.floor(h / gap);
      ox = (w - (cols - 1) * gap) / 2;
      oy = (h - (rows - 1) * gap) / 2;
    };

    // 0 inside the text area → 1 towards the edges
    const calm = (x, y) => {
      if (!clearCenter) return 1;
      const ex = (x - w / 2) / (w * 0.34);
      const ey = (y - h * 0.48) / (h * 0.3);
      const e = ex * ex + ey * ey;
      return Math.min(1, Math.max(0.12, (e - 0.55) / 0.9));
    };

    // Next block: near the previous one (so the link never crosses the text),
    // otherwise anywhere in the calm outer area as the start of a new chain.
    const pickBlock = (prev) => {
      for (let tries = 0; tries < 60; tries++) {
        const near = prev && tries < 40;
        const c = near ? prev.c + Math.round((Math.random() - 0.5) * 20) : 2 + Math.floor(Math.random() * (cols - 4));
        const r = near ? prev.r + Math.round((Math.random() - 0.5) * 12) : 2 + Math.floor(Math.random() * (rows - 4));
        if (c < 2 || r < 2 || c > cols - 3 || r > rows - 3) continue;
        if (near && Math.abs(c - prev.c) + Math.abs(r - prev.r) < 8) continue;
        const x = ox + c * gap, y = oy + r * gap;
        if (calm(x, y) < 0.9) continue;
        // keep blocks in the side gutters, away from the centred content
        if (clearCenter && Math.abs(x - w / 2) < w * 0.3) continue;
        if (chain.some((b) => Math.abs(b.c - c) < 4 && Math.abs(b.r - r) < 4)) continue;
        if (near) {
          // sample the segment: every point must stay in the calm area
          const px = ox + prev.c * gap, py = oy + prev.r * gap;
          let ok = true;
          for (let k = 1; k < 10 && ok; k++) ok = calm(px + ((x - px) * k) / 10, py + ((y - py) * k) / 10) > 0.75;
          if (!ok) continue;
        }
        return { c, r, link: near };
      }
      return null;
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);
      const t = now - start;
      const boot = reduce ? 1e9 : t * 1.1; // px the boot ripple has travelled
      const cx = w / 2, cy = h * 0.48;

      // ease the spotlight towards the pointer
      light.x += (target.x - light.x) * 0.08;
      light.y += (target.y - light.y) * 0.08;
      const on = target.x > -1e3 ? 1 : 0;
      light.a += (on - light.a) * 0.06;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * gap, y = oy + j * gap;
          const dc = Math.hypot(x - cx, y - cy);
          if (dc > boot) continue;
          const front = Math.max(0, 1 - Math.abs(dc - boot) / 90); // bright crest of the boot ripple
          const k = calm(x, y);
          const d = Math.hypot(x - light.x, y - light.y);
          let s = Math.max(0, 1 - d / radius);
          s = s * s * (3 - 2 * s) * light.a; // smoothstep
          const hot = Math.min(1, s * (0.35 + 0.65 * k) + front * 0.6 * k);
          const size = 1.6 + hot * 2.2;
          if (hot > 0.02) {
            ctx.fillStyle = `rgb(${accent} / ${0.15 + hot * 0.8})`;
          } else {
            ctx.fillStyle = `rgb(${dot} / ${dotAlpha * (0.35 + 0.65 * k)})`;
          }
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      // the quiet chain of blocks
      if (blocks && !reduce) {
        if (now > nextBlock) {
          const b = pickBlock(chain[chain.length - 1]);
          if (b) chain.push({ ...b, born: now });
          if (chain.length > 4) chain.shift();
          nextBlock = now + 2600;
        }
        chain = chain.filter((b) => now - b.born < 9000);
        for (let n = 0; n < chain.length; n++) {
          const b = chain[n];
          const age = now - b.born;
          const a = Math.min(1, age / 500) * Math.min(1, (9000 - age) / 1200);
          const bx = ox + b.c * gap, by = oy + b.r * gap;
          if (n > 0 && b.link) {
            const p = chain[n - 1];
            const px = ox + p.c * gap, py = oy + p.r * gap;
            const grow = Math.min(1, age / 700);
            ctx.strokeStyle = `rgb(${accent} / ${0.28 * a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + (bx - px) * grow, py + (by - py) * grow);
            ctx.stroke();
          }
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              ctx.fillStyle = `rgb(${accent} / ${(di === 0 && dj === 0 ? 0.95 : 0.6) * a})`;
              ctx.fillRect(bx + di * gap - 2.5, by + dj * gap - 2.5, 5, 5);
            }
          }
        }
      }

      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (light.x < -1e3) { light.x = target.x; light.y = target.y; }
    };
    const onLeave = () => { target.x = -1e4; target.y = -1e4; };

    resize();
    raf = requestAnimationFrame(draw);
    if (reduce) return () => cancelAnimationFrame(raf);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
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
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [gap, dot, dotAlpha, accent, radius, clearCenter, blocks]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
      }}
    />
  );
}
