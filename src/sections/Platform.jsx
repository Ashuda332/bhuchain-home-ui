import { motion } from "motion/react";
import Button, { Chevron } from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { IdentityArt, LedgerArt, NetworkArt, VerifyArt } from "../components/Illustrations.jsx";

const CARDS = [
  { Art: VerifyArt, title: "Verified in seconds", body: "Every record passes independent checks before it's written. No single person can approve their own change." },
  { Art: LedgerArt, title: "A ledger nobody can rewrite", body: "Each block carries the fingerprint of the one before it. Change history and the whole chain shows it." },
  { Art: NetworkArt, title: "Open and connected", body: "Plug into existing systems through open APIs. Data moves between apps without losing its proof." },
  { Art: IdentityArt, title: "Identity built in", body: "Every participant has a verified identity, and every action is tied to who took it." },
];

export default function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="platform-title" className="max-w-xl text-3xl leading-tight text-muted sm:text-4xl">
            <span className="text-ink">BhuChain</span> is the platform for verifiable records at scale.
          </h2>
          <Button href="#get-started" variant="secondary">
            Get early access <Chevron />
          </Button>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {CARDS.map(({ Art, title, body }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[16/10] rounded-2xl border border-line bg-bg p-6 transition-colors hover:bg-band">
                <Art />
              </div>
              <h3 className="mt-5 text-xl text-ink">{title}</h3>
              <p className="mt-1.5 max-w-md text-[15px] text-muted">{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <h3 className="text-xl text-ink">Secure and trusted</h3>
            <p className="mt-2 max-w-md text-[15px] text-muted">Cryptographic proofs, multi-level approvals and a public audit trail, designed in from day one.</p>
          </div>
          <div>
            <h3 className="text-xl text-ink">A bridge, not an island</h3>
            <p className="mt-2 max-w-md text-[15px] text-muted">Works alongside the systems you already run, so adopting BhuChain doesn't mean starting over.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
