"use client";

import { Reveal, Magnetic } from "@/components/Cursor";

/* ============================================================
   Experience timeline
   ============================================================ */
const ROLES = [
  {
    company: "UBS",
    location: "Pune, India",
    role: "Software Engineer",
    period: "Aug 2024 — Present",
    current: true,
    bullets: [
      "Engineered a cloud-based resource analytics platform that processes infra usage data and surfaces an estimated ~40% cut in cloud operational costs.",
      "Cut average API response times by 30% across critical backend services by re-shaping high-throughput .NET Core REST endpoints.",
      "Shipped interactive ReactJS dashboards that turn raw telemetry into something engineering leads actually use to make decisions.",
      "Owned GitLab CI/CD pipelines — automated build/test/deploy and reduced deployment cycle time by 30%.",
    ],
  },
  {
    company: "UBS",
    location: "Pune, India",
    role: "Software Engineer Intern",
    period: "Jan 2024 — Jul 2024",
    current: false,
    bullets: [
      "Designed a responsive enterprise catalog UI in React 18 + TypeScript — 50+ reusable components: forms, data grids, modal dialogs.",
      "Refactored heavy client-side logic into stateless .NET RESTful services, improving unit test coverage by 48%.",
    ],
  },
  {
    company: "Shiv Nadar University",
    location: "Greater Noida, India",
    role: "B.Tech, Computer Science",
    period: "2020 — May 2024",
    current: false,
    bullets: [
      "GPA 8.02. Honorary Shiv Nadar Foundation Scholarship.",
      "Built side-projects through every semester — graduated with a stack I actually wanted to use.",
    ],
  },
];

