# Access Transit website

Static rebuild of access-transit.com (Moroccan customs broker / freight forwarder) in Astro 7.
French is the default locale, English comes later. See `README.md` for the file map and phases.

## Commands

- `npm run dev` — dev server on port 4321 (`.claude/launch.json` name: `access-transit`)
- `npm run build` — production build into `dist/`; run it after template changes, it catches compile errors
- `npm run check:palette` — computes the contrast of every text/background pair from `tokens.css`
- `node scripts/make-hero-scene.mjs` — widens the first screen's photograph to the framing of its mockup
  (only if the client sends a new photograph)
- `node scripts/make-reason-icons.mjs` — cuts the icons of the "Pourquoi choisir" containers out of the
  client's picture (only if the client sends a new one)
- `node scripts/make-logo.mjs` — trims the client's logo file and makes the favicon from its "A" (only when
  the client sends a new logo)
- `node scripts/make-chevron-trail.mjs` — redraws the trail of chevrons that runs between sections, and the
  guillemet of the testimonials, which is made of the same chevron (only to change them)

Restart the dev server after renaming tokens or classes across several components: it keeps serving
the old scoped CSS for some of them, which shows up as cards with no background or text in the wrong colour.
The same happened after each style edit in `About.astro`: if a change does not show, restart it.

## Design rules

The client's own mockups govern the layout. The first screen follows their third mockup of it,
`reference/maquette-premier-ecran-3.webp` (1717 x 916), which replaced the earlier ones
(`maquette-premier-ecran.webp`, `maquette-premier-ecran-2.webp`: kept for the record, no longer
followed). The sections below it use the same type and labels. The mockups are drawn in indigo and violet: the client has since asked for the
two colours of their logo across the whole site instead (see "Colours"), so follow the mockups for
shapes and measures, not for colour. Earlier references (cargowise.com, a Behance case study, a first mockup,
several palettes) no longer apply, except for what is listed under "Kept from the previous design".

The second screen ("Présentation de l'entreprise") has its own mockup from the client,
`reference/maquette-deuxieme-ecran.webp` (1944 x 809), also to be reproduced exactly: see "Second screen".
The third ("Découvrez nos services") had one too, `reference/maquette-troisieme-ecran.webp` (1921 x 819):
its label, title and background shapes still follow it, but its cards were redesigned at the client's
request, see "Third screen". The fourth ("Pourquoi choisir") and the fifth ("Avis de nos clients") have
no mockup: the client asked for designs an expert would make, each around one idea, see "Fourth screen"
and "Fifth screen". The mockups are pictures: where their lettering is garbled (the third one reads
"NOS MÉTIEPS"), the site's own text stands.

### Colours

- `src/styles/tokens.css` is the only file with colour values (plus the `theme-color` meta in
  `Base.astro` and `scripts/make-logo.mjs`, which cannot read CSS variables).
  The "Palette" block holds the colours; the "Roles" blocks map them to uses; shades are `color-mix()`
  blends of those. Do not change the palette without the client asking.
- The palette is the client's logo: its blue ("Corporate Blue", `#164b9a`) and its orange ("Vibrant
  Orange", `#f47721`), the two values the client gave, plus the ends of the gradients the logo draws
  them in (measured on the logo file). The client asked for them "and their gradients" in place of the
  purple, on the whole site. Blue does what the indigo did; orange is the second colour (second half
  of titles, thin strokes, the light on the chevrons, the strong slanted bars); gradients go on fills
  (`--g-accent` on buttons, `--g-accent-deep` on the footer and the main e-service tile, `--g-dark` on
  the banner, `--g-bar` on the orange bars), lighter at the top and deeper at the foot, as in the logo.
- The logo's orange is too light to read as text (2.8:1 on the page). Titles use a deeper shade of it
  (`--c-display`, which passes 3:1 on the page and on glows); the plain orange (`--c-stroke`,
  `--c-trail-light`, `--g-bar`) is for strokes, lights and bars only. Never set small text in orange.
- A gradient cannot fade into another: for a hover on a gradient fill, lay a veil over it (an inset
  `box-shadow`, as `.btn--accent` does) instead of changing the background.
- Components use role tokens only (`--c-accent`, `--c-panel`, `--c-tile`…), never a palette token, a hex
  value or a hue name.
