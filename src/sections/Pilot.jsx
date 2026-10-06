import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconPin } from "../components/Icons.jsx";

const cities = [
  {
    name: "Cuttack",
    tag: "Pilot city 1",
    body: "One of Odisha's oldest cities, with long ownership histories and many inherited parcels: a strong test of how BhuChain handles complex records.",
  },
  {
    name: "Bhubaneswar",
    tag: "Pilot city 2",
    body: "A fast-growing capital with frequent new transactions: a strong test of how BhuChain handles volume and speed.",
  },
];

const details = [
  ["Pilot start", "[placeholder]"],
  ["Parcels in scope", "[placeholder]"],
  ["Participating offices", "[placeholder]"],
];

export default function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="pilot-title"
          eyebrow="Pilot"
          title="Starting where it matters: Cuttack and Bhubaneswar."
          intro="We're starting with two cities so the process can be tested carefully with real users before any wider rollout."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {cities.map((c, i) => (
            <Reveal
              as="article"
              key={c.name}
              delay={i * 0.1}
              className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-soft"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                <IconPin className="h-4 w-4" />
                {c.tag}
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              <p className="mt-6 text-sm text-muted">
                Status: <span className="font-medium text-ink">[placeholder]</span>
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal as="dl" className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {details.map(([k, v]) => (
            <div key={k} className="bg-surface px-6 py-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">{k}</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
