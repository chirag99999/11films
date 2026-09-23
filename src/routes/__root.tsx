import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  Link,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo, BrandLogo } from "@/components/Logo";
import { Cursor } from "@/components/Cursor";
import styles from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close menu automatically on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <>
      <header
        id="site-nav"
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10 md:py-7 transition-all duration-300"
      >
        <Link
          to="/"
          aria-label="11:11 Pictures — home"
          className="flex items-center gap-2.5 sm:gap-3 text-cream focus:outline-none"
        >
          <Logo className="h-5 w-auto sm:h-6" />
          <span className="font-script text-sm sm:text-base italic leading-none">11:11</span>
        </Link>

        {/* Desktop & Tablet Navigation */}
        <nav className="hidden items-center gap-6 md:flex md:gap-8">
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

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-cream/20 bg-warm-black/60 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-cream/50 md:hidden"
        >
          <span className="text-meta text-[0.625rem] text-cream">
            {menuOpen ? "CLOSE" : "MENU"}
          </span>
          <span className="flex h-2.5 w-3 flex-col justify-between">
            <span
              className={`block h-[1.5px] w-full bg-cream transition-transform duration-300 ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-cream transition-transform duration-300 ${
                menuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </header>

      {/* Cinematic Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between bg-warm-black/95 px-6 pb-safe pt-24 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-cinema)] md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="text-meta text-sand/60">Navigation</p>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-border/60 py-3 text-h2 text-cream transition-colors active:text-sand"
              >
                <span>{link.label}</span>
                <span className="font-mono text-meta text-taupe">0{idx + 1}</span>
              </Link>
            ))}
            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline justify-between border-b border-border/60 py-3 text-h2 text-cream transition-colors active:text-sand"
            >
              <span>Services</span>
              <span className="font-mono text-meta text-taupe">05</span>
            </Link>
          </nav>
        </div>

        <div className="border-t border-border pt-6 pb-4">
          <p className="text-meta text-taupe">Film inquiries</p>
          <a
            href="mailto:hello@1111pictures.com"
            className="text-h3 mt-2 inline-block text-sand hover:underline"
          >
            hello@1111pictures.com
          </a>
          <p className="text-meta mt-4 text-taupe/60">Mumbai · Worldwide</p>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 md:px-10 md:py-12 pb-safe">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <BrandLogo className="items-start text-cream" />
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-meta text-taupe sm:gap-x-8">
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let lenisInstance: any;
    let tickerCallback: ((time: number) => void) | undefined;
    let resizeCleanup: (() => void) | undefined;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])
      .then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          lerp: 0.08,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.25,
          infinite: false,
        });
        lenisInstance = lenis;

        // Synchronize ScrollTrigger with Lenis
        lenis.on("scroll", ScrollTrigger.update);

        tickerCallback = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        const handleResize = () => {
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        resizeCleanup = () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("orientationchange", handleResize);
        };
      })
      .catch(() => {
        /* ignore SSR / unsupported */
      });

    return () => {
      resizeCleanup?.();
      if (tickerCallback) {
        import("gsap")
          .then(({ default: gsap }) => {
            gsap.ticker.remove(tickerCallback!);
          })
          .catch(() => {});
      }
      lenisInstance?.destroy();
    };
  }, []);

  // Smooth reset scroll position on route transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
