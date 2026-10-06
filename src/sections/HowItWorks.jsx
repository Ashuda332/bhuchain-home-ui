import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import Container from "../components/Container.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconCheck, IconDoc, IconId, IconLedger, IconShieldCheck } from "../components/Icons.jsx";

const steps = [
  {
    icon: IconDoc,
    title: "Record",
    body: "The owner or broker submits the parcel's existing documents: sale deed, Record of Rights (ROR) and identity proof.",
  },
  {
    icon: IconId,
    title: "BHU-ID",
    body: "The parcel gets a unique BHU-ID: an independent evidence layer that ties together its location, documents and ownership history.",
  },
  {
    icon: IconShieldCheck,
    title: "Two-level verification",
    body: "Level 1 checks documents against existing records. Level 2 is an independent sign-off. Both must pass.",
  },
  {
    icon: IconLedger,
    title: "Tamper-proof ledger",
    body: "The verified record is written to the ledger. Future changes are added as new entries; history is never erased.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Active step follows how far the step list has been scrolled.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative border-y border-line bg-surface-2/40 py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left: sticky heading + live record preview */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title={<>From paperwork to <span className="text-gold serif-accent">proof</span> in four steps.</>}
            intro="BhuChain doesn't replace the existing registry. It adds a verified, permanent layer on top of it."
          />
          <RecordPreview active={active} className="mt-10 hidden lg:block" />
        </div>

        {/* Right: steps with a progress rail */}
        <div ref={listRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[1.4rem] top-0 w-px bg-line">
            <motion.div style={{ scaleY: fill }} className="bg-gold h-full w-full origin-top" />
          </div>
          <ol className="relative space-y-6 lg:space-y-[22vh] lg:py-[8vh]">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} active={active === i} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Step({ step, index, active }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5"
    >
      <span
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
          active
            ? "bg-gold border-transparent text-accent-ink shadow-[0_0_30px_-4px_var(--c-glow)]"
            : "border-line bg-surface text-accent"
        }`}
      >
        <step.icon className="h-5 w-5" />
      </span>
      <div className={`rounded-2xl border p-5 transition-colors duration-500 sm:p-6 ${active ? "border-accent/40 bg-surface" : "border-transparent"}`}>
        <p className="font-mono text-xs font-medium text-muted">Step {String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{step.body}</p>
      </div>
    </motion.li>
  );
}

/** Illustrative record card that advances with the active step. */
function RecordPreview({ active, className = "" }) {
  const reduce = useReducedMotion();
  const labels = ["Documents submitted", "BHU-ID assigned", "Level 1 + Level 2 passed", "Written to ledger"];
  return (
    <div className={`rounded-3xl border border-line bg-surface p-6 shadow-soft ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Sample record · illustrative</p>
        <span className="font-mono text-xs text-accent">{active + 1}/4</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="bg-gold h-full rounded-full"
          animate={{ width: `${((active + 1) / 4) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-5 font-mono text-sm text-ink">
        BHU-ID ·{" "}
        <motion.span
          key={active >= 1 ? "id" : "pending"}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block ${active >= 1 ? "text-accent" : "text-muted"}`}
        >
          {active >= 1 ? "OD-CTK-[placeholder]" : "pending…"}
        </motion.span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {labels.map((l, i) => {
          const done = i <= active;
          return (
            <li key={l} className="flex items-center gap-3 text-sm">
              <motion.span
                animate={{ scale: done ? 1 : 0.85, opacity: done ? 1 : 0.45 }}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${done ? "bg-gold text-accent-ink" : "border border-silver/40 text-muted"}`}
              >
                {done && <IconCheck className="h-3.5 w-3.5" strokeWidth={2.6} />}
              </motion.span>
              <span className={done ? "text-ink" : "text-muted"}>{l}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
