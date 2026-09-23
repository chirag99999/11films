import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { stills } from "@/data/films";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Production Capabilities & Deliverables — 11:11 Pictures" },
      { name: "description", content: "From the first page to the final frame. Complete cinema production services for features, commercials, and music films." },
    ],
  }),
  component: ServicesComponent,
});

interface ServiceDetail {
  n: string;
  name: string;
  img: string;
  headline: string;
  note: string;
  deliverables: string[];
  equipment: string;
}

const serviceItems: ServiceDetail[] = [
  {
    n: "01",
    name: "Development",
    img: stills.slate,
    headline: "The concept, the treatment, and the long conversation before anything is shot.",
    note: "We collaborate with writers and directors to refine the narrative arc, visual tone, and thematic depth.",
    deliverables: [
      "Director's Treatment & Lookbook",
      "Screenplay Polish & Scene Pacing",
      "Visual Reference Film (Rip-O-Matic)",
      "Budget & Production Architecture",
    ],
    equipment: "Archival Bible · Visual Decks",
  },
  {
    n: "02",
    name: "Pre-Production",
    img: stills.coast,
    headline: "Casting, locations, lens tests, and the disciplined preparation that saves pictures.",
    note: "Finding faces that hold the screen, locations that act as living characters, and optics tailored to the script.",
    deliverables: [
      "Authentic Street & Actor Casting",
      "Location Scouting (Coastal, Urban, Remote)",
      "Camera & Lens Test Screenings",
      "Shooting Schedule & Logistics Blueprint",
    ],
    equipment: "Cooke Optical Bench · Field Recce",
  },
  {
    n: "03",
    name: "Cinema Production",
    img: stills.crew,
    headline: "Small crews on set. Large format cinema cameras. Natural light where we can find it.",
    note: "We run focused, low-noise sets that allow actors to breathe and genuine moments to unfold.",
    deliverables: [
      "Principal Photography Execution",
      "ARRI Alexa LF / 35mm Film Packages",
      "Single-Source Cinematic Lighting Rigs",
      "Multi-Track Discrete Location Sound",
    ],
    equipment: "ARRI Alexa Mini LF · Kodak 500T 35mm",
  },
  {
    n: "04",
    name: "The Dark Room & Post",
    img: stills.interior,
    headline: "Edit, grade, sound design, and music finished in the room with the director.",
    note: "Crafted in our Mumbai post suite, ensuring seamless balance between image grain and acoustic tension.",
    deliverables: [
      "Editorial Pacing & Assembly Cut",
      "DaVinci Resolve DCI-P3 4K Color Grade",
      "Dolby Atmos 7.1.4 Immersive Sound Mix",
      "DCP Theatrical & Archival Mastering",
    ],
    equipment: "Barco Laser Projection · Dolby Atmos",
  },
  {
    n: "05",
    name: "Commercial & Brand",
    img: stills.sunset,
    headline: "Brand films that look and feel like cinema, because they are made like it.",
    note: "We reject generic commercial tropes in favor of quiet atmosphere, human connection, and poetic visuals.",
    deliverables: [
      "Auteur Creative Direction",
      "Narrative Brand Stories & Manifesto Films",
      "High-Fashion & Outerwear Visuals",
      "Multi-Format Master Deliverables (16:9, 9:16, 4:5)",
    ],
    equipment: "Anamorphic Scope · High-Speed Sensor",
  },
  {
    n: "06",
    name: "Music / Visuals",
    img: stills.rooftop,
    headline: "Music films, live rooftop sessions, and visual pieces built around a single pure idea.",
    note: "Capturing musical performance as physical presence, combining real room reverb with cinematic framing.",
    deliverables: [
      "Single-Take Music Visuals",
      "Live Location Performance Sessions",
      "Tour & Album Companion Films",
      "Spatial Audio Mixed to Master",
    ],
    equipment: "Bespoke Rooftop Rigs · Schoeps Audio",
  },
];

const timelineStages = [
  {
    phase: "PHASE 01",
    name: "Ideation & Slate",
    summary: "Deconstructing the core idea, building visual tone boards, defining the light.",
  },
  {
    phase: "PHASE 02",
    name: "Optics & Scouting",
    summary: "Selecting glass, casting authentic talent, locking down evocative locations.",
  },
  {
    phase: "PHASE 03",
    name: "Principal Capture",
    summary: "Small-footprint production, respecting silence, chasing the 45-minute magic hour.",
  },
  {
    phase: "PHASE 04",
    name: "Dark Room Mastery",
    summary: "Cutting for rhythm, grading for skin and shadow, mixing in discrete Dolby Atmos.",
  },
];

