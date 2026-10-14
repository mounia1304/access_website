// What the blog's pages need about its articles: the list, newest first, and each article's
// author, category, date and reading time.
import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORY_LOOK, type CategoryKey } from '../data/blog';
import { site } from '../data/site';
import { useTranslations } from '../i18n';
import { initialsOf } from './text';

export type Post = CollectionEntry<'blog'>;

/** Every published article, the newest first. */
export async function getPosts(): Promise<Post[]> {
	return (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The article in "À la une": the newest one marked featured, or the newest. */
export const featuredOf = (posts: Post[]) => posts.find((post) => post.data.featured) ?? posts[0];

export interface Author {
	/** No author named: the article is signed by the company. */
	company: boolean;
	name: string;
	role: string;
	initials: string;
}

/** An article's author: a person of the team (contact page), or the company. */
export function authorOf(post: Post): Author {
	const t = useTranslations();
	const team = [t.pages.contact.director, ...t.pages.contact.members];
	const person = team.find((member) => member.key === post.data.author);
	if (!person) return { company: true, name: site.brand, role: t.hero.tagline, initials: 'AT' };
	return { company: false, name: person.name, role: person.role, initials: initialsOf(person.name) };
}

/** An article's category: its key, name, description, address and look. */
export function categoryOf(key: CategoryKey) {
	const t = useTranslations();
	return { key, ...t.pages.blog.categories[key], href: `/category/${key}/`, ...CATEGORY_LOOK[key] };
}

/** The date as French readers write it ("22 février 2023"), and as a machine reads it. */
export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Minutes to read the article, at about 200 words a minute. */
export function readingTime(post: Post) {
	const words = (post.body ?? '').replace(/[#>*_`|[\]()-]+/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/** Up to three other articles: those of the same category first, then the newest. */
export function relatedTo(post: Post, posts: Post[], count = 3) {
	const others = posts.filter((other) => other.id !== post.id);
	const same = others.filter((other) => other.data.category === post.data.category);
	return [...same, ...others.filter((other) => !same.includes(other))].slice(0, count);
}

/** A page's address always ends with a slash, as every address of the site does. */
export const withSlash = (url?: string) => (url ? (url.endsWith('/') ? url : `${url}/`) : undefined);
