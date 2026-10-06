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
  components/   Logo, LandLedger (3D hero map), Button, Container, Reveal, ThemeToggle, Icons
  lib/          hash.js (SHA-256 via Web Crypto), odia.js (Odia numerals)
  sections/     Navbar, Hero, ChainOfTitle, FraudLab, BhuIdAnatomy, Pilot, FinalCta, Footer
  App.jsx       Assembles the sections
  index.css     Tailwind import + design tokens (colours, gradients, fonts) for dark and light mode
```

## Design: "Pattachitra night"

The idea: **Odisha's land is the ledger.** Every visual comes from the subject (plots, the
Mahanadi, Odia script, registry stamps) rather than generic crypto imagery.

| Token | Hex | Use |
|---|---|---|
| Indigo night | `#0C0F24` | Dark background (Pattachitra indigo) |
| Conch white | `#F2EEE6` | Text on dark |
| Logo gold | `#C29E61` (shadow `#9E7E49`, highlight `#EDDEB1`) | Brand, blocks, buttons. Sampled from the logo |
| Logo silver | `#9D9996` (`#4D4B4A` to `#DAD2CE`) | Secondary data. Sampled from the logo |
| Paddy green | `#5FD39A` | Only verified / accepted states |
| Vermilion | `#FF6B4A` | Only fraud / rejected states |

- **Type:** Bricolage Grotesque (headlines), Geist (body), Geist Mono (hashes only), Noto Sans
  Oriya (Odia words and numerals).
- **Hero:** an isometric 3D map of plots with the Mahanadi running through it. A survey line sweeps
  the map, one plot rises into a gold block and is appended to the ledger beside it; sealed plots
  keep a gold edge, so the map fills up over time. Plot numbers use Odia numerals.
- **How a plot becomes a block:** on desktop the section pins while a plot's six-block history
  slides past, linked by real SHA-256 `prev` → `hash` values. On mobile it's a vertical chain.
- **Fraud lab:** play the fraudster. Double sale, fake owner and record tampering each end in an
  "Accepted" / "Rejected" registry stamp; tampering recomputes real SHA-256 hashes live.
- **BHU-ID anatomy:** a sample certificate; hovering or focusing a feature highlights its part.
- **Pilot:** Cuttack and Bhubaneswar in large type with Odia names and coordinates.
- **Theme:** dark (default) and light, toggle in the navbar, choice saved in `localStorage`.

## Customising

- **Colours:** CSS variables at the top of `src/index.css` (`:root` light, `.dark` dark), including
  the hero map's field and river colours.
- **Logo:** `src/components/Logo.jsx` (navbar, footer, certificate). When an official vector logo
  exists, export it to `/public/logo.svg` and swap it in `Logo.jsx`.
- **Design skills:** e.g.
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech blockchain" --domain color`.
- **Placeholders:** any number or claim that still needs a real, sourced value is shown as
  `[placeholder]`. Plots, people (Owner A, Buyer B, Person X) and hashes are sample data.

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, 44px touch targets, keyboard-operable tabs
(arrow keys), live status messages in the fraud lab, and decorative 3D/SVG hidden from screen
readers. All animation respects `prefers-reduced-motion`: the map shows one sealed plot without
moving, the pinned chain becomes a plain vertical list, and loops are turned off.
