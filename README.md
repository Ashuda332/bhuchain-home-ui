# BhuChain — Home UI

Landing page for **BhuChain**, a blockchain-based land registry and real estate platform for Odisha
(pilot cities: Cuttack and Bhubaneswar).

BhuChain gives every land parcel a **BHU-ID** (an independent evidence layer), runs **two-level
verification** before anything is recorded, and keeps **tamper-proof land records** to prevent fraud
such as fake owners and double sales.

This repo is **static front-end only**: no backend, wallet, API or contract calls.

## Tech stack

- [Vite](https://vite.dev) + React
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [Motion](https://motion.dev) for animation (`import { motion } from "motion/react"`)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
.claude/skills/
  frontend-design/     Anthropic's official design skill (github.com/anthropics/skills, Apache-2.0)
  ui-ux-pro-max/       UI/UX Pro Max design database + search script (github.com/nextlevelbuilder/ui-ux-pro-max-skill, MIT)
public/brand/
  logo-original.webp   Official BhuChain logo (reference)
  wordmark-mask.png    "BHUCHAIN" letterforms cut from the logo, used as a CSS mask
  shri-mask.png        The श्री mark cut from the logo, used as a CSS mask
src/
  components/   Logo, BrandEmblem (animated hero logo), NodeNetwork (blockchain network canvas),
                GlowCard, WordReveal, Button, Container, Reveal, SectionHeading, ThemeToggle, Icons
  lib/hash.js   SHA-256 helpers (Web Crypto) for the ledger and tamper demos
  sections/     Navbar, Hero, LedgerStrip, Statement, Problem, HowItWorks, TamperDemo,
                Features, Pilot, FinalCta, Footer
  App.jsx       Assembles the sections
  index.css     Tailwind import + design tokens (colours, gradients, fonts) for dark and light mode
```

## Design

Built with the two skills above: palette and checks from **ui-ux-pro-max** (fintech / blockchain
profile: midnight navy + gold), layout and copy discipline from **frontend-design**.

| Token | Hex | Use |
|---|---|---|
| Midnight ledger | `#0A0F1C` | Dark background |
| Logo gold | `#C29E61` (shadow `#9E7E49`, highlight `#EDDEB1`) | Brand, buttons, links. Sampled from the logo |
| Logo silver | `#9D9996` (shadow `#4D4B4A`, highlight `#DAD2CE`) | Second ring, secondary data. Sampled from the logo |
| Verified teal | `#3FD0B4` | Only for verified / valid / live states |
| Alert red | `#FF7A6B` | Only for tampered / broken states |
| Porcelain | `#F4F5F7` | Light background |

- **Type:** Outfit (one geometric family, close to the logo's letterforms) + JetBrains Mono only
  for real ledger data such as hashes.
- **Hero:** the logo rings draw themselves in, श्री and the wordmark follow, and a light sheen keeps
  orbiting. Behind it, a peer-to-peer node network passes gold blocks between nodes; a node flashes
  teal when it receives one.
- **Ledger strip:** a looping chain of sample blocks where each block's `prev` is the previous
  block's `hash`, computed with real SHA-256 in the browser.
- **Tamper demo:** edit any record and its hash stops matching the sealed one, breaking every later
  block. "Restore original records" resets it.
- **Theme:** dark (default) and light, toggle in the navbar, choice saved in `localStorage`.

## Customising

- **Colours:** CSS variables at the top of `src/index.css` (`:root` light, `.dark` dark), plus
  `--gold-grad` / `--silver-grad`.
- **Logo:** `src/components/Logo.jsx` (navbar + footer) and `src/components/BrandEmblem.jsx` (hero).
  When an official vector logo exists, export it to `/public/logo.svg` and swap it in `Logo.jsx`.
- **Design skills:** run the ui-ux-pro-max search, e.g.
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech blockchain" --domain color`.
- **Placeholders:** any number or claim that still needs a real, sourced value is shown as
  `[placeholder]`. Search the code for `placeholder` before launch.

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, 44px touch targets, labelled controls, a live
status message in the tamper demo, and decorative SVG/canvas hidden from screen readers. All
animation respects `prefers-reduced-motion`: the logo appears fully drawn, the network and ledger
stop moving, and loops and scroll effects are turned off.
