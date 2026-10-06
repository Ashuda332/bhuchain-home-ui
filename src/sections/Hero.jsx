import { motion, useReducedMotion } from "motion/react";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import LandLedger from "../components/LandLedger.jsx";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate -mt-16 overflow-hidden pt-16">
      {/* ଭୂମି = "land" in Odia. A quiet, oversized texture behind the headline. */}
      <p
        aria-hidden="true"
        className="font-odia pointer-events-none absolute -left-[4vw] top-[6vh] -z-10 select-none text-[34vw] font-bold leading-none text-transparent opacity-[0.07] lg:text-[22vw]"
        style={{ WebkitTextStroke: "2px var(--c-accent)" }}
      >
        ଭୂମି
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] -z-10 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--c-glow), transparent 65%)" }}
      />

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-6 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-20">
        <div className="relative">
          <motion.h1
            id="hero-title"
            {...fadeUp(0.05)}
            className="text-[2.9rem] leading-[0.95] text-ink sm:text-7xl lg:text-[5.6rem]"
          >
            Odisha's land,
            <br />
            sealed block
            <br />
            by block.
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
            BhuChain gives every plot a BHU-ID, checks it twice, and writes it to a blockchain ledger, so a record
            can't be forged, quietly changed, or sold to two buyers.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#get-started">Request early access</Button>
            <Button href="#chain" variant="secondary">
              See how a plot is sealed
            </Button>
          </motion.div>

          <motion.p {...fadeUp(0.44)} className="mt-8 text-sm text-muted">
            Pilot planned in Cuttack and Bhubaneswar
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <LandLedger />
          <p className="mt-4 text-center text-xs text-muted lg:text-left">
            Illustration: plots, numbers and hashes are sample data.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
