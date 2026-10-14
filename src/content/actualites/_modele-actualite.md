---
# NEWS ITEM TEMPLATE. This file is not published (its name starts with "_").
#
# 1. Copy it into this folder and rename the copy. The file's name becomes the news item's
#    address: nouveau-site.md -> access-transit.com/actualites/nouveau-site/
#    (lowercase letters, digits and hyphens).
# 2. Fill in the fields below, then write the text under the second "---" line.
# 3. Run "npm run build": a field written wrongly stops it with a message that says which.
#
# title: the news item's title.
title: "Titre de l’actualité"
# description: one or two sentences, shown in the list and by Google.
description: "Une ou deux phrases qui résument l’actualité."
# date: the day it is published (year-month-day). The newest comes first.
date: 2026-10-14
# type: one of entreprise | avis-clients | evenements | certifications
type: entreprise
# pinned (optional, for a notice to clients): true keeps it at the top of the page, in the
#   "Avis aux clients" panel. Set it back to false (or remove the line) when it no longer applies.
pinned: false
# cover (optional): a photo, put in src/assets/actualites/. Without it, the kind's drawn icon shows.
# cover: ../../assets/actualites/mon-image.jpg
# coverAlt: "What the photo shows"
---

Le texte de l’actualité. Une ligne vide sépare deux paragraphes ; « ## » commence un intertitre.
