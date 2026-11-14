# Design: wteja portfolio

World: a dark studio-gallery portfolio in the Awwwards tradition — near-black canvas, oversized display type, one electric accent, rich but disciplined motion. Real project screenshots and clearly attributed work carry the credibility.

## Tokens (styles.css :root)
- Void `#0b0b0c` background, surface `#141416`, bone `#f2f0ea` type, muted `#a3a099` supporting text.
- Accent lime `#c8f04a`, used only for actions, numerals and highlights; black-on-lime for primary buttons.
- Hairline rules `#26262a`; film-grain SVG overlay at 7% opacity.
- Display: Space Grotesk (variable 300–700, self-hosted, uppercase hero, tight letter-spacing). Body: Public Sans (self-hosted).

## Components
- Header: sticky, blurred, name mark with lime dot + section nav.
- Hero: eyebrow role line, two-line giant name with per-line mask reveal, lede, lime "Email me" action, framed featured client screenshot with tab switcher (Mongolia.travel / SMK Steel / Mekong Moments).
- Marquee band: lime, uppercase services/location ticker (duplicated for the loop; screen readers get a static line).
- Work index: numbered rows (01–04) — number, name, honest description, attribution chip, outbound link, arrow. Hover: surface wash, lime number/arrow.
- Plates gallery: pinned horizontal scroll on desktop (GSAP ScrollTrigger), native overflow scroll on touch/mobile; client screenshots with stack captions, capture-date disclaimer and retired-sites note.
- How I work: Build / Run / Lead list with lime rules; sticky tools card with tag chips.
- Writing: bordered statement link to Medium.
- Contact: giant display question, huge lime email link with fill-on-hover, socials.
- Footer: copyright + location.

## Motion (motion.js, self-hosted GSAP + ScrollTrigger + Lenis in /vendor/)
- Lenis smooth scroll on fine-pointer desktops only; anchor links routed through it.
- Hero load timeline: masked title lines stagger up, then eyebrow/lede/actions/stage fade-rise.
- ScrollTrigger.batch reveals per section; soft parallax on the hero screenshot; pinned horizontal plates gallery (≥900px, fine pointer).
- Featured screenshot swap replays a clip-path wipe.
- All animated initial states are set from JS, so the page is fully visible without JavaScript.

## Accessibility
- WCAG AA contrast (bone/lime on void pass; muted text `#a3a099` ≥ 4.5:1).
- `prefers-reduced-motion` disables Lenis, marquee animation, parallax, pinning and transitions; content never depends on animation.
- Skip link, visible lime focus rings, real alt text, aria-pressed tabs, aria-live caption, static sr-only marquee equivalent.

## Do not
Do not invent project outcomes or claim team work as solo work. Keep the site static (no build step) and preserve keyboard access.