- Where things get their colour: the page is a very pale blue-white; titles and the menu are navy
  (`--c-ink`), with the second half of each title in orange (`--c-display`, large text only);
  paragraphs are slate; buttons, links and the footer are blue (`--c-accent`); small coloured
  text and icons use a deeper blue (`--c-label`), or a brighter one (`--c-label-soft`: the second
  screen's tag and signature, small numbers); chips and the selected card are very pale blue
  (`--c-tint`), icon tiles and arrow discs a lighter mix (`--c-tile`), panels lighter still (`--c-panel`).
- Every coloured fill has a partner for the text it carries: `--c-accent` / `--c-on-accent`,
  `--c-soft` / `--c-on-soft`, `--c-dark` / `--c-on-dark`.
- Paragraphs sit on glows and tinted surfaces, and the slate is only just dark enough for them: after any
  colour change run `npm run check:palette`.
- axe-core does not catch contrast problems on this site: it leaves colour contrast "undecided" on
  `color-mix()` values and on glows. Measure on rendered pixels instead (text colour against the pixels
  behind it, from a screenshot taken with the text made transparent).

### Type and shapes

- One typeface, DM Sans (variable): 400 for paragraphs, 500 for titles, menu, buttons and labels, 800 for
  the hero title, 700 for the second screen's tag, title and motto and for the third screen's label and
  title (as in their mockups). There is no handwritten face any more: La Belle Aurore set the second
  screen's slogan, which the client asked to remove (2026-10-15); the first screen's slogan is DM Sans.
- TEXT SIZES. The client found the texts too small, first in the menu bar, then everywhere else:
  every small text is 25% larger than the mockups set it (15% at first, then 22%, then 25%: menu, buttons, labels, paragraphs, card
  titles, names, the footer: the `--fs-…` tokens from `--fs-h3` down, and the sizes written in the
  components). The large titles, the big figures and the quotes kept their size. Do not bring a
  text back to its mockup size; when adding a text, take a token or a neighbour's size. In the menu
  bar the gaps close up faster on laptops to make the room (see `Header.astro`): at 1280 wide
  there is nothing left to give, so measure the bar before adding a word to it. On the first
  screen the button and the play link sit closer for the same reason, and their smallest sizes
  were kept lower than 25%.
- Section titles are set in two colours, navy then orange:
  `<Title parts={['Découvrez', 'nos services']} />`. `stack` puts the two parts on two lines; a single
  string is set entirely in orange.
- Above a title: `.eyebrow`, a small uppercase letter-spaced label followed by a short line. The second
  screen's tag is a `.chip`: a pale pill that starts with a dash.
- Buttons are blue pills (a gradient); a main action carries an arrow icon. Round white buttons (`.circle`) for
  slider arrows and pause.
- Cards (`.card`) are white with a pale hairline and a soft shadow, 22px corners. An icon sits in a
  rounded tile (`.icon-tile`); a small disc with an arrow (`.disc`) marks a card that leads somewhere.
  Panels that hold cards are pale (`--c-panel`) with 28 to 30px corners.
- Slanted shapes: the bars and strokes of the second, third and fourth screens share `--slant`; the
  panes of the first screen lean about the same way (their corners are measured on its mockup).
- No coloured section backgrounds: a section that needs presence gets a glow (`.glow`). The second and
  third screens have the pale shapes of their mockups instead (the third keeps its glow under 80em).
- Only use characters covered by the Latin subset of the fonts (no arrows like ⇄, no modifier letters like ᵉ),
  otherwise a second font file gets downloaded.

### Header and first screen

- The menu is a rounded bar of frosted glass that floats over the page, a little below the top of the
  screen (`Header.astro`): logo, menu, FR/EN, quote button. The menu is the current site's, except
  that "Blog" became "Actualités" (see "Actualités"). There is no top bar any more (the third
  mockup has none): the phone, the e-mail and the city are in the mobile menu, the contact block and the
  footer. Once the page scrolls the bar docks, at the client's request (text showed above it and round
  it): it runs the whole width from the very top of the screen, solid white with a hairline under it.
  It keeps its height (`--bar-h-low` is `--bar-h`, 60px at least): it used to get lower, to 60px,
  and the client asked for it bigger. One number drives it, `--dock` (0 floating, 1 docked), tied
  to the first 160px of scrolling where browsers can (a class at 48px elsewhere, and for reduced
  motion); the logo, the menu and the button keep their place on the screen meanwhile (the padding
  grows as the margins go). The first screen at rest is unchanged. The `<header>` itself keeps one
  height so the page never jumps. `--header-h` is what the docked bar hides at the top of the
  screen (its height): use it for sticky tops and scroll margins.
- The first screen is pulled up under the menu (`margin-top: calc(-1 * var(--header-h-top))`), so the
  photograph shows through the glass. Other pages simply start below it.
- `Hero.astro` follows the third mockup: one wide photograph across the screen; over it a pale pane on
  the left, which carries the message (tagline, two-line title in extra-bold, text, button, a round
  "play" link to the second screen), a dark tint and a darker pane in the
  top right corner, which carry the slogan; an orange-then-blue line along the pale pane's edge. A white
  panel with a leaning left side overlaps the photograph's foot: its label, title and link, then four
  cards with small pictures.
- On large screens (64em and up) it is a poster: every measure is in `cqw` of the screen's width
  (17.17px on the mockup), so the whole screen scales with the width; small texts have floors. The
  panes are SVG clip paths whose corners are the mockup's px (`roundedShape()`). Under 64em the
  photograph is a band at the top and everything stacks; between 64em and 87em the label of the play
  link is only read out, because it would run into the picture's slanted edge.
- The photograph is the client's (`photos/hero/port.webp`). The mockup shows it at 74% of the screen's
  width, with more sky and sea around it: `scripts/make-hero-scene.mjs` adds those margins by mirroring
  the photograph's edges (`port-scene.webp`), which puts the lorry, the ship and the plane where the
  mockup has them. Run it again if the photograph changes.
- It shows one message: the first of the current site's slider ("Transit en douane"). The numbers
  01 to 05 that chose among the five were removed at the client's request (2026-10-15), and the
  slider with them; the five messages are still in `fr.ts`. The four cards are plain links to the
  pages (road, sea, air, ISO), as on the mockup; customs clearance has no card, it is the message.
- The small pictures on the cards (`photos/hero/cards/`): the lorry, the ship and the plane are the
  client's own (supplied with a transparent ground; only trimmed and reduced to 340px high). The
  client asked for these three a quarter smaller than the cards' pictures are by default
  (`scale: 0.75` in `Hero.astro`). The ISO shield is the client's too, 5% smaller (`scale: 0.95`).
- Texts lie over the photograph, which `check:palette` cannot see. They were measured on rendered
  pixels (a screenshot with the texts made transparent, each text's colour against the pixels in its
  box) at 1717, 1366 and 1024 wide: all pass 4.5:1. That is why the paragraph uses `--c-text-strong`
  and the other numbers a navy at 78%, and why the orange word (`--g-display`) is deeper than the
  mockup's: its lightest stop is the lightest that still reaches 3:1 there. Measure again after
  changing the panes, the photograph or these colours.
- A gradient text (`background-clip: text`) is cut at its line box: the orange word has a little
  bottom padding (and the same negative margin) so that descenders are not cut.
