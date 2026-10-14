// One entry per page. French keeps the URLs of the current site so that
// existing links and search rankings carry over. English is added in phase 3.

export const routes = {
	fr: {
		home: '/',
		douane: '/services/transit-en-douane/',
		routier: '/services/transport-routier/',
		aerien: '/services/transport-aerien/',
		maritime: '/services/transport-maritime/',
		cotation: '/e-services/demander-une-cotation/',
		cotationTransit: '/e-services/demander-une-cotation/transit/',
		cotationInternational: '/e-services/demander-une-cotation/transport-international/',
		cotationNational: '/e-services/demander-une-cotation/transport-national/',
		tracking: '/e-services/tracking/',
		reclamation: '/e-services/reclamations/',
		qualite: '/notre-politique-qualite/',
		blog: '/blog/',
		actualites: '/actualites/',
		contact: '/contact/',
	},
} as const;

export type Locale = keyof typeof routes;
export type RouteKey = keyof (typeof routes)['fr'];
