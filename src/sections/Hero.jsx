import { motion, useReducedMotion } from "motion/react";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { IconArrow, IconCheck } from "../components/Icons.jsx";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Soft gradient wash + fine grid. Decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl sm:left-[70%]" />
        <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-warn/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--c-line) 1px, transparent 1px), linear-gradient(90deg, var(--c-line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className="grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28 lg:pt-24">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Pilot planned for Cuttack &amp; Bhubaneswar, Odisha
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.08)}
            className="mt-6 text-[2.6rem] font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Land records you can <span className="italic text-accent">prove</span>, not just trust.
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            BhuChain gives every land parcel in Odisha a BHU-ID and a tamper-proof history, checked twice
            before anything is recorded, so fake owners and double sales are stopped early.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#get-started">
              Request early access
              <IconArrow className="h-4 w-4" />
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See how it works
            </Button>
          </motion.div>
        </div>

        <RecordVisual reduce={reduce} />
      </Container>
    </section>
  );
}

const stages = [
  { label: "Documents submitted", detail: "Sale deed, ROR, ID" },
  { label: "Level 1 verification", detail: "Records & ownership check" },
  { label: "Level 2 verification", detail: "Independent sign-off" },
  { label: "Written to ledger", detail: "Tamper-proof entry" },
];

/** Illustrative land-record card. Pure SVG/CSS, no images. */
function RecordVisual({ reduce }) {
  const base = 0.5;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      role="img"
      aria-label="Illustration of a sample BhuChain land record: a parcel with a BHU-ID passing through document submission, two levels of verification, and being written to a tamper-proof ledger."
    >
      {/* Ledger blocks peeking out behind the card */}
      <div aria-hidden="true" className="absolute -right-2 -top-5 hidden w-40 rotate-3 sm:block">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="mb-2 rounded-xl border border-line bg-surface-2/90 px-3 py-2 font-mono text-[10px] text-muted shadow-soft"
            style={{ transform: `translateX(${i * 14}px)` }}
          >
            block #[placeholder]
            <div className="mt-1 h-1 w-3/4 rounded bg-line" />
          </div>
        ))}
      </div>

      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Sample land record</p>
            <p className="mt-1 font-mono text-sm font-medium text-ink">BHU-ID · OD-CTK-[placeholder]</p>
          </div>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
            Illustrative
          </span>
        </div>

        {/* Parcel map */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface-2">
          <svg viewBox="0 0 320 150" className="block h-auto w-full" aria-hidden="true">
            <defs>
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="var(--c-line)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="320" height="150" fill="url(#hero-grid)" />
            {/* neighbouring parcels */}
            <path d="M20 20 L110 14 L118 70 L28 82 Z" fill="none" stroke="var(--c-line)" strokeWidth="1.5" />
            <path d="M210 18 L300 26 L292 92 L222 84 Z" fill="none" stroke="var(--c-line)" strokeWidth="1.5" />
            <path d="M30 96 L120 88 L126 136 L36 140 Z" fill="none" stroke="var(--c-line)" strokeWidth="1.5" />
            {/* highlighted parcel */}
            <motion.path
              d="M128 30 L200 22 L214 92 L196 132 L136 126 Z"
              fill="var(--c-accent)"
              fillOpacity="0.14"
              stroke="var(--c-accent)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 0.14 }}
              transition={{ duration: 1.4, delay: base, ease: "easeInOut" }}
            />
            <circle cx="170" cy="78" r="4" fill="var(--c-accent)" />
            {!reduce && (
              <motion.circle
                cx="170"
                cy="78"
                r="4"
                fill="none"
                stroke="var(--c-accent)"
                strokeWidth="1.5"
                animate={{ r: [4, 16], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
              />
            )}
          </svg>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
          {[
            ["Owner", "[placeholder]"],
            ["Khata / Plot", "[placeholder]"],
            ["Area", "[placeholder]"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line px-3 py-2">
              <dt className="text-muted">{k}</dt>
              <dd className="mt-0.5 truncate font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Verification stages */}
        <ol className="mt-5 space-y-2.5">
          {stages.map((s, i) => {
            const last = i === stages.length - 1;
            return (
              <motion.li
                key={s.label}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: base + 0.9 + i * 0.35, ease }}
                className="flex items-center gap-3"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    last ? "bg-accent text-accent-ink" : "bg-accent-soft text-accent"
                  }`}
                >
                  <IconCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="flex-1 text-sm font-medium text-ink">{s.label}</span>
                <span className="hidden text-xs text-muted min-[400px]:inline">{s.detail}</span>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </motion.div>
  );
}
