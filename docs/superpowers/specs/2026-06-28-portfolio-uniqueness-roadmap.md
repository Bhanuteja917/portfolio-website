# Portfolio Uniqueness Roadmap

**Date:** 2026-06-28
**Owner:** Bhanu Teja Chintha
**Goal:** Make this portfolio memorably different from template portfolios by leaning into its existing strength — an opinionated developer voice and an interactive Playground — rather than adding generic sections.

## Guiding principle

The site already has a point of view. Every feature below should reinforce one idea: **this portfolio is genuinely run by a developer, not assembled from a template.** Features that don't serve that idea get cut.

## Current state (baseline)

Next.js 16 (App Router, React 19, TS strict, Tailwind v4). Single-page app in `src/app/page.tsx` with an `IntersectionObserver` driving an active-section nav. Sections: Hero, Work (timeline), Projects (+ modal), About, Now, Playground (interactive ASCII field), Contact. Custom cursor + magnetic interactions in `Cursor.tsx`. Opinionated copy throughout.

## The four features

Built as **independent** units, each with its own spec → plan → implementation cycle. Ordered by dependency and risk.

### 1. Terminal / ⌘K command palette nav — *the spine*
A keyboard-first command palette that can drive the whole site: `work`, `projects react`, `now`, `email`, `theme dark`, `whoami`. On-brand with the developer voice; accessible (keyboard-native). **Built first** because features 2–4 register commands into it (`status`, `play`, case-study deep-links). Establishes the extensibility surface everything else plugs into.

### 2. Live signals — *real-time you*
Pull live data into the Now section and a `status` command: latest GitHub activity, currently-playing / last-played track, coding-hours-this-week, last book. Makes the site feel alive instead of frozen. **Built second** — highest technical unknowns (external APIs, caching, fallbacks, secrets), best tackled early. Depends on #1 for the `status` command surface.

### 3. Annotated case studies — *show judgment*
Extend Projects from screenshots-and-blurbs into decision logs: per-project "what I'd do differently", key tradeoffs, and the reasoning behind choices. High recruiter/engineer signal, low technical risk. **Built third** — mostly content modeling on existing Projects components. Plugs a `case <project>` command into #1.

### 4. Reinvent the Playground — *a playable artifact*
Replace the generic ASCII field with something that says something specific about Bhanu (mini code-golf, "guess the bug", generative piece seeded by name, or a tiny REPL). **Built last** — most open-ended and creative; benefits from the bar set by the first three. Exposed via a `play` command in #1.

## Dependency graph

```
#1 Terminal nav  ──┬──> #2 Live signals   (status command)
   (the spine)     ├──> #3 Case studies   (case command)
                   └──> #4 Playground      (play command)
```

#1 is a hard prerequisite for the command-surface of 2–4, but each of 2–4 also delivers standalone value (their data/content/interaction works without the palette). So 2–4 can ship in any order after #1, or even before it with the command-registration deferred.

## Process

Each feature gets its own `YYYY-MM-DD-<feature>-design.md` spec, then an implementation plan, then build — one at a time, in the order above. This roadmap is the index; it is not an implementation spec and intentionally omits component-level detail.

## Open questions (resolved per-feature during its own brainstorm)

- #1: palette-only vs. palette-augmenting-existing-nav? fuzzy-match library vs. hand-rolled?
- #2: which data sources, refresh cadence, build-time vs. runtime fetch, fallback when an API is down?
- #3: how many projects get the deep treatment? data shape for decision logs?
- #4: which artifact concept best represents Bhanu?
