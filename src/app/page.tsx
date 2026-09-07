"use client";

import { useState, useEffect } from "react";
import { Cursor, Reveal } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import {
  Experience,
  WhatIBuild,
  Skills,
  Recognition,
  Collaborate,
} from "@/components/Work";
import { Projects, ProjectModal, type Project } from "@/components/Projects";
import { About, HowIBuild, Now, StackList } from "@/components/About";
import { Playground } from "@/components/Playground";
import { Contact, Footer } from "@/components/Contact";

const SECTION_IDS = ["top", "work", "experience", "about", "now", "playground", "contact"] as const;
const SECTION_LABEL: Record<string, string> = {
  top: "Top",
  work: "Work",
  experience: "Experience",
  about: "About",
  now: "Now",
  playground: "Playground",
  contact: "Contact",
};
const NAV_TO_ID: Record<string, string> = {
  Top: "top",
  Work: "work",
  Experience: "experience",
  About: "about",
  Now: "now",
  Playground: "playground",
  Contact: "contact",
};

export default function Home() {
  const [active, setActive] = useState("Top");
  const [open, setOpen] = useState<Project | null>(null);

  // Section intersection observer
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          const id = visible[0].target.id;
          setActive(SECTION_LABEL[id] ?? "Top");
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const navigate = (name: string) => {
    const id = NAV_TO_ID[name];
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Cursor />
      <Nav active={active} onNav={navigate} />

      <main>
        <Hero />

        <section id="work" style={{ minWidth: 0 }}>
          <div className="container" style={{ marginBottom: 60 }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Work
              </div>
              <h2 className="display-xxl" style={{ maxWidth: 1100 }}>
                The work, in <span className="text-muted">layers.</span>
              </h2>
              <p className="body-lg text-muted" style={{ maxWidth: 540, marginTop: 22 }}>
                Projects, experience, skills, certifications — and a standing invitation to build
                something together.
              </p>
            </Reveal>
          </div>
          <div className="container" style={{ marginBottom: 96 }}>
            <Projects onOpen={setOpen} />
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <Experience />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <WhatIBuild />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Skills />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Recognition />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <HowIBuild />
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <About />
          </div>
        </section>

        <section id="now" className="section">
          <div className="container">
            <Now />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <StackList />
          </div>
        </section>

        <section id="playground" className="section">
          <div className="container">
            <Playground />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Collaborate />
          </div>
        </section>

        <section id="contact" className="section" style={{ paddingBottom: 60 }}>
          <div className="container">
            <Contact />
          </div>
        </section>
      </main>

      <Footer />
      <ProjectModal p={open} onClose={() => setOpen(null)} />
    </>
  );
}
