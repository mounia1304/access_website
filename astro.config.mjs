// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://access-transit.com',
	// Same URL shape as the current WordPress site, so existing links keep working.
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	devToolbar: { enabled: false },
	server: { port: 4321 },
});
