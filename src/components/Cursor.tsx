import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handlePointerMove = (e: PointerEvent) => {
      setVisible(true);
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) {
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setLabel(null);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-cream transition-all duration-300 ease-[var(--ease-cinema)] ${
          label ? "h-14 w-14 bg-cream" : "h-2.5 w-2.5 bg-transparent"
        }`}
      >
        {label && (
          <span className="text-meta text-[0.55rem] text-obsidian">{label}</span>
        )}
      </div>
    </div>
  );
}
