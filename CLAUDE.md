# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js 16 Breaking Changes

**Next.js 16 has breaking changes from prior versions.** APIs, conventions, and file structure may differ from training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Commands

All commands run from `portfolio-website/`:

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (next core-web-vitals + typescript rules)
```

No test runner is configured yet.

## Stack

- **Next.js 16** — App Router, Server Components by default
- **React 19** — hooks and composition patterns
- **TypeScript** — strict mode (`tsconfig.json`), `@/*` alias maps to `./src/*`
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` (not `@tailwind` directives)

## Architecture

Single `src/app/` App Router project. Currently a scaffold — only `layout.tsx` and `page.tsx` exist under `src/app/`.

**Fonts**: Geist Sans and Geist Mono loaded via `next/font/google` in `layout.tsx`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`, registered in `globals.css` under `@theme inline`.

**Design tokens**: Defined as CSS variables in `globals.css` under `:root`. Dark mode via `@media (prefers-color-scheme: dark)`. Tailwind v4 consumes them via `@theme inline { --color-background: var(--background); ... }`.

**Project structure to follow** as the portfolio grows:

```
src/
├── app/               # Pages, layouts, loading/error boundaries
├── components/
│   ├── ui/            # Primitive reusable components
│   └── features/      # Feature-specific components
├── hooks/             # Custom hooks (use* prefix)
├── lib/               # Utilities, third-party wrappers
├── types/             # Shared TypeScript types
└── styles/
    └── globals.css    # Tailwind base + CSS variables
```

## Code Rules

### React & Next.js
- Default to Server Components; add `"use client"` only for state, effects, event handlers, or browser APIs.
- Use `SWR` or `TanStack Query` for client-side data fetching — no raw `useEffect` fetching.
- Use `next/image` for all images, `next/font` for all fonts.
- Wrap async/data-heavy components in error boundaries with skeleton `<Suspense>` fallbacks.
- No prop drilling beyond 2 levels — use Context or Zustand.

### TypeScript
- No `any` — use `unknown` and narrow with type guards.
- Use `type` for unions/intersections, `interface` for extendable object shapes.
- Use `zod` for runtime validation of external data.
- No `// @ts-ignore` — fix the type.

### Styling
- Tailwind utility classes only; no inline styles for static values.
- All design tokens via CSS variables in `globals.css`.
- Always respect `prefers-reduced-motion`. Animate with `transform`/`opacity` only — never `width`, `height`, or positional properties.

| Animation use case | Tool |
|---|---|
| Hover states, micro-interactions | `tailwindcss-animate` |
| Page transitions, gesture-based motion | Framer Motion |
| Timeline/scroll-driven/SVG path | GSAP |

### Naming
- Components: `PascalCase` files — `UserProfileCard.tsx`
- Hooks: `camelCase` with `use` prefix — `useUserProfile.ts`
- Non-component files: `kebab-case`
- Constants: `SCREAMING_SNAKE_CASE`
- Types/interfaces: `PascalCase`, no `I` prefix

### Component design
- Forward all standard HTML props on wrapper components via `React.ComponentPropsWithoutRef<'element'>`.
- Extend via props/composition/slot patterns — don't modify existing internals.
- Inject dependencies (API clients, services) via props or Context, never import directly inside a component.

### Imports
- Absolute imports via `@/` — `import { Button } from '@/components/ui/button'`
- Barrel `index.ts` exports for component directories.
- Sort: external packages → `@/` paths → relative paths.

### Things never to do
- `document.querySelector` inside React — use refs.
- Mutate props or state directly.
- `dangerouslySetInnerHTML` without sanitization.
- Hardcode API URLs — use environment variables.
- Array index as key for dynamic/reorderable lists.
- `console.log` in committed code.
- `// @ts-ignore` — fix the type properly.
- `any` as a quick fix — narrow the type with guards or `unknown`.
- Commit `.env` files or secrets.
- Load fonts from external CDNs — use `next/font`.
- Bare `<img>` tags for content images — use `next/image`.
- `useEffect` for data fetching — use SWR or TanStack Query.

## React Best Practices

- **Co-locate state** — keep state as close to where it's used as possible; lift only when necessary.
- **Composition over configuration** — prefer small, composable components over large prop-heavy ones.
- **Memoization with intent** — use `useMemo`/`useCallback`/`memo` only for measurable performance concerns, not preemptively.
- **Avoid side effects in render** — all side effects belong in `useEffect`, event handlers, or Server Actions.
- **Discriminated unions** for state machines and multi-variant data shapes.
- **Early returns** over nested conditionals.
- **Pure functions** — same input always produces same output, no side effects.
- Maximum function length ~40 lines; extract into smaller helpers beyond that.
- No magic numbers — extract to named constants.

## Performance

- `next/dynamic` for heavy components not needed on initial load.
- `content-visibility: auto` on long off-screen lists.
- Batch DOM reads/writes — never read then write in a loop.
- Audit bundle size with `@next/bundle-analyzer` when adding dependencies.
- Animate with `transform`/`opacity` only — never `width`, `height`, or positional properties.

## Accessibility

- Semantic HTML: `<button>` for actions, `<a>` for navigation, `<header>`/`<nav>`/`<main>`/`<footer>` for structure.
- All interactive elements must be keyboard-accessible (`Tab`, `Enter`, `Space`, `Escape`).
- Visible `:focus-visible` ring on all focusable elements.
- Every `<img>` gets `alt`; decorative images use `alt=""`.
- Icon-only buttons require `aria-label`.
- Form inputs require associated `<label>` elements.
- Color alone must never convey meaning — pair with text or icon.
- WCAG AA contrast: 4.5:1 for body text, 3:1 for large text.

## Git Commits

Format: `type(scope): short description`

Types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`

Example: `feat(hero): add animated headline component`

One logical change per commit — don't bundle unrelated changes.
