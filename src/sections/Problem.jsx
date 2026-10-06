import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconCopy, IconDoc, IconUserX } from "../components/Icons.jsx";

const problems = [
  {
    icon: IconUserX,
    title: "Fake owner",
    body: "Someone poses as the owner with forged or borrowed papers and sells land that isn't theirs. The real owner often finds out only after the money is gone.",
    blocked: "BhuChain links each sale to the owner verified on the parcel's BHU-ID.",
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
          eyebrow="The problem"
          title="Buying land shouldn't feel like a gamble."
          intro="Land fraud usually isn't sophisticated. It succeeds because records are hard to check and easy to dispute. Here is what buyers in Odisha are up against."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              delay={i * 0.08}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-colors hover:border-warn/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-warn-soft text-warn">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink">
                <span className="text-accent">How BhuChain helps: </span>
                {p.blocked}
              </p>
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
