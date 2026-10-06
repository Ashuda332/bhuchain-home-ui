import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Large statement text whose words light up one by one as you scroll.
 * `highlight` words get the gold gradient.
 */
export default function WordReveal({ text, highlight = [], className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const clean = w.replace(/[^\p{L}-]/gu, "").toLowerCase();
        const gold = highlight.includes(clean);
        return (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={reduce} gold={gold}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, reduce, gold }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={reduce ? undefined : { opacity }} className={`inline-block pr-[0.28em] ${gold ? "text-gold" : ""}`}>
      {children}
    </motion.span>
  );
}
