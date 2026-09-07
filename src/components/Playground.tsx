"use client";

import { useState, useEffect, useRef, useReducer } from "react";
import { Reveal } from "@/components/Cursor";

const COLS = 56;
const ROWS = 22;
const CHARS = " ·:+*#%@".split("");

export function Playground() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * COLS,
        y: ((e.clientY - r.top) / r.height) * ROWS,
      });
    };
    const onLeave = () => setMouse({ x: -100, y: -100 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(forceUpdate, 60);
    return () => clearInterval(id);
  }, []);

  const ascii: string[] = [];
  for (let y = 0; y < ROWS; y++) {
    let line = "";
    for (let x = 0; x < COLS; x++) {
      const dx = (x - mouse.x) * 0.5;
      const dy = y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const t = (Date.now() / 600) % 1000;
      const wave = Math.sin(d * 0.55 - t * 1.5) * 0.5 + 0.5;
      const radial = Math.max(0, 1 - d / 12);
      const v = Math.min(1, wave * radial * 1.6);
      const idx = Math.floor(v * (CHARS.length - 1));
      line += CHARS[idx];
    }
    ascii.push(line);
  }

  return (
    <Reveal>
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Playground
        </div>
        <h2 className="display-xl" style={{ maxWidth: 800 }}>
          Move your mouse around.{" "}
          <span className="text-muted">Or don&apos;t.</span>
        </h2>
      </div>

      <div
        ref={ref}
        data-cursor="ripple"
        style={{
          background: "var(--color-surface-1)",
          borderRadius: 30,
          padding: 30,
          position: "relative",
          overflow: "hidden",
          minHeight: 460,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <pre
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
            fontSize: 13,
            lineHeight: 1.15,
            letterSpacing: 0,
            color: "var(--color-ink)",
            margin: 0,
            whiteSpace: "pre",
            userSelect: "none",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {ascii.join("\n")}
        </pre>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 16,
          }}
        >
          <div className="caption text-muted">ascii / cursor field</div>
          <div className="micro text-muted tnum">
            {Math.floor(mouse.x).toString().padStart(2, "0")},{" "}
            {Math.floor(mouse.y).toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