- Check 1717x916 against the mockup (`previews/comparaison-maquette.jpg`), then 1920, 1536, 1366,
  1280, 1024, a tablet and a phone; scroll, to see the lowered bar and an open sub-menu.

### Second screen

- `About.astro` follows `reference/maquette-deuxieme-ecran.webp`: on the left a tag (the chip, in
  capitals), the two-line title, the two paragraphs, a hairline, the motto, then the portrait, name and
  signature; on the right the picture. Measures are in `cqw` of a block capped at the mockup's width
  (1cqw = 19.44px there), with floors on text sizes, so the screen scales as a whole.
- The picture is a "stage" (1000 x 676 on the mockup) whose pieces are placed in percentages: a pale
  slab, the frame (an SVG clip path with seven rounded corners), a pane of glass at its top left, two
  strong bars and two pale ones with round ends, three thin strokes. (The mockup's handwritten slogan
  in its top right corner was removed at the client's request, 2026-10-15.) Bars and strokes are
  rotated by `--slant`.
- Inside the frame plays the client's film (`photos/presentation/transport.mp4`, 1280 x 720, 8 seconds,
  no sound). The client asked for the frame to stay exactly as it is and to hide part of the film: the
  film fills the frame's height and `object-position` (in `.about__cut`) decides what the frame hides.
  The right end fades away; the glass is a veil of the page's colour over the film.
- Under the film lies its first image (`transport.webp`): it shows until the film plays, and at the end
  the film dissolves into it before starting again, so the loop has no jump (no `loop` attribute).
  Make that image again from the film's first frame if the film is replaced.
- The signature is the real one, used as a CSS mask so it takes `--c-label-soft`; the stroke under it
  is drawn. The mockup's own signature is only an approximation of it.
- Two pale shapes sit in the right-hand corners of the screen (a bar coming down from the first screen,
  a rising shape that fades out under the block). They show from 64em up, like the stacked layout below it.
- Check 1944 wide against the mockup (`previews/comparaison-maquette-2.jpg`), then 1536, 1366, 1024,
  a tablet and a phone. (The first paragraph had four lines at 1944, as in the mockup; it runs to
  five since the texts were made larger at the client's request.)

### Third screen

- `Services.astro`. Its label (between two short lines), its two-line title and its pale background
  shapes follow `reference/maquette-troisieme-ecran.webp`. Its cards do not any more: after the
  testimonials were redesigned, the client asked for this screen to be remade "the same way", to look
  made by an expert. Do not go back to the mockup's tilted cards.
- The idea comes from the trade. The four services are four lanes side by side, leaning 7 degrees
  (`--skew`). One route runs through them at the same height in each (`LEVEL` in the file), so that
  it reads as a single line across the row: it passes a seal with a tick in the customs lane, is the
  dashed centre line of a road in the second, takes off and lands in the third, rides waves in the
  fourth. In the customs lane it passes a checkpoint (a ring round a point, on a dotted border): not a
  seal with a tick, which is the lane's icon. The shapes are short SVG paths in `ROUTES`, drawn far beyond their box so that they reach
  the lane's edges at any width (`preserveAspectRatio` keeps their proportions; the lane cuts them).
- A lane's state is one variable, `--on` (1 while it is pointed at or its link has the keyboard's
  focus). From it: the lane lifts and grows a little, a blue "tide" rises behind its text
  (`.lane__tide`, a `clip-path` whose top is slanted; texts turn white), its number turns orange, and
  a light travels along its stretch of the route (`pathLength="100"`, so the dash and its speed are
  the same on every shape). The light only runs while the lane is on, and not at all for
  `prefers-reduced-motion`.
- Two wishes of the client still hold from the first version: the four are the same size at rest and
  never touch, and the one pointed at is the only one that looks larger. The gaps are wider than what
  a lifted lane gains; check that again after changing the gaps, the lean or the growth.
- The lanes arrive one after the other as the row scrolls in (`lane-arrive`, with a later
  `animation-range` per lane). It replaces `.reveal`'s own rise, which would undo the lean on the way:
  an element with a transform of its own needs its own entrance keyframes.
- The icon of each lane is drawn for the site (`ServiceIcon.astro`, shapes in `serviceIcons.ts`). The
  client first supplied glass tiles with gradients (`reference/icones-services-client.webp`), then
  found them "generated by AI" once in place and asked for icons "created by an expert UI". Do not
  bring back glass, gradients or soft shadows in icons.
- The four are one family on one grid (64 by 64, a line of 2, round ends), in three layers: a pale
  fill printed a little off its outline (`--c-print`), the outline in blue, and a mark in orange for
  what the thing does (the seal that clears the file, the lorry's speed, the plane's trail, the swell).
  The header of `serviceIcons.ts` gives the rules: follow them when adding an icon.
- While the lane is on (`--on`), the outline lifts off its fill and the orange mark is wiped and drawn
  again, once. That is done without keyframes: each mark path is one dash as long as itself
  (`pathLength="1"`) and the pattern slides by two lengths, which ends on the same picture, so going
  back to rest takes no time and does not show.
- The link in each title covers its whole lane (`.card__link`, raised above the texts).
- Four across from 80em, leaning; two across from 40em and one below, upright.
- Check 1921, 1536, 1366 and 1280 wide, then 1024, a tablet and a phone; point at each lane.

### Fourth screen

- `Why.astro` has no mockup. It was first built with the tilted cards the third screen had then, down a
  rail of chevrons. After the testimonials and the services were redesigned around one idea each, the
  client asked for the same here ("do better work… as an expert ui"), keeping their icons. Do not go
  back to cards down a rail.
