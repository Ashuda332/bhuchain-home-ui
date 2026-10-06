import { motion, useReducedMotion } from "motion/react";
import Container from "../components/Container.jsx";
import GlowCard from "../components/GlowCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { IconCheck, IconClock, IconId, IconLock, IconShieldCheck } from "../components/Icons.jsx";

function CardHead({ icon: Icon, title, body }) {
  return (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
    </>
  );
}

const loop = (reduce, t) => (reduce ? { duration: 0 } : { ...t, repeat: Infinity });

export default function Features() {
  const reduce = useReducedMotion();
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Key features"
          title={<>Built for the people who sign, buy and <span className="text-gold serif-accent">approve</span>.</>}
          intro="Each feature answers one question a buyer, seller or official should be able to answer in seconds."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* BHU-ID: wide */}
          <Reveal className="lg:col-span-4">
            <GlowCard as="article" className="flex h-full flex-col p-7 sm:p-8">
              <CardHead
                icon={IconId}
                title="BHU-ID"
                body="One unique ID per parcel: an independent evidence layer linking location, documents and every past owner. Ask for the BHU-ID, and you're looking at the full picture."
              />
              <div aria-hidden="true" className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {["Location", "Documents", "Owners", "Transfers"].map((t, i) => (
                    <motion.span
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-muted"
                      animate={reduce ? undefined : { borderColor: ["var(--c-line)", "var(--c-accent)", "var(--c-line)"] }}
                      transition={loop(reduce, { duration: 2.4, delay: i * 0.6, repeatDelay: 1.2 })}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
                <svg viewBox="0 0 60 12" className="hidden h-3 w-14 shrink-0 sm:block">
                  <line x1="0" y1="6" x2="52" y2="6" stroke="var(--c-line)" strokeWidth="2" />
                  <motion.line
                    x1="0" y1="6" x2="52" y2="6" stroke="var(--c-accent)" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
                    transition={loop(reduce, { duration: 2.4, repeatDelay: 0.6 })}
                  />
                  <path d="M50 2l6 4-6 4" fill="none" stroke="var(--c-accent)" strokeWidth="2" />
                </svg>
                <span className="bg-gold shimmer w-fit whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold text-accent-ink">
                  BHU-ID OD-BBSR-[placeholder]
                </span>
              </div>
            </GlowCard>
          </Reveal>

          {/* Two-level verification */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <GlowCard as="article" className="flex h-full flex-col p-7 sm:p-8">
              <CardHead
                icon={IconShieldCheck}
                title="Two-level verification"
                body="No record goes on the ledger on a single approval. Two independent checks must agree."
              />
              <div aria-hidden="true" className="mt-auto grid grid-cols-2 gap-2 pt-10 text-xs font-medium">
                {["Level 1", "Level 2"].map((l, i) => (
                  <div key={l} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-ink">
                    {l}
                    <motion.span
                      className="bg-gold flex h-5 w-5 items-center justify-center rounded-full text-accent-ink"
                      initial={reduce ? false : { scale: 0 }}
                      animate={{ scale: [0, 1.15, 1, 1, 0] }}
                      transition={loop(reduce, { duration: 3.2, times: [0, 0.12, 0.2, 0.9, 1], delay: 0.5 + i * 0.6, repeatDelay: 0.6 })}
                    >
                      <IconCheck className="h-3 w-3" strokeWidth={3} />
                    </motion.span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          {/* Tamper-proof */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <GlowCard as="article" className="flex h-full flex-col p-7 sm:p-8">
              <CardHead
                icon={IconLock}
                title="Tamper-proof records"
                body="Entries are cryptographically chained. Editing an old record would break the chain, and everyone would see it."
              />
              <div aria-hidden="true" className="mt-auto flex items-center pt-10">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <motion.span
                      className="block h-9 w-9 rounded-lg border border-accent/40 bg-accent-soft"
                      animate={reduce ? undefined : { y: [0, -4, 0], borderColor: ["rgb(217 184 115 / .3)", "rgb(217 184 115 / 1)", "rgb(217 184 115 / .3)"] }}
                      transition={loop(reduce, { duration: 1.2, delay: i * 0.3, repeatDelay: 1.6 })}
                    />
                    {i < 3 && (
                      <span className="relative block h-0.5 w-4 overflow-hidden bg-line sm:w-5">
                        <motion.span
                          className="bg-gold absolute inset-y-0 left-0 w-full"
                          initial={{ x: "-100%" }}
                          animate={{ x: ["-100%", "100%"] }}
                          transition={loop(reduce, { duration: 0.6, delay: i * 0.3 + 0.3, repeatDelay: 2.2 })}
                        />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          {/* Audit trail: wide */}
          <Reveal delay={0.16} className="lg:col-span-4">
            <GlowCard as="article" className="flex h-full flex-col p-7 sm:p-8">
              <CardHead
                icon={IconClock}
                title="Transparent audit trail"
                body="See who did what, and when: every submission, verification and transfer on a parcel, in order. Useful for buyers doing due diligence and officials resolving disputes."
              />
              <ul aria-hidden="true" className="mt-auto space-y-2 pt-10 text-xs">
                {[
                  ["Transfer recorded", "[date placeholder]"],
                  ["Level 2 verification passed", "[date placeholder]"],
                  ["Level 1 verification passed", "[date placeholder]"],
                ].map(([e, d], i) => (
                  <motion.li
                    key={e}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5"
                  >
                    <span className="flex items-center gap-2 text-ink">
                      <span className="relative flex h-2 w-2">
                        {i === 0 && !reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />}
                        <span className={`relative inline-flex h-2 w-2 rounded-full ${i === 0 ? "bg-accent" : "bg-silver/50"}`} />
                      </span>
                      {e}
                    </span>
                    <span className="font-mono text-muted">{d}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
