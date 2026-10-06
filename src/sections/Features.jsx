import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconClock, IconId, IconLock, IconShieldCheck } from "../components/Icons.jsx";

const card =
  "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-soft " +
  "transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-7";

function CardHead({ icon: Icon, title, body }) {
  return (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
    </>
  );
}

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Key features"
          title="Built for the people who sign, buy and approve."
          intro="Each feature answers one question a buyer, seller or official should be able to answer in seconds."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* BHU-ID — wide */}
          <Reveal as="article" className={`${card} lg:col-span-4`}>
            <CardHead
              icon={IconId}
              title="BHU-ID"
              body="One unique ID per parcel: an independent evidence layer linking location, documents and every past owner. Ask for the BHU-ID, and you're looking at the full picture."
            />
            <div aria-hidden="true" className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
              {["Location", "Documents", "Owners", "Transfers"].map((t) => (
                <span key={t} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-muted">
                  {t}
                </span>
              ))}
              <span className="text-muted">→</span>
              <span className="rounded-full bg-accent px-3 py-1.5 font-medium text-accent-ink">
                BHU-ID OD-BBSR-[placeholder]
              </span>
            </div>
          </Reveal>

          {/* Two-level verification — narrow */}
          <Reveal as="article" delay={0.08} className={`${card} lg:col-span-2`}>
            <CardHead
              icon={IconShieldCheck}
              title="Two-level verification"
              body="No record goes on the ledger on a single approval. Two independent checks must agree."
            />
            <div aria-hidden="true" className="mt-8 grid grid-cols-2 gap-2 text-xs font-medium">
              {["Level 1", "Level 2"].map((l) => (
                <div key={l} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-ink">
                  {l}
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tamper-proof — narrow */}
          <Reveal as="article" delay={0.08} className={`${card} lg:col-span-2`}>
            <CardHead
              icon={IconLock}
              title="Tamper-proof records"
              body="Entries are cryptographically chained. Editing an old record would break the chain, and everyone would see it."
            />
            <div aria-hidden="true" className="mt-8 flex items-center gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="block h-8 w-8 rounded-lg border border-accent/40 bg-accent-soft transition-transform duration-300 group-hover:-translate-y-0.5" style={{ transitionDelay: `${i * 40}ms` }} />
                  {i < 3 && <span className="h-px w-3 bg-accent/50" />}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Audit trail — wide */}
          <Reveal as="article" delay={0.16} className={`${card} lg:col-span-4`}>
            <CardHead
              icon={IconClock}
              title="Transparent audit trail"
              body="See who did what, and when: every submission, verification and transfer on a parcel, in order. Useful for buyers doing due diligence and officials resolving disputes."
            />
            <ul aria-hidden="true" className="mt-8 space-y-2 text-xs">
              {[
                ["Transfer recorded", "[date placeholder]"],
                ["Level 2 verification passed", "[date placeholder]"],
                ["Level 1 verification passed", "[date placeholder]"],
              ].map(([e, d], i) => (
                <li key={e} className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5">
                  <span className="flex items-center gap-2 text-ink">
                    <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-accent" : "bg-line"}`} />
                    {e}
                  </span>
                  <span className="font-mono text-muted">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
