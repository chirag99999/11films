import { createFileRoute, Link } from "@tanstack/react-router";
import { stills } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { ScrollFrames, Frame } from "@/components/ScrollFrames";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio & Collective — 11:11 Pictures" },
      { name: "description", content: "We make pictures. Stories that remain after the screen goes dark. An independent cinematic production house in Mumbai." },
    ],
  }),
  component: AboutComponent,
});

const aboutFrames: Frame[] = [
  {
    src: stills.crew,
    eyebrow: "01 — The Director",
    title: "Someone who knows what to leave out.",
  },
  {
    src: stills.rooftop,
    eyebrow: "02 — Light & Optics",
    title: "We wait for the light. It usually comes.",
  },
  {
    src: stills.coast,
    eyebrow: "03 — The Territory",
    title: "Places that behave like characters.",
  },
  {
    src: stills.dance,
    eyebrow: "04 — Human Presence",
    title: "Faces that can be watched for a very long time.",
  },
  {
    src: stills.corridor,
    eyebrow: "05 — Method",
    title: "Small crews. Long days. Zero noise.",
  },
  {
    src: stills.interior,
    eyebrow: "06 — The Final Frame",
    title: "The one that stays after the screen goes dark.",
  },
];

const teamMembers = [
  {
    name: "Maya Iyer",
    role: "Director / Co-Founder",
    note: "Directs with natural silence and behavioral truth. Featured at Rotterdam and Dharamshala.",
    still: stills.interior,
  },
  {
    name: "Tomas Rivell",
    role: "Cinematographer",
    note: "Light sculptor. Dedicated to vintage Cooke glass, single-source lanterns, and 35mm grain.",
    still: stills.rooftop,
  },
  {
    name: "Sana Kapoor",
    role: "Editor & Story Architect",
    note: "Shapes the breathing rhythm of our pictures. Believes the cut is the heartbeat of tension.",
    still: stills.corridor,
  },
  {
    name: "Elias Roth",
    role: "Sound & Music Composer",
    note: "Creates bespoke scores blending modular synthesis with ambient field acoustics.",
    still: stills.dance,
  },
];

const studioCraft = [
  {
    category: "Optics & Emulsion",
    specs: "Cooke Anamorphic /i Full Frame Plus · Kowa Vintage · Kodak Vision3 500T 35mm · ARRI Alexa LF",
    desc: "We don't shoot high-sheen digital sharpness. We shoot organic, textured images that feel like physical memory.",
  },
  {
    category: "The Dark Room Suite",
    specs: "DaVinci Resolve Advanced Panel · Barco DCI-P3 4K Laser Projection · 1000-nit Master HDR",
    desc: "Every frame is graded in our private Mumbai color room, matching shadow densities and warm tungsten undertones.",
  },
  {
    category: "Discrete Atmos Soundstage",
    specs: "Dolby Atmos 7.1.4 calibrated · PMC Cinema Monitors · Nagra & Schoeps field recording",
    desc: "Cinema sound is visceral architecture. We mix with natural acoustic resonance and delicate room tones.",
  },
];

const tenets = [
  {
    num: "TENET 01",
    title: "Slow",
    desc: "Cinematic movement is deliberate. So is ours. We take on few projects and give each one the time it needs to discover its true form.",
  },
  {
    num: "TENET 02",
    title: "Quiet",
    desc: "Not every scene needs music. Not every frame needs rapid camera moves. Silence and negative space are fundamental cinematic grammar.",
  },
  {
    num: "TENET 03",
    title: "Close",
    desc: "Small crews, long collaborations. The same cinematographer, editor, and sound designer have worked on every one of our pictures.",
  },
];

