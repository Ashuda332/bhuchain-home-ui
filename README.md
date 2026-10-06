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
public/brand/
  logo-original.webp   Official BhuChain logo (reference)
  wordmark-mask.png    "BHUCHAIN" letterforms cut from the logo, used as a CSS mask
  shri-mask.png        The श्री mark cut from the logo, used as a CSS mask
src/
  components/   Logo, BrandEmblem (animated hero logo), ParticleField, GlowCard,
                WordReveal, Button, Container, Reveal, SectionHeading, ThemeToggle, Icons
  sections/     Navbar, Hero, Statement, Problem, HowItWorks, Features, Pilot, FinalCta, Footer
  App.jsx       Assembles the sections
  index.css     Tailwind import + design tokens (colours, gradients, fonts) for dark and light mode
```

## Design

- **Brand:** gold + silver interlocked rings from the logo. The rings are redrawn as SVG so they can
  animate; the wordmark and श्री use the real logo shapes as masks, filled with a CSS gold gradient.
- **Hero:** the rings draw themselves in, श्री fades in, the wordmark wipes in, then a light sheen
  keeps orbiting the rings. Gold dust particles drift behind, the logo tilts with the mouse, and it
  drifts back and fades as you scroll away.
- **Scroll motion:** statement text lights up word by word; "How it works" has a sticky record card
  that advances as you scroll through the steps; cards have a gold spotlight that follows the cursor.
- **Theme:** dark (default) and light, toggle in the navbar, choice saved in `localStorage`.

## Customising

- **Colours:** all brand colours are CSS variables at the top of `src/index.css` (`:root` for light,
  `.dark` for dark), plus `--gold-grad` / `--silver-grad`. Tailwind utilities such as `bg-surface`,
  `text-ink`, `text-accent` are generated from them.
- **Fonts:** Sora (headings), Instrument Serif italic (gold accent words) and Inter (body) from
  Google Fonts, loaded in `index.html`, with fallback stacks in `src/index.css`.
- **Logo:** `src/components/Logo.jsx` (navbar + footer) and `src/components/BrandEmblem.jsx` (hero).
  When an official vector logo exists, export it to `/public/logo.svg` and swap it in `Logo.jsx`.
- **Placeholders:** any number or claim that still needs a real, sourced value is shown as
  `[placeholder]`. Search the code for `placeholder` before launch.

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, labelled controls, and decorative SVG/canvas
hidden from screen readers. All animation respects `prefers-reduced-motion`: the logo appears
fully drawn, particles freeze, and loops and scroll effects are turned off.
