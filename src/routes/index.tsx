import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ScrollFrames, Frame } from "@/components/ScrollFrames";
import { expandFilmThumbnail } from "@/components/FilmExpand";
import { films, featuredFilm, stills } from "@/data/films";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const ENTERED_KEY = "1111:entered";
const ENTER_EVENT = "1111:enter";

function hasEntered(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem(ENTERED_KEY) === "1";
}

function ShutterIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"pending" | "show" | "done">("pending");

  useEffect(() => {
    if (hasEntered()) {
      setStatus("done");
      window.dispatchEvent(new Event(ENTER_EVENT));
      return;
    }
    setStatus("show");
  }, []);

  useEffect(() => {
    if (status !== "show" || !containerRef.current) return;

    document.documentElement.classList.add("overflow-hidden");
    const container = containerRef.current;
    const q = gsap.utils.selector(container);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paths = q("[data-draw] path, [data-draw] circle, [data-draw] rect");
    paths.forEach((el: any) => {
      if (el.getTotalLength) {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (prefersReducedMotion) {
      tl.set([q(".n1"), q(".n2"), q(".colon"), q(".pic"), q(".enter"), paths], {
        opacity: 1,
        strokeDashoffset: 0,
      });
    } else {
      tl.fromTo(q(".n1"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(q(".n2"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
        .fromTo(q(".colon"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.45)
        .to(paths, { strokeDashoffset: 0, duration: 0.7, stagger: 0.03, ease: "power2.inOut" }, 0.5)
        .fromTo(q(".pic"), { opacity: 0, letterSpacing: "0.9em" }, { opacity: 1, letterSpacing: "0.45em", duration: 0.8 }, 0.9)
        .fromTo(q(".enter"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 1.5)
        .fromTo(q(".bg"), { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 0.35, duration: 3 }, 0.2);
    }

    return () => {
      tl.kill();
    };
  }, [status]);

  const handleEnter = () => {
    sessionStorage.setItem(ENTERED_KEY, "1");
    const container = containerRef.current;
    if (!container) return;

    gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove("overflow-hidden");
        setStatus("done");
      },
    })
      .to(container.querySelector(".content"), { opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" })
      .to(container, { clipPath: "inset(50% 0 50% 0)", duration: 0.85, ease: "power4.inOut" }, 0.15)
      .call(() => window.dispatchEvent(new Event(ENTER_EVENT)), [], 0.55);
  };

  if (status === "done") return null;

  return (
    <div
      ref={containerRef}
      className="grain fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-warm-black"
      style={{
        clipPath: "inset(0 0 0 0)",
        opacity: status === "pending" ? 0 : 1,
      }}
    >
      <div className="bg pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(ellipse_at_center,oklch(0.63_0.13_55/0.35),transparent_60%)]" />
      <div className="content relative flex flex-col items-center px-4 py-8 text-center text-cream">
        <Logo draw className="h-16 w-auto sm:h-20 md:h-24" />
        <div className="mt-4 sm:mt-6 flex items-baseline font-script text-[clamp(2.25rem,8vw,5.5rem)] italic leading-none">
          <span className="n1 opacity-0">11</span>
          <span className="colon mx-2 sm:mx-3 opacity-0">:</span>
          <span className="n2 opacity-0">11</span>
        </div>
        <span className="pic mt-2 sm:mt-3 font-script text-[clamp(0.875rem,2.2vw,1.5rem)] tracking-[0.35em] sm:tracking-[0.45em] opacity-0">
          pictures
        </span>
        <button
          type="button"
          onClick={handleEnter}
          data-cursor="ENTER"
          className="enter group mt-10 sm:mt-16 flex flex-col items-center gap-3 text-meta text-cream/70 opacity-0 transition-colors hover:text-cream"
        >
          <span className="block h-6 sm:h-8 w-px bg-current opacity-60 transition-transform duration-500 group-hover:scale-y-125" />
          Enter
        </button>
      </div>
    </div>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let scrollTl: ReturnType<typeof gsap.timeline> | undefined;
    let tl: ReturnType<typeof gsap.timeline> | undefined;
    let startAnimation: (() => void) | undefined;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const q = gsap.utils.selector(el);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nav = document.getElementById("site-nav");

      if (nav) gsap.set(nav, { autoAlpha: 0 });

      tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

      if (prefersReducedMotion) {
        tl.set([q("[data-img]"), q("[data-text]"), nav], { autoAlpha: 1, scale: 1 });
      } else {
        tl.fromTo(q("[data-img]"), { autoAlpha: 0, scale: 1.18 }, { autoAlpha: 1, scale: 1.06, duration: 2.6, ease: "power2.inOut" })
          .fromTo(q("[data-text]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15 }, 1.6);
        if (nav) tl.to(nav, { autoAlpha: 1, duration: 0.9 }, 2.2);
      }

      startAnimation = () => tl!.play();

      if (hasEntered()) {
        startAnimation();
      }
      window.addEventListener(ENTER_EVENT, startAnimation, { once: true });

      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
        .to(q("[data-img]"), { yPercent: 18, scale: 1.16, ease: "none" }, 0)
        .to(q("[data-text]"), { y: -60, autoAlpha: 0, ease: "none" }, 0);
    });

    return () => {
      if (startAnimation) window.removeEventListener(ENTER_EVENT, startAnimation);
      tl?.kill();
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
      const nav = document.getElementById("site-nav");
      if (nav) gsap.set(nav, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vignette relative h-[100svh] w-full overflow-hidden bg-warm-black"
    >
      <img
        data-img
        src={featuredFilm.hero}
        alt={featuredFilm.title}
        width={1536}
        height={864}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-8 md:px-10 md:pb-12 pb-safe">
        <div data-text className="opacity-0">
          <p className="text-meta text-sand">Film / 01</p>
          <p className="mt-2 sm:mt-3 text-h3 text-cream">{featuredFilm.title}</p>
        </div>
        <Link
          data-text
          to="/films/$slug"
          params={{ slug: featuredFilm.slug }}
          data-cursor="VIEW"
          className="text-meta link-line text-cream opacity-0"
        >
          Explore →
        </Link>
      </div>
    </section>
  );
}

function Carousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const dragRef = useRef({ down: false, x: 0, left: 0, moved: false, isMouse: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
    };

    const initialIdx = Math.max(0, films.findIndex((f) => f.featured));
    const targetEl = container.children[initialIdx] as HTMLElement | undefined;
    if (targetEl) {
      container.scrollLeft = targetEl.offsetLeft + targetEl.offsetWidth / 2 - container.clientWidth / 2;
    }

    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    if (e.pointerType === "mouse") {
      dragRef.current = { down: true, x: e.clientX, left: containerRef.current.scrollLeft, moved: false, isMouse: true };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.down || !containerRef.current || !dragRef.current.isMouse) return;
    const diff = e.clientX - dragRef.current.x;
    if (Math.abs(diff) > 4) dragRef.current.moved = true;
    containerRef.current.scrollLeft = dragRef.current.left - diff;
  };

  const onPointerUp = () => {
    dragRef.current.down = false;
  };

  const handleSelect = (idx: number, imgEl: HTMLImageElement | null) => {
    if (dragRef.current.moved || !containerRef.current) return;

    if (idx !== activeIndex) {
      const target = containerRef.current.children[idx] as HTMLElement | undefined;
      if (target) {
        containerRef.current.scrollTo({
          left: target.offsetLeft + target.offsetWidth / 2 - containerRef.current.clientWidth / 2,
          behavior: "smooth",
        });
      }
      return;
    }

    if (imgEl) {
      expandFilmThumbnail(imgEl, () => {
        navigate({ to: "/films/$slug", params: { slug: films[idx]!.slug } });
      });
    }
  };

  const current = films[activeIndex] ?? films[0]!;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative py-20 md:py-36" aria-label="Featured films">
      <p className="text-meta mb-8 sm:mb-12 text-center text-taupe">Featured</p>
      <div
        ref={containerRef}
        data-cursor="← DRAG →"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="no-scrollbar flex touch-pan-x select-none items-center gap-3 sm:gap-5 overflow-x-auto px-[12vw] sm:px-[20vw] md:px-[28vw]"
        style={{ scrollSnapType: "x proximity" }}
      >
        {films.map((film, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={film.slug}
              type="button"
              data-cursor={isActive ? "VIEW" : undefined}
              onClick={(e) => handleSelect(i, e.currentTarget.querySelector("img"))}
              className={`relative shrink-0 overflow-hidden transition-all duration-700 ease-[var(--ease-cinema)] rounded-sm ${
                isActive
                  ? "h-[48vh] w-[76vw] sm:h-[54vh] sm:w-[60vw] md:h-[62vh] md:w-[44vw]"
                  : "h-[32vh] w-[26vw] opacity-50 hover:opacity-85 sm:h-[38vh] sm:w-[20vw] md:h-[42vh] md:w-[13vw]"
              }`}
              style={{ scrollSnapAlign: "center" }}
              aria-label={`${film.title}, ${film.year}`}
            >
              <img
                src={film.hero}
                alt={film.title}
                width={1536}
                height={864}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-8 sm:mt-12 flex flex-col items-center gap-2 sm:gap-3 px-5 text-center" aria-live="polite">
        <p className="text-meta text-taupe">
          {pad(activeIndex + 1)} / {pad(films.length)} — {current.category}
        </p>
        <h2 key={current.slug} className="text-h1 animate-fade-in text-cream">
          {current.title}
        </h2>
        <p className="text-meta text-taupe">
          {current.director} · {current.year} · {current.runtime}
        </p>
      </div>
    </section>
  );
}

const storyFrames: Frame[] = [
  {
    src: stills.sunset,
    eyebrow: "Stories",
    title: "We make pictures.",
    body: "Stories that remain after the screen goes dark.",
  },
  {
    src: stills.slate,
    eyebrow: "Character",
    title: "A face, watched closely.",
  },
  {
    src: stills.crew,
    eyebrow: "Craft",
    title: "Light we waited for.",
  },
  {
    src: stills.coast,
    eyebrow: "Place",
    title: "Countries that feel like weather.",
  },
];

function HomeComponent() {
  const allStills = Object.values(stills).concat(Object.values(stills));

  return (
    <>
      <ShutterIntro />
      <Hero />
      <Carousel />
      <ScrollFrames frames={storyFrames} />

      <section className="px-5 py-24 md:px-10 md:py-44">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <p className="text-meta text-taupe">Archive</p>
            <h2 className="mt-4 sm:mt-6 text-h2 text-cream">
              Every frame we kept,
              <br />
              in one dark room.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.15}>
            <Link to="/archive" data-cursor="VIEW" className="group block">
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-1.5">
                {allStills.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="aspect-video w-full object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-90"
                    style={{ objectPosition: `${(i * 37) % 100}% ${(i * 53) % 100}%` }}
                  />
                ))}
              </div>
              <p className="text-meta link-line mt-6 inline-block text-cream">
                Open the archive →
              </p>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-24 md:px-10 md:py-40 pb-safe">
        <Reveal>
          <p className="text-meta text-taupe">Contact</p>
          <h2 className="mt-6 text-display text-cream">
            Let's
            <br />
            make
            <br />
            something.
          </h2>
          <a
            href="mailto:hello@1111pictures.com"
            className="text-h3 link-line mt-8 sm:mt-12 inline-block text-sand"
          >
            hello@1111pictures.com
          </a>
        </Reveal>
      </section>
    </>
  );
}
