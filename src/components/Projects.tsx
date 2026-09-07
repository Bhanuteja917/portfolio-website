"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import { Reveal } from "@/components/Cursor";

export interface DeepDive {
  problem: string;
  contribution: string;
  architecture?: string[];
  decision: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  org: string;
  blurb: string;
  tags: string[];
  metrics: { v: string; k: string }[];
  gradient: string;
  kind: string;
  span: "wide" | "tall";
  badge?: string;
  links?: { label: string; href: string }[];
  deepDive?: DeepDive;
}

const PROJECTS: Project[] = [
  {
    id: "contract-guard",
    title: "ContractGuard",
    org: "AWS AIdeas Hackathon · 2025",
    blurb:
      "An AI platform that reads any contract and surfaces risk scores, red flags, and plain-English clause explanations — built for India's freelancers and SMBs who can't afford a lawyer. Serverless on AWS, powered by Bedrock.",
    tags: ["AWS Bedrock", "Lambda", "Python", "React", "TypeScript", "DynamoDB", "CDK"],
    metrics: [],
    gradient: "var(--spot-5)",
    kind: "Hackathon",
    span: "wide",
    badge: "🏆 Top 300 of 10,000+ submissions",
    links: [
      { label: "Live App ↗", href: "https://d3cel0medhyrga.cloudfront.net/" },
      { label: "GitHub ↗", href: "https://github.com/Bhanuteja917/aideas-contract-guard" },
    ],
    deepDive: {
      problem:
        "India's freelancers and SMBs sign contracts they can't afford a lawyer to review — and the risk hides in the fine print.",
      contribution:
        "Built the platform end-to-end: the serverless AWS backend, the Bedrock-powered contract analysis pipeline, and the React frontend that surfaces risk scores and plain-English clause explanations.",
      architecture: ["React UI", "API Gateway", "Lambda", "AWS Bedrock", "DynamoDB / S3"],
      decision:
        "Lambda + API Gateway for a pay-per-use serverless backend since traffic is bursty and unpredictable. Bedrock so the underlying model stays managed and swappable. DynamoDB for low-latency reads on parsed clause data. CDK to keep the whole stack as versioned, reproducible infrastructure.",
      result: "Top 300 of 10,000+ submissions at the AWS AIdeas Hackathon.",
    },
  },
  {
    id: "ubs-resource",
    title: "Resource analytics platform",
    org: "UBS · 2024 — now",
    blurb:
      "A cloud-resource observability tool that ingests infra usage signals across teams and surfaces where the money is leaking.",
    tags: [".NET Core", "ReactJS", "Azure", "GitLab CI"],
    metrics: [
      { v: "$60K", k: "est. annual cloud cost savings flagged" },
      { v: "30%", k: "API response time improvement" },
    ],
    gradient: "var(--spot-1)",
    kind: "Internal platform",
    span: "tall",
    deepDive: {
      problem:
        "UBS infrastructure spend was hard to attribute — usage signals were scattered across teams with no single view of where cloud budget was going.",
      contribution:
        "Owned the platform end-to-end: the .NET Core ingestion services, the data model for infra usage signals, and the ReactJS dashboards that surface cost and performance data to engineering leads.",
      decision:
        "Re-shaped the high-throughput REST endpoints rather than standing up a separate analytics database — kept the system simpler to operate once the queries were right-sized.",
      result: "Flagged an estimated $60K in annual cloud cost savings opportunities and cut API response times by 30%.",
    },
  },
  {
    id: "catalog-ui",
    title: "Enterprise catalog UI",
    org: "UBS · 2024",
    blurb:
      "Responsive catalog interface with 50+ reusable components — forms, data grids, modal dialogs — typed end-to-end, cutting duplicated UI implementation across enterprise workflows.",
    tags: ["React 18", "TypeScript", ".NET REST"],
    metrics: [
      { v: "50+", k: "reusable components" },
      { v: "+48%", k: "unit test coverage" },
    ],
    gradient: "var(--spot-2)",
    kind: "Enterprise UI",
    span: "tall",
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    org: "Side project · 2023",
    blurb:
      "Vue 3 + Pinia front, Node back, Adobe PDF Services for the export. Templates that don't look like 2008.",
    tags: ["Vue.js", "Pinia", "Node.js", "Adobe PDF"],
    metrics: [],
    gradient: "var(--spot-3)",
    kind: "Side project",
    span: "tall",
  },
  {
    id: "this-site",
    title: "This portfolio",
    org: "2026",
    blurb:
      "Hand-built with Next.js. Custom cursor, magnetic buttons, scroll reveals. Because portfolios should be portfolios.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    metrics: [],
    gradient: "var(--spot-4)",
    kind: "Built this site",
    span: "wide",
  },
];

/* ============================================================
   ProjectCard
   ============================================================ */
