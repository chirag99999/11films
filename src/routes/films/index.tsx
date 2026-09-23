import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { films } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { expandFilmThumbnail } from "@/components/FilmExpand";

export const Route = createFileRoute("/films/")({
  component: FilmsIndexComponent,
});

function FilmsIndexComponent() {
  const navigate = useNavigate();

  return (
    <div className="px-5 pb-24 pt-28 sm:pt-36 md:px-10 md:pt-44 pb-safe">
      <Reveal>
        <p className="text-meta text-taupe">Work</p>
        <h1 className="mt-4 sm:mt-6 text-h1 text-cream">
          {films.length} pictures.
          <br />
          <span className="text-taupe">Pick a frame.</span>
        </h1>
      </Reveal>

      <ul className="mt-14 sm:mt-24 grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 md:gap-y-20">
        {films.map((film, i) => (
          <Reveal
            key={film.slug}
            as="li"
            delay={(i % 2) * 0.1}
            className={i % 3 === 0 ? "md:col-span-2" : ""}
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
              <div
                className={`overflow-hidden rounded-sm ${
                  i % 3 === 0 ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[16/10] sm:aspect-video"
                }`}
              >
                <img
                  src={film.hero}
                  alt={film.title}
                  width={1536}
                  height={864}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 sm:mt-5 flex items-baseline justify-between gap-4 sm:gap-6">
                <h2 className="text-h3 text-cream">{film.title}</h2>
                <p className="text-meta shrink-0 text-taupe">
                  {film.category} · {film.year}
                </p>
              </div>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-taupe leading-relaxed">{film.logline}</p>
            </button>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
