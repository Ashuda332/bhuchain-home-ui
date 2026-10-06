import { motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";

// What the platform does. Shown as a moving strip instead of partner logos
// (we don't list partners we don't have).
const CAPS = [
  "Smart contracts",
  "Digital identity",
  "Audit trails",
  "Multi-level approvals",
  "Instant settlement",
  "Open APIs",
  "Role-based access",
  "Cryptographic proofs",
];

const Glyph = ({ i }) => {
  const shapes = [
    <rect key="a" x="3" y="3" width="10" height="10" rx="2" />,
    <circle key="b" cx="8" cy="8" r="5" />,
    <path key="c" d="M8 2 14 8 8 14 2 8Z" />,
    <path key="d" d="M3 13V3h10" />,
  ];
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {shapes[i % shapes.length]}
    </svg>
  );
};

export default function Capabilities() {
  const reduce = useReducedMotion();
  const track = reduce ? CAPS : [...CAPS, ...CAPS];
  return (
    <section aria-label="Platform capabilities" className="pb-6">
      <Container>
        <p className="text-center text-sm text-muted">Everything you need to build on-chain</p>
      </Container>
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <motion.ul
          className={`flex w-max items-center gap-12 px-6 ${reduce ? "flex-wrap justify-center" : "animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]"}`}
        >
          {track.map((c, i) => (
            <li key={i} aria-hidden={i >= CAPS.length ? "true" : undefined} className="flex items-center gap-2.5 whitespace-nowrap text-xl text-ink/70">
              <span className="text-primary"><Glyph i={i} /></span>
              {c}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
