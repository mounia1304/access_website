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
| French texts of the inner pages (services, forms, quality policy, company presentation, blog, team) | `src/i18n/fr.pages.ts` |
| Phone, e-mail, addresses             | `src/data/site.ts`                                     |
| Client and partner logos             | `src/data/references.ts` + `src/assets/`; the eight supplied as files (`reference/logos-clients/`) are prepared by `node scripts/make-client-logos.mjs` |
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
| The company's presentation, French and English (the pages made from the client's two PDFs) | drawn by `src/components/CompanyPresentation.astro`; texts `presentation` in `src/i18n/fr.pages.ts` and `src/i18n/en.pages.ts`; the PDFs `reference/presentation-entreprise.pdf` and `reference/company-presentation-en.pdf` |
| A blog article                       | `src/content/blog/`: one file each (see "Writing an article" below) |
| A news item (Actualités page)        | `src/content/actualites/`: one file each (see "Writing a news item" below) |
| The kinds of news                    | `src/data/actualites.ts` (icons, colours), names in `src/i18n/fr.pages.ts` (`actualites.types`) |
| The blog's categories                | `src/data/blog.ts` (addresses, icons), names in `src/i18n/fr.pages.ts` (`blog.categories`) |
| Where the trail of chevrons runs     | `src/pages/index.astro` (the `<ChevronTrail />` between sections) |
| The drawing of that trail            | `node scripts/make-chevron-trail.mjs`                  |

## Writing an article

1. In `src/content/blog/`, copy `_modele-article.md` and rename the copy. Its name becomes the
   article's address: `mon-article.md` is published at `access-transit.com/mon-article/`. Use
   lowercase letters, digits and hyphens only.
2. Fill in the fields between the two `---` lines (the template explains each one):
   - `title`, `description` (one or two sentences, shown on the blog and by Google), `date`;
   - `category`: `douane-reglementation`, `transport-international`, `import-export` or
     `guides-pratiques` (the company's news go to the Actualités page instead);
   - `author` (optional): `ezzahraoui-mohamed`, `fahmi-larbi`, `fahmi-omar`, `beidouri-zohra`,
     `boussry-khadija`, `ouatid-ghizlane`, `sabir-hind` or `laaraj-ibtissam`; without it the
     article is signed ACCESS TRANSIT;
   - `service` (optional): the service shown at the end: `douane`, `routier`, `aerien` or `maritime`;
   - `cover` and `coverAlt` (optional): a photo put in `src/assets/blog/`, and what it shows;
   - `featured: true` (optional) puts it "À la une"; otherwise the newest article is there.
3. Write the text under the second `---` line, in Markdown: a blank line between paragraphs,
   `## ` for an intertitle (three of them make a summary appear), `- ` for a list, `1. ` for a
   numbered one, `> ` for a tip set apart, `**bold**`, `[a link](https://…)`, and tables.
4. Run `npm run build`. If a field is wrong, it stops and says which one and what it accepts.

## Writing a news item

1. In `src/content/actualites/`, copy `_modele-actualite.md` and rename the copy. Its name becomes
   the address: `nouveau-site.md` is published at `access-transit.com/actualites/nouveau-site/`.
2. Fill in `title`, `description`, `date` and `type`: `entreprise`, `avis-clients`, `evenements`
   or `certifications`. A notice to clients can be kept at the top of the page with `pinned: true`;
   set it back to `false` when it no longer applies. `cover` and `coverAlt` add a photo (put in
   `src/assets/actualites/`).
3. Write the text under the second `---` line, as for an article, then run `npm run build`.

## Status

- **Phase 1 — homepage (French): done, awaiting approval.**
- **Phase 2 — inner pages (services, quality policy, quote, file follow-up, complaint, contact, blog):
  built with the content of the current site, awaiting approval.** The blog has its own pages: the
  list with "À la une", four categories, and an article page; its articles are written in code
  (see "Writing an article"). The Actualités page (news, notices to clients, press corner) is built
  the same way (see "Writing a news item"); it has no news yet. In the menu, "Blog" became
  "Actualités", with the Actualités page and the blog under it. The company's presentation is a page
  too, in French (`/presentation-de-l-entreprise/`) and in English (`/en/company-presentation/`),
  made from the client's two PDFs and laid out like a service page. The French one is in the menu,
  at the end of "Nos services", and the homepage's "Présentation de l'entreprise" links to it ("En
  savoir plus"). No link leads to the English one yet: it will be reached through FR/EN (phase 3).
  The service pages and the presentation have no side column any more (the client had its contents
  removed, then asked for the room to be used): their photo and text use the whole width, the text
  in two columns on large screens. The quote forms keep its help card. The two PDFs are in the news
  page's press corner. The English one is the
  site's only English page so far: the
  menu, the side column and the footer round it stay French until phase 3.
- **Next**: the Logistique part (two platforms), once the director has filled in
  `informations-logistique-et-actualites.xlsx`; then the homepage (latest news, logistics).
- Phase 3 — English version.
- Phase 4 — working forms, SEO, final performance pass.
- Phase 5 — go live.

Every link of the site leads to a page. The forms (quote, tracking, complaint, contact) do not send
anything until phase 4: they show a notice saying so. The "EN" of the menu is not a link yet (phase 3).

## Placeholders and open points

- **Logo**: the client's own logo, in the header and the mobile menu (removed from the footer at the
  client's request).
- **Messages of the first screen**: only the first message ("Transit en douane") is shown: the numbers
  that chose among the five were removed at the client's request. The four cards under it are links
  (road, sea, air, ISO), as on the mockup.
- **Photos**: the first screen uses the photograph supplied by the client; on its four cards, the
  lorry, the ship and the plane are pictures supplied by the client; the ISO badge is still cut out of
  the mockup and is coarse on dense screens, pending the original file. The second
  screen shows the film supplied by the client inside the mockup's frame (3.5 MB, loaded only when the
  frame comes on screen). The four service pages show photographs supplied by the client
  (`src/assets/photos/services/`); swap a file there to replace one (and its import, if the file's
  type changes). They are offered up to their full width at a high quality setting, at the client's
  request. The current site's photos are no longer used.
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
- **Company presentation**: the two pages follow the client's two PDFs (January 2023), wording kept,
  only spelling and typography corrected. To confirm with the client: that the general manager's own
  mobile numbers, Gmail address and LinkedIn may be shown (they are, as in the PDF, while the contact
  page still says "Coordonnées à venir" for him). The PDF's references (the clients' logos) are not
  shown, at the client's request: the homepage's moving strip has them, except Amiyas Import and an
  orange and green "A" whose name the PDF does not give (their logos, cut out of the PDF, are kept in
  `src/assets/clients/`). The PDF's cover shows an older TÜV mark: the page shows
  the current one.
- **Client logos**: eleven were added to the moving strip at the client's request, all in high quality.
  PERI, Roca and OCP are the companies' own files (Wikimedia Commons; Roca's file is credited to
  Donperfectodewiki, CC BY-SA 3.0, in `src/data/references.ts`); the eight others were supplied by
  the client (`reference/logos-clients/`). Electro Tadart's file is cropped tight (the circle round
  its emblem is cut at its edges): a version with a margin would be better.
- **Typefaces**: DM Sans (free).
- **Contact form**: shows a demo message instead of sending.
- **Favicon**: the "A" of the logo on a white rounded square.
