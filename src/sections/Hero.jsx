import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import BrandEmblem from "../components/BrandEmblem.jsx";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import NodeNetwork from "../components/NodeNetwork.jsx";

const ease = [0.22, 1, 0.36, 1];
const INTRO = 2.1; // seconds until the emblem intro is mostly done

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Scroll: emblem drifts back and fades as you leave the hero.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const emblemY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const emblemOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  // Pointer: gentle 3D tilt of the emblem.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 60, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 60, damping: 18 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const fadeUp = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      {/* Background: aura, rotating halo, gold dust, fade into the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={reduce ? undefined : { scale: glowScale }}
          className="absolute left-1/2 top-[38%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="h-full w-full rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--c-glow) 0%, transparent 62%)" }}
          />
        </motion.div>
        <div className="absolute left-1/2 top-[38%] h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 opacity-50">
          <div
            className="spin-slow h-full w-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgb(194 158 97 / 0.22) 40deg, transparent 90deg, transparent 180deg, rgb(187 183 180 / 0.16) 230deg, transparent 280deg)",
              maskImage: "radial-gradient(circle, transparent 38%, #000 40%, #000 60%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, transparent 38%, #000 40%, #000 60%, transparent 70%)",
            }}
          />
        </div>
        <NodeNetwork className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="flex flex-1 flex-col items-center justify-center pb-16 pt-6 text-center sm:pt-10">
        <motion.p
          {...fadeUp(reduce ? 0 : INTRO - 0.6)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Pilot planned in Cuttack and Bhubaneswar, Odisha
        </motion.p>

        <motion.div
          style={reduce ? undefined : { scale: emblemScale, y: emblemY, opacity: emblemOpacity }}
          className="mt-6 w-full max-w-[720px] [perspective:1200px]"
        >
          <motion.div style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}>
            <BrandEmblem className="w-full" delay={0.15} />
          </motion.div>
          {/* The emblem is decorative; this is its accessible name. */}
          <span className="sr-only">BhuChain</span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...fadeUp(reduce ? 0 : INTRO - 0.3)}
          className="mt-4 max-w-3xl text-[2.1rem] font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
        >
          Land records that can't be forged, erased or sold twice.
        </motion.h1>

        <motion.p {...fadeUp(reduce ? 0 : INTRO - 0.15)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          BhuChain gives every land parcel in Odisha a BHU-ID and a tamper-proof history on a blockchain ledger,
          verified twice before anything is written.
        </motion.p>

        <motion.div {...fadeUp(reduce ? 0 : INTRO)} className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href="#get-started">
            Request early access
          </Button>
          <Button href="#how-it-works" variant="secondary">
            See how it works
          </Button>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.a
        href="#statement"
        aria-label="Scroll to learn more"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO + 0.6, duration: 1 }}
        className="mx-auto mb-8 hidden h-10 w-6 items-start justify-center rounded-full border border-line p-1.5 sm:flex"
      >
        <motion.span
          className="block h-2 w-1 rounded-full bg-accent"
          animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
