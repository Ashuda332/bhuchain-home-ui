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
src/
  components/   Reusable pieces: Logo, Button, Container, Reveal, SectionHeading, ThemeToggle, Icons
  sections/     Page sections in order: Navbar, Hero, Problem, HowItWorks, Features, Pilot, FinalCta, Footer
  App.jsx       Assembles the sections
  index.css     Tailwind import + design tokens (colours, fonts) for light and dark mode
```

## Customising

- **Colours:** all brand colours are CSS variables at the top of `src/index.css` (`:root` for light,
  `.dark` for dark). Tailwind utilities such as `bg-surface`, `text-ink`, `text-accent` are generated
  from them, so changing a variable updates the whole page.
- **Fonts:** Fraunces (display) and Inter (body) from Google Fonts, loaded in `index.html`, with
  fallback stacks in `src/index.css`.
- **Logo:** `src/components/Logo.jsx` is a temporary text wordmark. Replace it with `/public/logo.svg`
  when the real logo is ready; navbar and footer both use this component.
- **Placeholders:** any number or claim that still needs a real, sourced value is shown as
  `[placeholder]`. Search the code for `placeholder` before launch.

## Accessibility & motion

Semantic landmarks, skip link, visible focus rings, labelled controls, and decorative SVGs hidden
from screen readers. Animations respect `prefers-reduced-motion`. Theme follows the system setting
by default and can be toggled (saved in `localStorage`).
