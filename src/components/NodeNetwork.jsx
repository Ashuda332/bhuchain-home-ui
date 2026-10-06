import { useEffect, useRef } from "react";

/**
 * A slow-moving peer-to-peer network drawn on <canvas>: nodes drift, nearby
 * nodes link up, and gold "blocks" travel along links. When a block arrives,
 * the receiving node flashes the verified teal, like a peer confirming it.
 *
 * Decorative only (aria-hidden). Pauses off-screen / in background tabs.
 * With reduced motion it renders one still frame.
 */
const GOLD = [194, 158, 97];
const SILVER = [187, 183, 180];
const TEAL = [63, 208, 180];

export default function NodeNetwork({ className = "", density = 46 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true, link = 150;
    let nodes = [];
    let packets = [];
    let lastSpawn = 0;

    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      link = Math.max(110, Math.min(170, w / 8));
      const n = Math.round(density * Math.min(1, (w * h) / (1440 * 900)) + 14);
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 1.1,
        gold: Math.random() < 0.3,
        flash: 0,
      }));
      packets = [];
    };

    const neighbours = (i) => {
      const a = nodes[i];
      const out = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const b = nodes[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < link) out.push(j);
      }
      return out;
    };

    const spawn = () => {
      const i = Math.floor(Math.random() * nodes.length);
      const nb = neighbours(i);
      if (!nb.length) return;
      packets.push({ from: i, to: nb[Math.floor(Math.random() * nb.length)], t: 0, hops: 2 + Math.floor(Math.random() * 3) });
    };

    const step = (now) => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        n.flash *= 0.96;
      }
      if (now - lastSpawn > 700 && packets.length < 6) {
        spawn();
        lastSpawn = now;
      }
      for (const p of packets) {
        p.t += 0.012;
        if (p.t >= 1) {
          nodes[p.to].flash = 1;
          p.hops -= 1;
          const nb = neighbours(p.to).filter((j) => j !== p.from);
          if (p.hops > 0 && nb.length) {
            p.from = p.to;
            p.to = nb[Math.floor(Math.random() * nb.length)];
            p.t = 0;
          } else p.done = true;
        }
      }
      packets = packets.filter((p) => !p.done);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = rgba(SILVER, (1 - d / link) * 0.16);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // packets (blocks in transit)
      for (const p of packets) {
        const a = nodes[p.from], b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.strokeStyle = rgba(GOLD, 0.5);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = rgba(GOLD, 0.95);
        ctx.fillRect(x - 3, y - 3, 6, 6);
      }
      // nodes
      for (const n of nodes) {
        if (n.flash > 0.05) {
          ctx.fillStyle = rgba(TEAL, n.flash * 0.25);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10 * n.flash + 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.flash > 0.2 ? rgba(TEAL, 0.9) : n.gold ? rgba(GOLD, 0.7) : rgba(SILVER, 0.45);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now) => {
      step(now);
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
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && visible) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => { resize(); draw(); });
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
