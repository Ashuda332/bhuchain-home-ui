import { useRef } from "react";
import { motion } from "motion/react";
import Container from "../components/Container.jsx";

// Placeholder posts. Titles and dates to be replaced with real releases.
const POSTS = [
  { title: "Introducing BHU-ID", body: "One permanent identity for every record on the chain.", art: "rings" },
  { title: "How two-step verification works", body: "Why no record is final until two independent checks agree.", art: "bars" },
  { title: "Developer preview", body: "APIs and SDKs for building on BhuChain. [placeholder]", art: "grid" },
  { title: "Pilot program", body: "Where and how BhuChain is being tested first. [placeholder]", art: "glow" },
];

function Art({ kind }) {
  if (kind === "rings")
    return (
      <div className="relative h-full w-full bg-[radial-gradient(circle_at_50%_50%,#8c9bff_0%,#1f3dff_45%,#0b1a99_100%)]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex -space-x-6">
            <span className="block h-20 w-20 rounded-full border-[6px] border-[#dad2ce]" />
            <span className="block h-20 w-20 rounded-full border-[6px] border-[#c29e61]" />
          </div>
        </div>
      </div>
    );
  if (kind === "bars")
    return (
      <div className="flex h-full w-full items-end justify-center gap-1.5 bg-primary px-6 pb-6">
        {[30, 55, 40, 80, 60, 95, 70, 45, 85, 50, 65].map((h, i) => (
          <span key={i} className={`block w-3 rounded-sm ${i % 4 === 3 ? "bg-[#c29e61]" : "bg-white/80"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  if (kind === "grid")
    return (
      <div className="h-full w-full bg-band [background-image:linear-gradient(var(--c-line)_1px,transparent_1px),linear-gradient(90deg,var(--c-line)_1px,transparent_1px)] [background-size:22px_22px]">
        <div className="grid h-full place-items-center">
          <span className="rounded-lg bg-ink px-4 py-2 font-mono text-sm text-white">{"{ bhuchain.sdk }"}</span>
        </div>
      </div>
    );
  return <div className="h-full w-full bg-[conic-gradient(from_200deg_at_50%_60%,#0a0b0d,#1f3dff,#c29e61,#0a0b0d)]" />;
}

export default function Updates() {
  const scroller = useRef(null);
  const by = (d) => scroller.current?.scrollBy({ left: d * 340, behavior: "smooth" });

  return (
    <section id="updates" aria-labelledby="updates-title" className="py-24 sm:py-28">
      <Container>
        <div className="flex items-end justify-between">
          <h2 id="updates-title" className="text-3xl text-ink sm:text-4xl">Latest updates.</h2>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => by(d)}
                aria-label={d < 0 ? "Previous updates" : "Next updates"}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-ink hover:bg-band"
              >
                <svg viewBox="0 0 16 16" className={`h-4 w-4 ${d < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
              </button>
            ))}
          </div>
        </div>
      </Container>
      <div ref={scroller} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 sm:scroll-pl-[max(1.5rem,calc((100vw_-_72rem)/2_+_2rem))] sm:px-[max(1.5rem,calc((100vw_-_72rem)/2_+_2rem))]" data-lenis-prevent-horizontal>
        {POSTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="w-[300px] shrink-0 snap-start sm:w-[320px]"
          >
            <a href="#" className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                  <Art kind={p.art} />
                </div>
              </div>
              <h3 className="mt-4 text-lg text-ink">{p.title}</h3>
              <p className="mt-1 text-[15px] text-muted">{p.body}</p>
              <p className="mt-3 text-sm text-muted">[date]</p>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
