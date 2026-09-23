import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getFilm, getNextFilm } from "@/data/films";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/films/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return { film, next: getNextFilm(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not found — 11:11 Pictures" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { film } = loaderData;
    return {
      meta: [
        { title: `${film.title} (${film.year}) — 11:11 Pictures` },
        { name: "description", content: film.logline },
        { property: "og:title", content: film.title },
        { property: "og:description", content: film.logline },
        { property: "og:image", content: film.hero },
      ],
    };
  },
  component: FilmDetailComponent,
});

export function FilmDetailComponent() {
  const { film, next } = Route.useLoaderData();
  const heroRef = useRef<HTMLElement | null>(null);
  const [screenerOpen, setScreenerOpen] = useState(false);
  const [screenerSent, setScreenerSent] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Screener form state
  const [screenerForm, setScreenerForm] = useState({
    name: "",
    email: "",
    affiliation: "Festival / Programmer",
  });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let mm: ReturnType<typeof gsap.matchMedia> | undefined;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!heroRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const q = gsap.utils.selector(el);
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(q("[data-img]"), { scale: 1.08 }, { scale: 1, duration: 2.2, ease: "power2.out" });
        gsap.fromTo(
          q("[data-text]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.5, ease: "power3.out" }
        );
        gsap.to(q("[data-img]"), {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => mm?.revert();
  }, [film.slug]);

  // Keyboard navigation for stills lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % film.gallery.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + film.gallery.length) % film.gallery.length : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, film.gallery.length]);

  const handleScreenerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScreenerSent(true);
    setTimeout(() => {
      // Keep open to let user see confirmation
    }, 2000);
  };

  return (
    <article className="grain bg-warm-black text-cream selection:bg-amber selection:text-obsidian">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="vignette relative h-[100svh] overflow-hidden bg-warm-black"
      >
        <img
          data-img
          src={film.hero}
          alt={film.title}
          width={1536}
          height={864}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Top Film Slate Indicators */}
        <div className="absolute top-24 sm:top-28 left-5 right-5 sm:left-10 sm:right-10 z-20 flex items-center justify-between text-meta text-cream/70 font-mono drop-shadow-md">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-amber animate-pulse" />
            <span>ARCHIVAL REEL // {film.year}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>TC 00:00:00:00</span>
            <span className="text-border">|</span>
            <span>2.39:1 ANAMORPHIC</span>
            <span className="text-border">|</span>
            <span>DOLBY ATMOS</span>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 px-5 pb-8 sm:pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-14 pb-safe bg-gradient-to-t from-warm-black via-warm-black/60 to-transparent pt-24">
          <div>
            <div data-text className="flex items-center gap-3">
              <span className="text-meta text-amber border border-amber/50 px-2 py-0.5 rounded-xs bg-amber/10">
                {film.category.toUpperCase()}
              </span>
              <span className="text-meta text-sand">
                RELEASE {film.year} · {film.runtime}
              </span>
            </div>
            <h1 data-text className="mt-3 sm:mt-4 text-h1 text-cream font-medium tracking-tight">
              {film.title}
            </h1>
            <p data-text className="text-meta mt-3 sm:mt-4 text-cream/75 font-mono">
              DIRECTED BY {film.director.toUpperCase()} · PRODUCED BY {film.producer.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              data-text
              type="button"
              data-cursor="PLAY"
              onClick={() => {
                setScreenerSent(false);
                setScreenerOpen(true);
              }}
              className="text-meta group inline-flex items-center gap-3 sm:gap-4 self-start border border-amber/70 bg-amber/10 px-5 py-3.5 sm:px-7 sm:py-4 text-cream transition-all duration-300 hover:border-amber hover:bg-amber hover:text-obsidian md:self-auto backdrop-blur-sm shadow-lg"
            >
              <span className="block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
              REQUEST SCREENER
            </button>
          </div>
        </div>
      </section>

      {/* Technical Specifications Slate & Synopsis */}
      <section className="px-5 py-20 sm:py-28 md:px-10 md:py-36 border-b border-border/70">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Archival Specs Slate */}
          <Reveal className="lg:col-span-4 border border-border/80 bg-obsidian/70 p-6 sm:p-8 rounded-sm backdrop-blur-sm self-start">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <p className="text-meta text-amber font-mono">01 // PRODUCTION SLATE</p>
              <p className="text-meta text-taupe font-mono">35MM / DIGITAL</p>
            </div>
            <dl className="mt-6 space-y-4 font-mono text-xs">
              <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                <dt className="text-taupe uppercase">Runtime</dt>
                <dd className="text-cream text-right">{film.runtime}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                <dt className="text-taupe uppercase">Aspect Ratio</dt>
                <dd className="text-cream text-right">2.39:1 Anamorphic Scope</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                <dt className="text-taupe uppercase">Capture Format</dt>
                <dd className="text-cream text-right">Cooke Anamorphic / ARRI LF</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                <dt className="text-taupe uppercase">Sound Master</dt>
                <dd className="text-cream text-right">Dolby Atmos 7.1.4</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
                <dt className="text-taupe uppercase">Location</dt>
                <dd className="text-cream text-right">Mumbai & Outer Coast</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-taupe uppercase">Archival Print</dt>
                <dd className="text-amber text-right font-semibold">Available on DCP / 35mm</dd>
              </div>
            </dl>

            {film.awards && film.awards.length > 0 && (
              <div className="mt-8 border-t border-border/70 pt-6">
                <p className="text-meta text-sand font-mono mb-3">HONORS & SELECTIONS</p>
                <ul className="space-y-2">
                  {film.awards.map((award) => (
                    <li key={award} className="text-xs text-cream/90 flex items-center gap-2">
                      <span className="text-amber">★</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {/* Right Column: Logline, Synopsis & Director's Note */}
          <Reveal className="lg:col-span-8 flex flex-col justify-between" delay={0.1}>
            <div>
              <p className="text-meta text-taupe font-mono">02 // SYNOPSIS & INTENT</p>
              <h2 className="text-h2 text-cream mt-4 font-normal leading-snug">
                "{film.logline}"
              </h2>
              <p className="text-body-lg mt-6 sm:mt-8 text-cream/70 leading-relaxed font-light">
                {film.synopsis}
              </p>
            </div>

            {/* Director's Editorial Statement */}
            <div className="mt-10 sm:mt-14 border-l-2 border-amber/60 pl-6 sm:pl-8 py-2 bg-charcoal/30">
              <p className="text-meta text-amber font-mono">DIRECTOR'S NOTE</p>
              <p className="mt-3 text-sm sm:text-base italic text-cream/80 leading-relaxed">
                "We wanted to build an experience where every second held weight. In cinema, stillness is not an absence of story; it is where the truth gathers before anything is spoken."
              </p>
              <p className="mt-3 text-meta text-taupe font-mono">
                — {film.director}, Director
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Production Stills / Lightbox Gallery */}
      <section className="px-5 py-20 sm:py-28 md:px-10 md:py-36 border-b border-border/70">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-meta text-taupe font-mono">03 // ARCHIVAL STILLS & FRAME INSPECTOR</p>
              <h3 className="mt-2 text-h2 text-cream font-medium">Dark Room Contact Stills</h3>
            </div>
            <p className="text-meta text-taupe font-mono">
              CLICK ANY FRAME TO INSPECT WITH CAMERA METADATA
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {film.gallery.map((still, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                onClick={() => setLightboxIndex(i)}
                data-cursor="ZOOM"
                className="group relative cursor-pointer overflow-hidden rounded-sm border border-border/80 bg-obsidian transition-all duration-500 hover:border-amber/60"
              >
                <div className="aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={still}
                    alt={`${film.title} frame ${i + 1}`}
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cinema)] group-hover:scale-[1.05]"
                  />
                </div>

                {/* Dark Room Frame Details on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/95 via-warm-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
                  <div className="flex justify-between text-[10px] font-mono text-cream/70">
                    <span>FRAME 0{i + 1}</span>
                    <span>TC 00:{(i + 1) * 14}:28:12</span>
                  </div>
                  <div className="flex items-center justify-between text-meta text-sand">
                    <span>INSPECT 2.39:1</span>
                    <span className="text-cream">⊕</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Behind the Scenes Cinematic Section */}
      <section className="px-5 py-20 sm:py-28 md:px-10 md:py-36 border-b border-border/70">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-8">
            <p className="text-meta text-taupe font-mono">04 // PRODUCTION FOOTAGE & CAMERA FLOOR</p>
            <p className="text-meta text-sand font-mono">ON SET REPORT</p>
          </div>
          <div className="relative overflow-hidden rounded-sm border border-border/80 bg-obsidian">
            <img
              src={film.gallery[1] ?? film.hero}
              alt={`Behind the scenes of ${film.title}`}
              width={1536}
              height={864}
              loading="lazy"
              className="aspect-[16/10] sm:aspect-[21/9] w-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-transparent p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-meta text-amber font-mono">PRINCIPAL PHOTOGRAPHY</p>
                <h4 className="text-h3 text-cream mt-1 font-medium">{film.title} Production Unit</h4>
                <p className="text-xs sm:text-sm text-taupe/90 max-w-lg mt-2 font-mono">
                  Captured on location with natural light rigs, 5-person sound & camera team, and zero synthetic stage lighting.
                </p>
              </div>
              <div className="text-meta text-taupe font-mono border border-border/70 bg-obsidian/80 px-4 py-2 self-start sm:self-auto backdrop-blur-sm">
                WRAP: 35 PRODUCTION DAYS
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Production Credits Table */}
      <section className="px-5 py-20 sm:py-28 md:px-10 md:py-36 border-b border-border/70">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-4">
            <p className="text-meta text-taupe font-mono">05 // ARCHIVAL CREDITS</p>
            <h3 className="text-h2 text-cream mt-3 font-normal">Cast & Crew</h3>
            <p className="text-xs sm:text-sm text-taupe/80 mt-3 max-w-xs leading-relaxed font-mono">
              Every picture represents deep collaboration between our directors, cinematographers, sound artists, and editors.
            </p>
          </Reveal>

          <Reveal className="md:col-span-8" delay={0.1}>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {film.credits.map((c) => (
                <div key={c.role} className="flex items-baseline justify-between py-4 px-2 sm:px-4 hover:bg-charcoal/40 transition-colors">
                  <dt className="text-meta text-taupe font-mono shrink-0">{c.role}</dt>
                  <dd className="text-cream text-right text-sm sm:text-base font-medium">{c.name}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between py-4 px-2 sm:px-4 hover:bg-charcoal/40 transition-colors">
                <dt className="text-meta text-taupe font-mono shrink-0">Producer</dt>
                <dd className="text-cream text-right text-sm sm:text-base font-medium">{film.producer}</dd>
              </div>
              <div className="flex items-baseline justify-between py-4 px-2 sm:px-4 hover:bg-charcoal/40 transition-colors">
                <dt className="text-meta text-taupe font-mono shrink-0">Color Master & Lab</dt>
                <dd className="text-cream text-right text-sm sm:text-base font-medium">11:11 Grading Suite, Mumbai</dd>
              </div>
              <div className="flex items-baseline justify-between py-4 px-2 sm:px-4 hover:bg-charcoal/40 transition-colors">
                <dt className="text-meta text-taupe font-mono shrink-0">Sound Design & Atmos Mix</dt>
                <dd className="text-cream text-right text-sm sm:text-base font-medium">Bandra Sound House</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Next Film Transition */}
      <Link
        to="/films/$slug"
        params={{ slug: next.slug }}
        data-cursor="NEXT"
        className="group relative block h-[60svh] md:h-[75svh] overflow-hidden bg-warm-black"
      >
        <img
          src={next.hero}
          alt={next.title}
          width={1536}
          height={864}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-[1500ms] ease-[var(--ease-cinema)] group-hover:scale-105 group-hover:opacity-75"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/40 to-warm-black" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <p className="text-meta text-amber font-mono">06 // ADVANCE TO NEXT PICTURE</p>
          <h2 className="mt-4 sm:mt-6 text-display text-cream font-medium tracking-tight transition-transform duration-500 group-hover:scale-[1.02]">
            {next.title}
          </h2>
          <p className="text-meta mt-4 text-sand font-mono">
            {next.category.toUpperCase()} · {next.year} · DIR. {next.director.toUpperCase()} →
          </p>
        </div>
      </Link>

      {/* Interactive Stills Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian/95 p-4 sm:p-8 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-meta text-cream/70 font-mono z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-amber">●</span>
              <span>{film.title.toUpperCase()} // FRAME {lightboxIndex + 1} OF {film.gallery.length}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="text-meta px-3 py-1.5 border border-border hover:border-cream text-cream transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Lightbox Center Image with Cinematic Aspect Frame */}
          <div className="relative flex items-center justify-center flex-1 my-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-xs border border-border shadow-2xl">
              <img
                src={film.gallery[lightboxIndex]!}
                alt={`${film.title} full frame`}
                className="max-h-[75vh] w-auto object-contain"
              />
              {/* Aspect Ratio Crop Marks */}
              <div className="pointer-events-none absolute top-3 left-3 text-[10px] font-mono text-sand/80">⌜ 2.39:1</div>
              <div className="pointer-events-none absolute top-3 right-3 text-[10px] font-mono text-sand/80">⌝ 50MM</div>
              <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-mono text-sand/80">⌞ 5600K</div>
              <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-mono text-sand/80">⌟ REEL 01</div>
            </div>

            {/* Prev / Next Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + film.gallery.length) % film.gallery.length);
              }}
              className="absolute left-2 sm:left-6 text-cream/60 hover:text-cream text-2xl sm:text-4xl p-2 font-mono transition-colors"
              aria-label="Previous frame"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % film.gallery.length);
              }}
              className="absolute right-2 sm:right-6 text-cream/60 hover:text-cream text-2xl sm:text-4xl p-2 font-mono transition-colors"
              aria-label="Next frame"
            >
              →
            </button>
          </div>

          {/* Lightbox Bottom Info */}
          <div className="flex items-center justify-between text-[11px] font-mono text-taupe z-10" onClick={(e) => e.stopPropagation()}>
            <div>COOKE ANAMORPHIC /i FULL FRAME · 35MM EQUIVALENT</div>
            <div>USE ARROW KEYS OR SWIPE TO BROWSE</div>
          </div>
        </div>
      )}

      {/* Private Screener Request Modal */}
      {screenerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Request screener for ${film.title}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian/95 p-4 pb-safe animate-fade-in backdrop-blur-xl"
          onClick={() => setScreenerOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-sm border border-border/90 bg-charcoal/95 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <p className="text-meta text-amber font-mono">SCREENING ROOM // ACCESS REQUEST</p>
              <button
                type="button"
                onClick={() => setScreenerOpen(false)}
                className="text-meta text-taupe hover:text-cream"
              >
                ✕
              </button>
            </div>

            <h2 className="mt-4 text-h2 text-cream font-medium">{film.title}</h2>
            <p className="text-xs sm:text-sm text-taupe/90 mt-2 font-mono">
              Private 4K preview links are reserved for festivals, curators, distributors, and press representatives.
            </p>

            {screenerSent ? (
              <div className="mt-6 border border-amber/60 bg-amber/10 p-5 rounded-xs animate-fade-in text-center">
                <span className="text-2xl text-amber">✓</span>
                <h4 className="text-base text-cream font-medium mt-2">Request Transmitted</h4>
                <p className="text-xs text-sand/90 mt-1 font-mono">
                  An encrypted screener link with a 48-hour access token has been sent to {screenerForm.email || "your email"}.
                </p>
                <button
                  type="button"
                  onClick={() => setScreenerOpen(false)}
                  className="mt-5 text-meta px-5 py-2.5 bg-cream text-obsidian font-semibold transition-opacity hover:opacity-90"
                >
                  RETURN TO FILM
                </button>
              </div>
            ) : (
              <form onSubmit={handleScreenerSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-meta text-taupe font-mono block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={screenerForm.name}
                    onChange={(e) => setScreenerForm({ ...screenerForm, name: e.target.value })}
                    placeholder="e.g. Lena Hoffman"
                    className="w-full rounded-xs border border-border bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/50 focus:border-amber focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-meta text-taupe font-mono block mb-1.5">Official Email</label>
                  <input
                    type="email"
                    required
                    value={screenerForm.email}
                    onChange={(e) => setScreenerForm({ ...screenerForm, email: e.target.value })}
                    placeholder="name@festival.org"
                    className="w-full rounded-xs border border-border bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream placeholder-taupe/50 focus:border-amber focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-meta text-taupe font-mono block mb-1.5">Affiliation</label>
                  <select
                    value={screenerForm.affiliation}
                    onChange={(e) => setScreenerForm({ ...screenerForm, affiliation: e.target.value })}
                    className="w-full rounded-xs border border-border bg-obsidian/90 px-3.5 py-2.5 text-sm text-cream focus:border-amber focus:outline-none"
                  >
                    <option value="Festival / Programmer">Film Festival / Programmer</option>
                    <option value="Distributor / Buyer">Distributor / Acquisition</option>
                    <option value="Film Press / Critic">Press / Film Critic</option>
                    <option value="Curator / Cinematheque">Cinematheque / Cultural Museum</option>
                    <option value="Direct Collaborator">Production Collaborator</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full text-meta py-3.5 bg-amber text-obsidian font-bold tracking-widest transition-all duration-300 hover:bg-cream"
                  >
                    DISPATCH SCREENER REQUEST →
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 border-t border-border/60 pt-4 text-center">
              <a
                href="mailto:hello@1111pictures.com"
                className="text-[11px] font-mono text-sand/80 hover:text-amber"
              >
                Or direct inquiry via hello@1111pictures.com
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
