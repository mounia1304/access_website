// The blog's categories: their key (the end of their address, /category/<key>/), and the look of an
// article of theirs that has no photo yet: one of the site's drawn icons (serviceIcons.ts) on a
// pale ground, blue or orange. Their names and descriptions are in the texts file
// (t.pages.blog.categories).
import type { ServiceIconName } from '../components/serviceIcons';

export const CATEGORIES = [
	'douane-reglementation',
	'transport-international',
	'import-export',
	'guides-pratiques',
] as const;

export type CategoryKey = (typeof CATEGORIES)[number];

export const CATEGORY_LOOK: Record<CategoryKey, { icon: ServiceIconName; tone: 'blue' | 'warm' }> = {
	'douane-reglementation': { icon: 'douane', tone: 'blue' },
	'transport-international': { icon: 'aerien', tone: 'blue' },
	'import-export': { icon: 'maritime', tone: 'blue' },
	'guides-pratiques': { icon: 'tracking', tone: 'warm' },
};

// The services an article can lead to at its end (their pages and texts are the site's).
export const SERVICES = ['douane', 'routier', 'aerien', 'maritime'] as const;

// How many articles a page of the blog lists before the next page.
export const PAGE_SIZE = 9;
