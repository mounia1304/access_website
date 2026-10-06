# Access Transit website

Static rebuild of access-transit.com (Moroccan customs broker / freight forwarder) in Astro 7.
French is the default locale, English comes later. See `README.md` for the file map and phases.

## Commands

- `npm run dev` — dev server on port 4321 (`.claude/launch.json` name: `access-transit`)
- `npm run build` — production build into `dist/`; run it after template changes, it catches compile errors
- `npm run check:palette` — computes the contrast of every text/background pair from `tokens.css`
- `node scripts/make-hero-sky.mjs` — redraws the sky behind the first screen's picture (only to change it)

Restart the dev server after renaming tokens or classes across several components: it keeps serving
the old scoped CSS for some of them, which shows up as cards with no background or text in the wrong colour.

## Design rules

The client's own mockup of the first screen, `reference/maquette-premier-ecran-2.webp` (1785 x 881),
governs the look. The client asked for it to be reproduced exactly, colours included ("do not change the
colors"). The first screen is built to its measurements; the sections below it use the same colours,
type, cards and labels. Earlier references (cargowise.com, a Behance case study, a first mockup,
several palettes) no longer apply, except for what is listed under "Kept from the previous design".

### Colours

- `src/styles/tokens.css` is the only file with colour values (plus the `theme-color` meta in
  `Base.astro`, `public/favicon.svg` and `scripts/make-hero-sky.mjs`, which cannot read CSS variables).
  The "Palette" block holds the colours, measured on the mockup; the "Roles" blocks map them to uses;
  shades are `color-mix()` blends of those. Do not change the palette without the client asking.
- Components use role tokens only (`--c-accent`, `--c-panel`, `--c-tile`…), never a palette token, a hex
  value or a hue name.
- Where things get their colour: the page is a very pale blue-white; titles and the menu are navy
  (`--c-ink`), with the second half of each title in a lighter indigo (`--c-display`, large text only);
  paragraphs are slate; buttons, links, the logo and the footer are indigo (`--c-accent`); small coloured
  text and icons use a deeper indigo (`--c-label`); chips and the selected card are pale periwinkle
  (`--c-tint`), icon tiles and arrow discs a lighter mix (`--c-tile`), panels lighter still (`--c-panel`).
- Every coloured fill has a partner for the text it carries: `--c-accent` / `--c-on-accent`,
  `--c-feature` / `--c-on-feature`, `--c-soft` / `--c-on-soft`, `--c-dark` / `--c-on-dark`.
- Paragraphs sit on glows and tinted surfaces, and the slate is only just dark enough for them: after any
  colour change run `npm run check:palette`.
- axe-core does not catch contrast problems on this site: it leaves colour contrast "undecided" on
  `color-mix()` values and on glows. Measure on rendered pixels instead (text colour against the pixels
  behind it, from a screenshot taken with the text made transparent).

### Type and shapes

- One typeface, DM Sans (variable): 400 for paragraphs, 500 for titles, menu, buttons and labels, 550 for
  the hero title. La Belle Aurore (handwritten) is for the slogan only.
- Section titles are set in two colours, navy then lighter indigo:
  `<Title parts={['Découvrez', 'nos services']} />`. `stack` puts the two parts on two lines; a single
  string is set entirely in the lighter indigo.
- Above a title: `.eyebrow`, a small uppercase letter-spaced label followed by a short line. The hero's
  tagline is a `.chip`: a pale pill that starts with a dash.
- Buttons are indigo pills; a main action carries an arrow icon. Round white buttons (`.circle`) for
  slider arrows and pause.
- Cards (`.card`) are white with a pale hairline and a soft shadow, 22px corners. An icon sits in a
  rounded tile (`.icon-tile`); a small disc with an arrow (`.disc`) marks a card that leads somewhere.
  Panels that hold cards are pale (`--c-panel`) with 28 to 30px corners.
- Slanted shapes echo the logo: the hero's frame and its bars share `--slant`.
- No coloured section backgrounds: a section that needs presence gets a glow (`.glow`).
- Only use characters covered by the Latin subset of the fonts (no arrows like ⇄, no modifier letters like ᵉ),
  otherwise a second font file gets downloaded.

### Header and first screen

- A thin tinted top bar (phone, e-mail, city, FR/EN) scrolls away; the white menu bar under it is sticky.
  Logo left, then the menu at a set distance, quote button at the far end; the current page is indigo
  with a line under it. The bar gets lower and frosted over the first 200px of scrolling
  (`--header-h-top` to `--header-h`); the `<header>` itself keeps one height so the page never jumps.
- `Hero.astro` follows the mockup's measurements (all noted in the file): the message on the left
  (tagline chip, two-line title, text, button), the picture on the right, and under them a panel whose
  five cards are the slider's tabs, with two arrows.
- The picture is one composition placed in percentages of a "stage" box, so it scales as a whole: three
  slanted bars, the frame, the slogan. The frame's shape is an SVG clip path with rounded corners. The
  sky is cut to it; the client's cut-out is cut on the left and bottom only, so the ship's bow and the
  crane stick out on the right, as in the mockup.
- With the top bar and the menu, the hero fills exactly the first screen on large screens. Laptops
  (short, or narrower than 88em) get a lighter panel so that it still fits; below 64em everything stacks
  and the cards scroll sideways. Check 1785x881 against the mockup, and 1366x650, 1536x730, 1024x768
  and a phone, when touching it. The fifth message has the longest text.
- The picture is the same for the five messages; only the text changes.

### Movement

- Under the first screen, the route line (`RouteLine.astro`) crosses the page between sections and runs
  down the side margins, with dashes gliding along it at 100px per second. The logo conveyor and the band
  of figures (`Marquee.astro`) glide at about the same speed. Movement is slow, constant and linear:
  nothing bounces, flies in or plays on page load.
- Cards fade in as they enter the screen (`.reveal`), tied to the scrolling itself with
  `animation-timeline: view()`, inside `@supports`: other browsers simply show the cards.
- Everything that moves by itself must stop three ways: for `prefers-reduced-motion` (use `animation: none`
  there, because the global rule that shortens durations would make an endless animation flicker), when a
  pause button is pressed (`MotionToggle.astro` sets `data-motion="paused"` on `<html>`), and while off-screen.
- The hero slider and the testimonials do not auto-play (neither does the original). Both are tab lists;
  keep the keyboard, arrow and swipe controls working when changing them. `touch-action: pan-y` on the
  hero's message and picture stops browsers from treating a sideways swipe as "go back".

### Kept from the previous design

The mockup shows only the first screen, and the client asked not to change colours, so these stay:
the sky-blue testimonial card, the navy banner with its lanes, the pale-cyan route line, the indigo
footer, the conveyors and their pause buttons.

## Content rules

- The client asked for the new site to match the current one in content: same blocks in the same order,
  same wording, same menu, same figures, same slider messages. Only spelling, typography and stray
  English are corrected. Do not rewrite, add or drop copy, sections or figures without being asked.
- Exceptions that came with the mockup (all marked in `fr.ts`): the tagline, the slogan, the panel's
  label, title and sentence, and the longer first message. The hero button reads "En savoir plus";
  the service cards keep "Savoir plus".
- The mockup's cards show "Transport multimodal" and no "Transit en douane". The cards are the tabs of
  the five messages, so they carry the five real titles; multimodal transport is not a service of the
  current site and was not added. The client was told; add it only if they confirm it and supply its text.
- All visible French text lives in `src/i18n/fr.ts`; components contain no hard-coded copy.
- Company facts (phones, addresses, figures) come from the current site. Do not invent claims, numbers or services.
- French typography: non-breaking space before `: ; ! ?` (` `), narrow one in thousands (` `).
- Titles use normal French capitalisation ("Nos services"); the current site capitalises every word only through CSS.
- French URLs mirror the current WordPress URLs (`src/i18n/routes.ts`) to preserve links and rankings.

## Placeholders to replace

- **Logo**: `LogoSlot.astro` draws a stand-in mark. It is not the real logo; the client is still working
  on the brand. Swap in the real files when they arrive (also `public/favicon.svg`).
- **Photos**: the first screen uses the client's cut-out (`src/assets/photos/hero/transport.webp`) on a
  generated sky. The other photos are the current site's, to be replaced later. The old slider photos
  in `src/assets/photos/slides/` are no longer on the homepage; they are kept for the service pages.

## Conventions

- Component styles are scoped; use `:global()` to reach a child component's markup (icons, `<Image>`,
  `<Title>`, `<Marquee>`). A class passed to a child component is not matched by the parent's scoped styles.
