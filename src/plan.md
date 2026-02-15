# My Projects Carousel Refactor Plan

## 1) Baseline + Audit (no code changes)
- Identify the render chain:
  - `MyProjects.tsx` (section frame / outer container)
  - `ProjectsCarousel.tsx` (carousel/slider layout)
  - `components/Card/Card.tsx` (project card UI)
- Inventory current glow sources:
  - `index.css`: `animate-shadow-glow`, `animate-liquid-glow`, `animate-text-glow`
  - Component classes: borders (`border-2 border-green-300`, `border-green-500/50`) + glow animations applied simultaneously
- Define the *target visual hierarchy*:
  - Strong header
  - Clear card separation (gap + min width)
  - Subtle card glow (drop-shadow) that doesn’t reduce text legibility
  - CTA button glow that intensifies on hover

## 2) Layout + Spacing (carousel feels polished, not a static grid)
- Update `MyProjects.tsx` section frame:
  - Keep content centered with `flex` + `justify-center` + `items-center`
  - Reduce border emphasis (avoid thick bright border around the whole section)
  - Prefer a subtle frame background and rely on the card glow for depth
- Update `ProjectsCarousel.tsx`:
  - Set the “My Projects” header to heavier weight (e.g., `font-extrabold`)
  - Increase spacing between cards to `gap-8` equivalent:
    - If using Swiper: set `spaceBetween={32}`
  - Ensure each slide/card has a `min-width` around `350px`:
    - Use Swiper `slidesPerView="auto"` + slide width classes like `!w-[350px]`
  - Center the carousel within the frame:
    - Use `mx-auto` + a consistent max width (`max-w-6xl` / `max-w-7xl`)

## 3) Card UI (refined glassmorphism + breathing room)
- Update `components/Card/Card.tsx`:
  - Increase internal padding to Tailwind scale (`p-6` or `p-8`)
  - Apply refined glassmorphism:
    - `bg-black/40`
    - `backdrop-blur-md`
  - Reduce border intensity:
    - Use a subtle border like `border border-green-500/20`
  - Apply card glow via **drop-shadow** (not border glow):
    - Use Tailwind arbitrary `drop-shadow-[...]` so glow doesn’t “fill” the background
  - Improve typography hierarchy:
    - Title stays bright and higher contrast
    - Description uses lower opacity (e.g., `text-green-100/70`) and comfortable line-height
  - Ensure tags don’t crowd edges:
    - Use consistent spacing (`mt-3`, `gap-2`, etc.) and avoid tight `p-1 m-1` stacking

## 4) CTA Button (box-shadow glow + hover intensification)
- Update “Project Link” anchor styles:
  - Use a **box-shadow** glow (Tailwind `shadow-[...]`) for the button
  - Add a hover state that intensifies glow and slightly lifts:
    - `hover:shadow-[...]`
    - `hover:-translate-y-0.5` (or `hover:scale-[1.02]`)
  - Add an accessible focus style:
    - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60`

## 5) Glow Optimization (reduce glow bleed, keep vibe)
- Refactor glow-related CSS in `index.css`:
  - Reduce radii and alpha in `shadow-glow` and `liquid-glow` keyframes
  - Keep glow subtle enough to avoid “bleeding” between adjacent cards
  - Ensure `prefers-reduced-motion` fallback remains intact
- Prefer component-level glow:
  - Cards: drop-shadow glow
  - Buttons: box-shadow glow
  - Avoid stacking multiple glow animations + thick borders simultaneously

## 6) Responsiveness + QA Checklist
- Verify min-width behavior:
  - Cards are never narrower than ~350px
  - On small screens, horizontal scroll/slider feels natural
- Verify spacing:
  - Card padding `p-6`/`p-8`
  - Between-cards spacing ~`gap-8`
- Verify legibility:
  - Title readable at a glance
  - Description intentionally quieter (`text-green-100/70`)
- Verify glow:
  - No overlapping/merging glows between adjacent cards
  - Hover glow on CTA is noticeable but not blinding
