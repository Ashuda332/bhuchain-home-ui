import { motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";

// Approximate city-centre coordinates (public geographic data).
const CITIES = [
  {
    name: "Cuttack",
    odia: "କଟକ",
    coords: "20.46° N, 85.88° E",
    body: "Old city, long ownership histories, many inherited plots. The test for complex records.",
  },
  {
    name: "Bhubaneswar",
    odia: "ଭୁବନେଶ୍ୱର",
    coords: "20.30° N, 85.82° E",
    body: "Fast-growing capital with frequent new sales. The test for volume and speed.",
  },
];

export default function Pilot() {
  const reduce = useReducedMotion();
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
      <Container>
        <h2 id="pilot-title" className="max-w-3xl text-4xl leading-[1] text-ink sm:text-5xl lg:text-6xl">
          Starting with Odisha's twin cities.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Two cities first, so the process can be tested carefully with real buyers, sellers and officials before
          any wider rollout.
        </p>

        <div className="relative mt-16">

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-24">
            {CITIES.map((c, i) => (
              <motion.article
                key={c.name}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={i === 1 ? "lg:text-right" : ""}
              >
                <p className="font-odia text-2xl text-accent">{c.odia}</p>
                <h3 className="mt-1 text-[2.9rem] leading-[0.9] text-ink sm:text-7xl lg:text-[4.6rem]">{c.name}</h3>
                <p className="mt-3 font-mono text-sm text-muted">{c.coords}</p>
                <p className={`mt-5 max-w-sm text-muted ${i === 1 ? "lg:ml-auto" : ""}`}>{c.body}</p>
                <p className="mt-4 text-sm text-muted">
                  Status: <span className="text-ink">[placeholder]</span>
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            ["Pilot start", "[placeholder]"],
            ["Plots in scope", "[placeholder]"],
            ["Partner offices", "[placeholder]"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-6 py-5">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
