import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import { RingsMark } from "../components/Logo.jsx";
import { IconArrow } from "../components/Icons.jsx";

export default function FinalCta() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-night px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9b873]/15 blur-3xl" />
            <div className="spin-slow absolute left-1/2 top-1/2 w-[44rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
              <RingsMark className="h-auto w-full" />
            </div>
          </div>

          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-semibold leading-tight text-sand sm:text-5xl">
            Be part of the <span className="text-gold serif-accent shimmer">pilot</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sand/70 sm:text-lg">
            Buyers, sellers, brokers and officials in Cuttack and Bhubaneswar: tell us how you deal with land
            records today, and help shape how BhuChain works.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {/* TODO: point to the real early-access form / contact once available. */}
            <Button href="#get-started">
              Request early access
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
            <Button href="#how-it-works" variant="ghostLight">
              Read how it works
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
