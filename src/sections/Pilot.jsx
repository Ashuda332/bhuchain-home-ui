import { motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import GlowCard from "../components/GlowCard.jsx";
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
          title="Starting where it matters: Cuttack and Bhubaneswar."
          intro="We're starting with two cities so the process can be tested carefully with real users before any wider rollout."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <PilotMap />
          </Reveal>
          <div className="grid gap-4">
            {cities.map((c, i) => (
              <Reveal key={c.name} delay={0.1 + i * 0.1}>
                <GlowCard as="article" className="h-full p-7">
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    <IconPin className="h-4 w-4" />
                    {c.tag}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-ink">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  <p className="mt-4 text-sm text-muted">
                    Status: <span className="font-medium text-ink">[placeholder]</span>
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal as="dl" className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {details.map(([k, v]) => (
            <div key={k} className="bg-surface px-6 py-5">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Abstract, not-to-scale map: Mahanadi, coast, and the two pilot cities. */
function PilotMap() {
  const reduce = useReducedMotion();
  const cities = [
    { name: "Cuttack", x: 300, y: 150 },
    { name: "Bhubaneswar", x: 230, y: 260 },
  ];
  return (
    <div
      className="relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-line bg-surface shadow-soft"
      style={{ backgroundImage: "radial-gradient(var(--c-line) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      role="img"
      aria-label="Schematic map, not to scale, showing the two pilot cities Cuttack and Bhubaneswar near the Mahanadi river in Odisha."
    >
      <svg viewBox="0 0 520 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="pm-gold" x1="0" x2="1">
            <stop offset="0" stopColor="#9e7e49" />
            <stop offset=".5" stopColor="#eddeb1" />
            <stop offset="1" stopColor="#c29e61" />
          </linearGradient>
        </defs>
        {/* coastline (Bay of Bengal to the south-east) */}
        <motion.path
          d="M520 120 C 470 170, 450 220, 410 260 S 330 340, 300 380"
          fill="none" stroke="var(--c-silver)" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="4 6"
          initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
        <text x="510" y="345" textAnchor="end" fill="var(--c-muted)" fontSize="12" fontStyle="italic">Bay of Bengal</text>
        {/* Mahanadi */}
        <motion.path
          d="M0 110 C 90 90, 170 140, 250 130 S 380 100, 470 150"
          fill="none" stroke="var(--c-accent)" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <text x="40" y="92" fill="var(--c-muted)" fontSize="12" fontStyle="italic">Mahanadi river</text>
        {/* link between cities */}
        <motion.path
          d={`M${cities[0].x} ${cities[0].y} Q 300 220 ${cities[1].x} ${cities[1].y}`}
          fill="none" stroke="url(#pm-gold)" strokeWidth="2" strokeDasharray="6 6"
          initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />
        {cities.map((c, i) => (
          <g key={c.name}>
            {!reduce && (
              <motion.circle
                cx={c.x} cy={c.y} r="10" fill="none" stroke="var(--c-accent)" strokeWidth="1.5"
                animate={{ r: [8, 34], opacity: [0.8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={c.x} cy={c.y} r="7" fill="url(#pm-gold)" stroke="var(--c-bg)" strokeWidth="3"
              initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.8 + i * 0.3 }}
              style={{ transformOrigin: `${c.x}px ${c.y}px` }}
            />
            <text x={c.x + 16} y={c.y + 5} fill="var(--c-ink)" fontSize="15" fontWeight="600" fontFamily="Outfit, sans-serif">
              {c.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="absolute bottom-4 left-5 text-xs text-muted">Schematic map, not to scale</p>
    </div>
  );
}
