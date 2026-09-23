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

function FilmDetailComponent() {
  const { film, next } = Route.useLoaderData();
  const heroRef = useRef<HTMLElement | null>(null);
  const [screenerOpen, setScreenerOpen] = useState(false);

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

  return (
    <article>
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
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 px-5 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-14">
          <div>
            <p data-text className="text-meta text-sand">
              {film.category} / {film.year}
            </p>
            <h1 data-text className="mt-4 text-h1 text-cream">
              {film.title}
            </h1>
            <p data-text className="text-meta mt-5 text-cream/70">
              {film.director} · {film.year} · {film.runtime}
            </p>
          </div>
          <button
            data-text
            type="button"
            data-cursor="PLAY"
            onClick={() => setScreenerOpen(true)}
            className="text-meta group inline-flex items-center gap-4 self-start border border-cream/40 px-6 py-4 text-cream transition-colors duration-500 hover:border-cream hover:bg-cream hover:text-obsidian md:self-auto"
          >
            <span className="block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
            Play film
          </button>
        </div>
      </section>

      <section className="px-5 py-32 md:px-10 md:py-48">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="text-meta text-taupe">02 — Synopsis</p>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-5" delay={0.1}>
            <p className="text-h3 text-cream">{film.logline}</p>
            <p className="text-body-lg mt-8 max-w-2xl text-cream/70">
              {film.synopsis}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 md:px-10">
        <Reveal>
          <div className="overflow-hidden">
            <img
              src={film.gallery[1] ?? film.hero}
              alt={`Behind the scenes of ${film.title}`}
              width={1536}
              height={864}
              loading="lazy"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <p className="text-meta mt-4 text-taupe">03 — Behind the scenes</p>
        </Reveal>
      </section>

      <section className="px-5 py-32 md:px-10 md:py-48">
        <Reveal>
          <p className="text-meta text-taupe">04 — Stills</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {film.gallery.map((still, i) => (
            <Reveal
              key={i}
              delay={i * 0.12}
              className={i === 1 ? "md:translate-y-16" : ""}
            >
              <img
                src={still}
                alt={`${film.title} still ${i + 1}`}
                width={1536}
                height={864}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: `${30 + i * 25}% center` }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-5 py-32 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="text-meta text-taupe">05 — Credits</p>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-5" delay={0.1}>
            <dl className="divide-y divide-border">
              {film.credits.map((c) => (
                <div key={c.role} className="flex items-baseline justify-between py-4">
                  <dt className="text-meta text-taupe">{c.role}</dt>
                  <dd className="text-cream">{c.name}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-meta text-taupe">Producer</dt>
                <dd className="text-cream">{film.producer}</dd>
              </div>
            </dl>
            {film.awards && (
              <ul className="mt-10 space-y-2">
                {film.awards.map((award) => (
                  <li key={award} className="text-meta text-sand">
                    ★ {award}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      <Link
        to="/films/$slug"
        params={{ slug: next.slug }}
        data-cursor="NEXT"
        className="group relative block h-[70svh] overflow-hidden bg-warm-black"
      >
        <img
          src={next.hero}
          alt={next.title}
          width={1536}
          height={864}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-[1500ms] ease-[var(--ease-cinema)] group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <p className="text-meta text-sand">06 — Next film</p>
          <h2 className="mt-6 text-display text-cream">{next.title}</h2>
        </div>
      </Link>

      {screenerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Play ${film.title}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-warm-black/95 p-6 animate-fade-in"
          onClick={() => setScreenerOpen(false)}
        >
          <div className="max-w-xl text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-meta text-taupe">Screening room</p>
            <h2 className="mt-5 text-h2 text-cream">{film.title}</h2>
            <p className="text-body-lg mt-6 text-cream/70">
              The full film is available as a private screener. Write to us and we'll send a link.
            </p>
            <a
              href="mailto:hello@1111pictures.com"
              className="text-meta link-line mt-8 inline-block text-sand"
            >
              hello@1111pictures.com
            </a>
            <p
              className="text-meta mt-12 cursor-pointer text-taupe/60 hover:text-cream"
              onClick={() => setScreenerOpen(false)}
            >
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