export function ServicesComponent() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const currentItem = serviceItems[activeIdx] ?? serviceItems[0]!;

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-warm-black text-cream">
      {/* Dynamic Background Image Layer */}
      {serviceItems.map((item, i) => (
        <img
          key={item.n}
          src={item.img}
          alt=""
          width={1536}
          height={864}
          loading="lazy"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[var(--ease-cinema)] ${
            activeIdx === i ? "scale-100 opacity-30 sm:opacity-40" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-warm-black via-warm-black/90 to-warm-black/60" />

      <div className="relative px-5 pb-24 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe">
        {/* Header Slate */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
            <p className="text-meta text-amber flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              CAPABILITIES // 06 PRODUCTION DIVISIONS
            </p>
            <p className="text-meta text-taupe font-mono">
              END-TO-END CINEMATIC ARCHITECTURE
            </p>
          </div>

          <h1 className="mt-8 sm:mt-12 text-h1 text-cream font-medium tracking-tight">
            From the first page
            <br />
            to the final frame.
          </h1>
          <p className="mt-4 text-body-lg text-cream/65 max-w-xl leading-relaxed">
            We don't outsource our craft. Every element — from treatment drafting and location recce to 4K color grading and Atmos sound mixing — is handled within our studio collective.
          </p>
        </Reveal>

        {/* Two-Column Interactive Capabilities Showcase */}
        <div className="mt-14 sm:mt-20 grid gap-10 lg:grid-cols-12 lg:gap-14 border-t border-border/70 pt-10">
          {/* Left Column: Interactive Capability List */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-meta text-taupe font-mono mb-4">SELECT A CAPABILITY TO INSPECT</p>
            {serviceItems.map((item, i) => (
              <div
                key={item.n}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className={`group cursor-pointer rounded-sm border p-4 sm:p-5 transition-all duration-300 ${
                  activeIdx === i
                    ? "border-amber bg-obsidian/90 shadow-xl"
                    : "border-border/60 bg-obsidian/40 hover:border-border hover:bg-obsidian/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-meta font-mono text-amber">{item.n}</span>
                    <h3 className="text-h3 font-medium text-cream group-hover:text-amber transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-taupe group-hover:text-cream">
                    {activeIdx === i ? "ACTIVE ●" : "INSPECT →"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-taupe/90 mt-2 font-light line-clamp-2">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Live Archival Slate & Deliverables */}
          <div className="lg:col-span-6">
            <div className="sticky top-32 rounded-sm border border-border/80 bg-obsidian/85 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <span className="text-meta text-amber font-mono">
                  DIVISION {currentItem.n} // {currentItem.name.toUpperCase()}
                </span>
                <span className="text-meta text-taupe font-mono">
                  {currentItem.equipment}
                </span>
              </div>

              <h2 className="text-h3 text-cream mt-5 font-normal leading-snug">
                "{currentItem.headline}"
              </h2>

              <p className="text-sm text-cream/70 mt-3 font-light leading-relaxed">
                {currentItem.note}
              </p>

              {/* Deliverables Checklist */}
              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-meta text-sand font-mono mb-4">GUARANTEED DELIVERABLES</p>
                <ul className="space-y-2.5">
                  {currentItem.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-cream/90 font-mono">
                      <span className="text-amber">✓</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Inquiry Action */}
              <div className="mt-10 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-baseline justify-between gap-4">
                <div>
                  <p className="text-meta text-taupe font-mono">READY TO ENGAGE?</p>
                  <p className="text-xs text-cream/80 font-mono mt-0.5">Let's discuss dates & treatments</p>
                </div>
                <Link
                  to="/contact"
                  className="text-meta px-5 py-2.5 bg-amber text-obsidian font-bold tracking-widest hover:bg-cream transition-colors self-start sm:self-auto"
                >
                  INQUIRE ABOUT {currentItem.name.toUpperCase()} →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Methodology Timeline */}
        <section className="mt-28 sm:mt-36 border-t border-border/70 pt-16">
          <Reveal>
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <p className="text-meta text-amber font-mono">THE CINEMATIC METHOD</p>
              <p className="text-meta text-taupe font-mono">04-STAGE TIMELINE</p>
            </div>
            <h2 className="text-h2 text-cream mt-6 font-medium">How our pictures come to life</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timelineStages.map((stage, i) => (
              <Reveal key={stage.phase} delay={i * 0.08}>
                <div className="border border-border/80 bg-obsidian/60 p-6 rounded-sm h-full flex flex-col justify-between">
                  <div>
                    <span className="text-meta text-amber font-mono">{stage.phase}</span>
                    <h3 className="text-lg font-medium text-cream mt-2">{stage.name}</h3>
                    <p className="text-xs text-taupe/90 mt-3 font-light leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/50 text-[10px] font-mono text-sand">
                    MILESTONE 0{i + 1} CONFIRMED
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
