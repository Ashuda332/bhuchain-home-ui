import { useState } from "react";
import { motion } from "motion/react";
import Container from "../components/Container.jsx";
import { RingsMark } from "../components/Logo.jsx";
import { toOdia } from "../lib/odia.js";

const PARTS = [
  {
    id: "id",
    title: "BHU-ID",
    body: "One permanent ID per plot. It is the independent evidence layer that ties location, papers and owners together.",
  },
  {
    id: "checks",
    title: "Two-level verification",
    body: "Two independent sign-offs. A record is only sealed when both agree.",
  },
  {
    id: "hash",
    title: "Tamper-proof fingerprint",
    body: "A SHA-256 hash of the record and the block before it. Any edit changes it, so tampering shows.",
  },
  {
    id: "trail",
    title: "Transparent audit trail",
    body: "Every submission, check and transfer, in order, with who did it and when.",
  },
];

export default function BhuIdAnatomy() {
  const [focus, setFocus] = useState(null);
  const dim = (id) => (focus && focus !== id ? "opacity-30" : "opacity-100");
  const ring = (id) => (focus === id ? "ring-2 ring-accent ring-offset-4 ring-offset-surface" : "");

  return (
    <section id="bhu-id" aria-labelledby="anatomy-title" className="py-20 sm:py-28">
      <Container>
        <h2 id="anatomy-title" className="max-w-3xl text-4xl leading-[1] text-ink sm:text-5xl lg:text-6xl">
          Everything a buyer needs, on one BHU-ID.
        </h2>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Feature list: hover or focus to highlight the matching part of the certificate */}
          <ul className="order-2 space-y-2 lg:order-1">
            {PARTS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onMouseEnter={() => setFocus(p.id)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(p.id)}
                  onBlur={() => setFocus(null)}
                  onClick={() => setFocus((f) => (f === p.id ? null : p.id))}
                  aria-pressed={focus === p.id}
                  className={`w-full cursor-pointer rounded-2xl border p-5 text-left transition-colors ${
                    focus === p.id ? "border-accent bg-surface" : "border-transparent hover:border-line"
                  }`}
                >
                  <span className="block font-display text-2xl font-bold tracking-tight text-ink">{p.title}</span>
                  <span className="mt-1.5 block text-muted">{p.body}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* The certificate */}
          <motion.div
            initial={{ opacity: 0, rotate: -3, y: 30 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
            aria-label="Sample BHU-ID certificate (illustrative)"
            role="img"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-line bg-surface p-6 shadow-soft sm:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-20 opacity-[0.06]">
                <RingsMark className="h-64 w-auto" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <RingsMark className="h-7 w-auto" />
                  <span className="text-sm text-muted">BHU-ID certificate, sample</span>
                </div>
                <span className="font-odia text-sm text-muted">ଭୂ-ପରିଚୟ</span>
              </div>

              <div className={`mt-7 rounded-xl transition-all duration-300 ${dim("id")} ${ring("id")}`}>
                <p className="text-sm text-muted">BHU-ID</p>
                <p className="mt-1 font-mono text-2xl font-medium tracking-tight text-ink sm:text-3xl">OD-CTK-[placeholder]</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted">Plot</p>
                    <p className="font-odia text-ink">{toOdia(124)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Village</p>
                    <p className="text-ink">[placeholder]</p>
                  </div>
                  <div>
                    <p className="text-muted">Owner</p>
                    <p className="text-ink">Owner A</p>
                  </div>
                </div>
              </div>

              <div className={`mt-7 flex gap-4 rounded-xl transition-all duration-300 ${dim("checks")} ${ring("checks")}`}>
                {["Level 1", "Level 2"].map((l) => (
                  <div key={l} className="grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-verify text-center">
                    <span className="text-xs font-semibold leading-tight text-verify">
                      {l}
                      <br />
                      verified
                    </span>
                  </div>
                ))}
              </div>

              <div className={`mt-7 rounded-xl transition-all duration-300 ${dim("hash")} ${ring("hash")}`}>
                <p className="text-sm text-muted">Fingerprint (SHA-256)</p>
                <p className="mt-1 break-all font-mono text-xs leading-relaxed text-accent">
                  9f2c41e07ab3d6c58e1f0b72a4d95c3e6b18f07d2a9e4c51b6f3087de2c9a41b
                </p>
              </div>

              <div className={`mt-7 rounded-xl transition-all duration-300 ${dim("trail")} ${ring("trail")}`}>
                <p className="text-sm text-muted">Audit trail</p>
                <ol className="mt-2 space-y-1.5 text-sm">
                  {["BHU-ID issued", "Level 1 verification passed", "Level 2 verification passed", "Sealed on ledger"].map((e, i) => (
                    <li key={e} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span className="flex-1 text-ink">{e}</span>
                      <span className="text-xs text-muted">[date {i + 1}]</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