export function AboutComponent() {
  return (
    <div className="grain bg-warm-black text-cream">
      {/* Hero Section */}
      <section className="flex min-h-[92svh] flex-col justify-between px-5 pb-12 pt-28 sm:pt-36 md:px-10 md:pb-20 md:pt-44 pb-safe border-b border-border/70">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
            <p className="text-meta text-amber flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              STUDIO MANIFESTO // 11:11 PICTURES
            </p>
            <p className="text-meta text-taupe font-mono">
              LOCATION: MUMBAI · 19.0596° N, 72.8295° E
            </p>
          </div>

          <h1 className="mt-8 sm:mt-12 text-display text-cream font-medium tracking-tight">
            We make
            <br />
            pictures.
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 sm:mt-16 md:ml-[45%] max-w-xl">
          <p className="text-h3 text-sand font-normal leading-snug">
            Stories that remain after the projector beam turns off.
          </p>
          <p className="text-body-lg mt-4 text-cream/70 leading-relaxed font-light">
            Founded as an independent cinema collective in Mumbai, 11:11 Pictures crafts feature films, shorts, commercial works, and music films. We believe in patience over speed, craft over convenience, and truth over spectacle.
          </p>
        </Reveal>
      </section>

      {/* Cinematic 6-Frame Journey */}
      <ScrollFrames frames={aboutFrames} />

      {/* The Collective Section */}
      <section className="px-5 py-24 md:px-10 md:py-36 border-b border-border/70">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
            <div>
              <p className="text-meta text-amber font-mono">01 // THE COLLECTIVE</p>
              <h2 className="text-h2 text-cream mt-2 font-medium">Filmmakers in Residence</h2>
            </div>
            <p className="text-meta text-taupe font-mono">
              FOUR CORE COLLABORATORS ACROSS ALL 7 PICTURES
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group rounded-sm border border-border/80 bg-obsidian/70 p-4 transition-all duration-500 hover:border-amber/70 backdrop-blur-sm">
                <div className="aspect-[4/5] overflow-hidden rounded-xs bg-charcoal">
                  <img
                    src={member.still}
                    alt={member.name}
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-[var(--ease-cinema)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-meta text-amber font-mono">{member.role}</p>
                  <h3 className="text-lg font-medium text-cream mt-1">{member.name}</h3>
                  <p className="text-xs text-taupe/90 mt-2 leading-relaxed font-light">{member.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio Optics, Emulsion & Sound Craft */}
      <section className="px-5 py-24 md:px-10 md:py-36 border-b border-border/70 bg-obsidian/40">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <p className="text-meta text-amber font-mono">02 // CAMERA, EMULSION & COLOR SUITE</p>
            <p className="text-meta text-taupe font-mono">TECHNICAL CRAFT ARCHIVE</p>
          </div>
          <h2 className="text-h2 text-cream mt-6 font-medium">The Tools of Stillness</h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {studioCraft.map((item, i) => (
            <Reveal key={item.category} delay={i * 0.1}>
              <div className="rounded-sm border border-border/80 bg-charcoal/40 p-6 sm:p-8 flex flex-col justify-between h-full backdrop-blur-sm">
                <div>
                  <span className="text-meta text-sand font-mono">{item.category}</span>
                  <h3 className="text-sm font-semibold font-mono text-cream mt-3 tracking-wide border-b border-border/60 pb-3">
                    {item.specs}
                  </h3>
                  <p className="text-sm text-cream/70 mt-4 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 text-[10px] font-mono text-taupe">
                  MUMBAI SCREENING ROOM LAB // SPEC APPROVED
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The 3 Tenets */}
      <section className="px-5 py-24 md:px-10 md:py-36 border-b border-border/70">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-4">
            <p className="text-meta text-taupe font-mono">03 // PHILOSOPHY</p>
            <h2 className="text-h2 text-cream mt-3 font-medium">How we make pictures</h2>
            <p className="text-sm text-taupe/80 mt-3 font-mono leading-relaxed">
              We decline more scripts than we accept. Each project takes our full focus for months or years.
            </p>
          </Reveal>

          <div className="space-y-12 md:col-span-8">
            {tenets.map((tenet, i) => (
              <Reveal key={tenet.title} delay={i * 0.1}>
                <div className="border border-border/80 bg-obsidian/60 p-6 sm:p-8 rounded-sm hover:border-amber/50 transition-colors">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-meta text-amber font-mono">{tenet.num}</span>
                    <span className="text-meta text-taupe font-mono">ARCHIVAL MANDATE</span>
                  </div>
                  <h3 className="text-h2 text-cream mt-4 font-normal">{tenet.title}</h3>
                  <p className="text-body-lg mt-3 text-cream/70 leading-relaxed font-light">
                    {tenet.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Location & Screening Room Appointment */}
      <section className="px-5 py-20 md:px-10 md:py-28 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <Reveal>
          <p className="text-meta text-amber font-mono">VISIT OUR SCREENING ROOM</p>
          <h3 className="text-h2 text-cream mt-2 font-normal">Private Screenings in Mumbai</h3>
          <p className="text-sm text-taupe mt-2 font-mono">
            4K Laser DCP projection · 14-seat private dark room · By appointment only
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="text-meta px-6 py-3.5 border border-border bg-obsidian text-cream hover:border-cream transition-all"
            >
              OUR CAPABILITIES →
            </Link>
            <Link
              to="/contact"
              className="text-meta px-6 py-3.5 bg-amber text-obsidian font-bold tracking-widest hover:bg-cream transition-all"
            >
              BOOK SCREENING / INQUIRE →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
