import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Container from "../components/Container.jsx";
import { toOdia } from "../lib/odia.js";
import { blockHash, shortHash } from "../lib/hash.js";

const STEPS = [
  { title: "Record submitted", body: "The owner or broker uploads the sale deed, Record of Rights (ROR) and identity proof." },
  { title: "BHU-ID issued", body: "The plot gets its BHU-ID: one permanent ID that links its location, papers and every owner." },
  { title: "Level 1 check", body: "Papers are matched against existing land records and the owner's identity." },
  { title: "Level 2 check", body: "An independent second reviewer signs off. Nothing moves on unless both levels pass." },
  { title: "Sealed on the ledger", body: "The record is hashed and written. From here it can only be added to, never edited." },
  { title: "Every change after", body: "Sales, transfers and mutations arrive as new blocks. The full history stays visible." },
];

function useHashes() {
  const [hashes, setHashes] = useState([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      let prev = "0".repeat(64);
      const out = [];
      for (let i = 0; i < STEPS.length; i++) {
        const h = await blockHash(i, prev, STEPS[i].title);
        out.push({ prev, hash: h });
        prev = h;
      }
      if (alive) setHashes(out);
    })();
    return () => { alive = false; };
  }, []);
  return hashes;
}

function useIsDesktop() {
  const [is, setIs] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = (e) => setIs(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

const Heading = () => (
  <div className="max-w-xl">
    <h2 id="chain-title" className="text-4xl leading-[1] text-ink sm:text-5xl lg:text-6xl">
      How a plot becomes a block.
    </h2>
    <p className="mt-5 text-lg text-muted">
      BhuChain doesn't replace the land registry. It adds a verified, permanent layer on top, one block at a time.
    </p>
  </div>
);

export default function ChainOfTitle() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const hashes = useHashes();
  return desktop && !reduce ? <Pinned hashes={hashes} /> : <Stacked hashes={hashes} />;
}

/** Desktop: the section pins and the chain slides sideways as you scroll. */
function Pinned({ hashes }) {
  const section = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);

  return (
    <section id="chain" ref={section} aria-labelledby="chain-title" className="relative" style={{ height: `${STEPS.length * 55 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Container>
          <Heading />
        </Container>
        <motion.ol ref={track} style={{ x }} className="mt-14 flex w-max items-stretch pl-[max(1.5rem,calc((100vw-72rem)/2+2rem))] pr-24">
          {STEPS.map((s, i) => (
            <BlockCard key={s.title} step={s} i={i} hash={hashes[i]} progress={smooth} last={i === STEPS.length - 1} />
          ))}
        </motion.ol>
        <Container className="mt-12">
          <div className="h-px w-full bg-line">
            <motion.div style={{ scaleX: smooth }} className="bg-gold h-full origin-left" />
          </div>
        </Container>
      </div>
    </section>
  );
}

function BlockCard({ step, i, hash, progress, last }) {
  const n = STEPS.length;
  const center = i / (n - 1);
  const opacity = useTransform(progress, [center - 0.35, center - 0.1, center + 0.1, center + 0.35], [0.35, 1, 1, 0.35]);
  const y = useTransform(progress, [center - 0.3, center, center + 0.3], [24, 0, 24]);
  const link = useTransform(progress, [center, center + 1 / (n - 1)], [0, 1]);
  return (
    <li className="flex items-center">
      <motion.article style={{ opacity, y }} className="w-[360px]">
        <Card step={step} i={i} hash={hash} />
      </motion.article>
      {!last && (
        <span aria-hidden="true" className="relative mx-3 block h-[2px] w-20 bg-line">
          <motion.span style={{ scaleX: link }} className="bg-gold absolute inset-0 origin-left" />
          <span className="absolute -right-1 -top-[5px] h-3 w-3 rounded-full border-2 border-accent bg-bg" />
        </span>
      )}
    </li>
  );
}

function Card({ step, i, hash }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface p-7 shadow-soft">
      <div className="flex items-start justify-between">
        <span className="font-odia text-6xl font-bold leading-none text-gold" aria-hidden="true">
          {toOdia(i + 1)}
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">Block {i + 1}</span>
      </div>
      <h3 className="mt-6 text-2xl text-ink">{step.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{step.body}</p>
      <dl className="mt-6 space-y-1 border-t border-line pt-4 font-mono text-[11px]">
        <div className="flex justify-between">
          <dt className="text-muted">prev</dt>
          <dd className="text-silver">{shortHash(hash?.prev)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">hash</dt>
          <dd className="text-accent">{shortHash(hash?.hash)}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Mobile / reduced motion: a vertical chain. */
function Stacked({ hashes }) {
  return (
    <section id="chain" aria-labelledby="chain-title" className="py-20 sm:py-28">
      <Container>
        <Heading />
        <ol className="mt-12 space-y-0">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card step={s} i={i} hash={hashes[i]} />
              </motion.div>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="mx-auto block h-8 w-[2px] bg-accent/60" />
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
