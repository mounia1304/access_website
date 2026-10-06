import fr from './fr';
import { routes, type Locale, type RouteKey } from './routes';

const dictionaries = { fr } as const;

export const defaultLocale: Locale = 'fr';

export function useTranslations(locale: Locale = defaultLocale) {
	return dictionaries[locale];
}

export function route(key: RouteKey, locale: Locale = defaultLocale) {
	return routes[locale][key];
}

export type { Locale, RouteKey };
