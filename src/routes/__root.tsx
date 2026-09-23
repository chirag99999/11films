import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  Link,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Logo, BrandLogo } from "@/components/Logo";
import { Cursor } from "@/components/Cursor";
import styles from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "11:11 Pictures — Films, stories and the people who make them" },
      {
        name: "description",
        content:
          "11:11 Pictures is a film production house. Enter the frame: features, shorts, commercials and music films, made slowly and with care.",
      },
      { name: "theme-color", content: "#10100F" },
      { property: "og:title", content: "11:11 Pictures" },
      {
        property: "og:description",
        content: "Stories that remain after the screen goes dark.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Homemade+Apple&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

const navLinks = [
  { to: "/films", label: "Work" },
  { to: "/archive", label: "Archive" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  return (
    <header
      id="site-nav"
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10 md:py-7"
    >
      <Link
        to="/"
        aria-label="11:11 Pictures — home"
        className="flex items-center gap-3 text-cream"
      >
        <Logo className="h-6 w-auto" />
        <span className="font-script text-base italic leading-none">11:11</span>
      </Link>
      <nav className="flex items-center gap-5 md:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-meta link-line text-cream/80 transition-colors hover:text-cream"
            activeProps={{ className: "text-meta link-line text-cream" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <BrandLogo className="items-start text-cream" />
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-meta text-taupe">
          <Link to="/films" className="link-line hover:text-cream">
            Work
          </Link>
          <Link to="/services" className="link-line hover:text-cream">
            Services
          </Link>
          <Link to="/archive" className="link-line hover:text-cream">
            Archive
          </Link>
          <Link to="/about" className="link-line hover:text-cream">
            About
          </Link>
          <Link to="/contact" className="link-line hover:text-cream">
            Contact
          </Link>
        </div>
        <p className="text-meta text-taupe/70">© 2026 11:11 Pictures</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
      let animationFrameId: number;
      function raf(time: number) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);
      cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        lenis.destroy();
      };
    }).catch(() => {/* ignore SSR / unsupported */});

    return () => cleanup?.();
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Cursor />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
