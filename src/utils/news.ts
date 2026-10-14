// What the Actualités pages need about the news: the list, newest first, and each item's kind.
import { getCollection, type CollectionEntry } from 'astro:content';
import { NEWS_LOOK, type NewsType } from '../data/actualites';
import { route, useTranslations } from '../i18n';

export type News = CollectionEntry<'actualites'>;

/** Every published news item, the newest first. */
export async function getNews(): Promise<News[]> {
	return (await getCollection('actualites')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** A kind of news: its key, its name and its look. */
export function typeOf(key: NewsType) {
	const t = useTranslations();
	return { key, name: t.pages.actualites.types[key], ...NEWS_LOOK[key] };
}

/** A news item's address. */
export const hrefOf = (item: News) => `${route('actualites')}${item.id}/`;

/** The notices to clients kept at the top of the page. */
export const pinnedOf = (news: News[]) => news.filter((item) => item.data.pinned && item.data.type === 'avis-clients');
