# Access Transit — new website

Rebuild of [access-transit.com](https://access-transit.com) as a fast static site (Astro).
French is the default language; English is planned.

The homepage keeps the content of the current site: same blocks in the same order, same
wording (spelling and typography corrected), same five slider messages, same menu and buttons.

The first screen follows the client's own mockup of it,
[reference/maquette-premier-ecran-3.webp](reference/maquette-premier-ecran-3.webp): a wide photograph of
the port across the screen, the message on a pale pane on the left, the slogan in the dark corner on
the right, a floating menu of frosted glass, and a white panel with four service cards.
[previews/comparaison-maquette.jpg](previews/comparaison-maquette.jpg) shows the mockup and the built
first screen one above the other. (The other files in [previews/](previews/) that show the whole page
date from before the logo's colours and are out of date.)

The second screen ("Présentation de l'entreprise") follows a second mockup from the client,
[reference/maquette-deuxieme-ecran.webp](reference/maquette-deuxieme-ecran.webp);
[previews/comparaison-maquette-2.jpg](previews/comparaison-maquette-2.jpg) shows it above the built screen.
The third ("Découvrez nos services") follows a third one,
[reference/maquette-troisieme-ecran.webp](reference/maquette-troisieme-ecran.webp), compared in
[previews/comparaison-maquette-3.jpg](previews/comparaison-maquette-3.jpg).

A few texts of the first screen come from that mockup and not from the current site: the tagline
("Votre partenaire en transport et logistique"), the slogan ("Plus qu'un transit, une confiance"), the
panel's title and its link ("Découvrir tous nos services"), the play link ("Notre savoir-faire"), and
the end of the first message ("en toute sécurité et dans les meilleurs délais"). They are grouped at
the top of the `hero` block in `src/i18n/fr.ts`. The thin bar with the phone, the e-mail and the city
that sat above the menu is gone, as on the mockup: those details are in the mobile menu, the contact
block and the footer.

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

The site uses the two colours of the logo, blue (`#164b9a`) and orange (`#f47721`), with the logo's
gradients, in place of the indigo of the mockups. All colours come from the values at the top of
`src/styles/tokens.css` (the "Palette" block). The blocks under it say where each colour is used. After any change, check that text is
still readable:

```bash
npm run check:palette
```

## Where things are

| To change…                           | Edit…                                                  |
| ------------------------------------ | ------------------------------------------------------ |
| Colours, fonts, spacing              | `src/styles/tokens.css`                                |
| French texts of the homepage, menu and footer | `src/i18n/fr.ts`                              |
| French texts of the inner pages (services, forms, quality policy, blog, team) | `src/i18n/fr.pages.ts` |
| Phone, e-mail, addresses             | `src/data/site.ts`                                     |
| Client and partner logos             | `src/data/references.ts` + `src/assets/`               |
| Page addresses (URLs)                | `src/i18n/routes.ts`                                   |
| The logo                             | `src/assets/brand/logo-source.webp`, then `node scripts/make-logo.mjs` (shown by `src/components/Logo.astro`) |
| The first screen's photograph        | `src/assets/photos/hero/port.webp`, then `node scripts/make-hero-scene.mjs` |
| The icons of the four services, and of the three online services | `src/components/serviceIcons.ts` (drawn for the site, shown by `ServiceIcon.astro`) |
| The icons of "Pourquoi choisir"      | `src/assets/reasons/icons-source.webp`, then `node scripts/make-reason-icons.mjs` |
| The small pictures on its cards      | `src/assets/photos/hero/cards/`                        |
| The route drawn through the four services | `ROUTES` in `src/components/Services.astro` |
| The containers of "Pourquoi choisir" (colours, depth, how far out of line they sit) | `src/components/Why.astro`; their colours are the `--c-box-…` roles in `tokens.css` |
| The key figures (300, 3 800, 2 500, 200) and their labels | `why.stats` in `src/i18n/fr.ts` |
| How they look (size, colours, the orange strokes) | the "Key figures" block of `src/components/Why.astro`; their gradient is `--g-figure` in `tokens.css` |
| The second screen's film             | `src/assets/photos/presentation/transport.mp4` (+ its first image, `transport.webp`) |
| A section of the homepage            | `src/components/<Section>.astro`                       |
| Where the trail of chevrons runs     | `src/pages/index.astro` (the `<ChevronTrail />` between sections) |
| The drawing of that trail            | `node scripts/make-chevron-trail.mjs`                  |

## Status

- **Phase 1 — homepage (French): done, awaiting approval.**
- **Phase 2 — inner pages (services, quality policy, quote, file follow-up, complaint, contact, blog):
  built with the content of the current site, awaiting approval.**
- Phase 3 — English version.
- Phase 4 — working forms, SEO, final performance pass.
- Phase 5 — go live.

Every link of the site leads to a page. The forms (quote, tracking, complaint, contact) do not send
anything until phase 4: they show a notice saying so. The "EN" of the menu is not a link yet (phase 3).

## Placeholders and open points

- **Logo**: the client's own logo, in the header, the mobile menu and the footer (on a white plate there,
  as its blue would not show on the blue footer).
- **Messages of the first screen**: the mockup draws three numbers; the site has five messages, so five
  numbers are shown. The four cards under them are links (road, sea, air, ISO), as on the mockup.
- **Photos**: the first screen uses the photograph supplied by the client; on its four cards, the
  lorry, the ship and the plane are pictures supplied by the client; the ISO badge is still cut out of
  the mockup and is coarse on dense screens, pending the original file. The second
  screen shows the film supplied by the client inside the mockup's frame (3.5 MB, loaded only when the
  frame comes on screen). The other photos are the current site's; swap the files in
  `src/assets/photos/` to replace them.
- **Service sentences**: three of the four sentences of the services now follow the third mockup
  (the current site's wording is kept in a comment in `src/i18n/fr.ts`). To be confirmed by the client.
- **"Pourquoi choisir"**: no mockup was supplied for this block. Its four reasons are four containers
  stacked on a quay, held by a crane, with the client's own icons on white labels. Awaiting approval.
- **Key figures**: they no longer glide by. At the client's request the four stand still, all in view
  at once, as large numbers in the logo's blue, each with a thin orange stroke. (A first version put
  them on a ship; the client asked for just the numbers.) Awaiting approval.
- **"30 900" banner**: redesigned at the client's request, with its animation kept and improved (the
  lights on the lanes now have tails; the lanes are drawn as the banner scrolls in). Awaiting approval.
- **E-services**: the three cards were replaced, at the client's request, by three very large pill
  buttons that step down the block, with icons drawn for the site. Awaiting approval.
- **Services**: the four tilted cards of the third mockup were replaced, at the client's request, by four
  leaning lanes with one route drawn through them (checkpoint, road, flight, waves). Their icons are
  drawn for the site, in place of the glass icons the client first supplied
  (`reference/icones-services-client.webp`). Awaiting approval.
- **Forms**: none of them sends anything yet (phase 4). To decide with the client: where the requests
  should arrive, and whether tracking should show a file's real status.
- **"Cotation de transport national"**: this page is empty on the current site. Here it sends visitors
  to the contact page; the client is to say which fields its form should have.
- **Not carried over from the current site**: the scan of the signed quality policy and the picture of
  the blog article (to be supplied or downloaded with the client's go-ahead); the map of the contact
  page, which shows another country there (the homepage's map, which shows the company, is used on
  both pages instead).
- **Typefaces**: DM Sans, and La Belle Aurore for the handwritten slogan (both free).
- **Contact form**: shows a demo message instead of sending.
- **Favicon**: the "A" of the logo on a white rounded square.
