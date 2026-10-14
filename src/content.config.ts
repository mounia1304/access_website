// The articles of the blog and the news of the Actualités page: one Markdown file each. How to
// write one is in README.md ("Writing an article", "Writing a news item") and in the templates
// _modele-article.md and _modele-actualite.md. A file whose name starts with "_" is not published.
//
// The fields below are checked when the site is built: a category or an author written wrongly
// stops the build with a message that lists the right ones.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { NEWS_TYPES } from './data/actualites';
import { CATEGORIES, SERVICES } from './data/blog';
import pages from './i18n/fr.pages';

// The authors are the people of the team (the contact page), by their key.
const authors = [pages.contact.director.key, ...pages.contact.members.map((member) => member.key)] as [string, ...string[]];

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			category: z.enum(CATEGORIES),
			author: z.enum(authors).optional(),
			service: z.enum(SERVICES).optional(),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			featured: z.boolean().default(false),
		}),
});

// The news of the Actualités page: one Markdown file each in src/content/actualites/
// (src/content/actualites/_modele-actualite.md). Their address is /actualites/<name of the file>/.
const actualites = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/actualites' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			type: z.enum(NEWS_TYPES),
			// A notice to clients kept at the top of the page, until it is set back to false.
			pinned: z.boolean().default(false),
			cover: image().optional(),
			coverAlt: z.string().optional(),
		}),
});

export const collections = { blog, actualites };
