import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Transmission Console — 11:11 Pictures" },
      { name: "description", content: "Initiate a production inquiry, book private Mumbai screening room sessions, or request festival screeners." },
    ],
  }),
  component: ContactComponent,
});

type ProjectType = "FEATURE" | "COMMERCIAL" | "MUSIC" | "SCREENING" | "PRESS";

export function ContactComponent() {
  const [projectType, setProjectType] = useState<ProjectType>("FEATURE");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studio: "",
    treatmentUrl: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes: { key: ProjectType; label: string }[] = [
    { key: "FEATURE", label: "Feature Film" },
    { key: "COMMERCIAL", label: "Brand / Commercial" },
    { key: "MUSIC", label: "Music Film / Visuals" },
    { key: "SCREENING", label: "Private Screening Room" },
    { key: "PRESS", label: "Press / Festival Programmer" },
  ];

  const socials = [
    ["Instagram", "https://instagram.com/1111pictures"],
    ["Vimeo", "https://vimeo.com/1111pictures"],
    ["YouTube", "https://youtube.com/@1111pictures"],
    ["Letterboxd", "https://letterboxd.com"],
  ] as const;

  return (
    <div className="grain min-h-[100svh] px-5 pb-24 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe bg-warm-black text-cream">
      {/* Header Slate */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <p className="text-meta text-amber flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            TRANSMISSION CONSOLE // DIRECT CONTACT
          </p>
          <p className="text-meta text-sand font-mono">
            STATUS: ACCEPTING COMMISSIONS FOR 2026/2027
          </p>
        </div>

        <div className="mt-8 sm:mt-12 max-w-4xl">
          <h1 className="text-display text-cream font-medium tracking-tight">
            Let's
            <br />
            make
            <br />
            something.
          </h1>
          <p className="mt-6 text-body-lg text-cream/70 max-w-xl leading-relaxed">
            We answer every thoughtful letter. Whether you have a finished screenplay, a commercial lookbook, or want to experience our 4K laser screening room in Mumbai.
          </p>
        </div>
      </Reveal>

      {/* Main Grid: Inquiry Form & Studio Information */}
      <div className="mt-14 sm:mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16 border-t border-border/70 pt-12">
        {/* Left Column: Interactive Inquiry Form */}
        <Reveal className="lg:col-span-7">
          <div className="rounded-sm border border-border/80 bg-obsidian/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="text-meta text-amber font-mono">01 // INITIATE TRANSMISSION</span>
              <span className="text-meta text-taupe font-mono">ENCRYPTED DISPATCH</span>
            </div>

            {submitted ? (
              <div className="mt-10 border border-amber/70 bg-amber/10 p-8 rounded-xs text-center animate-fade-in">
                <span className="text-3xl text-amber">✓</span>
                <h3 className="text-h3 text-cream font-medium mt-3">Inquiry Recorded in Archive</h3>
                <p className="text-sm text-sand/90 mt-2 font-mono leading-relaxed">
                  Thank you, {formData.name || "collaborator"}. Your dispatch has been routed to our production desk. We review new materials every Monday morning.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-meta px-6 py-2.5 bg-cream text-obsidian font-bold tracking-widest hover:opacity-90 transition-opacity"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Project Category Selection */}
                <div>
                  <label className="text-meta text-taupe font-mono block mb-2">Project Category</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.key}
                        type="button"
                        onClick={() => setProjectType(type.key)}
                        className={`text-meta px-3 py-1.5 rounded-xs transition-all border ${
                          projectType === type.key
                            ? "border-amber bg-amber/15 text-cream"
                            : "border-border/60 bg-charcoal/40 text-taupe hover:border-border hover:text-cream"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-meta text-taupe font-mono block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Iyer"
                      className="w-full rounded-xs border border-border/80 bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/40 focus:border-amber focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-meta text-taupe font-mono block mb-1.5">Studio / Affiliation</label>
                    <input
                      type="text"
                      value={formData.studio}
                      onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                      placeholder="e.g. Independent or Agency"
                      className="w-full rounded-xs border border-border/80 bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/40 focus:border-amber focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-meta text-taupe font-mono block mb-1.5">Direct Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@studio.com"
                      className="w-full rounded-xs border border-border/80 bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/40 focus:border-amber focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-meta text-taupe font-mono block mb-1.5">Treatment / Lookbook URL</label>
                    <input
                      type="url"
                      value={formData.treatmentUrl}
                      onChange={(e) => setFormData({ ...formData, treatmentUrl: e.target.value })}
                      placeholder="Dropbox / Drive link"
                      className="w-full rounded-xs border border-border/80 bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/40 focus:border-amber focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-meta text-taupe font-mono block mb-1.5">Creative Intent & Timing *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the project, the mood, shooting window, and why you feel 11:11 Pictures is the right home for it..."
                    className="w-full rounded-xs border border-border/80 bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/40 focus:border-amber focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full text-meta py-4 bg-amber text-obsidian font-bold tracking-widest transition-all duration-300 hover:bg-cream shadow-lg"
                  >
                    TRANSMIT INQUIRY TO PRODUCTION DESK →
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* Right Column: Studio Coordinates & Direct Desks */}
        <Reveal className="lg:col-span-5 flex flex-col justify-between" delay={0.1}>
          <div className="space-y-8">
            {/* Direct Email Desks */}
            <div className="border border-border/80 bg-obsidian/50 p-6 rounded-sm">
              <span className="text-meta text-amber font-mono">02 // DIRECT DESKS</span>
              <ul className="mt-4 space-y-4">
                <li>
                  <p className="text-meta text-taupe font-mono">General & New Productions</p>
                  <a
                    href="mailto:hello@1111pictures.com"
                    className="text-base sm:text-lg text-sand link-line hover:text-cream mt-0.5 inline-block"
                  >
                    hello@1111pictures.com
                  </a>
                </li>
                <li className="border-t border-border/40 pt-3">
                  <p className="text-meta text-taupe font-mono">Festival Screeners & Curators</p>
                  <a
                    href="mailto:festivals@1111pictures.com"
                    className="text-base sm:text-lg text-sand link-line hover:text-cream mt-0.5 inline-block"
                  >
                    festivals@1111pictures.com
                  </a>
                </li>
                <li className="border-t border-border/40 pt-3">
                  <p className="text-meta text-taupe font-mono">Distribution & International Sales</p>
                  <a
                    href="mailto:sales@1111pictures.com"
                    className="text-base sm:text-lg text-sand link-line hover:text-cream mt-0.5 inline-block"
                  >
                    sales@1111pictures.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Studio Address & Coordinates */}
            <div className="border border-border/80 bg-obsidian/50 p-6 rounded-sm">
              <span className="text-meta text-amber font-mono">03 // SCREENING ROOM SUITE</span>
              <p className="text-cream text-base font-medium mt-3">11:11 Pictures Studio</p>
              <p className="text-sm text-taupe/90 mt-1 font-mono leading-relaxed">
                Pali Hill, Bandra West<br />
                Mumbai, Maharashtra 400050<br />
                Coordinates: 19.0596° N, 72.8295° E
              </p>
              <p className="text-[11px] text-sand/80 font-mono mt-3">
                Screenings strictly by prior reservation.
              </p>
            </div>

            {/* Social Channels */}
            <div className="border border-border/80 bg-obsidian/50 p-6 rounded-sm">
              <span className="text-meta text-amber font-mono">04 // ARCHIVE BROADCASTS</span>
              <ul className="mt-3 flex flex-wrap gap-4">
                {socials.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-meta text-cream/70 hover:text-amber link-line font-mono"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