- The idea: the four reasons are four containers stacked on a quay, each in a colour of the palette
  (blue, pale blue, the logo's orange, navy), held from above by a crane's spreader. The title stands
  on the left. Texts are unchanged.
- A container (`.box`) is drawn in an oblique view: the element is its front, which carries the text;
  `::before` is its top (a strip `--d` high, `skewX(-45deg)`) and `::after` its end (`--d` wide,
  `skewY(-45deg)`). Its ribs, rails and corner posts are layered gradients. Higher boxes are painted
  over lower ones (`z-index` from `--i`), which hides a box's top under the box standing on it,
  except where the two are out of line (`--shift`): that is what makes it read as a stack.
- Its colours are roles in `tokens.css` (`--c-box-…`: front, top, end). Paragraphs lie on these fills:
  `check:palette` has a line for each. On the orange one, title and paragraph are both navy: nothing
  lighter passes there, and white on that orange does not either.
- Pointing at a box pulls it out of the stack towards the title (`--pull`): the top of the box under it
  shows. Each box is pushed into place from the right as it enters the screen (`box-arrive`, tied to
  the scrolling). Neither plays for `prefers-reduced-motion`.
- The crane is part of the first box (it moves with it): four wire ropes that hang straight, in an SVG
  that stretches with the box, and a spreader drawn with gradients. Ropes that meet at a point above
  the box read as a coat hanger: keep them straight.
- The icons are the client's own (`src/assets/reasons/`, cut out of `icons-source.webp` by
  `scripts/make-reason-icons.mjs`): glass tiles the client asked to keep here. Their cut-outs are only
  right over white, so each sits on a white label (`.box__label`). That picture also showed cards with
  shortened texts: only the icons were taken.
- Title and stack side by side from 80em (the stack is never wider than 58rem, or the boxes get too
  long to look like containers). The title starts level with the top box and is sticky, because the
  stack is taller than short laptop screens; on screens 54em high or more it is level with the stack's
  middle instead. Under 80em the title is above; under 40em the icon and the number share a first row
  and the text runs under them.
- Under the stack are the four key figures. They were a band of giant numbers gliding by; the client
  asked for them to stand still, all four in view at once ("creative as an expert UI"). A first answer
  painted them on the hull of a ship lying at the quay; the client turned it down: "i didn't like that
  boat, i wanted just the numbers". Do not make them glide or count up, and do not put them in a scene
  or on an object again: here the design is the typography.
- So they are just the numbers (`.figures`, inside the block): large numerals in the blue gradient of
  the logo's lettering (`--g-figure`, for very large text only), each starting with a thin orange stroke
  on `--slant`, its label and small icon under it. A pale print of the numerals sits a little off them
  (a `drop-shadow` filter, because `text-shadow` paints over a gradient text): the same idea as the
  drawn icons of the services. The label comes first in the markup (`dt`), the number first on screen.
