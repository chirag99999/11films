import { useRef, useEffect } from "react";
import gsap from "gsap";

export interface Frame {
  src: string;
  eyebrow: string;
  title: string;
  body?: string;
}

export function ScrollFrames({ frames }: { frames: Frame[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mm: ReturnType<typeof gsap.matchMedia> | undefined;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const isDesktop = context.conditions?.desktop;
          const frameEls = gsap.utils.toArray<HTMLElement>(
            container.querySelectorAll("[data-frame]")
          );

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${frames.length * (isDesktop ? 120 : 90)}%`,
              pin: true,
              scrub: 1,
            },
          });

          frameEls.forEach((frame, i) => {
            const img = frame.querySelector<HTMLElement>("[data-img]");
            const text = frame.querySelector<HTMLElement>("[data-text]");
            const step = i * 3;

            tl.set(frame, { autoAlpha: 1 }, step)
              .fromTo(
                img,
                {
                  scale: isDesktop ? 0.42 : 0.7,
                  rotate: -5,
                  yPercent: 8,
                  autoAlpha: 0,
                },
                {
                  scale: isDesktop ? 0.55 : 0.8,
                  rotate: 0,
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 1,
                  ease: "power2.out",
                },
                step
              )
              .fromTo(
                text,
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.6 },
                step + 0.7
              )
              .to(img, { scale: 1, duration: 1, ease: "power3.inOut" }, step + 1.4)
              .to(text, { autoAlpha: 0, y: -20, duration: 0.5 }, step + 1.5);

            if (i < frameEls.length - 1) {
              tl.to(img, { autoAlpha: 0, scale: 1.08, duration: 0.6 }, step + 2.5).set(
                frame,
                { autoAlpha: 0 },
                step + 3
              );
            }
          });
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(container.querySelectorAll("[data-frame]"), {
          position: "relative",
          autoAlpha: 1,
          height: "auto",
        });
        gsap.set(container.querySelectorAll("[data-img], [data-text]"), {
          autoAlpha: 1,
          clearProps: "transform",
        });
      });
    });

    return () => mm?.revert();
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-warm-black"
    >
      {frames.map((f) => (
        <div
          key={f.title}
          data-frame
          className="invisible absolute inset-0 opacity-0"
        >
          <img
            data-img
            src={f.src}
            alt={f.title}
            width={1536}
            height={864}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0"
          />
          <div
            data-text
            className="absolute inset-x-0 bottom-0 z-10 px-5 pb-16 opacity-0 md:px-10 md:pb-20"
          >
            <p className="text-meta mb-4 text-sand">{f.eyebrow}</p>
            <h3 className="text-h1 max-w-4xl text-cream">{f.title}</h3>
            {f.body && (
              <p className="text-body-lg mt-5 max-w-md text-cream/80">{f.body}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
