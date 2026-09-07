"use client";

import { Magnetic } from "@/components/Cursor";

interface NavProps {
  active: string;
  onNav: (name: string) => void;
}

const NAV_ITEMS = ["Work", "Experience", "About", "Contact"];

export function Nav({ active, onNav }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNav("Top");
          }}
          data-cursor="home"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-1.1px",
            color: "var(--color-ink)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "var(--color-ink)",
              color: "var(--color-canvas)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.8px",
            }}
          >
            b
          </span>
          bhanu
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`nav-link ${active === item ? "is-active" : ""}`}
              onClick={() => onNav(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <Magnetic>
          <a
            href="mailto:bhanutejach9@gmail.com"
            className="btn btn--primary"
            data-cursor="say hi"
            style={{ textDecoration: "none" }}
          >
            Get in touch
            <span style={{ display: "inline-block", marginLeft: 2 }}>→</span>
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