- From 48em the four are in one row, each as wide as its number, the room left shared between them
  (the first starts under the title, the last ends under the stack's right edge); a label never makes
  its figure wider, it runs on under it. Below 48em they are two by two.
- Pointing at a figure lets its pale print slip a little further out; the strokes are drawn from their
  foot up as the row enters the screen (`figure-stroke`, tied to the scrolling). The numbers never move.
- Check 1921x1000, 1536x800, 1366x650 and 1280 wide, then 1024, a tablet and a phone; point at a box
  and at a figure.

### Fifth screen

- `Testimonials.astro` has no mockup. A first version (a tilted quote card and a
  list of names with initials) was turned down by the client as looking "AI generated": they asked for
  something an expert designer would make, and creative. Do not go back to a plain card beside a list.
- The design takes its idea from the trade. The testimonials are a pile of sheets, like papers on a
  customs desk: the top one is read, the next two show under it. A large French opening quotation
  mark sits astride the pile's corner, drawn with the site's own double chevron (a guillemet is one:
  `chevron-guillemet.svg`, made by `scripts/make-chevron-trail.mjs`, used as a mask over `--g-bar`).
  A round stamp in one ink, like a customs stamp, carries the sheet's number.
- Each sheet has `--pos` (0 on top); its place, turn, shade, edge colour, opacity and layer are all
  worked out from it in CSS. Moving on slides the top sheet away to the left, then under the pile
  (`quote-leave`); coming back slides it in again (`quote-enter`); the stamp is pressed again
  (`stamp-press`, no bounce). These only play when the visitor asks for another sheet, never by
  themselves, and not at all for `prefers-reduced-motion`.
- The five names on the left, down a line, are the tab list (click, arrow keys, Home and End); the
  arrows under the pile and a sideways swipe change the sheet too. Keep all of them working.
- The sheets share one grid cell, so the pile keeps the height of the longest testimonial.
- Texts, names and roles are the current site's: no ratings, photos or companies were added. The words
  round the stamp are the section's label and the company's name.
- It replaced a sky-blue card: `--c-feature` and its partners are gone.

### Dark banner

- `BigNumber.astro`: the "30 900 opérations" figure, on the one dark banner of the page. The client
  liked its animation (five lanes that come in from the right, take a bend together and leave at the
  bottom, a light running along each) and asked for the banner to be redesigned with that animation
  kept, "just improved". Keep the lanes, their bend and their lights.
- A light is several dashes on the same lane that all end at the same point, its head: the longer the
  dash, the fainter (`LIGHT` in the file), which makes a tail that fades away; then a halo and the
  head. `lane-travel` takes the head from one end of the lane to the other whatever the length of the
  dash. Three lights are orange (`--c-dark-light`, as on the trails of chevrons), two sky blue
  (`--c-dark-lane`, the colour they all had). The speed is constant, as everywhere.
- The lanes are drawn from the right, one after the other, as the banner enters the screen. Parts of
  an SVG cannot be timed on their own passage through the screen: the banner names its own
  (`view-timeline: --banner`) and the lanes use that.
- The lights stop the usual three ways: off screen (the script), when a pause button is pressed, and
  for `prefers-reduced-motion`, where each rests part of the way along its lane (`--rest`).
- The figure is set like the key figures of the fourth screen: bold numerals after the thin orange
  stroke, here white (a little bluer at the foot, `--g-dark-figure`) over a blue print of themselves
  (`--c-dark-print`). A glow lies in the hollow of the bend (`--c-dark-glow`).
- The banner is as wide as the screens above it (the same `cqw` block), in line with their titles
  from 80em. Under 52em the lanes are small, in the bottom right corner behind the text.
- Check 1921, 1536, a short laptop screen (about 1420x560, which is what the client's screenshots
  show), 1024, a tablet and a phone; scroll the banner in to see the lanes drawn.

### Online services

- `EServices.astro` has no mockup. It was three cards in a row with an icon tile each; the client asked
  for it to be redesigned like the screens above. Do not go back to three cards.
- The idea: these are things to press, so they are the site's own buttons (pills), made very large.
  Each is a long round-ended bar: a white knob with its icon, its name, a dotted line, an arrow in a
  disc. The three step down the block on `--slant` (`--step`), like the round-ended bars of the second
  screen. The quote request, the main action, is full (blue) from the start; the other two are pale.
- A pill has two variables: `--on` (pointed at, or its link has the keyboard's focus) drives what
  moves; `--lit` (full: always 1 on the main one) drives the colours. The fill (`.pill__fill`) is cut
  down to a disc behind the knob at rest, which shows as a blue ring round it, and runs to the end of
  the pill when it is on, like a bar that loads. On the main pill a light veil comes over it instead.
- The icons are drawn for the site, in the family of the service icons (`serviceIcons.ts`: a
  calculator, a route to a pin, a message with its point). Their orange mark is drawn again when the
  pill is on. They lie on the white knobs: do not put them straight on the blue.
- The link in each name covers its whole pill (`.card__link`). The pills come in from the right as the
  block scrolls in (`pill-arrive`).
- A pill is a component, `PillLink.astro`: the page that asks which quote is wanted shows three more.
  The list that holds pills sets their measures through variables (`--h`, `--step`, `--pill-…`: see
  the head of the file); a class of the list is not matched inside the component.
- Title on the left and pills on the right from 80em (one grid cell, both with a `grid-area`); title
  above from there down; no step and no dotted line under 48em.
- Check 1921, 1536, 1420x560, 1024, a tablet and a phone; point at the second and third pills.

### Inner pages

- The client asked for "the buttons that don't work yet" to work: every link of the menu, the
  homepage and the footer now leads to a page. Their content is the current site's, page for page
  (read from access-transit.com), with spelling, capitals and typography corrected. Their texts are
  in `src/i18n/fr.pages.ts` (`t.pages`), not in `fr.ts`.
- Pages: the four services (`pages/services/[service].astro`), the quote request (a choice of three
  kinds, then one form per kind: `pages/e-services/demander-une-cotation/`), tracking, complaints,
  the quality policy, the company's presentation (see below), the blog (see "Blog"), the news (see
  "Actualités"), and contact. Addresses are those of the current site, except the news pages and the
  presentation (new).
- They share: `PageHead.astro` (the trail, an optional label, the `h1` in the two colours of the
  homepage's titles), `ServiceAside.astro` (the four trades, the two presentations, a help card),
  `Assurances.astro` (the three commitments that close most pages of the current site),
  `RequestForm.astro` (a form drawn from a list of fields) and `Prose.astro` (running text from a
  list of blocks). They are laid out in `.wrap` / `.wrap__in`, which is the block of the homepage's
  screens (1921px at most, `cqw`, the same margins); lists in running text start with the thin
  orange stroke (`.prose`).
- FORMS DO NOT SEND ANYTHING YET. Each shows a notice saying so when its button is pressed
  (`contact.form.demo`); they are to be wired to e-mail delivery in phase 4. Do not tell the client
  they work. The contact block of the homepage uses the same form component.
- Where the current site is wrong or empty, it was not copied: the "Cotation de transport national"
  page is empty there (here it sends to the contact page until the client says what it should
  hold); its contact page shows a map of another country (the homepage's map is used there
  instead); a link in the quality policy
  leads to another company's site (left out). The scan of the signed quality policy and the picture
  of the article are not here: files are only downloaded with the client's go-ahead.
- The quality policy page opens on the company's certificate, at the director's request ("clear, so the
  client trusts the company"): the TÜV Rheinland ISO 9001:2015 mark supplied by the client
  (`src/assets/quality/tuv-iso9001.png`), whole and unchanged (TÜV asks for that: never crop or
  recolour it), beside what it certifies and a button to the certificate on TÜV Rheinland's register
  (`site.certificate`, Certipedia, where its QR code leads). The facts are the register's.
- The map (`LocationMap.astro`) is Google's map of the company, the same embed as on the current
  site's homepage (`site.map`); the client asked for it. It closes the homepage, after the contact
  block, and the contact page. It is fetched from Google only when the visitor scrolls near it.
  Google's card gives the address as "126 Bd Moulay Slimane", the site as "126 Avenue Ambassadeur
  Ben Aicha": the site's wording is the current site's and was not changed.
- The two "presentations" are the company's files on Google Drive, as on the current site. Both are
  pages now, made at the client's request from their two PDFs (eleven PowerPoint slides of January
  2023 each) and laid out like a service page ("do you see the Transit en douane page design… i want
  it as the page", then "same work for the english version"): `/presentation-de-l-entreprise/`
  (`reference/presentation-entreprise.pdf`) and `/en/company-presentation/`
  (`reference/company-presentation-en.pdf`). One component draws both, `CompanyPresentation.astro`
  (the text column and the side column); the pages (`pages/presentation-de-l-entreprise.astro`,
  `pages/en/company-presentation.astro`) add the head and the three commitments. Texts:
  `presentation` in `fr.pages.ts` and in `en.pages.ts`, both of the shape `PresentationText`.
  The "Documents" column leads to the pages; on each page it offers that page's PDF (`docs[].page`
  and `.pdf` in `fr.pages.ts`); the news page's press corner keeps the files. The homepage's
  second screen links to the French page ("En savoir plus", `about.more`).
- The English page is the site's one English page until the English site is built (phase 3): its
  route is `presentationEn` among the French routes, its address is under `/en/` where that site
  will live. The menu, the side column, the three commitments and the footer round it are the
  French site's; its own text (title, summary, parts, motto) is marked `lang="en"` (`lang` on
  `PageHead` and on the component). Its transport cards lead to the French service pages.
  Anchors are made from each part's name (`slugify`): #nos-references, #our-portfolio.
- Each page's text is its PDF's, spelling and typography corrected (listed in the comments above
  `presentation` in `fr.pages.ts` and `en.pages.ts`): its summary, then six parts numbered in outline as on the quality
  page (who we are, services with three cards to the transport pages, skills, references, addresses,
  the general manager), then the motto of its last slide. Its pictures are the site's where the PDF
  shows the same ones smaller (the film's first image, the service photographs, the current TÜV mark,
  the homepage's logos); three logos (Ines, Amiyas Import, an orange and green "A" whose name the PDF
  does not give: empty alt until the client says) and the general manager's portrait were cut out of
  the PDF. Its drawings of people and its "Merci" slide (an employee's Gmail address) are not used.
  It shows the general manager's own mobile numbers, Gmail address and LinkedIn, as the PDF does;
  the contact page still says "Coordonnées à venir" for him: the client is to confirm both. Its
  measures follow the width of its text column (a container, `presentation`): the logos are three,
  then five across (fifteen fill the rows); the transport cards are stacked, then three across.
- The menu marks the page on screen (`aria-current`), and the group it belongs to (`data-current`
  on the buttons "Nos services" and "E-services").
- The contact page: the team is the director's own diagram (sent as a picture, "look exactly like this"),
  in `TeamDiagram.astro`: the general manager in the middle over a blue plate, his number and address in
  a box under it, two hairline orbits round him; seven cards round him, each with a round photo facing
  the middle, the icon of the trade in a small square, name, role, number and address, and a line from
  its photo to the orbit (the two lower cards: into the box under him, see below). The picture's green became the logo's orange (cards at the top and on the
  right), its blue stayed (cards on the left). It replaced the grid of the current site's six people:
  those not in the diagram are gone, at the director's request.
- A first version copied the picture's finish too (gradient discs with white rims, glows, capitals, a
  bar under each name, tinted gradient cards); the client found it "AI generated" and asked for the
  same design "as created by an expert UI designer". Keep the layout, keep the finish quiet: white cards
  with a hairline, names as on the current site (family name in capitals), thin rings, flat icons inside
  the cards, no glow. Colour only says whose card it is; pointing at a card colours its line and edge.
- From 80em it is a stage in the picture's proportions (1536 by 1100, the rows a little further apart
  than in the picture because the site's lettering is wider), everything placed in the picture's px
  (`--u`, `PLACES`); a card's line belongs to the card and is aimed at the middle from its place, so it
  stays on the photo when the card grows. The orbit's foot is hidden by his plate and box, so the
  two lower lines run into that box and end behind it (`BOX_FOOT`), at the client's request (they
  had stopped on the outer orbit, which looked unconnected). Below 80em the cards are a list (two columns from 44em; on
  phones the photo is above the text). Check 1920, 1536, 1366 and 1280 (no two cards may touch), a
  tablet and a phone.
