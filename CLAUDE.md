# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js 16 Breaking Changes

**Next.js 16 has breaking changes from prior versions.** APIs, conventions, and file structure may differ from training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (next core-web-vitals + typescript rules)
```

No test runner is configured.

## Stack

- **Next.js 16** — App Router
- **React 19**
- **TypeScript** — strict mode (`tsconfig.json`), `@/*` alias maps to `./src/*`
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives), but see Styling below — Tailwind utilities are barely used in practice
- No data-fetching library, form library, animation library, or state manager is installed. Don't add `SWR`/`TanStack Query`/`zod`/`Framer Motion`/`GSAP`/`Zustand` etc. unless the user asks — the site is fully static with no external data and hand-rolls its own animation primitives (see below).

## Architecture

This is a **single-page portfolio site**. Everything renders on one route:

- `src/app/layout.tsx` — root layout, loads the Inter font via `next/font/google` as `--font-body`, sets metadata.
- `src/app/page.tsx` — the entire page. `"use client"` at the top; composes every section (`Hero`, `Work`/`Projects`, `About`, `Now`, `Playground`, `Contact`) inside one `<main>`, wires up active-nav-section tracking via `IntersectionObserver`, and manages the open/closed project-modal state.
- `src/components/*.tsx` — one file per page section (not per UI primitive). There is no `components/ui/`, `components/features/`, `hooks/`, `lib/`, or `types/` split — everything for a section (types, hardcoded content arrays, subcomponents, the exported section component) lives together in that section's file. Follow this pattern; don't invent the nested structure unless the user asks to restructure.

**Every component is a Client Component** (`"use client"` at the top of every file in `src/components/`). This is not a "default to Server Components" codebase — nav highlighting, the custom cursor, reveal-on-scroll, and the project modal all need browser APIs and interactivity. Don't fight this by trying to introduce Server Components/Suspense boundaries unless asked.

**Content is hardcoded in the components, not fetched.** Resume/project/experience data lives as typed literal arrays at the top of the relevant file (e.g. `PROJECTS: Project[]` in `Projects.tsx`, `ROLES` in `Work.tsx`). To update site content (a new project, a new role, new links), edit these arrays directly — there's no CMS, API route, or MDX source.

**Animation is hand-rolled, not library-based**, in `src/components/Cursor.tsx`:
- `Cursor` — custom cursor dot/ring/label driven by `requestAnimationFrame` + refs (disabled on coarse/touch pointers via `matchMedia("(hover: none)")`).
- `Magnetic` — wraps a child and nudges it toward the cursor on mousemove.
- `Reveal` — `IntersectionObserver`-based scroll-reveal; toggles a `.reveal.in` class defined in `globals.css` rather than using an animation library.

Reuse these three primitives for new interactive/animated UI instead of pulling in Framer Motion or GSAP.

**Styling is a custom CSS design system, not Tailwind utilities.** `src/app/globals.css` defines:
- Design tokens as CSS custom properties under `:root` (colors, gradients, the full type scale, spacing, radii, elevation, motion durations/easing).
- Hand-written utility/component classes consumed throughout components: `.container`, `.section`, `.display-xxl`/`.display-xl`/.../`.caption`/`.micro` (type scale), `.btn`/`.btn--primary`/`.btn--secondary`/`.btn--ghost`, `.card`, `.tag`, `.eyebrow`, `.nav*`, `.marquee*`, `.reveal`.
- `@font-face` declarations for the local GT Walsheim trial OTFs served from `public/fonts/` (display font, referenced via `--font-display`), separate from the Inter body font loaded through `next/font`.

Components mix these custom classes with **inline `style={{...}}` objects** (especially for one-off positioning/spacing) — this is the established convention here, not an anti-pattern to fix. When adding new UI, prefer reusing an existing class from `globals.css` over inventing a new Tailwind utility combination; use Tailwind utilities or new inline styles only where no existing class fits, matching the surrounding component's style.

**Density/theming hooks**: `<html>` in `layout.tsx` carries a `density-roomy` class; `globals.css` also defines `density-compact` overrides for `.section`/`.card` padding. There is no dark-mode media query — the design is single (dark) themed via the `--color-canvas`/`--color-ink` tokens.

## Deployment

Deployed via Netlify (`netlify.toml`: `npm run build`, publishes `.next`, uses `@netlify/plugin-nextjs`). CI workflow lives at `.github/workflows/deploy.yml`.

## Git Commits

Format: `type(scope): short description`

Types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`

Example: `feat(hero): add animated headline component`

One logical change per commit — don't bundle unrelated changes.
