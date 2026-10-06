import Container from "../components/Container.jsx";
import Logo from "../components/Logo.jsx";

const groups = [
  {
    title: "Product",
    links: [
      { href: "#how-it-works", label: "How it works" },
      { href: "#features", label: "Features" },
      { href: "#fraud-prevention", label: "Fraud prevention" },
      { href: "#pilot", label: "Pilot" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "#get-started", label: "Request early access" },
      { href: "#", label: "Email: [placeholder]" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-night text-sand border-t border-white/5">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          {/* Same Logo component as the navbar; sits on the dark night band. */}
          <a href="#top" aria-label="BhuChain home" className="text-sand">
            <Logo />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/70">
            A blockchain-based land registry and real estate platform for Odisha. Tamper-proof records, verified
            twice.
          </p>
        </div>

        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-sand/60">{g.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-sand/85 transition-colors hover:text-[#e9d39a]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-sand/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} BhuChain. All rights reserved.</p>
        <p>Pilot project. Not yet an official government record system.</p>
      </Container>
    </footer>
  );
}
