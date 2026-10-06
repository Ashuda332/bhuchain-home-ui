import { motion, useReducedMotion } from "motion/react";
import Button, { Chevron, Square } from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import DotField from "../components/DotField.jsx";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <DotField className="-z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-bg" />
      <Container className="flex min-h-[72svh] flex-col items-center justify-center py-24 text-center sm:py-32">
        <motion.h1 id="hero-title" {...fadeUp(0.05)} className="max-w-4xl text-[2.75rem] leading-[1.02] text-ink sm:text-7xl lg:text-[5.25rem]">
          The blockchain for <br className="hidden sm:block" />
          trusted records.
        </motion.h1>
        <motion.p {...fadeUp(0.18)} className="mt-6 max-w-xl text-lg text-muted">
          Built for verification, secured by design, and open to everyone.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="#get-started">
            <Square /> Build on BhuChain
          </Button>
          <Button href="#platform" variant="secondary">
            Explore the platform
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
