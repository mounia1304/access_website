// The kinds of news of the Actualités page: their key (written in a news item's file), and the
// look of an item that has no photo: one of the site's drawn icons on a pale ground, blue or
// orange. Their names are in the texts file (t.pages.actualites.types).
import type { ServiceIconName } from '../components/serviceIcons';

export const NEWS_TYPES = ['entreprise', 'avis-clients', 'evenements', 'certifications'] as const;

export type NewsType = (typeof NEWS_TYPES)[number];

export const NEWS_LOOK: Record<NewsType, { icon: ServiceIconName; tone: 'blue' | 'warm' }> = {
	entreprise: { icon: 'entreprise', tone: 'blue' },
	'avis-clients': { icon: 'reclamation', tone: 'warm' },
	evenements: { icon: 'calendrier', tone: 'blue' },
	certifications: { icon: 'douane', tone: 'warm' },
};
