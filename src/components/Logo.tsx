import React from "react";

export function Logo({
  className,
  draw = false,
}: {
  className?: string;
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      data-draw={draw ? "" : undefined}
    >
      <circle cx="22" cy="12" r="8" />
      <circle cx="42" cy="12" r="8" />
      <circle cx="22" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="42" cy="12" r="3" fill="currentColor" stroke="none" />
      <rect x="14" y="22" width="30" height="20" rx="1" />
      <path d="M44 28 L58 22 V42 L44 36" />
      <path d="M29 42 L18 70" />
      <path d="M35 42 L46 70" />
      <path d="M32 42 V68" />
    </svg>
  );
}

export function BrandLogo({
  className,
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  return (
    <span className={`flex flex-col leading-none items-start ${className ?? ""}`}>
      <span
        className={`font-script italic tracking-wider ${
          large ? "text-[clamp(2.5rem,7vw,5rem)]" : "text-lg"
        }`}
      >
        11:11
      </span>
      <span
        className={`font-script ${
          large
            ? "mt-2 text-[clamp(1rem,2.2vw,1.5rem)] tracking-[0.45em]"
            : "mt-0.5 text-[0.55rem] tracking-[0.4em]"
        }`}
      >
        pictures
      </span>
    </span>
  );
}
