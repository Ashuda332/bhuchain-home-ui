import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import { blockHash, shortHash } from "../lib/hash.js";
import { toOdia } from "../lib/odia.js";

/*
 * Fraud lab: three hands-on scenarios against one sample plot.
 * People are generic examples (Owner A, Buyer B, Person X). All data is illustrative.
 */
const PLOT = 124;

const TABS = [
  { id: "double", label: "Double sale", Comp: DoubleSale },
  { id: "fake", label: "Fake owner", Comp: FakeOwner },
  { id: "tamper", label: "Tampering", Comp: ChangedRecord },
];

export default function FraudLab() {
  const [tab, setTab] = useState(TABS[0].id);
  const refs = useRef([]);
  const current = TABS.find((t) => t.id === tab);

  const onKey = (e, i) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <section id="fraud-lab" aria-labelledby="fraud-title" className="relative border-y border-line bg-surface-2/40 py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="fraud-title" className="text-4xl leading-[1] text-ink sm:text-5xl lg:text-6xl">
            Try to cheat the ledger.
          </h2>
          <p className="max-w-lg text-lg text-muted lg:justify-self-end">
            The three most common land frauds in one place. Play the fraudster on sample plot{" "}
            <span className="font-odia text-ink">{toOdia(PLOT)}</span> ({PLOT}) and see where BhuChain stops you.
          </p>
        </div>

        <div role="tablist" aria-label="Fraud scenarios" className="mt-12 inline-flex rounded-full border border-line bg-surface p-1">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative min-h-11 cursor-pointer whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors sm:px-6 ${
                tab === t.id ? "text-accent-ink" : "text-muted hover:text-ink"
              }`}
            >
              {tab === t.id && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full" style={{ background: "var(--gold-face)" }} />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="mt-6 rounded-[28px] border border-line bg-surface p-5 shadow-soft sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <current.Comp />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/* ---------- shared bits ---------- */

/** A rubber-stamp style verdict. */
function Stamp({ ok, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 1.8, rotate: -14 }}
      animate={{ opacity: 1, scale: 1, rotate: -6 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={`inline-block rounded-xl border-[3px] border-double px-5 py-2 font-display text-2xl font-extrabold tracking-tight ${
        ok ? "border-verify text-verify" : "border-warn text-warn"
      }`}
    >
      {children}
    </motion.div>
  );
}

function ActionButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="min-h-11 w-full cursor-pointer rounded-2xl border border-line bg-bg/50 px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
      {...rest}
    >
      {children}
    </button>
  );
}

function Ledger({ rows }) {
  return (
    <ol className="space-y-2" aria-label="Ledger for the sample plot">
      <AnimatePresence initial={false}>
        {rows.map((r, i) => (
          <motion.li
            key={r.text}
            layout
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-semibold text-accent-ink" style={{ background: "var(--gold-face)" }}>
              {i + 1}
            </span>
            <span className="text-sm text-ink">{r.text}</span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}

function Shell({ ledger, children }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>{children}</div>
      <div className="rounded-2xl border border-line bg-bg/40 p-4 sm:p-5">
        <p className="mb-3 text-sm font-semibold text-ink">
          Ledger: plot <span className="font-odia">{toOdia(PLOT)}</span>
        </p>
        {ledger}
      </div>
    </div>
  );
}

const Reset = ({ onClick }) => (
  <button type="button" onClick={onClick} className="mt-6 cursor-pointer text-sm text-muted underline underline-offset-4 hover:text-ink">
    Start over
  </button>
);

/* ---------- scenario 1: double sale ---------- */

function DoubleSale() {
  const base = [{ text: "BHU-ID issued to Owner A" }, { text: "Level 1 and Level 2 checks passed" }];
  const [stage, setStage] = useState(0); // 0 start, 1 sold to B, 2 tried to sell to C
  const rows = stage >= 1 ? [...base, { text: "Owner A transfers plot to Buyer B" }] : base;

  return (
    <Shell ledger={<Ledger rows={rows} />}>
      <p className="text-muted">Owner A wants to sell the same plot to two buyers and collect twice.</p>
      <div className="mt-6 space-y-3">
        <ActionButton disabled={stage !== 0} onClick={() => setStage(1)}>
          1. Owner A sells the plot to Buyer B
        </ActionButton>
        <ActionButton disabled={stage !== 1} onClick={() => setStage(2)}>
          2. Owner A sells the same plot again to Buyer C
        </ActionButton>
      </div>
      <div className="mt-6 min-h-[120px]" role="status" aria-live="polite">
        {stage === 1 && (
          <div>
            <Stamp ok>Accepted</Stamp>
            <p className="mt-3 text-sm text-muted">Sale recorded as block 3. Buyer B is now the owner on the BHU-ID.</p>
          </div>
        )}
        {stage === 2 && (
          <div>
            <Stamp>Rejected</Stamp>
            <p className="mt-3 text-sm text-ink">
              Owner A no longer owns this plot. Ownership moved to Buyer B in block 3, so a second sale can't be recorded.
            </p>
          </div>
        )}
      </div>
      {stage > 0 && <Reset onClick={() => setStage(0)} />}
    </Shell>
  );
}

/* ---------- scenario 2: fake owner ---------- */

const CHECKS = [
  { label: "Seller's ID matches the owner on the BHU-ID", ok: false },
  { label: "Papers match the Record of Rights", ok: false },
  { label: "Plot location matches the BHU-ID", ok: true },
];

function FakeOwner() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduce) { setShown(CHECKS.length); return; }
    setShown(0);
    const timers = CHECKS.map((_, i) => setTimeout(() => setShown(i + 1), 450 * (i + 1)));
    return () => timers.forEach(clearTimeout);
  }, [run, reduce]);

  const done = run && shown === CHECKS.length;
  return (
    <Shell ledger={<Ledger rows={[{ text: "BHU-ID issued to Owner A" }, { text: "Level 1 and Level 2 checks passed" }]} />}>
      <p className="text-muted">Person X has forged papers and claims to be the owner of plot {PLOT}.</p>
      <div className="mt-6">
        <ActionButton disabled={run} onClick={() => setRun(true)}>
          Person X tries to sell the plot
        </ActionButton>
      </div>
      {run && (
        <ul className="mt-6 space-y-2" aria-label="Level 1 checks">
          {CHECKS.slice(0, shown).map((c) => (
            <motion.li key={c.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 text-sm">
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${c.ok ? "bg-verify-soft text-verify" : "bg-warn-soft text-warn"}`} aria-hidden="true">
                {c.ok ? "✓" : "✕"}
              </span>
              <span className="text-ink">{c.label}</span>
              <span className="sr-only">{c.ok ? "passed" : "failed"}</span>
            </motion.li>
          ))}
        </ul>
      )}
      <div className="mt-6 min-h-[110px]" role="status" aria-live="polite">
        {done && (
          <div>
            <Stamp>Rejected</Stamp>
            <p className="mt-3 text-sm text-ink">Stopped at Level 1. Person X is not the owner on the BHU-ID, so nothing reaches the ledger.</p>
          </div>
        )}
      </div>
      {run && <Reset onClick={() => { setRun(false); setShown(0); }} />}
    </Shell>
  );
}

