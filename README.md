# The Picture Show

11:11 PICTURES — CINEMATIC WEBSITE PRD

1. Product Vision
   Working title

11:11 Pictures — Digital Experience

Core idea

A cinematic digital home for stories, films, filmmakers and visual culture.

The website should feel less like a "company website" and more like entering a film archive / private screening room.

The user should experience:

Silence → curiosity → discovery → immersion → story

rather than:

Hero → cards → services → footer

2. Visual Direction

The supplied references establish three important visual characteristics.

Reference 01 — Cool cinematic palette

Dominant characteristics:

Slate blue
Desaturated blue-grey
Dusty mauve
Soft lavender-grey
Warm grey
Pale beige

This gives the interface an introspective / atmospheric feeling.

Reference 02 — Dark interior

This introduces:

Near-black
Espresso brown
Deep chocolate
Warm taupe
Muted cream
Amber
Warm skin tones

This should become the primary website environment.

Reference 03 — Sunset

This adds the emotional accent:

Burnt orange
Rust
Terracotta
Ochre
Cream
Warm amber
Deep red-brown

These shouldn't become UI colors everywhere.

They should primarily appear through photography, video, hover states and cinematic transitions.

3. Proposed Colour System

I'd avoid pure black + pure white.

Primary
Obsidian
#10100F

Deep Charcoal
#181715

Cinema Brown
#241D18

Warm Black
#0C0B0A
Secondary
Muted Slate
#565A61

Dusty Mauve
#777078

Warm Taupe
#8C7D70

Sand
#C8B7A3
Accent
Burnt Amber
#C8793D

Terracotta
#A94D2E

Warm Cream
#E8DED0
Light mode

If a light section is required:

Cinema White
#F3F0EA

Paper
#EAE5DC

Warm Grey
#C9C2B8
Rule

80% dark neutral
15% cinematic image/color
5% accent

The photographs should provide most of the colour.

4. Logo Treatment

The supplied logo is extremely minimal:

camera icon + 11:11 + pictures

That is an advantage.

Do not over-design it.

Primary logo

Warm cream on Obsidian:

11:11
pictures
Secondary

Black logo on Cinema White.

Animated logo intro

The logo can have a very subtle opening animation:

11 : 11

Numbers appear separately.

↓

The colon appears.

↓

Camera icon draws/fades in.

↓

pictures

appears with slight tracking.

↓

Everything settles.

Duration: ~1.2–1.5 sec

No flashy logo animation.

5. Website Experience
   PAGE 01 — LANDING / INTRO

The website should initially behave almost like a film.

Screen

Full viewport.

Dark background.

A cinematic image/video slowly emerges.

Logo centered.

               [camera]

               11:11
              pictures


                 ↓
             ENTER

The ENTER interaction should be subtle.

Once clicked:

camera shutter / soft film transition

into the main site.

On repeat visits, you can skip the intro.

6. HERO

The hero should be image-first, not text-first.

Example:

┌─────────────────────────────────────────────┐
│ 11:11 WORK ABOUT │
│ │
│ │
│ CINEMATIC │
│ IMAGE │
│ │
│ │
│ FILM / 01 EXPLORE → │
└─────────────────────────────────────────────┘

The image/video should occupy roughly:

75–90% of the viewport.

Text stays small.

This preserves the cinematic quality.

7. Hero Animation

The supplied video shows an important motion principle:

The interface doesn't aggressively animate everything.

Instead:

images move → layout changes → image becomes focus → typography appears → next scene

That's the direction I'd preserve.

Animation sequence
Initial
↓
Dark screen
↓
Image appears
↓
Image slowly scales
↓
Typography fades in
↓
Navigation becomes visible
↓
User scrolls
↓
Image shifts position
↓
Next visual enters

Use:

GSAP + ScrollTrigger

for this rather than dozens of independent CSS animations.

8. FILM / PROJECT DISCOVERY

This is the strongest part of the supplied reference video.

The video appears to transition between:

a large featured film
a horizontal collection of smaller images
selected image expanding
large editorial title
next film

That should become the website's primary browsing mechanism.

Desktop
FEATURED

      ┌──┐ ┌──┐ ┌───────────┐ ┌──┐ ┌──┐
      │  │ │  │ │           │ │  │ │  │
      │  │ │  │ │   FILM    │ │  │ │  │
      │  │ │ │ │           │ │  │ │  │
      └──┘ └──┘ └───────────┘ └──┘ └──┘

                ← DRAG / SCROLL →

When the user selects a film:

Transition
thumbnail
↓
expands
↓
fills viewport
↓
title appears
↓
metadata appears
↓
PLAY 9. Film Detail Page

This should be highly visual.

