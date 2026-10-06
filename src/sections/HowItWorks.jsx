import { motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconDoc, IconId, IconLedger, IconShieldCheck } from "../components/Icons.jsx";

const steps = [
  {
    icon: IconDoc,
    title: "Record",
    body: "The owner or broker submits the parcel's existing documents: sale deed, Record of Rights (ROR) and identity proof.",
  },
  {
    icon: IconId,
    title: "BHU-ID",
    body: "The parcel gets a unique BHU-ID: an independent evidence layer that ties together its location, documents and ownership history.",
  },
  {
    icon: IconShieldCheck,
    title: "Two-level verification",
    body: "Level 1 checks documents against existing records. Level 2 is an independent sign-off. Both must pass.",
  },
  {
    icon: IconLedger,
    title: "Tamper-proof ledger",
    body: "The verified record is written to the ledger. Future changes are added as new entries; history is never erased.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="border-y border-line bg-surface-2/50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From paperwork to proof in four steps."
          intro="BhuChain doesn't replace the existing registry. It adds a verified, permanent layer on top of it."
        />

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Connector line: vertical on mobile, horizontal on desktop */}
          <div aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-line lg:hidden" />
          <div aria-hidden="true" className="absolute left-6 right-6 top-[1.375rem] hidden h-px bg-line lg:block">
            <motion.div
              className="h-full origin-left bg-accent"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -120px 0px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>

          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="relative flex gap-5 lg:flex-col lg:gap-6">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface text-accent shadow-soft">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs font-medium text-muted">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
