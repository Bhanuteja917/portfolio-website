"use client";

import { Reveal } from "@/components/Cursor";
import { RESUME_URL } from "@/lib/constants";

const LINKS = [
  {
    k: "Email",
    v: "bhanutejach9@gmail.com",
    href: "mailto:bhanutejach9@gmail.com",
    primary: true,
  },
  {
    k: "LinkedIn",
    v: "linkedin.com/in/bhanuteja917",
    href: "https://www.linkedin.com/in/bhanuteja917/",
    primary: false,
  },
  {
    k: "GitHub",
    v: "github.com/bhanuteja917",
    href: "https://github.com/bhanuteja917",
    primary: false,
  },
  {
    k: "Résumé",
    v: "Download PDF",
    href: RESUME_URL,
    primary: false,
  },
];

/* ============================================================
   Contact
   ============================================================ */
export function Contact() {
  return (
    <Reveal>
      <div style={{ position: "relative" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          <span className="dot" />
          <span>Interested in working together?</span>
        </div>
        <h2 className="display-xxl" style={{ maxWidth: 1100, marginBottom: 40 }}>
          Let&apos;s build something{" "}
          <span className="text-muted">together.</span>
        </h2>
        <p className="body-lg text-muted" style={{ maxWidth: 540, marginBottom: 48 }}>
          Open to Software Engineering roles — the fastest way to reach me is email. I read
          everything; I reply to most.
        </p>

        <div
          style={{
            background: "var(--color-surface-1)",
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          {LINKS.map((l, i) => (
            <a
              key={l.k}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-cursor={l.primary ? "say hi" : "open"}
              className="contact-row"
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr auto",
                alignItems: "center",
                gap: 20,
                padding: "26px 30px",
                borderBottom:
                  i < LINKS.length - 1 ? "1px solid var(--color-hairline-soft)" : "none",
                color: "var(--color-ink)",
                textDecoration: "none",
                transition: "background 220ms cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div className="caption text-muted">{l.k}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 28,
                  letterSpacing: "-1.1px",
                  color: "var(--color-ink)",
                }}
              >
                {l.v}
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: l.primary ? "var(--color-primary)" : "var(--color-canvas)",
                  color: l.primary ? "var(--color-on-primary)" : "var(--color-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  border: l.primary ? "none" : "1px solid var(--color-hairline)",
                }}
              >
                ↗
              </div>
            </a>
          ))}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .contact-row { grid-template-columns: 100px 1fr auto !important; }
            .contact-row > div:nth-child(2) { font-size: 18px !important; letter-spacing: -0.6px !important; }
          }
        `}</style>
      </div>
    </Reveal>
  );
}

/* ============================================================
   Footer
   ============================================================ */
interface FooterColProps {
  title: string;
  items: { k: string; href?: string; static?: boolean }[];
}

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div>
      <div className="caption text-muted" style={{ marginBottom: 18 }}>
        {title}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((it, i) =>
          it.static ? (
            <div key={i} className="body-sm text-muted">
              {it.k}
            </div>
          ) : (
            <a
              key={i}
              href={it.href}
              target={it.href?.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                color: "var(--color-ink)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.14px",
              }}
            >
              {it.k}
            </a>
          )
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div
        className="footer-grid"
        style={{
          maxWidth: 1199,
          margin: "0 auto",
          padding: "0 30px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 60,
              fontWeight: 500,
              lineHeight: 0.9,
              letterSpacing: "-3px",
              color: "var(--color-ink)",
            }}
          >
            bhanu.
          </div>
          <div className="body-sm text-muted" style={{ marginTop: 14, maxWidth: 280 }}>
            Software engineer in Pune. Building cloud platforms, slick UIs, and the wiring
            between.
          </div>
        </div>

        <FooterCol
          title="Site"
          items={[
            { k: "Work", href: "#work" },
            { k: "Experience", href: "#experience" },
            { k: "About", href: "#about" },
            { k: "Now", href: "#now" },
            { k: "Playground", href: "#playground" },
            { k: "Contact", href: "#contact" },
          ]}
        />
        <FooterCol
          title="Elsewhere"
          items={[
            { k: "GitHub", href: "https://github.com/bhanuteja917" },
            { k: "LinkedIn", href: "https://www.linkedin.com/in/bhanuteja917/" },
            { k: "Email", href: "mailto:bhanutejach9@gmail.com" },
          ]}
        />
        <FooterCol
          title="Colophon"
          items={[
            { k: "GT Walsheim + Inter", static: true },
            { k: "Built with Next.js 16.", static: true },
            { k: "© 2026 Bhanuteja Chintha", static: true },
          ]}
        />
      </div>

      <style>{`
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: span 2; }
        }
      `}</style>
    </footer>
  );
}