function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };
  const handleLeave = () => setPos((prev) => ({ ...prev, on: false }));

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(p)}
      data-cursor="case study"
      style={{
        background: "var(--color-surface-1)",
        borderRadius: 30,
        padding: 30,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        gridColumn: p.span === "wide" ? "span 2" : "span 1",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 220ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (!el.contains(e.relatedTarget as Node)) {
          el.style.background = "var(--color-surface-1)";
        }
      }}
    >
      {/* Spotlight follow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 320px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.06), transparent 60%)`,
          opacity: pos.on ? 1 : 0,
          transition: "opacity 320ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      />

      {/* Gradient mockup */}
      <div
        style={{
          position: "relative",
          height: p.span === "wide" ? 200 : 240,
          borderRadius: 20,
          background: p.gradient,
          marginBottom: 24,
          overflow: "hidden",
          boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.20), 0 16px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: 12,
            background: "rgba(10,9,7,0.55)",
            backdropFilter: "blur(8px)",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
            <div style={{ height: 8, width: "60%", background: "rgba(255,255,255,0.25)", borderRadius: 4 }} />
            <div style={{ height: 8, width: "40%", background: "rgba(255,255,255,0.18)", borderRadius: 4 }} />
            <div style={{ height: 8, width: "75%", background: "rgba(255,255,255,0.15)", borderRadius: 4 }} />
            {p.metrics.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {p.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: 8 }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#fff",
                        letterSpacing: "-0.6px",
                      }}
                    >
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="caption text-muted" style={{ marginBottom: 10 }}>
          {p.kind} · {p.org}
        </div>
        {p.badge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 100,
              background: "rgba(255, 193, 7, 0.10)",
              border: "1px solid rgba(255, 193, 7, 0.30)",
              color: "#FFC107",
              fontFamily: "var(--font-body, system-ui)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "-0.12px",
              marginBottom: 10,
            }}
          >
            {p.badge}
          </div>
        )}
        <h3
          className="display-md"
          style={{ marginBottom: 10, fontSize: 28, lineHeight: 1.1, letterSpacing: "-1.2px" }}
        >
          {p.title}
        </h3>
        <p className="body text-muted" style={{ margin: 0, marginBottom: 16, maxWidth: 480 }}>
          {p.blurb}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-body, system-ui)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "-0.12px",
                color: "var(--color-ink-muted)",
                background: "var(--color-canvas)",
                padding: "5px 10px",
                borderRadius: 100,
                border: "1px solid var(--color-hairline)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {p.links && p.links.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn btn--ghost"
                style={{ fontSize: 13, padding: "7px 14px" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   DeepDive — technical case-study block inside the modal
   ============================================================ */
function ArchitectureFlow({ stages }: { stages: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        marginBottom: 24,
      }}
    >
      {stages.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              background: "var(--color-canvas)",
              border: "1px solid var(--color-hairline)",
              borderRadius: 12,
              padding: "10px 16px",
              fontFamily: "var(--font-body, system-ui)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.12px",
              color: "var(--color-ink)",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </div>
          {i < stages.length - 1 && (
            <span className="text-muted" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function DeepDive({ d }: { d: DeepDive }) {
  const rows: { label: string; text: string }[] = [
    { label: "Problem", text: d.problem },
    { label: "My contribution", text: d.contribution },
    { label: "Key technical decision", text: d.decision },
    { label: "Result", text: d.result },
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <div className="caption text-muted" style={{ marginBottom: 16 }}>
        Technical deep dive
      </div>
      {d.architecture && <ArchitectureFlow stages={d.architecture} />}
      <div style={{ display: "grid", gap: 18 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div className="body-sm text-muted" style={{ marginBottom: 4 }}>
              {r.label}
            </div>
            <div className="body" style={{ color: "var(--color-ink)" }}>
              {r.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ProjectModal
   ============================================================ */
export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  if (!p) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(10,9,7,0.85)",
        backdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        animation: "fade-in 220ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-surface-1)",
          borderRadius: 30,
          padding: 30,
          maxWidth: 760,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.10), 0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            aspectRatio: "16/9",
            borderRadius: 20,
            background: p.gradient,
            marginBottom: 28,
            boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.20)",
          }}
        />
        <div className="caption text-muted" style={{ marginBottom: 10 }}>
          {p.kind} · {p.org}
        </div>
        <h2 className="display-lg" style={{ marginBottom: 18, maxWidth: 600 }}>
          {p.title}
        </h2>
        <p className="body-lg text-muted" style={{ marginBottom: 24, maxWidth: 600 }}>
          {p.blurb}
        </p>
        {p.metrics.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {p.metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 32,
                    letterSpacing: "-1.2px",
                    color: "var(--color-ink)",
                  }}
                >
                  {m.v}
                </div>
                <div className="body-sm text-muted" style={{ marginTop: 4 }}>
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {p.deepDive && <DeepDive d={p.deepDive} />}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {p.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              {l.label}
            </a>
          ))}
          <button className="btn btn--primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Projects grid
   ============================================================ */
export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Selected work
        </div>
        <h2 className="display-xl" style={{ maxWidth: 900 }}>
          Things I&apos;ve built and shipped.
        </h2>
      </div>
      <div
        className="proj-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} onOpen={onOpen} />
        ))}
      </div>
      <style>{`
        @media (max-width: 820px) {
          .proj-grid { grid-template-columns: 1fr !important; }
          .proj-grid > article { grid-column: span 1 !important; min-height: 380px !important; }
        }
      `}</style>
    </Reveal>
  );
}
