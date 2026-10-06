import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "0123456789$#%&*+<>";

/**
 * Text that "decodes" from random glyphs into its final value, left to right,
 * the first time it scrolls into view. Screen readers get the final text.
 */
export default function Decode({ value, className = "", duration = 1100 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduce = useReducedMotion();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const out = value
        .split("")
        .map((c, i) => {
          if (/[\s.,/-]/.test(c)) return c;
          const reveal = (i + 1) / value.length;
          return p >= reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setText(out);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
