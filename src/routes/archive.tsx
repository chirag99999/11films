import { createFileRoute, Link } from "@tanstack/react-router";
import { films } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/Logo";

export const Route = createFileRoute("/archive")({
  component: ArchiveComponent,
});

const TOTAL_FRAMES = 144;

function ArchiveComponent() {
  return (
    <div className="grain min-h-screen bg-warm-black px-5 pb-32 pt-32 md:px-10 md:pt-44">
      <Reveal className="text-center">
        <p className="text-meta text-taupe">Archive</p>
        <h1 className="mt-6 text-h2 text-cream">
          {TOTAL_FRAMES} frames. {films.length} pictures.
        </h1>
        <p className="text-meta mt-4 text-taupe/70">
          Hover to look closer. Click to open the film.
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mx-auto mt-20 max-w-6xl">
        <ul className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 md:grid-cols-16 md:gap-2">
          {Array.from({ length: TOTAL_FRAMES }, (_, i) => {
            const film = films[(i * 7 + Math.floor(i / 16)) % films.length]!;
            const still = film.gallery[i % film.gallery.length]!;
            return (
              <li key={i} className="relative aspect-[4/3]">
                <Link
                  to="/films/$slug"
                  params={{ slug: film.slug }}
                  data-cursor="VIEW"
                  aria-label={`${film.title}, frame ${i + 1}`}
                  className="archive-frame absolute inset-0 block overflow-hidden bg-charcoal"
                >
                  <img
                    src={still}
                    alt=""
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${(i * 41) % 100}% ${(i * 29) % 100}%`,
                      transform: `scale(${1.6 + (i % 5) * 0.3})`,
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-24 flex justify-center">
        <BrandLogo large className="text-cream/60" />
      </Reveal>
    </div>
  );
}
