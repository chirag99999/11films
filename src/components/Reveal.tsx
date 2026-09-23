import { useRef, useEffect, ReactNode, ElementType } from "react";
import gsap from "gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mm: ReturnType<typeof gsap.matchMedia> | undefined;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    });

    return () => mm?.revert();
  }, [delay, y]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
