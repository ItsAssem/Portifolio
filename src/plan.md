# My Projects Carousel Refactor Plan

## Phase 0) Baseline + audit (no visual changes)
- Identify the render chain:
  - `MyProjects.tsx` (section frame / outer container)
  - `ProjectsCarousel.tsx` (carousel/slider layout)
  - `components/Card/Card.tsx` (project card UI)
- Inventory current glow sources:
  - `index.css`: `animate-shadow-glow`, `animate-liquid-glow`, `animate-text-glow`
  - Component classes: borders + glow animations stacked together
- Confirm the target outcomes:
  - Clear spacing inside cards (no cramped edges)
  - More readable text (titles pop, descriptions quieter)
  - Glows are controlled (no bleed between cards)
  - Carousel feels like a slider (not a static grid)

## Phase 1) Typography + internal spacing (smallest change)
**Goal:** Improve hierarchy and readability without changing glow style yet.

- `ProjectsCarousel.tsx`
  - Make the “My Projects” header heavier (e.g., `font-extrabold`).
  - Increase spacing under the header (e.g., `mb-8`).
- `components/Card/Card.tsx`
  - Increase internal padding to `p-6` (or `p-8`).
  - Make project description lower emphasis: `text-green-100/70`.
  - Add consistent spacing between title / tags / description / CTA.

**Checkpoint:**
- Card content has breathing room.
- Titles read first; descriptions feel secondary.

## Phase 2) Carousel spacing + sizing (make it feel like a slider)
**Goal:** Increase separation between cards and prevent cramped widths.

- `ProjectsCarousel.tsx`
  - Increase between-card spacing to the `gap-8` equivalent:
    - Swiper: set `spaceBetween={32}`.
  - Ensure each card has min width ~`350px`:
    - Option A: set min width on the card (`min-w-[350px]`).
    - Option B: Swiper `slidesPerView="auto"` and give slides fixed widths.
  - Ensure shadows/glows are not clipped:
    - Avoid `overflow-hidden` on wrappers that should show glow.

**Checkpoint:**
- Cards don’t feel packed.
- On small screens, horizontal scrolling/slider behavior feels natural.

## Phase 3) Glow + glassmorphism refinement (largest perceived change)
**Goal:** Reduce glow bleed and refine the “glass” look.

- `components/Card/Card.tsx`
  - Add refined glassmorphism:
    - `bg-black/40` + `backdrop-blur-md`.
  - Soften borders (lower opacity / thinner look).
  - Use a controlled card glow:
    - Prefer **drop-shadow** glow instead of heavy animated border glow.
- CTA button (“Project Link”)
  - Use a **box-shadow** glow.
  - Add hover state that intensifies glow + subtle lift.
  - Add `focus-visible` ring.
- `index.css`
  - Tone down global glow animations (lower alpha/spread) so adjacent cards don’t merge.

**Checkpoint:**
- Glows feel separated and don’t wash over the text.
- Cards stand out from the background without needing loud borders.

## QA checklist (run after each phase)
- Spacing:
  - Card padding is `p-6`/`p-8`.
  - Between-card spacing reads like `gap-8`.
- Typography:
  - Header weight increased.
  - Description uses lower emphasis (`text-green-100/70`).
- Responsiveness:
  - Min width ~350px is respected.
  - Mobile is scroll/slider-friendly.
- Glow:
  - No glow bleed between cards.
  - CTA hover reads as a clear call-to-action.
