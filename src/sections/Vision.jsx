import { motion, useReducedMotion } from "motion/react";
import Button, { Square } from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import PixelWave from "../components/PixelWave.jsx";

export default function Vision() {
  const reduce = useReducedMotion();
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative isolate overflow-hidden bg-night py-32 text-white sm:py-44">
      <PixelWave className="-z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(10_11_13/0.92)_0%,rgb(10_11_13/0.6)_35%,transparent_70%)]" />
      <Container className="text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[15px] text-[#8c9bff]"
        >
          Vision
        </motion.p>
        <motion.h2
          id="vision-title"
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-6xl"
        >
          A world where every record can be trusted, by everyone.
        </motion.h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#get-started">
            <Square /> Build on BhuChain
          </Button>
          <Button href="#updates" variant="dark">
            Read the latest
          </Button>
        </div>
      </Container>
    </section>
  );
}
