import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import { blockHash, shortHash } from "../lib/hash.js";

// Illustrative events for one parcel's life on the ledger. Not real data.
const EVENTS = [
  "BHU-ID issued",
  "Documents attached",
  "Level 1 verification passed",
  "Level 2 verification passed",
  "Sale agreement recorded",
  "Ownership transferred",
  "Mutation updated",
  "Encumbrance check recorded",
];

const GENESIS = "0".repeat(64);

export default function LedgerStrip() {
  const reduce = useReducedMotion();
  const [blocks, setBlocks] = useState(() => EVENTS.map((e, i) => ({ i, event: e, prev: "", hash: "" })));

  useEffect(() => {
    let alive = true;
    (async () => {
      let prev = GENESIS;
      const out = [];
      for (let i = 0; i < EVENTS.length; i++) {
        const hash = await blockHash(i, prev, EVENTS[i]);
        out.push({ i, event: EVENTS[i], prev, hash });
        prev = hash;
      }
      if (alive) setBlocks(out);
    })();
    return () => { alive = false; };
  }, []);

  // The list is rendered twice so the marquee can loop seamlessly.
  const track = reduce ? blocks : [...blocks, ...blocks];

  return (
    <section aria-labelledby="ledger-title" className="relative border-y border-line bg-surface-2/40 py-14 sm:py-16">
      <Container>
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="ledger-title" className="max-w-xl text-2xl text-ink sm:text-3xl">
            Every change to a parcel becomes a new block, linked to the one before it.
          </h2>
          <p className="text-sm text-muted">Sample ledger with illustrative data</p>
        </Reveal>
      </Container>

      <div
        className={`group mt-10 ${reduce ? "overflow-x-auto px-4" : "overflow-hidden"} [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]`}
      >
        <ol
          className={`flex w-max items-center ${reduce ? "" : "animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]"}`}
          aria-label="Sample chain of ledger blocks"
        >
          {track.map((b, k) => (
            <li key={k} className="flex items-center" aria-hidden={k >= blocks.length ? "true" : undefined}>
              <article className="w-64 rounded-2xl border border-line bg-surface p-4 shadow-soft">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Block {b.i + 1}</span>
                  <span className="inline-flex items-center gap-1.5 text-verify">
                    <span className="h-1.5 w-1.5 rounded-full bg-verify" aria-hidden="true" />
                    Sealed
                  </span>
                </div>
                <p className="mt-2 font-medium text-ink">{b.event}</p>
                <dl className="mt-3 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted">prev</dt>
                    <dd className="text-silver">{shortHash(b.prev)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted">hash</dt>
                    <dd className="text-accent">{shortHash(b.hash)}</dd>
                  </div>
                </dl>
              </article>
              {/* link: this block's hash is the next block's prev */}
              <span aria-hidden="true" className="relative mx-1 block h-px w-10 bg-accent/50">
                <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-r border-t border-accent/70" />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
