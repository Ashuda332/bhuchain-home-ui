import Container from "../components/Container.jsx";
import Decode from "../components/Decode.jsx";

// Product properties, not market numbers.
const STATS = [
  ["256-bit", "SHA-256 hashing"],
  ["2-step", "Independent approvals"],
  ["24/7", "Always-on ledger"],
  ["0", "Silent edits"],
];

export default function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative overflow-hidden bg-band py-24 sm:py-28">
      {/* dotted pixel edges */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 opacity-60 [background-image:radial-gradient(var(--c-primary)_1px,transparent_1.2px)] [background-size:10px_10px] [mask-image:linear-gradient(90deg,#000,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 opacity-60 [background-image:radial-gradient(var(--c-primary)_1px,transparent_1.2px)] [background-size:10px_10px] [mask-image:linear-gradient(270deg,#000,transparent)]" />
      <Container className="text-center">
        <h2 id="stats-title" className="text-3xl text-ink sm:text-4xl">Where trust is verified on-chain.</h2>
        <p className="mt-3 text-muted">The guarantees every record on BhuChain comes with.</p>
        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-line">
          {STATS.map(([v, l]) => (
            <div key={l} className="px-4">
              <dd className="text-4xl tracking-tight text-ink sm:text-5xl">
                <Decode value={v} />
              </dd>
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">{l}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
