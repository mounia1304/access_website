// French copy for the homepage and shared layout.
//
// The wording is the wording of the current access-transit.com homepage, with only
// spelling and typography corrected. Do not rewrite it without the client's say-so.
//
// Section titles written as [first part, second part] are set in two colours (black, then
// the accent colour), as on the current site.
//   = non-breaking space (before : ; ! ?),   = narrow non-breaking space (thousands).

import pages from './fr.pages';
import type { RouteKey } from './routes';
import type { IconName } from '../components/icons';

const fr = {
	meta: {
		title: 'Access Transit | Meilleur transitaire au Maroc',
		description:
			'Profitez de notre expertise pour accélérer votre croissance : Solutions de transit et transport national et international de haute qualité',
	},

	// Interface labels that are not part of the page content.
	common: {
		skip: 'Aller au contenu',
		menu: 'Menu',
		close: 'Fermer',
		mainNav: 'Navigation principale',
		quickInfo: 'Informations pratiques',
		langSwitch: 'Langue',
		langSoon: 'Version anglaise bientôt disponible',
		quoteCta: 'Demander une cotation',
		learnMore: 'Savoir plus',
		pauseMotion: 'Mettre les animations en pause',
		playMotion: 'Relancer les animations',
	},

	nav: {
		home: 'Accueil',
		services: 'Nos services',
		eservices: 'E-services',
		blog: 'Blog',
		news: 'Actualités',
		quality: 'Notre politique qualité',
		contact: 'Contact',
		serviceItems: [
			{ key: 'douane', label: 'Transit en douane' },
			{ key: 'routier', label: 'Transport routier' },
			{ key: 'aerien', label: 'Transport aérien' },
			{ key: 'maritime', label: 'Transport maritime' },
		],
		eserviceItems: [
			{ key: 'cotation', label: 'Demander une cotation' },
			{ key: 'tracking', label: 'Tracking' },
			{ key: 'reclamation', label: 'Réclamations' },
		],
	} satisfies Record<string, string | ReadonlyArray<{ key: RouteKey; label: string }>>,

	// Shown in the mobile menu, as on the current site.
	info: {
		addresses: 'Nos adresses',
		hours: 'Horaire d’ouverture',
		emailUs: 'Nous envoyer un e-mail',
		callUs: 'Nous appeler',
	},

	hero: {
		// Read by search engines and screen readers; the slide titles are what is seen.
		h1: 'Access Transit, transitaire au Maroc',
		label: 'À la une',
		tablist: 'Choisir un message',
		// The texts below, down to the picture's description, are not on the current site: they come
		// from the client's mockups of the first screen (the third one,
		// reference/maquette-premier-ecran-3.webp, is the one that is built).
		tagline: 'Votre partenaire en transport et logistique',
		slogan: ['Plus qu’un transit,', 'une confiance'],
		// The label of the round "play" button of the third mockup: it leads to the second screen
		// and its film.
		savoirFaire: 'Notre savoir-faire',
		panel: {
			eyebrow: 'Nos services',
			title: ['Une expertise complète', 'en transport et logistique'],
			// The link under the panel's title (third mockup): it leads to the services block.
			link: 'Découvrir tous nos services',
		},
		// Describes the picture for people who cannot see it.
		imageAlt: 'Camion porte-conteneurs, navire chargé de conteneurs, portiques de quai et avion en vol',
		// "title" + "mark" make up the slide title: "title" in navy, "mark" in orange on its own line.
		// The button reads "En savoir plus", as in the client's mockups (the current site says "Savoir plus").
		// The first text ends with "en toute sécurité et dans les meilleurs délais", as in the mockup;
		// the current site's sentence stops at "douane". Its "en douane" is kept on one line.
		slides: [
			{
				key: 'douane',
				title: 'Transit en',
				mark: 'douane',
				text: 'Nous assurons la réalisation des services de passage en douane en toute sécurité et dans les meilleurs délais.',
				cta: 'En savoir plus',
			},
			{
				key: 'aerien',
				title: 'Transport',
				mark: 'aérien',
				text: 'Notre équipe en fret aérien vous offre un service personnalisé sur tous les aéroports européens et internationaux.',
				cta: 'En savoir plus',
			},
			{
				key: 'routier',
				title: 'Transport',
				mark: 'routier',
				text: 'Nous garantissons un service de transport terrestre régulier entre le Maroc et l’Europe.',
				cta: 'En savoir plus',
			},
			{
				key: 'maritime',
				title: 'Transport',
				mark: 'maritime',
				text: 'Nous assurons vos opérations de transport maritime par mer depuis les différents ports du monde.',
				cta: 'En savoir plus',
			},
			{
				key: 'qualite',
				title: 'Certifié',
				mark: 'ISO 9001',
				text: 'Notre certification ISO 9001 version 2015 de TÜV Maroc, filiale de TÜV Rheinland Allemagne, témoigne de notre engagement en faveur de la qualité de nos services.',
				cta: 'Notre politique qualité',
			},
		] satisfies ReadonlyArray<{ key: RouteKey; title: string; mark: string; text: string; cta: string }>,
	},

	about: {
		eyebrow: 'Depuis 2010',
		title: ['Présentation de', 'l’entreprise'],
		paragraphs: [
			'Dès sa création, ACCESS TRANSIT regroupe une équipe de cadres expérimentés ayant une grande maîtrise des procédures et réglementations relatives aux techniques douanières et au commerce international. Cela nous permet d’occuper une position de leader dans notre secteur d’activité.',
			'Notre engagement en faveur de la célérité et de la transparence contribue à améliorer la compétitivité de nos clients dans un environnement de plus en plus concurrentiel.',
		],
		motto: 'Notre force, votre atout',
		ceo: { name: 'Mohamed EZZAHRAOUI', role: 'Directeur Général' },
		imageAlt: 'Camion porte-conteneurs, navire chargé de conteneurs à quai, portiques et avion au décollage',
	},

	services: {
		eyebrow: 'Nos métiers',
		title: ['Découvrez', 'nos services'],
		// The first three sentences are those of the client's mockup of this screen
		// (reference/maquette-troisieme-ecran.webp). The current site reads:
		//   douane:  'Nous assurons la réalisation des services de passage en douane.'
		//   routier: 'Nous garantissons un service de transport terrestre régulier.'
		//   aerien:  'Un service personnalisé sur tous les aéroports internationaux.'
		// The mockup's "une acheminement" is corrected to "un acheminement".
		items: [
			{
				key: 'douane',
				icon: 'customs-file',
				name: 'Transit en douane',
				text: 'Nous assurons la réalisation des services de passage en douane en toute sécurité et dans les meilleurs délais.',
			},
			{
				key: 'routier',
				icon: 'truck',
				name: 'Transport routier',
				text: 'Nous garantissons un acheminement de transport terrestre régulier.',
			},
			{
				key: 'aerien',
				icon: 'airplane',
				name: 'Transport aérien',
				text: 'Nous assurons la sécurité et la rapidité des expéditions internationales.',
			},
			{
				key: 'maritime',
				icon: 'boat',
				name: 'Transport maritime',
				text: 'Nous assurons vos opérations de transport maritime.',
			},
		] satisfies ReadonlyArray<{ key: RouteKey; icon: IconName; name: string; text: string }>,
	},

	why: {
		eyebrow: 'Depuis 2010',
		title: ['Pourquoi choisir', 'ACCESS TRANSIT'],
		items: [
			{
				title: 'Qualité de prestation',
				text: 'Nous offrons à nos clients des services personnalisés et un pilotage systématique de chaque opération en totale conformité avec les réglementations en vigueur et en application des normes et des bonnes pratiques professionnelles.',
			},
			{
				title: 'Maîtrise des délais',
				text: 'Nous adoptons des méthodes de travail éprouvées, adaptées aux besoins de nos clients extrêmement exigeants pour réaliser une prestation dans les meilleurs délais.',
			},
			{
				title: 'Rapport qualité-prix',
				text: 'Nous vous offrons le meilleur rapport qualité-prix dans l’ensemble des prestations tout en gardant une meilleure transparence.',
			},
			{
				title: 'Support',
				text: 'Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos interrogations et résoudre tous vos problèmes.',
			},
		] satisfies ReadonlyArray<{ title: string; text: string }>,
		stats: [
			{ icon: 'globe', value: '300', label: 'Agents internationaux' },
			{ icon: 'handshake', value: '3 800', label: 'Clients satisfaits' },
			{ icon: 'package', value: '2 500', label: 'Projets réalisés' },
			{ icon: 'map-trifold', value: '200', label: 'Pays et territoires desservis' },
		] satisfies ReadonlyArray<{ icon: IconName; value: string; label: string }>,
	},

	testimonials: {
		eyebrow: 'Témoignages',
		title: ['Avis de', 'nos clients'], // "Client Feedbacks" on the current site
		tablist: 'Choisir un témoignage',
		prev: 'Témoignage précédent',
		next: 'Témoignage suivant',
		items: [
			{
				quote:
					'Satisfaction pour les services de dédouanement et de transit. Votre professionnalisme, votre diligence et votre expertise ont été très appréciés. Merci !',
				name: 'M. Rachid ASSAKOUR',
				role: 'Directeur Général',
			},
			{
				quote: 'Service de dédouanement rapide et professionnel, merci pour votre excellent travail !',
				name: 'Jaber HADDOU',
				role: 'General Manager Services',
			},
			{
				quote: 'Impressionné par l’expertise de votre entreprise en matière de dédouanement et de transit.',
				name: 'M. Yassine ILZEN',
				role: 'Directeur Technique',
			},
			{
				quote: 'Expérience de dédouanement agréable et sans stress, merci pour votre professionnalisme.',
				name: 'M. Chaouki HAMKOUR',
				role: 'Cogérant',
			},
			{
				quote: 'Communication claire et rapide, nous sommes très satisfaits de vos services.',
				name: 'M. Yassine ELKARTI',
				role: 'Directeur Général',
			},
		],
	},

	bigNumber: {
		value: '30 900',
		label: 'Opérations de transit effectuées par notre équipe',
	},

	references: {
		eyebrow: 'Clients',
		title: ['Nos', 'références'],
	},

	partners: {
		eyebrow: 'Partenaires',
		title: ['Nos', 'partenaires'],
	},

	eservices: {
		eyebrow: 'Service en ligne',
		title: 'E-services',
		items: [
			{ key: 'cotation', icon: 'calculator', name: 'Demander une cotation' },
			{ key: 'tracking', icon: 'file-search', name: 'Tracking' },
			{ key: 'reclamation', icon: 'chat-text', name: 'Réclamation en ligne' },
		] satisfies ReadonlyArray<{ key: RouteKey; icon: IconName; name: string }>,
	},

	contact: {
		eyebrow: 'Contact',
		title: 'Contactez-nous',
		map: 'Carte : ACCESS TRANSIT à Casablanca', // read out for the map; not shown
		form: {
			name: 'Nom',
			email: 'Email',
			phone: 'Téléphone',
			company: 'Entreprise',
			message: 'Message',
			submit: 'Envoyer',
			// Only shown until the form is connected (phase 4).
			demo: 'Formulaire de démonstration : l’envoi sera activé à la mise en ligne du site.',
		},
		address: 'Adresse',
	},

	footer: {
		about:
			'Chez ACCESS TRANSIT, notre expertise et notre savoir-faire sont entièrement dédiés à votre satisfaction. Nous nous engageons à vous offrir des prestations de logistique d’une qualité irréprochable, afin de vous aider à tirer le meilleur parti de votre activité et à stimuler votre croissance. Faites confiance à notre équipe pour optimiser vos opérations logistiques et déployer tout notre savoir-faire à votre service.',
		contact: 'Contact',
		address: 'Adresse',
		email: 'E-mail',
		phones: 'Téléphones',
		rights: 'Tous les droits sont réservés',
	},

	// The inner pages have their own file.
	pages,

	// Shown for an address that leads nowhere.
	notFound: {
		eyebrow: 'Page introuvable',
		title: 'Cette page n’existe pas ou a été déplacée.',
		text: 'L’adresse que vous avez suivie ne mène à aucune page du site.',
		back: 'Retour à l’accueil',
	},
};

export default fr;
export type Dictionary = typeof fr;
