import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";

export default function FinalCta() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[32px] bg-night px-6 py-16 sm:px-14 sm:py-24">
          {/* a row of sealed blocks fading into the distance */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[38%] items-center gap-3 pr-12 lg:flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="block aspect-square flex-1 rounded-xl"
                style={{ background: "var(--gold-face)", opacity: 0.85 - i * 0.17, transform: `translateY(${(i % 2) * 18 - 9}px)` }}
              />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgb(194 158 97 / .25), transparent 70%)" }}
          />

          <h2 id="cta-title" className="max-w-xl text-4xl leading-[1] text-sand sm:text-6xl">
            Be one of the first plots on the chain.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-sand/70 lg:max-w-[52%]">
            Buyers, sellers, brokers and officials in Cuttack and Bhubaneswar: tell us how you deal with land
            records today and help shape the pilot.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {/* TODO: point to the real early-access form / contact once available. */}
            <Button href="#get-started">Request early access</Button>
            <Button href="#fraud-lab" variant="ghostLight">
              Try the fraud lab
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
