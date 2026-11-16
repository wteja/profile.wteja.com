# Design: wteja portfolio

World: a printed editorial index, not a dark developer portfolio. Warm paper, black ink,
one spot colour, a numbered contents structure, and oversized display type that mixes a
grotesk with an italic serif. Motion is rich but always in service of the information:
it reveals the page, previews the work, and never delays reading.

## Tokens (styles.css :root)
- Paper `#F3EFE6` canvas, paper-2 `#E7E1D4` for panels and hover washes, ink `#14130F` type.
- Muted `#5F5B52` supporting text (5.9:1 on paper). Accent spot ink `#B3350F` (5.3:1 on paper) for numerals, roles, links and the progress line.
- Hairline rules `rgba(20,19,15,.16)`, strong rules `.34`; film grain at 5.5% with multiply blend.
- Display: Space Grotesk (self-hosted variable). Italic serif: Instrument Serif (self-hosted). Body: Public Sans. Metadata: system monospace, uppercase, letter-spaced.

## Structure
Numbered sections: 01 Selected work · 02 Earlier client sites · 03 How I work · 04 Writing · 05 Contact.
Sticky bar (name, role, section nav with scrollspy, live Chiang Mai clock) and a 2px accent
scroll-progress line.

## Components
- Masthead: rule + kicker, two-line title (grotesk `WEERAYUT` over italic serif `Teja.`), lede + actions on the left, a four-row `facts` table (Now / Builds / Runs / Enquiries) on the right.
- Ink ticker: full-bleed band of real facts (years, disciplines, location), duplicated for the loop; static text for screen readers.
- Work: two columns. Left, a sticky preview panel that swaps between project images and two typographic "specimen" cards (iTrend is behind a login; open source has no screenshot). Right, an index of four rows: number, name, honest description, role / stack / URL meta column, arrow.
- Earlier client sites: horizontal plate gallery, pinned and scrubbed on desktop, native scroll-snap on touch. Paper-framed screenshots with mono captions, a capture-date disclaimer and a Retired note.
- How I work: Build / Run / Lead list with italic roman numerals, beside a tools table in label/value rows.
- Writing: full-width statement row linking to Medium.
- Contact: display question, oversized italic-serif email with an accent underline that draws on hover, mono social links.
- Footer: copyright, location, local time.

## Motion (motion.js, self-hosted GSAP + ScrollTrigger + Lenis in /vendor/)
- Load: masked title lines rise (yPercent 112 → 0, 1.15s, power3.out, 0.1 stagger), then kicker, lede, actions, facts and ticker fade-rise.
- Work preview: hovering or focusing a row activates its frame with a clip-path wipe from the right plus a 1.06 → 1 image scale; the caption swaps with it. Rows are keyboard-focusable, so the preview is not mouse-only.
- Scroll: ScrollTrigger.batch reveals (y 26 → 0, 0.85s, 0.06 stagger) for section heads, rows, plates and contact blocks.
- Pinned horizontal gallery via `gsap.matchMedia("(min-width: 900px)")`: the band pins for its travel distance and the plates scrub sideways; the band is `100svh` so no empty spacer shows while pinned.
- Lenis smooth scroll on fine-pointer desktops only; anchor links routed through it.
- Scrollspy marks the current section in the nav with an accent rule.

## Accessibility
- WCAG AA contrast: ink on paper 16.2:1, muted 5.9:1, accent 5.3:1.
- `prefers-reduced-motion` disables Lenis, the ticker animation, pinning, reveals and transitions; the progress line stays inert.
- All animated initial states are applied from JS, so with JavaScript disabled the page renders fully visible and static; the clock is hidden until JS fills it.
- Skip link, visible accent focus rings, real alt text, `aria-hidden` on the decorative preview panel, `sr-only` "opens in a new tab" cues.

## Do not
Do not invent project outcomes, screenshots or metrics, and do not claim team work as solo work.
Keep the site static (no build step). Keep motion decorative: never gate content on a
loader, an animation or a CDN. Never show a fabricated preview — a project without a
screenshot gets a typographic card that says why.