/* ---------- scenario 3: changed record (real SHA-256) ---------- */

const RECORDS = [
  "BHU-ID issued to Owner A",
  "Level 1 and Level 2 checks passed",
  "Owner A transfers plot to Buyer B",
];

async function hashChain(records) {
  const out = [];
  let prev = "0".repeat(64);
  for (let i = 0; i < records.length; i++) {
    const h = await blockHash(i, prev, records[i]);
    out.push(h);
    prev = h;
  }
  return out;
}

function ChangedRecord() {
  const [records, setRecords] = useState(RECORDS);
  const [sealed, setSealed] = useState([]);
  const [now, setNow] = useState([]);

  useEffect(() => { hashChain(RECORDS).then((h) => { setSealed(h); setNow(h); }); }, []);
  useEffect(() => {
    let alive = true;
    hashChain(records).then((h) => alive && setNow(h));
    return () => { alive = false; };
  }, [records]);

  const ready = sealed.length === RECORDS.length && now.length === RECORDS.length;
  const brokenFrom = useMemo(() => (ready ? now.findIndex((h, i) => h !== sealed[i]) : -1), [ready, now, sealed]);

  return (
    <div>
      <p className="max-w-2xl text-muted">
        Someone with database access edits an old entry to put a different name on the plot. Edit any block below.
        Its fingerprint (SHA-256 hash, computed live in your browser) stops matching the sealed one, and every later
        block breaks with it.
      </p>
      <ol className="mt-6 grid gap-3 lg:grid-cols-3">
        {records.map((r, i) => {
          const broken = brokenFrom !== -1 && i >= brokenFrom;
          return (
            <li key={i}>
              <motion.div
                animate={i === brokenFrom ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex h-full flex-col rounded-2xl border p-4 transition-colors ${broken ? "border-warn/60 bg-warn-soft" : "border-line bg-bg/40"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Block {i + 1}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${broken ? "bg-warn/15 text-warn" : "bg-verify-soft text-verify"}`}>
                    {!broken ? "Valid" : i === brokenFrom ? "Edited" : "Broken link"}
                  </span>
                </div>
                <label htmlFor={`rec-${i}`} className="sr-only">Record in block {i + 1}</label>
                <textarea
                  id={`rec-${i}`}
                  rows={2}
                  value={r}
                  onChange={(e) => setRecords((rs) => rs.map((v, k) => (k === i ? e.target.value : v)))}
                  className="mt-3 w-full resize-none rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                />
                <dl className="mt-3 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between"><dt className="text-muted">sealed</dt><dd className="text-silver">{shortHash(sealed[i])}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">now</dt><dd className={broken ? "text-warn" : "text-verify"}>{shortHash(now[i])}</dd></div>
                </dl>
              </motion.div>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex min-h-[90px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" role="status" aria-live="polite">
        {brokenFrom === -1 ? (
          <p className="text-sm text-verify">Chain intact. Change any text above to try tampering.</p>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <Stamp>Tampering detected</Stamp>
            <p className="text-sm text-ink">Block {brokenFrom + 1} no longer matches what was sealed.</p>
          </div>
        )}
        {records.some((r, i) => r !== RECORDS[i]) && <Reset onClick={() => setRecords(RECORDS)} />}
      </div>
    </div>
  );
}
