import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { blockHash, shortHash } from "../lib/hash.js";

// Illustrative records for one parcel. Names are generic examples, not real people.
const INITIAL = [
  { title: "BHU-ID issued", record: "Parcel OD-CTK-[placeholder] registered to Owner A" },
  { title: "Verified", record: "Level 1 and Level 2 verification passed" },
  { title: "Sale recorded", record: "Owner A sells parcel to Buyer B" },
  { title: "Transfer complete", record: "Buyer B is the current owner" },
];
const GENESIS = "0".repeat(64);

/** Hashes every block in order, each one including the previous block's hash. */
async function hashChain(records) {
  const hashes = [];
  let prev = GENESIS;
  for (let i = 0; i < records.length; i++) {
    const h = await blockHash(i, prev, records[i]);
    hashes.push(h);
    prev = h;
  }
  return hashes;
}

export default function TamperDemo() {
  const reduce = useReducedMotion();
  const [records, setRecords] = useState(INITIAL.map((b) => b.record));
  const [sealed, setSealed] = useState([]); // hashes stored on the ledger when each block was sealed
  const [current, setCurrent] = useState([]); // hashes recomputed from what the blocks say now

  useEffect(() => {
    hashChain(INITIAL.map((b) => b.record)).then((h) => {
      setSealed(h);
      setCurrent(h);
    });
  }, []);

  useEffect(() => {
    let alive = true;
    hashChain(records).then((h) => alive && setCurrent(h));
    return () => { alive = false; };
  }, [records]);

  const ready = sealed.length === INITIAL.length && current.length === INITIAL.length;
  // A block is broken if its recomputed hash no longer matches the hash that was sealed.
  const brokenFrom = useMemo(() => {
    if (!ready) return -1;
    return current.findIndex((h, i) => h !== sealed[i]);
  }, [ready, current, sealed]);
  const edited = records.some((r, i) => r !== INITIAL[i].record);

  return (
    <section id="tamper-test" aria-labelledby="tamper-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="tamper-title"
          title="Try to change a record. Watch the chain catch it."
          intro="Each block stores a fingerprint (hash) of its own record plus the block before it. Edit any record below: its fingerprint changes, it no longer matches what was sealed, and every later block breaks with it."
        />

        <Reveal className="mt-12">
          <ol className="grid gap-3 lg:grid-cols-4">
            {INITIAL.map((b, i) => {
              const broken = brokenFrom !== -1 && i >= brokenFrom;
              const isSource = i === brokenFrom;
              return (
                <li key={b.title} className="relative">
                  <motion.article
                    animate={reduce ? undefined : isSource ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex h-full flex-col rounded-2xl border p-5 transition-colors duration-300 ${
                      broken ? "border-warn/60 bg-warn-soft" : "border-line bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted">Block {i + 1}</p>
                      <StatusPill broken={broken} isSource={isSource} />
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{b.title}</h3>

                    <label htmlFor={`record-${i}`} className="mt-4 text-xs font-medium text-muted">
                      Record
                    </label>
                    <textarea
                      id={`record-${i}`}
                      rows={3}
                      value={records[i]}
                      onChange={(e) => setRecords((r) => r.map((v, k) => (k === i ? e.target.value : v)))}
                      className="mt-1 w-full resize-none rounded-xl border border-line bg-bg/60 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
                    />

                    <dl className="mt-4 space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between gap-2">
                        <dt className="text-muted">sealed</dt>
                        <dd className="text-silver">{shortHash(sealed[i])}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-muted">now</dt>
                        <dd className={broken ? "text-warn" : "text-verify"}>{shortHash(current[i])}</dd>
                      </div>
                    </dl>
                  </motion.article>
                  {i < INITIAL.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-1/2 top-full z-10 h-3 w-px -translate-x-1/2 lg:left-full lg:top-1/2 lg:h-px lg:w-3 lg:translate-x-0 lg:-translate-y-1/2 ${
                        brokenFrom !== -1 && i + 1 > brokenFrom ? "bg-warn" : "bg-accent"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p role="status" aria-live="polite" className="text-sm">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={brokenFrom === -1 ? "ok" : `broken-${brokenFrom}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={brokenFrom === -1 ? "text-verify" : "text-warn"}
                >
                  {!ready
                    ? "Sealing the chain…"
                    : brokenFrom === -1
                      ? "Chain intact: every block matches what was sealed."
                      : `Tampering detected at block ${brokenFrom + 1}. Blocks ${brokenFrom + 1} to ${INITIAL.length} no longer match.`}
                </motion.span>
              </AnimatePresence>
            </p>
            <button
              type="button"
              disabled={!edited}
              onClick={() => setRecords(INITIAL.map((b) => b.record))}
              className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              Restore original records
            </button>
          </div>
          <p className="mt-4 text-xs text-muted">
            Simplified demo running in your browser with SHA-256. On BhuChain, sealed hashes are held by many
            independent nodes, so no single person can quietly rewrite them.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function StatusPill({ broken, isSource }) {
  const label = !broken ? "Valid" : isSource ? "Edited" : "Broken link";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        broken ? "bg-warn/15 text-warn" : "bg-verify-soft text-verify"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${broken ? "bg-warn" : "bg-verify"}`} aria-hidden="true" />
      {label}
    </span>
  );
}