- Shared pieces are global classes in `src/styles/global.css`: `.btn` (`--accent`, `--outline`, `--soft`,
  `--sm`), `.eyebrow`, `.chip`, `.mark`, `.circle`, `.icon-tile`, `.disc`, `.card` (+ `.card__link`),
  `.glow`, `.reveal`, `.section`, `.section-head` (+ `--center`), `.on-dark`, `.on-accent`, `.container`,
  `.container--wide`.
- Icons: add the Phosphor SVG import (regular weight) to `src/components/icons.ts`, then `<Icon name="…" />`.
- Photos go through `astro:assets` `<Image>`.
- Whole-card links use a stretched `::after` on the title link (`.card__link`), so the link's name stays short.
- To size something by the height it is given (the hero's stage), make its parent a size container and
  use `cqw` / `cqh`. Children of the stage use `cqw` for radii and font sizes so they scale with it.
- Radial gradients: keep the sizes as plain percentages. Chrome rejects `max()` or `calc()` that mixes
  percentages and lengths there, and the whole background then silently disappears.
- Anything drawn wider than the screen (glows, route lines) must be cut by its own box
  (`overflow-x: clip` or a clipping wrapper), or phones get a sideways scroll.
- When several slides share one grid cell, the cell takes the height of the longest: do not pin content
  to the bottom of the cell, or short slides get a gap in the middle.
- To reveal a bar or line, animate `clip-path: inset(...)` or `opacity`, not `transform: scale(0)`: a zero
  scale left half-drawn lines in Chrome.
- CSS grid: two items meant to overlap in one cell both need an explicit `grid-area` (a row alone puts the
  second one in a new column). A cell shared by several items needs `grid-template-columns: minmax(0, 1fr)`,
  or one wide item (a long button) stretches the page on phones. A `minmax(a, b)` column next to a `1fr`
  column grows to `b` first: give it a smaller `b` where the `1fr` column needs the room.
- Check layouts with viewport screenshots taken while scrolling. A "full page" capture resizes the page,
  which breaks the first screen and the scroll-tied fades.
- Not-yet-built pages fall through to `src/pages/404.astro`, which is a "page en préparation" screen for now.
