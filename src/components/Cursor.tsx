"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

/* ============================================================
   Cursor — custom dot + ring + ambient glow
   ============================================================ */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none)").matches;
    if (isCoarse) return;

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    ring.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    glow.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const hover = t.closest("a, button, [data-magnetic], [data-cursor]");
      if (hover) {
        ringRef.current?.classList.add("is-hover");
        const lbl = hover.getAttribute("data-cursor");
        if (lbl && labelRef.current) {
          labelRef.current.textContent = lbl;
          labelRef.current.classList.add("is-visible");
        }
      } else {
        ringRef.current?.classList.remove("is-hover");
        labelRef.current?.classList.remove("is-visible");
      }
      const text = t.closest("p, h1, h2, h3, h4, span[data-text]");
      if (text && !hover) ringRef.current?.classList.add("is-text");
      else ringRef.current?.classList.remove("is-text");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    let raf: number;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      glow.current.x += (target.current.x - glow.current.x) * 0.05;
      glow.current.y += (target.current.y - glow.current.y) * 0.05;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      if (labelRef.current)
        labelRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(20px, 20px)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${glow.current.x}px, ${glow.current.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="bg-glow" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}

/* ============================================================
   Magnetic — element that pulls toward cursor
   ============================================================ */
interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isCoarse = window.matchMedia("(hover: none)").matches;
    if (isCoarse) return;

    let raf: number;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      data-magnetic
      style={{ display: "inline-block", transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   Reveal — IntersectionObserver entrance animation
   ============================================================ */
interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function Reveal({ children, delay = 0, className = "", ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </div>
  );
}
