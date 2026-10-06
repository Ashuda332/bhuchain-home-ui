import Container from "../components/Container.jsx";
import Logo from "../components/Logo.jsx";

const COLS = [
  { title: "Platform", links: [["Records", "#platform"], ["Verification", "#features"], ["Transfers", "#features"]] },
  { title: "Developers", links: [["Documentation", "#"], ["SDK", "#"], ["Network status", "#"]] },
  { title: "Company", links: [["Vision", "#vision"], ["Updates", "#updates"], ["Contact", "#get-started"]] },
];

const SOCIAL = [
  ["X", "M4 4l16 16M20 4 4 20"],
  ["GitHub", "M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.3-.4-1.2.1-2.5 0 0 .8-.3 2.5.9a8.6 8.6 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.5.6.6 1 1.4 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9 9 0 0 0 12 3Z"],
  ["LinkedIn", "M5 9v10M5 5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10"],
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#top" aria-label="BhuChain home" className="text-ink">
            <Logo />
          </a>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Pilot program opening soon
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIAL.map(([name, d]) => (
              <li key={name}>
                <a href="#" aria-label={`BhuChain on ${name}`} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-band hover:text-ink">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-sm text-ink">{c.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-sm text-muted hover:text-ink">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} BhuChain</p>
        <p>Content on this page is a preview and may change.</p>
      </Container>
    </footer>
  );
}
