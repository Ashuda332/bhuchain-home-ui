import { motion } from "motion/react";
import Container from "../components/Container.jsx";
import GlowCard from "../components/GlowCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconCopy, IconDoc, IconUserX } from "../components/Icons.jsx";

const problems = [
  {
    icon: IconUserX,
    title: "Fake owner",
    body: "Someone poses as the owner with forged or borrowed papers and sells land that isn't theirs. The real owner often finds out only after the money is gone.",
    blocked: "Each sale is tied to the owner verified on the parcel's BHU-ID.",
  },
  {
    icon: IconCopy,
    title: "Double sale",
    body: "The same plot is sold to two or more buyers, each holding papers that look valid. Disputes can run for years.",
    blocked: "Once a transfer is on the ledger, a second sale of the same parcel is flagged immediately.",
  },
  {
    icon: IconDoc,
    title: "Silent record changes",
    body: "Paper and scattered digital records can be altered with little trace, making it hard to know which version is true.",
    blocked: "Every change is a new, signed entry. Nothing is overwritten.",
  },
];

export default function Problem() {
  return (
    <section id="fraud-prevention" aria-labelledby="problem-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="problem-title"
          eyebrow="Fraud prevention"
          title={<>Buying land shouldn't feel like a <span className="text-gold serif-accent">gamble</span>.</>}
          intro="Land fraud usually isn't sophisticated. It succeeds because records are hard to check and easy to dispute. Here is what buyers in Odisha are up against."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <GlowCard as="article" className="flex h-full flex-col p-7">
                <motion.span
                  whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warn-soft text-warn"
                >
                  <p.icon className="h-5 w-5" />
                </motion.span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">How BhuChain helps</p>
                  <p className="mt-1.5 text-sm font-medium text-ink">{p.blocked}</p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 rounded-2xl border border-dashed border-line px-6 py-4 text-sm text-muted">
          Scale of land disputes in Odisha: <span className="font-medium text-ink">[placeholder — add a sourced figure]</span>
        </Reveal>
      </Container>
    </section>
  );
}
