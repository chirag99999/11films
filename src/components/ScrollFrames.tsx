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
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1024px)",
          isDesktop: "(min-width: 1025px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, isTablet, reduceMotion } = context.conditions || {};

          if (reduceMotion) {
            gsap.set(container.querySelectorAll("[data-frame]"), {
              position: "relative",
              autoAlpha: 1,
              height: "auto",
            });
            gsap.set(container.querySelectorAll("[data-img], [data-text]"), {
              autoAlpha: 1,
              clearProps: "transform",
            });
            return;
          }

          const frameEls = gsap.utils.toArray<HTMLElement>(
            container.querySelectorAll("[data-frame]")
          );

          // Calibrated scales and rotations per viewport size
          const startScale = isMobile ? 0.85 : isTablet ? 0.6 : 0.44;
          const midScale = isMobile ? 0.95 : isTablet ? 0.72 : 0.58;
          const startRotate = isMobile ? -1.5 : isTablet ? -3 : -4.5;
          const endDuration = isMobile ? 85 : isTablet ? 105 : 120;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${frames.length * endDuration}%`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
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
                  scale: startScale,
                  rotate: startRotate,
                  yPercent: isMobile ? 4 : 8,
                  autoAlpha: 0,
                },
                {
                  scale: midScale,
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
                { autoAlpha: 0, y: isMobile ? 18 : 28 },
                { autoAlpha: 1, y: 0, duration: 0.6 },
                step + 0.7
              )
              .to(img, { scale: 1.02, duration: 1, ease: "power3.inOut" }, step + 1.4)
              .to(text, { autoAlpha: 0, y: -16, duration: 0.5 }, step + 1.5);

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
    });

    return () => mm?.revert();
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-warm-black"
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
            className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-warm-black/90 via-warm-black/50 to-transparent px-5 pb-14 pt-16 opacity-0 md:px-10 md:pb-20 pb-safe"
          >
            <p className="text-meta mb-3 text-sand">{f.eyebrow}</p>
            <h3 className="text-h1 max-w-4xl text-cream">{f.title}</h3>
            {f.body && (
              <p className="text-body-lg mt-3 max-w-lg text-cream/80 sm:mt-5">
                {f.body}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
