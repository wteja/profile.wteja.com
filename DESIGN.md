# Design: wteja portfolio

World: a printed Thai produce sack. One panel, woodcut frame, two flat spot inks on kraft.

## Tokens (styles.css :root)
- Kraft ground `#dcc597`, kraft-deep `#cfb480`, cream `#efe3c4`
- Ink blue `#14213d` (text, rules, inked panel), rice red `#9a1c0c` (action, seal, accents)
- Contrast: ink on kraft 9.5:1, cream on ink 11.3:1, cream on red 5.3:1, red on kraft 4.7:1 (large or bold text only)
- Display: Bowlby One (self-hosted, uppercase, tracking -0.015em). Text: Public Sans variable 400-700 (self-hosted).
- Lines: 3px ink plate rules, 1px hairlines between rows. Frame: 3px outer border + 1px inset.
- Texture: faint SVG weave on the body ground.

## Components
- Seal: round red/cream emblem with ring text, rotated -7deg.
- Origin ticket: rubber-stamp label (3px border, 0.14em tracking, -2.5deg). Variants: freelance (red), team product (ink outline), open source (ink fill), retired (dashed).
- Manifest: packing-list rows, ticket | body | link, ruled.
- Ingredients: cream label box listing the stack in plain text.
- Plates: real screenshots of live client sites with 3px ink border.
- Band: full-width ink strip with letterspaced caps.
- Contact: inked panel, cream text, big email link.

## Motion
One moment: tickets stamp in (scale 1.5 to 1, rotate) as each row scrolls into view, via CSS scroll-driven animation. Off under prefers-reduced-motion and in browsers without support.

## Do not
Add kickers, section numbers, card grids, gradients, glass, extra colors, or logos. Never claim a project as solo work unless it was.
