import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { films, Film } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { expandFilmThumbnail } from "@/components/FilmExpand";

export const Route = createFileRoute("/films/")({
  head: () => ({
    meta: [
      { title: "Pictures & Archival Slates — 11:11 Pictures" },
      { name: "description", content: "Complete archival catalog of feature films, shorts, commercial works and visual music films by 11:11 Pictures." },
    ],
  }),
  component: FilmsIndexComponent,
});

type CategoryFilter = "ALL" | "FEATURE" | "SHORT" | "MUSIC" | "COMMERCIAL";
type ViewMode = "FRAMES" | "CATALOG";

export function FilmsIndexComponent() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [viewMode, setViewMode] = useState<ViewMode>("FRAMES");
  const [hoveredFilm, setHoveredFilm] = useState<Film | null>(null);

  const filteredFilms = useMemo(() => {
    if (filter === "ALL") return films;
    return films.filter((f) => f.category.toUpperCase() === filter);
  }, [filter]);

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: "ALL", label: "All Pictures", count: films.length },
    { key: "FEATURE", label: "Features", count: films.filter((f) => f.category === "Feature").length },
    { key: "SHORT", label: "Shorts", count: films.filter((f) => f.category === "Short").length },
    { key: "MUSIC", label: "Music Films", count: films.filter((f) => f.category === "Music").length },
    { key: "COMMERCIAL", label: "Commercial", count: films.filter((f) => f.category === "Commercial").length },
  ];

  return (
    <div className="grain min-h-[100svh] px-5 pb-28 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe bg-warm-black">
      {/* Header Slate */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <p className="text-meta text-amber flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            INDEX // 007 CELLULOID & SENSOR SLATES
          </p>
          <p className="text-meta text-taupe/70 font-mono">
            ARCHIVE REF: 1111-CAT-2026
          </p>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="text-h1 text-cream tracking-tight">
              Selected Works.
              <br />
              <span className="text-taupe font-normal">Every frame committed to record.</span>
            </h1>
            <p className="text-body-lg text-cream/60 mt-4 max-w-xl leading-relaxed">
              Features, shorts, and audiovisual experiments crafted in Mumbai. Produced slowly with small crews, natural light, and quiet intention.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 self-start rounded-sm border border-border/80 bg-obsidian/80 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode("FRAMES")}
              className={`text-meta px-3.5 py-1.5 transition-all duration-300 ${
                viewMode === "FRAMES"
                  ? "bg-charcoal text-cream shadow-sm"
                  : "text-taupe hover:text-cream"
              }`}
            >
              FRAMES VIEW
            </button>
            <button
              type="button"
              onClick={() => setViewMode("CATALOG")}
              className={`text-meta px-3.5 py-1.5 transition-all duration-300 ${
                viewMode === "CATALOG"
                  ? "bg-charcoal text-cream shadow-sm"
                  : "text-taupe hover:text-cream"
              }`}
            >
              CATALOG SLATE
            </button>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <Reveal delay={0.1} className="mt-10 sm:mt-14">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setFilter(cat.key)}
              className={`text-meta inline-flex items-center gap-2 px-3.5 py-2 transition-all duration-300 border ${
                filter === cat.key
                  ? "border-amber/80 bg-amber/10 text-cream"
                  : "border-transparent text-taupe hover:border-border hover:text-cream"
              }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[10px] text-taupe/80">({cat.count})</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* View Mode 1: Frames Grid */}
      {viewMode === "FRAMES" ? (
        <ul className="mt-12 sm:mt-16 grid gap-x-8 gap-y-14 sm:gap-y-18 md:grid-cols-2 md:gap-y-24">
          {filteredFilms.map((film, i) => (
            <Reveal
              key={film.slug}
              as="li"
              delay={(i % 2) * 0.08}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <button
                type="button"
                data-cursor="VIEW"
                onClick={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) {
                    expandFilmThumbnail(img, () => {
                      navigate({ to: "/films/$slug", params: { slug: film.slug } });
                    });
                  }
                }}
                className="group block w-full text-left focus:outline-none"
              >
                {/* Frame Image Container with Film Slate Border */}
                <div className="relative overflow-hidden rounded-sm bg-obsidian border border-border/80 transition-all duration-500 group-hover:border-cream/30">
                  <div
                    className={
                      i === 0
                        ? "aspect-[16/10] sm:aspect-[21/9]"
                        : "aspect-[16/10] sm:aspect-video"
                    }
                  >
                    <img
                      src={film.hero}
                      alt={film.title}
                      width={1536}
                      height={864}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cinema)] group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Dark Room Vignette & Archival Slate Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/90 via-transparent to-warm-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

                  {/* Top Archival Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-widest text-cream/75 drop-shadow-md">
                    <span className="bg-obsidian/85 px-2 py-0.5 rounded-xs border border-border/70 backdrop-blur-sm">
                      REEL 0{i + 1} // {film.year}
                    </span>
                    <span className="bg-obsidian/85 px-2 py-0.5 rounded-xs border border-border/70 backdrop-blur-sm text-sand">
                      {film.category.toUpperCase()} · {film.runtime}
                    </span>
                  </div>

                  {/* Bottom Hover Action Indicator */}
                  <div className="absolute bottom-3 right-3 text-meta text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-obsidian/90 px-3 py-1 border border-cream/30 backdrop-blur-sm">
                    OPEN SLATE →
                  </div>
                </div>

                {/* Metadata Line */}
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="text-h3 text-cream transition-colors duration-300 group-hover:text-amber">
                    {film.title}
                  </h2>
                  <p className="text-meta shrink-0 text-taupe font-mono">
                    DIR. {film.director.toUpperCase()}
                  </p>
                </div>

                {/* Logline & Awards */}
                <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-taupe/90 leading-relaxed">
                  {film.logline}
                </p>

                {film.awards && film.awards.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[11px] text-amber">★</span>
                    <span className="text-[11px] tracking-wider text-sand/90 uppercase font-mono">
                      {film.awards[0]}
                    </span>
                  </div>
                )}
              </button>
            </Reveal>
          ))}
        </ul>
      ) : (
        /* View Mode 2: Archival Catalog Table */
        <div className="mt-12 sm:mt-16 overflow-hidden border border-border/80 bg-obsidian/50 rounded-sm backdrop-blur-sm">
          <div className="relative">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-charcoal/60 text-meta text-taupe">
                  <th className="py-4 px-4 sm:px-6">ROLL</th>
                  <th className="py-4 px-4 sm:px-6">TITLE & LOGLINE</th>
                  <th className="py-4 px-4 sm:px-6 hidden sm:table-cell">DIRECTOR</th>
                  <th className="py-4 px-4 sm:px-6 hidden md:table-cell">CATEGORY</th>
                  <th className="py-4 px-4 sm:px-6 text-right">YEAR / RUN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredFilms.map((film, i) => (
                  <tr
                    key={film.slug}
                    onClick={() => navigate({ to: "/films/$slug", params: { slug: film.slug } })}
                    onMouseEnter={() => setHoveredFilm(film)}
                    onMouseLeave={() => setHoveredFilm(null)}
                    className="group cursor-pointer transition-colors duration-200 hover:bg-charcoal/80"
                  >
                    <td className="py-5 px-4 sm:px-6 font-mono text-xs text-taupe group-hover:text-amber">
                      0{i + 1}
                    </td>
                    <td className="py-5 px-4 sm:px-6">
                      <div className="text-base sm:text-lg font-medium text-cream group-hover:text-amber transition-colors">
                        {film.title}
                      </div>
                      <div className="text-xs text-taupe/80 max-w-md mt-1 truncate">
                        {film.logline}
                      </div>
                    </td>
                    <td className="py-5 px-4 sm:px-6 hidden sm:table-cell text-sm text-sand">
                      {film.director}
                    </td>
                    <td className="py-5 px-4 sm:px-6 hidden md:table-cell">
                      <span className="text-meta px-2 py-0.5 border border-border/70 text-taupe text-[10px]">
                        {film.category}
                      </span>
                    </td>
                    <td className="py-5 px-4 sm:px-6 text-right font-mono text-xs text-taupe">
                      {film.year} · {film.runtime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Hover Floating Cinema Frame Preview */}
            {hoveredFilm && (
              <div className="pointer-events-none fixed bottom-12 right-12 z-40 hidden lg:block w-72 overflow-hidden rounded-sm border border-amber/50 bg-obsidian shadow-2xl animate-fade-in">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={hoveredFilm.hero}
                    alt={hoveredFilm.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3 bg-charcoal/95 border-t border-border">
                  <p className="text-xs font-semibold text-cream">{hoveredFilm.title}</p>
                  <p className="text-[10px] text-taupe font-mono mt-0.5">
                    {hoveredFilm.category} · {hoveredFilm.runtime} · {hoveredFilm.director}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Archival Vault Footer Note */}
      <Reveal delay={0.2} className="mt-20 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-meta text-taupe/70 font-mono">
        <div>11:11 PICTURES SCREENING ARCHIVE // 35MM VISION3 & DIGITAL CINEMA</div>
        <div>ALL FRAMES PROTECTED UNDER PRIVATE DISTRIBUTION</div>
      </Reveal>
    </div>
  );
}
