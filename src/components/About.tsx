"use client";

import { Reveal } from "@/components/Cursor";

/* ============================================================
   About
   ============================================================ */
export function About() {
  return (
    <Reveal>
      <div
        className="about-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            About
          </div>
          <h2 className="display-xl">Hi, I&apos;m Bhanu.</h2>
        </div>
        <div style={{ paddingTop: 40 }}>
          <p className="body-lg" style={{ marginBottom: 20, color: "var(--color-ink)" }}>
            I&apos;m a software engineer based in Hyderabad. By day I build cloud platforms at UBS
            — APIs in{" "}
            <span style={{ color: "var(--color-accent-blue)" }}>.NET</span>, dashboards in{" "}
            <span style={{ color: "var(--color-accent-blue)" }}>React</span>, the wiring in
            between. By night I&apos;m usually deep in something AI-related, or watching anime, or
            losing badly at badminton.
          </p>
          <p className="body-lg text-muted" style={{ marginBottom: 20 }}>
            I think good software is mostly about taste and patience — caring enough to chase the
            30% perf win, then caring enough to make the loading state feel right. I like the boring
            parts (CI, types, error handling) as much as the fun ones.
          </p>
          <p className="body-lg text-muted">
            Before UBS I studied CS at Shiv Nadar University. Before that I was the kid who stayed
            up rewriting his portfolio site instead of sleeping. Some things don&apos;t change.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .about-grid > div:last-child { padding-top: 0 !important; }
        }
      `}</style>
    </Reveal>
  );
}

/* ============================================================
   Now
   ============================================================ */
const NOW_ITEMS = [
  {
    label: "Building",
    title: "An AI tool to summarize Azure cost anomalies.",
    sub: "Weekend hack. Claude + Functions + a dashboard.",
    gradient: "var(--spot-1)",
  },
  {
    label: "Watching",
    title: "Jujutsu Kaisen S2 (rewatch). Death Note is forever top-3.",
    sub: "Naruto chapter binges happen often.",
    gradient: "var(--spot-3)",
  },
  {
    label: "Playing",
    title: "Badminton — 3 evenings a week.",
    sub: "Smash needs work. Net play is fine.",
    gradient: "var(--spot-2)",
  },
  {
    label: "Reading",
    title: "Designing Data-Intensive Applications.",
    sub: "Slow read. Worth it.",
    gradient: "var(--spot-4)",
  },
];

export function Now() {
  return (
    <Reveal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            <span className="dot" />
            <span>Now · updated this week</span>
          </div>
          <h2 className="display-xl">What I&apos;m into right now.</h2>
        </div>
        <div className="caption text-muted">May 2026</div>
      </div>

      <div
        className="now-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
      >
        {NOW_ITEMS.map((it, i) => (
          <Reveal key={i} delay={i * 60}>
            <div
              className="card"
              style={{
                padding: 30,
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 24,
                }}
              >
                <span className="caption text-muted">{it.label}</span>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: it.gradient,
                    boxShadow:
                      "inset 0 0.5px 0 rgba(255,255,255,0.20), 0 8px 20px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
              <div>
                <div
                  className="display-md"
                  style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 8 }}
                >
                  {it.title}
                </div>
                <div className="body-sm text-muted">{it.sub}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <style>{`
        @media (max-width: 820px) {
          .now-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Reveal>
  );
}

/* ============================================================
   Stack list
   ============================================================ */
const STACK_LINES = [
  { k: "Editor", v: "VS Code, Rider for .NET deep work" },
  { k: "Terminal", v: "iTerm2 + zsh + Starship" },
  { k: "Cloud", v: "Azure mostly, AWS occasionally" },
  { k: "Notes", v: "Obsidian + a stack of paper notebooks" },
  { k: "Music while coding", v: "Lofi, Hans Zimmer, anime OSTs" },
  { k: "Coffee", v: "Black filter. No fuss." },
];

export function StackList() {
  return (
    <Reveal>
      <div
        className="stack-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Stack &amp; setup
          </div>
          <h2 className="display-xl">The boring details.</h2>
          <p className="body-lg text-muted" style={{ maxWidth: 420, marginTop: 20 }}>
            Tools matter less than habits. But here are the ones I keep coming back to.
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface-1)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {STACK_LINES.map((l, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                padding: "18px 24px",
                borderBottom:
                  i < STACK_LINES.length - 1 ? "1px solid var(--color-hairline-soft)" : "none",
                gap: 20,
                alignItems: "baseline",
              }}
            >
              <div className="caption text-muted">{l.k}</div>
              <div className="body" style={{ color: "var(--color-ink)" }}>
                {l.v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .stack-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </Reveal>
  );
}
