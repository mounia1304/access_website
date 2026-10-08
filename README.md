# Access Transit — new website

Rebuild of [access-transit.com](https://access-transit.com) as a fast static site (Astro).
French is the default language; English is planned.

The homepage keeps the content of the current site: same blocks in the same order, same
wording (spelling and typography corrected), same five slider messages, same menu and buttons.

The design follows the client's own mockup of the first screen,
[reference/maquette-premier-ecran-2.webp](reference/maquette-premier-ecran-2.webp): the message on the
left, the picture on the right in a slanted frame with a handwritten slogan, and a panel of five
service cards that choose the message. The sections below use the same colours, typeface, cards and
labels. [previews/comparaison-maquette.jpg](previews/comparaison-maquette.jpg) shows the mockup and the
built first screen one above the other; the other previews are in [previews/](previews/).

The second screen ("Présentation de l'entreprise") follows a second mockup from the client,
[reference/maquette-deuxieme-ecran.webp](reference/maquette-deuxieme-ecran.webp);
[previews/comparaison-maquette-2.jpg](previews/comparaison-maquette-2.jpg) shows it above the built screen.
The third ("Découvrez nos services") follows a third one,
[reference/maquette-troisieme-ecran.webp](reference/maquette-troisieme-ecran.webp), compared in
[previews/comparaison-maquette-3.jpg](previews/comparaison-maquette-3.jpg).

A few texts of the first screen come from that mockup and not from the current site: the tagline
("Votre partenaire en transport et logistique"), the slogan ("Plus qu'un transit, une confiance"), the
panel's title and sentence, and the end of the first message ("en toute sécurité et dans les meilleurs
délais"). They are grouped at the top of the `hero` block in `src/i18n/fr.ts`.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321. `npm run build` produces the final files in `dist/`,
which can be uploaded to any web hosting.

## Colours

All colours come from the values at the top of `src/styles/tokens.css` (the "Palette" block), measured
on the mockup. The blocks under it say where each colour is used. After any change, check that text is
still readable:

```bash
npm run check:palette
```

## Where things are

| To change…                           | Edit…                                                  |
| ------------------------------------ | ------------------------------------------------------ |
| Colours, fonts, spacing              | `src/styles/tokens.css`                                |
| All French texts                     | `src/i18n/fr.ts`                                       |
| Phone, e-mail, addresses             | `src/data/site.ts`                                     |
| Client and partner logos             | `src/data/references.ts` + `src/assets/`               |
| Page addresses (URLs)                | `src/i18n/routes.ts`                                   |
| The logo                             | `src/components/LogoSlot.astro` (stand-in for now)     |
| The first screen's picture           | `src/assets/photos/hero/transport.webp` (transparent background) |
| The sky behind that picture          | `node scripts/make-hero-sky.mjs`                       |
| Tilt of the service plates, and how much one grows when pointed at | the variables at the top of `.service` in `src/components/Services.astro` |
| The second screen's film             | `src/assets/photos/presentation/transport.mp4` (+ its first image, `transport.webp`) |
| A section of the homepage            | `src/components/<Section>.astro`                       |
| Where the trail of chevrons runs     | `src/pages/index.astro` (the `<ChevronTrail />` between sections) |
| The drawing of that trail            | `node scripts/make-chevron-trail.mjs`                  |

## Status

- **Phase 1 — homepage (French): done, awaiting approval.**
- Phase 2 — inner pages (services, quality policy, quote, file follow-up, complaint, contact, blog).
- Phase 3 — English version.
- Phase 4 — working forms, SEO, final performance pass.
- Phase 5 — go live.

Until phase 2, every link to an inner page shows a "page en préparation" screen
(`src/pages/404.astro`).

## Placeholders and open points

- **Logo**: a stand-in mark, in the header, the mobile menu and the footer. It is not the final logo.
- **"Transport multimodal"**: the mockup shows it among the five cards, in place of "Transit en douane".
  The cards choose the five messages of the slider, so they carry the five real titles; multimodal
  transport is not on the current site and has not been added. To be confirmed by the client.
- **Photos**: the first screen uses the picture supplied by the client, on a generated sky. The second
  screen shows the film supplied by the client inside the mockup's frame (3.5 MB, loaded only when the
  frame comes on screen). The other photos are the current site's; swap the files in
  `src/assets/photos/` to replace them.
- **Service sentences**: three of the four sentences on the service plates now follow the third mockup
  (the current site's wording is kept in a comment in `src/i18n/fr.ts`). To be confirmed by the client.
- **Service plates**: unlike the mockup, the four are the same size and do not overlap; the larger,
  indigo-edged look is what a plate takes while it is pointed at (asked for by the client).
- **Pictures on the service plates**: the pale pictures in their corners are icons, not the mockup's
  drawings.
- **Typefaces**: DM Sans, and La Belle Aurore for the handwritten slogan (both free).
- **Contact form**: shows a demo message instead of sending.
- **Favicon**: the stand-in mark on the accent colour.
