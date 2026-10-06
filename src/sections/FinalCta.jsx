import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import { IconArrow } from "../components/Icons.jsx";

export default function FinalCta() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-semibold leading-tight text-sand sm:text-5xl">
            Be part of the Cuttack and Bhubaneswar pilot.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sand/75 sm:text-lg">
            Buyers, sellers, brokers and officials: tell us how you deal with land records today, and help shape
            how BhuChain works.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {/* TODO: point to the real early-access form / contact once available. */}
            <Button href="#get-started" variant="light">
              Request early access
              <IconArrow className="h-4 w-4" />
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
