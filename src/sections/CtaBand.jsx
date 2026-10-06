import Button, { Square } from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import DotField from "../components/DotField.jsx";

export default function CtaBand() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-primary text-white">
      <DotField className="-z-10" dot="255 255 255" dotAlpha={0.22} accent="255 255 255" clearCenter={false} radius={220} />
      <Container className="py-20 sm:py-24">
        <h2 id="cta-title" className="text-3xl sm:text-5xl">Start building on BhuChain.</h2>
        <p className="mt-3 max-w-md text-white/75">Join the pilot program and be among the first to put records on-chain.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {/* TODO: point to the real sign-up form once available. */}
          <Button href="#get-started" variant="light">
            <Square /> Join the waitlist
          </Button>
          <Button href="#get-started" variant="ghostLight">
            Contact the team
          </Button>
        </div>
      </Container>
    </section>
  );
}
