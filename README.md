# Bhanuteja Chintha — Portfolio

Personal portfolio and work log: who I am, what I've shipped, and how to hire me for freelance work.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · deployed on Netlify

## Sections

Single page: **Work** (experience timeline) → **Projects** (case-study grid with metrics and live links) → **About** → **Now** → **Playground** (an interactive ASCII canvas that follows the cursor) → **Contact**. Custom cursor and scroll-reveal animations live in `src/components/Cursor.tsx`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

## Deploy

Netlify builds with `@netlify/plugin-nextjs` (see `netlify.toml`). Two options:

- **Git-based:** connect the repo in Netlify; every push to `main` deploys.
- **Manual:** run the *Deploy to Netlify* GitHub Action (`.github/workflows/deploy.yml`). It needs a `NETLIFY_AUTH_TOKEN` repository secret and a `NETLIFY_SITE_ID` repository variable.

## Repo notes

`AGENTS.md` / `CLAUDE.md` hold guidance for AI coding assistants; `docs/` has design notes.