┌─────────────────────────────────────────────┐
│ │
│ FULLSCREEN IMAGE │
│ │
│ │
│ │
│ FILM / 2026 │
│ │
│ FILM TITLE │
│ │
│ Director · Year · Runtime │
│ │
│ [ PLAY FILM ] │
└─────────────────────────────────────────────┘

As the user scrolls:

Scene 01

Hero image.

Scene 02

Synopsis.

Scene 03

Behind the scenes.

Scene 04

Stills.

Scene 05

Credits.

Scene 06

Next film.

10. Signature Scroll Interaction

This should become the site's defining feature.

Instead of:

scroll
↓
new section
↓
new section
↓
new section

use:

SCROLL
↓
IMAGE MOVES
↓
IMAGE ROTATES SLIGHTLY
↓
CROPS CHANGE
↓
TYPOGRAPHY ENTERS
↓
IMAGE EXPANDS
↓
NEXT IMAGE REPLACES IT

The user feels like they're moving through film frames.

11. Image Transition System

The supplied video uses strong rectangular image compositions.

We should formalize them.

Transition A — Expansion
small image
↓
grows
↓
fullscreen
Transition B — Horizontal slide
IMAGE 01 → IMAGE 02 → IMAGE 03
Transition C — Perspective

Image starts slightly rotated:

       /
      /
     /

and settles:

────────
Transition D — Cropping

A full photograph gradually becomes a tight crop.

This is especially effective for portraits.

12. Typography

The typography should contrast the cinematic photography.

Headline

A modern grotesk / neo-grotesk.

Examples of direction:

Helvetica Now
Neue Haas Grotesk
Inter Tight
Söhne-style type
Suisse-style type
Secondary

Use a restrained serif or handwritten/script only where necessary.

The supplied "pictures" logo has a handwritten character.

Keep that personality in the brand.

Typography hierarchy
DISPLAY
72–160px

H1
64–96px

H2
42–64px

H3
24–32px

BODY
16–18px

META
10–13px

On mobile, scale aggressively.

13. About Section

Avoid a boring:

"We are a production company founded in..."

Instead:

WE MAKE
PICTURES.

Stories that remain
after the screen goes dark.

Then a cinematic sequence of:

director
camera
location
actors
production
final frame

The text should appear between imagery, not in a large block.

14. The "Archive"

This could be one of the most beautiful sections.

A black screen containing hundreds of tiny film stills.

              ARCHIVE

▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪

             11:11

Hovering a frame:

it grows.

Click:

entire film/project opens.

This creates a feeling of a private visual archive.

15. Services / Capabilities

If 11:11 Pictures provides production services, don't use six generic cards.

Instead:

01 — DEVELOPMENT

02 — PRE-PRODUCTION

03 — PRODUCTION

04 — POST-PRODUCTION

05 — COMMERCIAL

06 — MUSIC / VISUALS

On hover:

The corresponding image replaces the background.

Example:

PRODUCTION

hover →

background changes to a production still.

16. Contact

Minimal.

LET'S
MAKE
SOMETHING.

hello@1111pictures.com

Instagram
Vimeo
YouTube

                 →

No giant contact form unless operationally necessary.

17. Motion Design Specification

I'd create this as a separate document from the PRD.

Motion principles

01 — Slow

Cinematic movements should generally feel deliberate.

02 — Inertia

Images should not stop abruptly.

03 — Spatial continuity

Elements should appear to travel from somewhere rather than simply fade in.

04 — Scale

Use scale to establish importance.

05 — Masking

Use image masks extensively.

06 — Silence

Not every section needs motion.

18. Animation Timing
    Micro
    150–250ms

Buttons, icons, hover.

UI
350–600ms

Menus, overlays, navigation.

Image transitions
700–1200ms
Cinematic transitions
1200–2500ms
Hero sequences
2000–4000ms

The easing should generally be:

custom cubic-bezier / power-based easing

rather than default browser easing.

19. Cursor

Desktop can have a custom cursor.

Normal:

○

Over image:

PLAY

Over project:

VIEW

Over draggable gallery:

← DRAG →

Keep it tiny.

Do not turn it into a gimmicky giant circle everywhere.

20. Sound

Optional but potentially powerful.

Default:

Muted.

If the user explicitly enters the cinematic experience:

SOUND OFF

could become:

SOUND ON

Ambient sound should never autoplay unexpectedly.

21. Responsive Design
    Desktop

The full cinematic experience.

horizontal galleries
large typography
cursor interactions
WebGL/advanced effects
Tablet

Reduce:

particle effects
3D
simultaneous animations
Mobile

The website should not simply shrink the desktop version.

Use:

Vertical film cards
↓
Swipe
↓
Fullscreen image
↓
Story
↓
Next

