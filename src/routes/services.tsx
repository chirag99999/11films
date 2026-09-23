import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { stills } from "@/data/films";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  component: ServicesComponent,
});

const serviceItems = [
  {
    n: "01",
    name: "Development",
    img: stills.slate,
    note: "Scripts, treatments, the long conversation before anything is shot.",
  },
  {
    n: "02",
    name: "Pre-production",
    img: stills.coast,
    note: "Casting, locations, schedules, and the boring documents that save films.",
  },
  {
    n: "03",
    name: "Production",
    img: stills.crew,
    note: "Small crews on set. Cinema cameras. Natural light where we can find it.",
  },
  {
    n: "04",
    name: "Post-production",
    img: stills.interior,
    note: "Edit, grade, sound and music, finished in the room with the director.",
  },
  {
    n: "05",
    name: "Commercial",
    img: stills.sunset,
    note: "Brand films that look and feel like cinema, because they are made like it.",
  },
  {
    n: "06",
    name: "Music / Visuals",
    img: stills.rooftop,
    note: "Music films, live sessions and visual pieces built around a single idea.",
  },
];

function ServicesComponent() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-warm-black">
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
            activeIdx === i ? "scale-100 opacity-40 sm:opacity-50" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-warm-black via-warm-black/80 to-transparent" />

      <div className="relative px-5 pb-24 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe">
        <Reveal>
          <p className="text-meta text-taupe">Services</p>
          <h1 className="mt-4 sm:mt-6 text-h1 text-cream">
            From the first page
            <br />
            to the final frame.
          </h1>
        </Reveal>

        <ul className="mt-14 sm:mt-24 max-w-4xl divide-y divide-border">
          {serviceItems.map((item, i) => (
            <Reveal key={item.n} as="li" delay={i * 0.05}>
              <div
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(i)}
                onBlur={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                tabIndex={0}
                className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr_1.2fr] items-baseline gap-2 sm:gap-4 py-5 sm:py-7 md:py-9 outline-none cursor-pointer"
              >
                <span className="text-meta text-taupe">{item.n}</span>
                <h2
                  className={`text-h2 transition-all duration-500 ease-[var(--ease-cinema)] ${
                    activeIdx === i ? "translate-x-1 sm:translate-x-3 text-cream" : "text-cream/70"
                  }`}
                >
                  {item.name}
                </h2>
                <p
                  className={`col-start-2 mt-1.5 sm:mt-2 text-xs sm:text-sm text-taupe transition-all duration-500 leading-relaxed md:col-start-3 md:mt-0 ${
                    activeIdx === i ? "opacity-100 text-cream/90" : "opacity-60 md:opacity-0"
                  }`}
                >
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
