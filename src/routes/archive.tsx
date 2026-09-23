import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { films, Film } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/Logo";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Dark Room Archive // 144 Frames — 11:11 Pictures" },
      { name: "description", content: "Every frame we kept in one dark room. 144 archival frames extracted from 7 pictures by 11:11 Pictures." },
    ],
  }),
  component: ArchiveComponent,
});

const TOTAL_FRAMES = 144;

type MoodFilter = "ALL" | "AMBER" | "NIGHT" | "COLD" | "INTERIOR";
type DensityMode = "SHEET" | "PLATES";

interface FrameItem {
  id: number;
  film: Film;
  still: string;
  mood: "AMBER" | "NIGHT" | "COLD" | "INTERIOR";
  timecode: string;
  lens: string;
  colorTemp: string;
  sceneName: string;
}

export function ArchiveComponent() {
  const [selectedMood, setSelectedMood] = useState<MoodFilter>("ALL");
  const [density, setDensity] = useState<DensityMode>("SHEET");
  const [activeFrame, setActiveFrame] = useState<FrameItem | null>(null);
  const [ambientLight, setAmbientLight] = useState<"10%" | "30%">("10%");

  // Generate frame items with enriched archival metadata
  const allFrames: FrameItem[] = useMemo(() => {
    const moods: ("AMBER" | "NIGHT" | "COLD" | "INTERIOR")[] = [
      "AMBER",
      "NIGHT",
      "COLD",
      "INTERIOR",
      "AMBER",
      "NIGHT",
    ];
    const lenses = ["32mm Cooke", "50mm Cooke Anamorphic", "75mm Anamorphic", "40mm Kowa", "65mm Ultra"];
    const scenes = ["Golden Hour Horizon", "Quiet Table Lamp", "Corridor Stride", "Rain On Double Pane", "Dawn Rooftop Solo", "Coast Cliff Edge"];

    return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const film = films[(i * 7 + Math.floor(i / 16)) % films.length]!;
      const still = film.gallery[i % film.gallery.length]!;
      const mood = moods[i % moods.length]!;
      const hours = String(Math.floor(i / 60)).padStart(2, "0");
      const minutes = String((i * 7) % 60).padStart(2, "0");
      const seconds = String((i * 13) % 60).padStart(2, "0");
      const framesCount = String((i * 19) % 24).padStart(2, "0");

      return {
        id: i + 1,
        film,
        still,
        mood,
        timecode: `${hours}:${minutes}:${seconds}:${framesCount}`,
        lens: lenses[i % lenses.length]!,
        colorTemp: i % 2 === 0 ? "3200K Tungsten" : "5600K Daylight",
        sceneName: scenes[i % scenes.length]!,
      };
    });
  }, []);

  const filteredFrames = useMemo(() => {
    if (selectedMood === "ALL") return allFrames;
    return allFrames.filter((f) => f.mood === selectedMood);
  }, [allFrames, selectedMood]);

  return (
    <div
      className={`grain min-h-[100svh] px-4 sm:px-6 pb-28 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe transition-colors duration-700 ${
        ambientLight === "10%" ? "bg-[#0A0908]" : "bg-[#141210]"
      }`}
    >
      {/* Header Slate */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
          <p className="text-meta text-amber flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
            DARK ROOM VAULT // 144 PRESERVED FRAMES
          </p>
          <div className="flex items-center gap-4 text-meta text-taupe/80 font-mono">
            <span>LIGHT: {ambientLight}</span>
            <button
              type="button"
              onClick={() => setAmbientLight(ambientLight === "10%" ? "30%" : "10%")}
              className="px-2 py-0.5 border border-border/80 text-[10px] hover:text-cream hover:border-cream"
            >
              DIM / RAISE
            </button>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 max-w-4xl">
          <p className="text-meta text-sand font-mono tracking-widest">ARCHIVE</p>
          <h1 className="mt-3 text-h1 text-cream font-medium tracking-tight">
            Every frame we kept,
            <br />
            in one dark room.
          </h1>
          <p className="mt-4 sm:mt-6 text-body-lg text-cream/65 max-w-2xl leading-relaxed">
            A chronological contact sheet of light, stillness, and celluloid grain. Hover or tap any negative to reveal camera metadata, timecode, and film details.
          </p>
        </div>
      </Reveal>

      {/* Control Bar: Mood Filters & View Density */}
      <Reveal delay={0.1} className="mt-10 sm:mt-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-border/60 py-4">
          {/* Mood Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ["ALL", `All Frames (${allFrames.length})`],
                ["AMBER", "Magic Hour / Amber"],
                ["NIGHT", "Obsidian Night"],
                ["COLD", "Cold Slate / Coast"],
                ["INTERIOR", "Interiors"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedMood(key)}
                className={`text-meta px-3 py-1.5 rounded-xs transition-all duration-300 border ${
                  selectedMood === key
                    ? "border-amber bg-amber/15 text-cream shadow-sm"
                    : "border-transparent text-taupe hover:border-border hover:text-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Density Mode */}
          <div className="flex items-center gap-1 self-start sm:self-auto rounded-sm border border-border/80 bg-obsidian p-1">
            <button
              type="button"
              onClick={() => setDensity("SHEET")}
              className={`text-meta px-3 py-1 transition-all ${
                density === "SHEET" ? "bg-charcoal text-cream" : "text-taupe hover:text-cream"
              }`}
            >
              CONTACT SHEET
            </button>
            <button
              type="button"
              onClick={() => setDensity("PLATES")}
              className={`text-meta px-3 py-1 transition-all ${
                density === "PLATES" ? "bg-charcoal text-cream" : "text-taupe hover:text-cream"
              }`}
            >
              PLATES (35MM)
            </button>
          </div>
        </div>
      </Reveal>

      {/* Contact Sheet View */}
      {density === "SHEET" ? (
        <Reveal delay={0.15} className="mx-auto mt-10 sm:mt-16">
          <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16 gap-1.5 md:gap-2">
            {filteredFrames.map((item) => (
              <li key={item.id} className="relative aspect-[4/3]">
                <button
                  type="button"
                  onClick={() => setActiveFrame(item)}
                  onMouseEnter={() => setActiveFrame(item)}
                  aria-label={`${item.film.title}, frame ${item.id}`}
                  className={`archive-frame group absolute inset-0 block w-full overflow-hidden rounded-[2px] border ${
                    activeFrame?.id === item.id ? "border-amber z-30" : "border-border/60 bg-charcoal"
                  }`}
                >
                  <img
                    src={item.still}
                    alt=""
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${(item.id * 41) % 100}% ${(item.id * 29) % 100}%`,
                      transform: `scale(${1.3 + (item.id % 4) * 0.2})`,
                    }}
                  />
                  {/* Subtle frame edge code */}
                  <span className="pointer-events-none absolute bottom-0.5 right-0.5 text-[8px] font-mono text-cream/70 opacity-0 group-hover:opacity-100 bg-obsidian/80 px-1">
                    #{item.id}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : (
        /* Plates View: Editorial 35mm Slides */
        <div className="mt-10 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFrames.slice(0, 36).map((item) => (
            <Reveal key={item.id}>
              <div
                onClick={() => setActiveFrame(item)}
                className="group cursor-pointer rounded-sm border border-border/80 bg-obsidian p-3 transition-all duration-300 hover:border-amber/70"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xs bg-charcoal">
                  <img
                    src={item.still}
                    alt=""
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-cinema)] group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 text-[9px] font-mono bg-obsidian/85 px-1.5 py-0.5 text-sand border border-border">
                    TC {item.timecode}
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <p className="text-sm font-medium text-cream group-hover:text-amber transition-colors">
                    {item.film.title}
                  </p>
                  <p className="text-[10px] font-mono text-taupe">FRAME #{item.id}</p>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-taupe/80">
                  <span>{item.lens}</span>
                  <span className="text-amber">2.39:1 SCOPE</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Floating Active Frame Inspector Slate */}
      {activeFrame && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-50 max-w-md rounded-sm border border-amber/70 bg-obsidian/95 p-5 shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-border/70 pb-2">
            <span className="text-meta text-amber font-mono flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-ping" />
              INSPECTING FRAME #{activeFrame.id}
            </span>
            <button
              type="button"
              onClick={() => setActiveFrame(null)}
              className="text-meta text-taupe hover:text-cream"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 flex gap-4 items-center">
            <div className="w-24 aspect-[16/10] overflow-hidden rounded-xs border border-border shrink-0">
              <img
                src={activeFrame.still}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base text-cream font-medium">{activeFrame.film.title}</h3>
              <p className="text-xs text-taupe font-mono mt-0.5">
                {activeFrame.film.category} · {activeFrame.film.year} · DIR. {activeFrame.film.director}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-border/50 pt-2 text-taupe">
            <div>TIMECODE: <span className="text-cream">{activeFrame.timecode}</span></div>
            <div>OPTICS: <span className="text-cream">{activeFrame.lens}</span></div>
            <div>BALANCE: <span className="text-cream">{activeFrame.colorTemp}</span></div>
            <div>ASPECT: <span className="text-amber">2.39:1 ANAMORPHIC</span></div>
          </div>

          <div className="mt-4 pt-2 border-t border-border/50 flex items-center justify-between">
            <Link
              to="/films/$slug"
              params={{ slug: activeFrame.film.slug }}
              className="text-meta text-amber hover:text-cream flex items-center gap-2 font-mono"
            >
              OPEN FILM SLATE →
            </Link>
            <span className="text-[10px] text-taupe font-mono">11:11 ARCHIVES</span>
          </div>
        </div>
      )}

      {/* Brand Watermark Outro */}
      <Reveal delay={0.2} className="mt-24 sm:mt-32 flex flex-col items-center justify-center text-center">
        <BrandLogo large className="text-cream/40 transition-colors duration-500 hover:text-cream/80" />
        <p className="text-meta text-taupe/60 font-mono mt-6">
          SCREENING ROOM ARCHIVES // ALL 144 STILLS CATALOGUED IN CELLULOID NEGATIVE
        </p>
      </Reveal>
    </div>
  );
}
