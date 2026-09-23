import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  component: ContactComponent,
});

const socials = [
  ["Instagram", "https://instagram.com/1111pictures"],
  ["Vimeo", "https://vimeo.com/1111pictures"],
  ["YouTube", "https://youtube.com/@1111pictures"],
] as const;

function ContactComponent() {
  return (
    <div className="flex min-h-[100svh] flex-col justify-between px-5 pb-12 pt-28 sm:pt-36 md:px-10 md:pb-20 md:pt-44 pb-safe">
      <Reveal>
        <p className="text-meta text-taupe">Contact</p>
        <h1 className="mt-6 sm:mt-8 text-display text-cream">
          Let's
          <br />
          make
          <br />
          something.
        </h1>
      </Reveal>

      <div className="mt-14 sm:mt-24 grid gap-8 sm:gap-12 md:grid-cols-12 md:items-end">
        <Reveal delay={0.1} className="md:col-span-6">
          <a
            href="mailto:hello@1111pictures.com"
            className="text-h3 link-line inline-block text-sand"
          >
            hello@1111pictures.com
          </a>
          <p className="text-meta mt-4 sm:mt-6 text-taupe/70">
            Mumbai · Available worldwide
          </p>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-4 md:col-start-8">
          <ul className="flex flex-wrap gap-4 sm:flex-col sm:space-y-3 sm:gap-0">
            {socials.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-meta link-line text-cream/80 hover:text-cream"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3} className="hidden text-right md:col-span-1 md:col-start-12 md:block">
          <span className="text-h1 text-cream" aria-hidden="true">
            →
          </span>
        </Reveal>
      </div>
    </div>
  );
}
