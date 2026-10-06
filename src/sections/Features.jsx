import { motion } from "motion/react";
import Container from "../components/Container.jsx";

const FEATURES = [
  {
    title: "Records",
    body: "Write tamper-proof records with a complete, ordered history.",
    icon: (
      <path d="M5 4h10l4 4v12H5zM15 4v4h4M8 12h8M8 16h5" />
    ),
  },
  {
    title: "Verification",
    body: "Require multiple independent approvals before anything is final.",
    icon: <path d="M12 3 5 6v5c0 4.5 3 8.2 7 9.5 4-1.3 7-5 7-9.5V6zM9 12l2 2 4-4" />,
  },
  {
    title: "Transfers",
    body: "Move ownership instantly with transparent, on-chain settlement.",
    icon: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
  },
];

export default function Features() {
  return (
    <section id="features" aria-label="Features" className="py-14">
      <Container>
        <ul className="grid gap-3 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#platform" className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:bg-band">
                <div className="flex items-start justify-between">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {f.icon}
                  </svg>
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                </div>
                <h3 className="mt-6 text-xl text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{f.body}</p>
              </a>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
