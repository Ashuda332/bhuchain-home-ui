import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "../components/Logo.jsx";
import Button, { Chevron } from "../components/Button.jsx";
import Container from "../components/Container.jsx";

const MENUS = [
  {
    label: "Solutions",
    items: [
      { title: "Records", desc: "Tamper-proof records with a full history", href: "#platform" },
      { title: "Verification", desc: "Multi-level approvals before anything is final", href: "#features" },
      { title: "Transfers", desc: "Move ownership with on-chain settlement", href: "#features" },
    ],
  },
  {
    label: "Developers",
    items: [
      { title: "Documentation", desc: "Guides and API reference (coming soon)", href: "#" },
      { title: "SDK", desc: "Build on BhuChain from your stack (coming soon)", href: "#" },
      { title: "Network status", desc: "Live status of the network", href: "#" },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Vision", desc: "Why we are building BhuChain", href: "#vision" },
      { title: "Updates", desc: "Latest releases and news", href: "#updates" },
      { title: "Contact", desc: "Talk to the team", href: "#get-started" },
    ],
  },
];

export default function Navbar() {
  const [bar, setBar] = useState(true);
  const [open, setOpen] = useState(null); // desktop dropdown index
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e) => e.key === "Escape" && (setOpen(null), setMobile(false));
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <AnimatePresence initial={false}>
        {bar && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-band text-[13px]"
          >
            <div className="relative flex min-h-9 items-center justify-center gap-3 px-10 text-center text-ink">
              <span><span className="hidden sm:inline">The BhuChain </span>Pilot program opening soon.</span>
              <a href="#get-started" className="font-medium text-primary hover:underline">
                Join the waitlist
              </a>
              <button
                type="button"
                onClick={() => setBar(false)}
                aria-label="Dismiss announcement"
                className="absolute right-2 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-muted hover:bg-line"
              >
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`sticky top-0 z-50 bg-bg/90 backdrop-blur-md transition-shadow ${scrolled ? "shadow-[0_1px_0_var(--c-line)]" : ""}`}>
        <Container as="nav" aria-label="Primary" className="flex h-16 items-center justify-between gap-6" ref={navRef} onMouseLeave={() => setOpen(null)}>
          <a href="#top" aria-label="BhuChain home" className="text-ink">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {MENUS.map((m, i) => (
              <li key={m.label} className="relative" onMouseEnter={() => setOpen(i)}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`menu-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex min-h-11 cursor-pointer items-center gap-1 rounded-full px-3.5 text-[15px] text-ink hover:bg-band"
                >
                  {m.label}
                  <svg viewBox="0 0 16 16" className={`h-3 w-3 text-muted transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      id={`menu-${i}`}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2"
                    >
                      <ul className="rounded-2xl border border-line bg-bg p-2 shadow-[0_20px_50px_-20px_rgb(10_11_13/0.25)]">
                        {m.items.map((it) => (
                          <li key={it.title}>
                            <a href={it.href} onClick={() => setOpen(null)} className="block rounded-xl px-3 py-2.5 hover:bg-band">
                              <span className="block text-[15px] text-ink">{it.title}</span>
                              <span className="block text-[13px] text-muted">{it.desc}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="#get-started">
                Get started <Chevron />
              </Button>
            </div>
            <button
              type="button"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-ink hover:bg-band md:hidden"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMobile((v) => !v)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {mobile ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </Container>

        <AnimatePresence initial={false}>
          {mobile && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <Container className="max-h-[75vh] overflow-y-auto py-4">
                {MENUS.map((m) => (
                  <div key={m.label} className="border-b border-line py-3">
                    <p className="text-sm text-muted">{m.label}</p>
                    <ul className="mt-1">
                      {m.items.map((it) => (
                        <li key={it.title}>
                          <a href={it.href} onClick={() => setMobile(false)} className="block py-2 text-base text-ink">
                            {it.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button href="#get-started" className="mt-4 w-full" onClick={() => setMobile(false)}>
                  Get started <Chevron />
                </Button>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
