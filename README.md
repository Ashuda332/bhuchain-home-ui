# BhuChain — Home UI

Landing page for **BhuChain**, a blockchain platform for verifiable, tamper-proof records.

This repo is **static front-end only**: no backend, wallet, API or contract calls.

## Tech stack

- [Vite](https://vite.dev) + React
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [Motion](https://motion.dev) for animation (`import { motion } from "motion/react"`)
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling (~3 KB)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
.claude/skills/        Design skills: Anthropic frontend-design (Apache-2.0), ui-ux-pro-max (MIT)
public/brand/          Official logo (reference) and the wordmark mask cut from it
src/
  components/   Logo, Button, Container, SmoothScroll (Lenis), PixelField (cursor pixel bars),
                PixelWave (dark equalizer), Decode (scrambling numbers), Illustrations (animated line art)
  sections/     Navbar, Hero, Capabilities, Features, Stats, Platform, Vision, Updates, CtaBand, Footer
  App.jsx       Assembles the sections
  index.css     Tailwind import + design tokens
```

## Design

Clean white canvas, near-black type, one electric-blue action colour, and the logo's gold and
silver for highlights and pixel effects.

| Token | Hex | Use |
|---|---|---|
| Ink | `#0A0B0D` | Text, dark section |
| Electric blue | `#1F3DFF` | Buttons, links, pixels, CTA band |
| Logo gold | `#C29E61` | Pixel accents, illustration highlights (sampled from the logo) |
| Logo silver | `#9D9996` | Pixel accents (sampled from the logo) |
| Band grey | `#F6F6F8` | Announcement bar, stats band |

- **Type:** Geist (everything) + Geist Mono (small labels).
- **Motion:**
  - Lenis smooth scrolling, with anchor links that glide to their section.
  - Hero and CTA band: pixel "candle" bars flicker in around the cursor.
  - Stats decode from random glyphs when they scroll into view.
  - Platform illustrations each loop one small animation.
  - Vision section: segmented blue equalizer that brightens near the cursor.
  - Capabilities marquee; animated navbar dropdowns.
- Everything respects `prefers-reduced-motion` (Lenis, canvases and loops switch off).

## Customising

- **Colours:** CSS variables at the top of `src/index.css`.
- **Logo:** `src/components/Logo.jsx`. When an official vector logo exists, export it to
  `/public/logo.svg` and swap it in `Logo.jsx`.
- **Content:** product copy is generic for now. Anything that still needs real content is marked
  `[placeholder]` or `[date]`. There are no partner logos or market statistics on purpose.

## Accessibility

Semantic landmarks, skip link, visible focus rings, 44px touch targets, keyboard-operable dropdowns
(Escape closes), labelled icon buttons, and decorative canvases/SVGs hidden from screen readers.
