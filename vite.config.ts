// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Detect if running in Vercel's build environment
const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    router: { entry: "router" },
    server: { entry: "server" },
  },
  // Force Nitro to output for Vercel Serverless Functions when deployed on Vercel.
  // Also externalize browser-only libraries so they don't execute on the Node.js SSR server.
  nitro: isVercel
    ? {
        preset: "vercel",
        externals: {
          // These packages access window/document at import time and must not run on the server
          inline: [],
          external: ["gsap", "gsap/ScrollTrigger", "lenis"],
        },
      }
    : true,
});
