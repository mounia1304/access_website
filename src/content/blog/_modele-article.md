---
# ARTICLE TEMPLATE. This file is not published (its name starts with "_").
#
# 1. Copy it into this folder and rename the copy. The file's name becomes the article's address:
#    mon-article.md -> access-transit.com/mon-article/ (lowercase letters, digits and hyphens).
# 2. Fill in the fields below, then write the article under the second "---" line.
# 3. Run "npm run build": a field written wrongly stops it with a message that says which.
#
# title: the article's title.
title: "Titre de l’article"
# description: one or two sentences, shown on the blog's list and by Google.
description: "Une ou deux phrases qui résument l’article."
# date: the day it is published (year-month-day). The newest article comes first.
date: 2026-10-14
# category: one of douane-reglementation | transport-international | import-export | guides-pratiques
#   (the company's news are not articles: they go to src/content/actualites/)
category: guides-pratiques
# author (optional): one of ezzahraoui-mohamed | fahmi-larbi | fahmi-omar | beidouri-zohra |
#   boussry-khadija | ouatid-ghizlane | sabir-hind | laaraj-ibtissam. Without it, the article is
#   signed ACCESS TRANSIT.
author: fahmi-larbi
# service (optional): the service presented at the end of the article: douane | routier | aerien | maritime
service: douane
# cover (optional): a photo, put in src/assets/blog/. Without it, the category's drawn icon shows.
# cover: ../../assets/blog/mon-image.jpg
# coverAlt: "What the photo shows"
# featured (optional): true puts the article in "À la une" (otherwise the newest one is there).
featured: false
---

Le premier paragraphe de l’article. Écrivez simplement le texte ; une ligne vide sépare deux paragraphes.

## Un intertitre

Les intertitres commencent par « ## ». Dès qu’un article en a trois, un sommaire apparaît à côté du texte.

### Un sous-titre

- une liste commence par un tiret ;
- **ceci est en gras**, *ceci en italique* ;
- [un lien](https://access-transit.com/contact/).

1. une liste numérotée ;
2. commence par des chiffres.

> Un conseil ou une phrase à mettre en valeur commence par « > ».

| Incoterm | Qui paie le transport principal |
| -------- | ------------------------------- |
| EXW      | l’acheteur                      |
| CIF      | le vendeur                      |
