"use client";

import { useEffect, useRef } from "react";
import { Magnetic } from "@/components/Cursor";
import { RESUME_URL } from "@/lib/constants";

const HEADLINE = "Software Engineer building cloud platforms, backend systems and production-grade applications.";
const SUBHEAD =
  "Software Engineer at UBS working across .NET, React and Azure, with a focus on backend services, cloud platforms and data-driven enterprise applications.";
const PERSONALITY_LINE = "Designing and building software, mostly at the edges.";

const STATUS_ITEMS = [
  { label: "Experience", value: "2+ years", sub: "production engineering" },
  { label: "Stack", value: ".NET · React", sub: "Azure · AWS" },
  { label: "Focus", value: "Backend · Cloud · UI", sub: "APIs, platforms, enterprise interfaces" },
  { label: "Impact", value: "30%", sub: "API performance improvement" },
  { label: "Impact", value: "$60K", sub: "est. annual cloud-cost savings flagged" },
  { label: "Recognition", value: "Top 300", sub: "of 10,000+ · AWS AIdeas" },
];

const ELSEWHERE = [
  { k: "GitHub", href: "https://github.com/bhanuteja917" },
  { k: "LinkedIn", href: "https://www.linkedin.com/in/bhanuteja917/" },
  { k: "Email", href: "mailto:bhanutejach9@gmail.com" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLElement>(".char");
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add("in"), 200 + i * 10);
    });
  }, []);

  const words = HEADLINE.split(" ");

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: "relative" }}>
      <div className="container">
        <div ref={ref}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            <span>Pune · Open to Backend / Full-Stack Engineering roles</span>
          </div>

          <h1
            className="display-xxl"
            style={{
              color: "var(--color-ink)",
              maxWidth: 1080,
              margin: 0,
              fontFamily: "var(--font-display)",
            }}
          >
            {words.map((w, wi) => (
              <span
                key={wi}
                style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }}
              >
                {Array.from(w).map((ch, ci) => (
                  <span key={ci} className="char">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="body-lg text-muted"
            style={{ maxWidth: 580, marginTop: 28, marginBottom: 10 }}
          >
            {SUBHEAD}
          </p>

          <p className="body text-muted" style={{ maxWidth: 560, marginBottom: 36 }}>
            {PERSONALITY_LINE}
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#work" className="btn btn--primary" data-cursor="view work">
                View Work
                <span>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                data-cursor="résumé"
              >
                Download Résumé
              </a>
            </Magnetic>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            {ELSEWHERE.map((l, i) => (
              <span key={l.k} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="caption text-muted"
                  style={{ textDecoration: "none" }}
                >
                  {l.k}
                </a>
                {i < ELSEWHERE.length - 1 && (
                  <span className="caption text-muted" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Status row */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 1,
            background: "var(--color-hairline)",
            border: "1px solid var(--color-hairline)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {STATUS_ITEMS.map((s, i) => (
            <div key={i} style={{ background: "var(--color-canvas)", padding: 20 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 22,
                  letterSpacing: "-0.8px",
                  color: "var(--color-ink)",
                }}
              >
                {s.value}
              </div>
              <div className="body-sm text-muted" style={{ marginTop: 4 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