- No photos yet: each frame shows the person's initials until the client sends them. The picture's
  numbers and addresses are samples (all "@societe.ma", numbers running 12 34 56 78) and are not used:
  where the current site gives a person's real ones they are shown, elsewhere "Coordonnées à venir"
  (null in `fr.pages.ts`).
- As the page opens the general manager appears and the cards come out one after the other (large
  screens; on small ones each card comes up as it is scrolled to): the one place where something
  plays as a page opens, the client asked for animation on this page.
- Check a service page, a quote form, tracking, the quality policy and contact at 1536, 1024 and a
  phone; after touching a link or a route, follow every link of the site (all must answer 200).

### Blog

- The director wants the blog to be one of the important pages, carrying the company's information as
  well as its articles. Its plan was approved by the client: the categories, an author on each
  article, no photos yet, no newsletter, no writing page or sign-in. The company's news have since
  left it for the Actualités page (the client's decision): four categories remain. The client writes the articles
  themselves, in code: keep adding one a matter of copying a file.
- Each article is a Markdown file in `src/content/blog/` (collection in `src/content.config.ts`),
  whose name is its address: articles live at the root of the site, as on the current one
  (`pages/[article].astro`). `_modele-article.md` is the template (files starting with "_" are not
  published); README.md, "Writing an article", says how. Its fields are checked at build time:
  category, author and service are lists, and a wrong value stops the build with the right ones.
- Categories: keys, icons and colours in `src/data/blog.ts`, names and descriptions in
  `t.pages.blog.categories`. Their pages are `/category/<key>/` (`import-export` is the current
  site's address). Authors are the people of the contact page, by their `key` in `fr.pages.ts`; an
  article without an author is signed ACCESS TRANSIT (the logo's "A" stands for a photo).
- The blog's first page opens on the article "À la une" (`featured: true`, or the newest) beside
  "Access Transit en bref" (the about paragraph, "Depuis 2010", the certificate and its link, the key
  figures `why.stats`, quote and contact); then the category pills and the other articles, nine to a
  page (`/blog/2/`…), then the help band. An article page: category, title, author, date and reading
  time; its picture; its text beside a column with the summary (from three `##` intertitles) and the
  share buttons (LinkedIn, WhatsApp, copy link); its author; the service it leads to (`service`) or
  help offered; three related articles. It tells search engines it is an article (`og:type`,
  BlogPosting data, `og:image` from its cover).
- Until an article has a photo (`cover`), `BlogCover.astro` shows its category's drawn icon on a pale
  ground with the thin orange stroke, lower than a photo would be (`--cover-ratio-empty`). The finish
  is the quiet one the client accepts (no box round the cards, hairlines, the orange stroke as the one
  accent): keep it.
- Check the blog at 1420 and on a phone with one article and with several (add a temporary article
  file, with an author and three `##`, then delete it), and a category page without articles.

### Actualités

- The director wanted a news page "as the big companies" have. `pages/actualites/index.astro`: the
  notices to clients kept at the top (`pinned: true`, type `avis-clients`), "À la une" (the newest)
  beside the three next ones, all the news by year with a filter by kind (a small script; without it
  everything shows and the filter is hidden), and the press corner (contact, logo to download, the
  presentations, the certificate's page, LinkedIn). Each item has its page, `/actualites/<file>/`
  (`pages/actualites/[slug].astro`): kind, title, date, picture if any, text, share buttons, three
  other news items.
- Each news item is a Markdown file in `src/content/actualites/` (collection `actualites` in
  `content.config.ts`, template `_modele-actualite.md`, README "Writing a news item"). The kinds are
  `src/data/actualites.ts` (`entreprise`, `avis-clients`, `evenements`, `certifications`; each with
  a drawn icon, two of them drawn for this page: `entreprise`, `calendrier`), their names
  `t.pages.actualites.types`.
- The list's pieces are `NewsItem.astro` (lead, row, compact); the picture, the text and the share
  buttons are shared with the blog (`BlogCover`, `ArticleText`, `ShareLinks`).
- There is no news yet: the page shows "Les premières actualités paraîtront ici." and the press corner.
  The director is asked for the first items and the press contact in
  `informations-logistique-et-actualites.xlsx` (kept out of git: `.git/info/exclude`).
- In the menu, "Blog" became "Actualités", a small menu with the Actualités page and the blog (the
  client's decision): there is no room in the bar for one more item. The longer word took the bar's
  last room: its gaps and the distance from the logo close up more, the carets are smaller, and
  between 80em and 86em the menu's text is 15px (instead of 16.25px) and the quote button narrower.
  At least 15px must stay before FR/EN at every width: measure 1280, 1366, 1376, 1420, 1536 and 1920.
- Still to come (approved): a "Dernières actualités" block on the homepage, once this page is
  approved; and the Logistique part, once the director has filled in the Excel file.

### Movement

- Between the sections under the second screen runs the trail of chevrons (`ChevronTrail.astro`): pairs
  of the logo's chevron, one after the other across the page, with a step that leans like the logo
  (`--slant`) and a light gliding along it at 100px per second. It comes from the left and from the right
  in turn. It is the site's own design: the client asked for it in place of an earlier line with
  travelling dashes, which had been taken from another website. Do not bring that line back.
- The drawing is a stencil (`src/assets/decor/chevron-trail.svg`, used as a CSS mask) made by
  `scripts/make-chevron-trail.mjs`; its colours are `--c-trail` and `--c-trail-light`.
- The logo conveyor (`Marquee.astro`) glides at about the same speed. Movement is slow, constant and
  linear: nothing bounces, flies in or plays on page load (one exception, asked for by the client:
  the cards of the contact page, see "Inner pages"). The key figures used to glide the same way;
  the client asked for them to stand still (see "Fourth screen").
- On the third and fourth screens the lanes, the containers and the strokes of the key figures arrive
  with the scrolling, not by themselves: they need no pause button.
- Cards fade in as they enter the screen (`.reveal`), tied to the scrolling itself with
  `animation-timeline: view()`, inside `@supports`: other browsers simply show the cards.
- Everything that moves by itself must stop three ways: for `prefers-reduced-motion` (use `animation: none`
  there, because the global rule that shortens durations would make an endless animation flicker), when a
  pause button is pressed (`MotionToggle.astro` sets `data-motion="paused"` on `<html>`), and while off-screen.
- The film of the second screen follows the same three rules, in the script of `About.astro`: it is
  fetched and played only while its frame is on screen, stops when a pause button is pressed, and never
  plays for `prefers-reduced-motion` (the still stays).
- The testimonials do not auto-play (neither did the current site's slider). They are a tab list:
  keep the keyboard, arrow and swipe controls working when changing them.

### Kept from the previous design

These came before the mockups and stay: the navy banner with its lanes (in a gradient towards the
logo's deep blue; redesigned since, its animation kept at the client's request: see "Dark banner"),
the footer in the accent colour, the logo conveyor and its pause button. The sky blue is still the
colour of the banner's lanes and the pale cyan that of the second button.

## Content rules

- The client asked for the new site to match the current one in content: same blocks in the same order,
  same wording, same menu, same figures, same slider messages. Only spelling, typography and stray
  English are corrected. Do not rewrite, add or drop copy, sections or figures without being asked.
- Exceptions that came with the mockups (all marked in `fr.ts`): the tagline, the slogan, the panel's
  label and title, its link ("Découvrir tous nos services"), the play link ("Notre savoir-faire"), and
  the longer first message. The hero button reads "En savoir plus"; the service cards keep "Savoir
  plus". The second mockup repeats the slogan beside its picture; the client had it removed there.
- The third mockup changed the sentences of three services (douane, routier, aérien). They were
  taken over, with "une acheminement" corrected to "un acheminement"; the current site's sentences are
  kept in a comment above them in `fr.ts`, should the client want them back.
- An earlier mockup showed a "Transport multimodal" card. It is not a service of the current site and
  was not added; the third mockup no longer shows it.
- All visible French text lives in `src/i18n/fr.ts` (homepage and shared layout) and
  `src/i18n/fr.pages.ts` (inner pages, reached as `t.pages`); components contain no hard-coded copy.
  The only English text so far is the English presentation's, in `src/i18n/en.pages.ts`.
- Company facts (phones, addresses, figures) come from the current site. Do not invent claims, numbers or services.
- French typography: non-breaking space before `: ; ! ?` (` `), narrow one in thousands (` `).
- Titles use normal French capitalisation ("Nos services"); the current site capitalises every word only through CSS.
- French URLs mirror the current WordPress URLs (`src/i18n/routes.ts`) to preserve links and rankings.

## Placeholders to replace

- **Logo**: no longer a placeholder. `Logo.astro` shows the client's own logo (blue and orange, with
  gradients; `src/assets/brand/logo-source.webp`, trimmed into `logo.png` by `scripts/make-logo.mjs`),
  in the header and the mobile menu. The client asked for it to be used exactly as supplied:
  do not redraw or recolour it. The footer had it on a white plate (`<Logo plate />`); the client
  asked for it to be removed from there (2026-10-15). It is sized by its height (`--logo-h`). In the header its box keeps
  the width of the earlier stand-in, so that the menu stays where the first mockup puts it.
  The favicon (`public/favicon.png`) is the logo's "A" on a white rounded square.
- **Chevrons and slant**: the double chevron of the trails and of the testimonials' guillemet, and
  `--slant`, came from the stand-in logo that was there before. They are not in the client's logo
  (the chevron is still on the lorry's container in the pictures). They stay until the client says
  otherwise; where the files say "the logo's chevron" or "the slant of the logo", read it that way.
- **Photos**: the first screen uses the client's photograph of the port (see "Header and first screen");
  three of the small pictures on its cards are the client's too (the ISO badge is cut out of the
  mockup). The second screen shows the client's film (see "Second screen"); it is not the picture
  of the mockup, which was never supplied as a file. The other photos are the current site's, to be
  replaced later.
  `photos/entreprise.jpg` (the previous picture of the second screen) and the old slider photos in
  `src/assets/photos/slides/` are no longer on the homepage; the latter are kept for the service pages.

## Conventions

- Component styles are scoped; use `:global()` to reach a child component's markup (icons, `<Image>`,
  `<Title>`, `<Marquee>`). A class passed to a child component is not matched by the parent's scoped styles.
- Shared pieces are global classes in `src/styles/global.css`: `.btn` (`--accent`, `--outline`, `--soft`,
  `--sm`), `.eyebrow` (+ `--lines`: between two short lines), `.chip`, `.mark`, `.circle`, `.icon-tile`,
  `.disc`, `.card` (+ `.card__link`), `.glow`, `.reveal`,
  `.section`, `.section-head` (+ `--center`), `.on-dark`, `.on-accent`, `.container`, `.container--wide`;
  for the inner pages `.wrap` (+ `.wrap__in`), `.page-body`, `.page-cols`, `.split`, `.lead`, `.prose`,
  and the forms (`.form`, `.form__row`, `.field`, `.form__status`).
- Icons: add the Phosphor SVG import (regular weight) to `src/components/icons.ts`, then `<Icon name="…" />`.
  Two exceptions: `play-solid` (fill weight), and `customs-file`, drawn by hand after the third mockup
  (the customs service's icon in the menus). These are the small icons of the interface; the four
  large icons of the services and of the online services are another family, drawn for the site
  (see "Third screen" and "Online services").
- Photos go through `astro:assets` `<Image>`.
- Slanted frames with rounded corners: `roundedShape()` in `src/components/shapes.ts` turns a list of
  corners and radii (in px of the mockup) into an SVG clip path.
- Whole-card links use a stretched `::after` on the title link (`.card__link`), so the link's name stays short.
- To size something by the height it is given (the hero's stage), make its parent a size container and
  use `cqw` / `cqh`. Children of the stage use `cqw` for radii and font sizes so they scale with it.
- Radial gradients: keep the sizes as plain percentages. Chrome rejects `max()` or `calc()` that mixes
  percentages and lengths there, and the whole background then silently disappears.
- Anything drawn wider than the screen (glows, chevron trails) must be cut by its own box
  (`overflow-x: clip` or a clipping wrapper), or phones get a sideways scroll.
- When several slides share one grid cell, the cell takes the height of the longest: do not pin content
  to the bottom of the cell, or short slides get a gap in the middle.
- To reveal a bar or line, animate `clip-path: inset(...)` or `opacity`, not `transform: scale(0)`: a zero
  scale left half-drawn lines in Chrome.
- Before reshaping shared styles, take screenshots of the sections that use them and compare after,
  pixel for pixel, with whatever moves by itself hidden (the trails).
- `--motion` (set in `global.css`) is 1, or 0 for `prefers-reduced-motion`: multiply by it whatever
  moves or grows when something is pointed at. Colours may still change.
- A transformed element becomes the reference for the absolutely positioned elements inside it: do not
  put a transform on the title of a card whose link is stretched over the card (`.card__link`), put it
  on a `<span>` inside the link.
- CSS grid: two items meant to overlap in one cell both need an explicit `grid-area` (a row alone puts the
  second one in a new column). A cell shared by several items needs `grid-template-columns: minmax(0, 1fr)`,
  or one wide item (a long button) stretches the page on phones. A `minmax(a, b)` column next to a `1fr`
  column grows to `b` first: give it a smaller `b` where the `1fr` column needs the room.
- Check layouts with viewport screenshots taken while scrolling. A "full page" capture resizes the page,
  which breaks the first screen and the scroll-tied fades.
- An address that leads to no page shows `src/pages/404.astro` ("page introuvable").
- `getStaticPaths()` runs on its own: it sees the file's imports, not the constants written beside it.