And reduce expensive visual effects.

22. Technical Architecture

For this experience I'd use:

Next.js
│
├── React
├── TypeScript
├── Tailwind
│
├── GSAP
│ └── ScrollTrigger
│
├── Lenis
│ └── smooth scrolling
│
├── Framer Motion
│ └── UI micro-interactions
│
└── Three.js
└── only where genuinely useful
Media

Use a proper media pipeline:

Original Video
↓
Transcoding
↓
WebM / MP4
↓
Multiple resolutions
↓
Lazy loading
↓
Adaptive playback

Don't serve a 4K production video to every mobile visitor.

23. CMS

The content team should be able to create a new project without touching code.

Project model
Project
│
├── Title
├── Slug
├── Year
├── Category
├── Director
├── Producer
├── Description
├── Hero Video
├── Hero Image
├── Gallery
├── Trailer
├── Credits
├── Awards
├── External Links
└── Featured

This makes the site scalable.

24. SEO

Despite the cinematic nature, the underlying site needs conventional SEO.

Every project should have:

unique title
meta description
OG image
structured data where applicable
canonical URL
semantic headings
transcript/copy where appropriate
optimized images
accessible navigation

The animations should enhance the content, not contain the content exclusively.

25. Performance Requirements

This is critical.

Targets
LCP < 2.5s
CLS < 0.1
INP < 200ms

And:

60 FPS target on modern desktop hardware.

Animations should degrade gracefully.

High-end
↓
Full cinematic experience

Mid-range
↓
Reduced particles / effects

Mobile
↓
Simplified transitions

Reduced Motion
↓
Minimal movement 26. Proposed Sitemap
/
│
├── /films
│ ├── /film-name
│ ├── /film-name
│ └── /film-name
│
├── /commercials
│
├── /projects
│
├── /archive
│
├── /about
│
├── /services
│
└── /contact

If the company is also intended to be a crowdfunding/investment platform, don't mix this information architecture with the film-production structure. In that case, the cinematic visual system can remain, but the IA should instead center around Discover → Project → Investment → Portfolio → Account.

27. The Core Experience

The entire website should essentially feel like this:

                  11:11
                PICTURES

                     ↓

              ENTER THE FRAME

                     ↓

          ┌──────────────────┐
          │                  │
          │   CINEMATIC      │
          │      HERO        │
          │                  │
          └──────────────────┘

                     ↓

                 STORIES

                     ↓

        ┌─ ─ ─ ─ ─ ─ ─ ─ ─┐
        │ FILM COLLECTION  │
        └─ ─ ─ ─ ─ ─ ─ ─ ─┘

                     ↓

             SELECT A FILM

                     ↓

        IMAGE → EXPANDS → FULLSCREEN

                     ↓

                  STORY

                     ↓

                 ARCHIVE

                     ↓

                 ABOUT

                     ↓

               LET'S MAKE
              SOMETHING.

Most important design decision

I would not try to make every section "stunning."

That's actually the fastest way to make the site look amateurish.

Instead, establish 3–4 signature moments:

Cinematic entrance
Hero → film transition
Immersive horizontal/scroll film gallery
Archive / final cinematic sequence

Everything else should become comparatively quiet.

That contrast is what will make the animated sections feel expensive.

Recommended project documentation

For this particular website, the production folder should be:

11:11 PICTURES
│
├── 01_BRAND
│ ├── Logo Guidelines
│ ├── Colour System
│ └── Typography
│
├── 02_PRODUCT
│ ├── PRD
│ ├── Sitemap
│ ├── User Flows
│ └── Content Architecture
│
├── 03_UX_UI
│ ├── UX Specification
│ ├── UI Design System
│ ├── Figma
│ └── Responsive Specification
│
├── 04_MOTION
│ ├── Motion Design Specification
│ ├── Scroll Animation Map
│ ├── Transition Library
│ └── Interaction Specification
│
├── 05_TECHNICAL
│ ├── TRD
│ ├── Architecture
│ ├── CMS Schema
│ ├── Media Pipeline
│ └── API Specification
│
├── 06_DEVELOPMENT
│ ├── Development Plan
│ ├── Component Architecture
│ └── Coding Standards
│
├── 07_QA
│ ├── Test Plan
│ ├── Browser Matrix
│ ├── Animation QA
│ └── Performance QA
│
└── 08_LAUNCH
├── SEO
├── Deployment
├── Analytics
└── Launch Checklist

The Motion Design Specification + Scroll Animation Map are the two documents I'd add beyond the usual PRD/TRD for this project. The supplied video is effectively the starting reference for those documents.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kinetic-cinematics.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/065dbd05-6caf-4fab-bfd9-7244f5934443).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
