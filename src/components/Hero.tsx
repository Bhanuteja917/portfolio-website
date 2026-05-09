"use client";

import { useEffect, useRef } from "react";
import { Magnetic } from "@/components/Cursor";

const HERO_LINE = "Designing and building software, mostly at the edges.";

const STATUS_ITEMS = [
  { label: "Currently", value: "Software Engineer", sub: "@ UBS, Pune" },
  { label: "Stack", value: ".NET · React", sub: "C#, TS, Azure" },
  { label: "Years shipping", value: "1+", sub: "in production" },
  { label: "Open to", value: "OSS & side-projects", sub: "say hi anytime" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLElement>(".char");
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add("in"), 200 + i * 14);
    });
  }, []);

  const words = HERO_LINE.split(" ");

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: "relative" }}>
      <div className="container">
        <div ref={ref}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            <span>Hyderabad · Available for side projects</span>
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
            style={{ maxWidth: 560, marginTop: 28, marginBottom: 36 }}
          >
            I&apos;m Bhanu. I work at UBS on a cloud-resource analytics platform — .NET on the
            back, React on the front. Outside of work I read, build small things, and watch too much
            anime.
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#work" className="btn btn--primary" data-cursor="see the work">
                See the work
                <span>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn--secondary" data-cursor="say hi">
                Get in touch
              </a>
            </Magnetic>
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