function Experience() {
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Experience
        </div>
        <h3 className="display-lg" style={{ maxWidth: 720 }}>
          The roles that shaped how I build.
        </h3>
      </div>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        <div
          style={{
            position: "absolute",
            left: 11,
            top: 8,
            bottom: 8,
            width: 1,
            background:
              "linear-gradient(to bottom, var(--color-hairline) 0%, var(--color-hairline) 80%, transparent 100%)",
          }}
        />
        {ROLES.map((r, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ position: "relative", paddingBottom: 40 }}>
              <div
                style={{
                  position: "absolute",
                  left: -34,
                  top: 8,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: r.current ? "var(--color-accent-blue)" : "var(--color-surface-2)",
                  border: r.current ? "none" : "1px solid var(--color-hairline)",
                  boxShadow: r.current
                    ? "0 0 0 4px rgba(0,153,255,0.18), 0 0 18px rgba(0,153,255,0.55)"
                    : "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 20,
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <div className="display-md" style={{ color: "var(--color-ink)" }}>
                  {r.role}{" "}
                  <span style={{ color: "var(--color-ink-muted)" }}>· {r.company}</span>
                </div>
                <div className="caption text-muted" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {r.period}
                </div>
              </div>
              <div className="body-sm text-muted" style={{ marginBottom: 16 }}>
                {r.location}
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 10,
                  maxWidth: 760,
                }}
              >
                {r.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="body"
                    style={{ color: "var(--color-ink)", paddingLeft: 18, position: "relative" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 9,
                        width: 6,
                        height: 1,
                        background: "var(--color-ink-muted)",
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

/* ============================================================
   Skills
   ============================================================ */
const SKILL_GROUPS = [
  {
    title: "Languages & Frameworks",
    tags: ["C#", ".NET Core", "ASP.NET", "Entity Framework", "TypeScript", "JavaScript", "ReactJS", "Vue.js", "HTML", "CSS", "SQL"],
  },
  {
    title: "Cloud & DevOps",
    tags: ["Azure App Service", "Azure Functions", "ARM", "GitLab CI/CD", "Bash"],
  },
  {
    title: "Practice",
    tags: ["Agile / Scrum", "TDD", "REST API design", "Microservices", "Code review"],
  },
];

const LEARNING = [
  "LangChain", "Next.js 15", "Bun", "Postgres pgvector", "RSC",
  "OpenAI Realtime", "Claude Sonnet", "Drizzle", "Server-sent events", "Tailwind v4", "Effect.ts",
];

function Skills() {
  return (
    <Reveal>
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Skills
        </div>
        <h3 className="display-lg" style={{ maxWidth: 720 }}>
          What&apos;s in the toolbox.
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          background: "var(--color-hairline)",
          border: "1px solid var(--color-hairline)",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {SKILL_GROUPS.map((g, i) => (
          <div key={i} style={{ background: "var(--color-canvas)", padding: 28 }}>
            <div className="caption text-muted" style={{ marginBottom: 18 }}>
              {g.title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="caption text-muted" style={{ marginBottom: 14, paddingLeft: 4 }}>
          Currently learning · keeping the edge sharp
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...LEARNING, ...LEARNING].map((t, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 36,
                  letterSpacing: "-1.4px",
                  color: i % 3 === 0 ? "var(--color-ink)" : "var(--color-ink-muted)",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 40,
                }}
              >
                {t}
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-hairline)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   Certifications
   ============================================================ */
const CERTS = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    year: "2024",
    gradient: "var(--spot-1)",
  },
  {
    title: "Java Database Connectivity (JDBC)",
    issuer: "Coursera",
    year: "2023",
    gradient: "var(--spot-2)",
  },
  {
    title: "Shiv Nadar Foundation Scholarship",
    issuer: "SNU",
    year: "2020 — 2024",
    gradient: "var(--spot-3)",
  },
];

function Certifications() {
  return (
    <Reveal>
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Certifications &amp; honors
        </div>
        <h3 className="display-lg" style={{ maxWidth: 720 }}>
          Receipts.
        </h3>
      </div>
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {CERTS.map((c, i) => (
          <div
            key={i}
            className="card"
            style={{ padding: 24, background: "var(--color-surface-1)", position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: c.gradient,
                marginBottom: 28,
                boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.20), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            />
            <div
              className="display-md"
              style={{ marginBottom: 8, fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.8px" }}
            >
              {c.title}
            </div>
            <div className="body-sm text-muted">
              {c.issuer} · {c.year}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ============================================================
   Collaborate
   ============================================================ */
const LOOKING_FOR = [
  {
    kind: "OSS contributions",
    desc: "Looking to contribute to .NET, React, and developer-tools repos. PRs > issues.",
  },
  {
    kind: "Side projects",
    desc: "Especially anything in AI, dev tools, or cloud cost optimization.",
  },
  {
    kind: "Pair on something",
    desc: "If you're stuck on a tricky perf problem in .NET or a gnarly React state bug — I'll show up.",
  },
];

function Collaborate() {
  return (
    <Reveal>
      <div
        className="card"
        style={{
          padding: 0,
          background: "var(--color-surface-1)",
          borderRadius: 30,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            background: "var(--spot-1)",
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: 40,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span className="dot" />
              <span>Open to collaborate</span>
            </div>
            <h3 className="display-lg" style={{ maxWidth: 760 }}>
              Working on something interesting?{" "}
              <span style={{ color: "var(--color-ink-muted)" }}>
                Let&apos;s build it together.
              </span>
            </h3>
            <p className="body-lg text-muted" style={{ maxWidth: 560, marginTop: 18 }}>
              Day-job is full-time at UBS — but evenings and weekends are open for OSS,
              side-projects, and the occasional 2 AM debug call.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              background: "var(--color-hairline-soft)",
              border: "1px solid var(--color-hairline-soft)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {LOOKING_FOR.map((l, i) => (
              <div key={i} style={{ background: "var(--color-surface-1)", padding: 24 }}>
                <div
                  className="display-md"
                  style={{ fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.7px", marginBottom: 8 }}
                >
                  {l.kind}
                </div>
                <div className="body-sm text-muted">{l.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Magnetic>
              <a
                href="mailto:bhanutejach9@gmail.com"
                className="btn btn--primary"
                data-cursor="email me"
              >
                bhanutejach9@gmail.com →
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/bhanuteja917"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                data-cursor="github"
              >
                GitHub
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   WorkSection — wraps all subsections
   ============================================================ */
export function WorkSection() {
  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gap: 96, minWidth: 0 }}>
        <Experience />
        <Skills />
        <Certifications />
        <Collaborate />
      </div>
    </section>
  );
}
