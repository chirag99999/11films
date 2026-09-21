import { createFileRoute, Link } from "@tanstack/react-router";
import { stills } from "@/data/films";
import { Reveal } from "@/components/Reveal";
import { ScrollFrames, Frame } from "@/components/ScrollFrames";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

const aboutFrames: Frame[] = [
  {
    src: stills.crew,
    eyebrow: "01 — Director",
    title: "Someone who knows what to leave out.",
  },
  {
    src: stills.rooftop,
    eyebrow: "02 — Camera",
    title: "We wait for the light. It usually comes.",
  },
  {
    src: stills.coast,
    eyebrow: "03 — Location",
    title: "Places that behave like characters.",
  },
  {
    src: stills.dance,
    eyebrow: "04 — Actors",
    title: "Faces that can be watched for a very long time.",
  },
  {
    src: stills.corridor,
    eyebrow: "05 — Production",
    title: "Small crews. Long days. No noise.",
  },
  {
    src: stills.interior,
    eyebrow: "06 — Final frame",
    title: "The one that stays.",
  },
];

const values = [
  [
    "Slow",
    "Cinematic movement is deliberate. So is ours. We take on few projects and give each one the time it needs.",
  ],
  [
    "Quiet",
    "Not every scene needs music. Not every frame needs motion. Silence is part of the grammar.",
  ],
  [
    "Close",
    "Small crews, long relationships. The same cinematographer has shot our last four films.",
  ],
] as const;

function AboutComponent() {
  return (
    <div>
      <section className="flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <Reveal>
          <p className="text-meta text-taupe">About</p>
          <h1 className="mt-8 text-display text-cream">
            We make
            <br />
            pictures.
          </h1>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 md:ml-[50%]">
          <p className="text-body-lg max-w-md text-cream/70">
            Stories that remain after the screen goes dark. A small production house in Mumbai
            making features, shorts, commercials and music films — slowly, and with people we
            trust.
          </p>
        </Reveal>
      </section>

      <ScrollFrames frames={aboutFrames} />

      <section className="px-5 py-32 md:px-10 md:py-48">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-meta text-taupe">How we work</p>
          </Reveal>
          <div className="space-y-16 md:col-span-6 md:col-start-6">
            {values.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <h2 className="text-h2 text-cream">{title}</h2>
                <p className="text-body-lg mt-4 max-w-lg text-cream/65">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-32">
          <Link to="/services" className="text-meta link-line text-sand">
            What we can do for you →
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
