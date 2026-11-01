// French copy of the inner pages (services, online services, quality policy, blog, contact).
//
// The wording is the wording of the same pages of the current access-transit.com, with only
// spelling, typography and capitals corrected ("Marise des délais" is "Maîtrise des délais",
// "INCOTERME" is "Incoterm", "n'hésitez pas de" is "n'hésitez pas à"...). Do not rewrite it
// without the client's say-so.
//   is a non-breaking space (before : ; ! ?).

import type { RouteKey } from './routes';
import type { IconName } from '../components/icons';

/** One field of a form (RequestForm.astro). Two "half" fields in a row share a line. */
export interface FormField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea';
	required?: boolean;
	half?: boolean;
	autocomplete?: string;
	options?: readonly string[];
}

/** The texts of the company's presentation, in French here and in English in en.pages.ts
 *  (CompanyPresentation.astro shows them). */
export interface PresentationText {
	title: readonly [string, string];
	/** The label of the summary. */
	toc: string;
	about: { title: string; items: ReadonlyArray<{ icon: IconName; text: string }> };
	services: {
		title: string;
		intro: string;
		list: readonly string[];
		transport: string;
		/** The three cards: each leads to the page of its service. */
		modes: ReadonlyArray<{ key: RouteKey; title: string; text: string }>;
	};
	skills: { title: string; text: string; list: readonly string[] };
	/** The cities; their addresses are the site's (data/site.ts) unless `lines` gives them. */
	addresses: { title: string; cities: readonly string[]; lines?: readonly string[] };
	director: {
		/** His part's name in the summary. */
		toc: string;
		name: string;
		role: string;
		photoAlt: string;
		career: readonly string[];
		education: readonly string[];
		contact: string;
		phones: readonly string[];
		email: string;
		linkedin: string;
		/** Read out before each line of his contact. */
		labels: { phone: string; email: string; linkedin: string };
	};
	motto: string;
}

/** A block of running text: a paragraph, a list, or a list whose items start with a term. */
export type Block =
	| { p: string }
	| { list: readonly string[] }
	| { terms: readonly { term: string; text: string }[] };

const pages = {
	// Interface labels of the inner pages.
	ui: {
		breadcrumb: 'Fil d’Ariane',
		root: 'Access Transit',
		services: 'Services',
		eservices: 'E-services',
		selectPlaceholder: 'Choisir',
		external: 'ouvre un nouvel onglet',
	},

	// The three commitments shown at the foot of most pages of the current site.
	assurances: [
		{
			title: 'Sécurité & assurance',
			text: 'Notre engagement est de garantir que vos marchandises sont livrées en toute sécurité. En outre, nous proposons une solution d’assurance qui répondra parfaitement à vos exigences.',
		},
		{
			title: 'Information rapide',
			text: 'Nous assurons une surveillance continue de vos opérations en temps réel en vous fournissant des informations mises à jour régulièrement grâce à notre équipe proactive.',
		},
		{
			title: 'Support',
			text: 'Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos interrogations et résoudre tous vos problèmes.',
		},
	],

	// The card that offers help, beside the text of the inner pages and at the foot of others.
	aside: {
		// The company's two presentations, files it keeps on Google Drive, as on the current site: the
		// news page's press corner offers them. (Both are pages of the site too: routes `presentation`
		// and `presentationEn`.)
		docs: [
			{
				label: 'Présentation de l’entreprise',
				href: 'https://drive.google.com/file/d/1NPpABoMdnETy7ZdpV42HDBiguGsxajar/view?usp=share_link',
			},
			{
				label: 'Company’s presentation',
				href: 'https://drive.google.com/file/d/1MsBOBOedBKk8GbWUzJyXjSgnAjvETXo4/view?usp=share_link',
			},
		],
		help: 'Comment pouvons-nous vous aider ?',
		helpText: 'Si vous avez besoin de plus d’informations, n’hésitez pas à nous contacter.',
		contact: 'Contact',
	},

	services: {
		douane: {
			title: ['Transit', 'en douane'],
			blocks: [
				{
					p: 'ACCESS TRANSIT a tenu à assurer la collaboration d’une équipe de cadres expérimentés ayant une grande maîtrise des procédures et réglementations relatives aux techniques douanières et au commerce international, ce qui lui a permis d’occuper une position honorable dans son secteur d’activité.',
				},
				{ p: 'ACCESS TRANSIT s’organise autour de 3 piliers essentiels de son activité :' },
				{
					terms: [
						{
							term: 'Qualité de prestations',
							text: 'Nous offrons à nos clients un suivi personnalisé et une synthèse systématique de chaque opération en totale conformité avec les réglementations en vigueur et en application des normes et des bonnes pratiques professionnelles.',
						},
						{
							term: 'Qualité des ressources humaines',
							text: 'Nous mettons au service de nos clients une équipe performante pour les accompagner et les conseiller.',
						},
						{
							term: 'Maîtrise des délais',
							text: 'Nous adoptons des méthodes de travail éprouvées, adaptées aux besoins de nos clients extrêmement exigeants pour réaliser une prestation dans les meilleurs délais.',
						},
					],
				},
				{ p: 'Dans ce cadre, ACCESS TRANSIT assure la réalisation des services de passage en douane :' },
				{
					list: [
						'Le dédouanement des marchandises tous régimes confondus',
						'Opération de dédouanement à l’import et à l’export',
						'Régimes simples',
						'Régimes économiques en douane',
						'Régimes de transit',
						'Investissement d’envergure',
						'Les franchises douanières',
						'Contentieux douanier',
						'Les procédures de contrôle de qualité (répression des fraudes)',
						'Les procédures de contrôle sanitaire, phytosanitaire et vétérinaire',
						'Les procédures de contrôle normatif',
						'Le conseil en commerce international',
						'Le conseil et accompagnement en contentieux douanier',
					],
				},
			],
		},
		routier: {
			title: ['Transport', 'routier'],
			blocks: [
				{
					p: 'Access Transit garantit un service de transport terrestre régulier entre le Maroc et l’Europe, nous pouvons fournir un trafic hebdomadaire pour le groupage et les charges complètes d’importation et/ou d’exportation, en comptant sur un important réseau de distribution structuré et avec la collaboration de ses correspondants dans chacun de ces pays.',
				},
				{
					p: 'Notre flotte est préparée pour les plus hautes exigences et répond à toutes les exigences de sécurité nécessaires à la réalisation de son travail. De même, nous pouvons traiter toutes sortes de documentation et de conseil dans les processus d’expédition/réception, remplissant avec garantie les engagements acquis auprès de ses clients.',
				},
				{
					p: 'En bref, nous voulons vous fournir tout ce qui peut être nécessaire dans une opération de transport terrestre pour couvrir tous les besoins qui peuvent survenir, et pour cela, nous avons un service complet qui couvre pratiquement tout ce qui concerne cette question de logistique.',
				},
			],
		},
		aerien: {
			title: ['Transport', 'aérien'],
			blocks: [
				{
					p: 'ACCESS TRANSIT organise avec ses partenaires spécialisés le transport aérien de marchandises. Notre équipe en fret aérien vous offre un service personnalisé sur tous les aéroports européens et internationaux grâce à ses accords préférentiels avec les compagnies aériennes et à son réseau mondial d’agents.',
				},
				{ p: 'Nous choisissons ensemble des solutions import/export sur mesure en matière de :' },
				{ list: ['Enlèvement / Livraison', 'Door to airport', 'Airport to airport', 'Airport to door', 'Door to door'] },
			],
		},
		maritime: {
			title: ['Transport', 'maritime'],
			blocks: [
				{
					p: 'ACCESS TRANSIT propose les services d’enlèvement de la marchandise, empotage et/ou dépotage des conteneurs, livraison à quai, transport maritime, post-acheminement, etc. Nous assurons vos opérations de transport maritime par mer depuis les différents ports du monde en mettant à votre disposition l’ensemble de nos moyens.',
				},
				{ p: 'ACCESS TRANSIT vous propose une offre globale dans le domaine du transport maritime :' },
				{
					list: ['Conteneurs complets', 'Groupages maritimes toutes destinations', 'Conventionnel', 'Marchandises dangereuses'],
				},
			],
		},
	} satisfies Record<string, { title: readonly [string, string]; blocks: readonly Block[] }>,

	cotation: {
		title: ['Demander', 'une cotation'],
		intro: 'Pour soumettre une cotation, veuillez sélectionner le service correspondant à votre demande :',
		kinds: [
			{
				key: 'cotationTransit',
				slug: 'transit',
				icon: 'douane',
				name: 'Cotation de transit en douane',
				title: ['Cotation de', 'transit en douane'],
				formTitle: 'Demander une cotation de transit',
				fields: [
					{ name: 'nom', label: 'Nom', type: 'text', required: true, half: true, autocomplete: 'name' },
					{ name: 'entreprise', label: 'Entreprise', type: 'text', required: true, half: true, autocomplete: 'organization' },
					{ name: 'telephone', label: 'Téléphone', type: 'tel', required: true, half: true, autocomplete: 'tel' },
					{ name: 'email', label: 'E-mail', type: 'email', required: true, half: true, autocomplete: 'email' },
					{ name: 'conteneurs', label: 'Nombre de conteneurs', type: 'number', required: true },
					{ name: 'informations', label: 'Informations supplémentaires', type: 'textarea' },
				],
			},
			{
				key: 'cotationInternational',
				slug: 'transport-international',
				icon: 'aerien',
				name: 'Cotation de transport international',
				title: ['Cotation de', 'transport international'],
				formTitle: 'Demander une cotation – Transport international',
				fields: [
					{ name: 'nom', label: 'Nom', type: 'text', required: true, half: true, autocomplete: 'name' },
					{ name: 'email', label: 'E-mail', type: 'email', required: true, half: true, autocomplete: 'email' },
					{ name: 'entreprise', label: 'Entreprise', type: 'text', required: true, half: true, autocomplete: 'organization' },
					{ name: 'telephone', label: 'Numéro de téléphone', type: 'tel', required: true, half: true, autocomplete: 'tel' },
					{
						name: 'mode',
						label: 'Mode de transport',
						type: 'select',
						required: true,
						half: true,
						options: ['Transport routier', 'Transport aérien', 'Transport maritime'],
					},
					{
						name: 'incoterm',
						label: 'Incoterm',
						type: 'select',
						required: true,
						half: true,
						options: ['EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF'],
					},
					{ name: 'enlevement', label: 'Lieu d’enlèvement', type: 'text', required: true, half: true },
					{ name: 'dechargement', label: 'Lieu de déchargement', type: 'text', required: true, half: true },
					{
						name: 'expedition',
						label: 'Type d’expédition',
						type: 'select',
						half: true,
						options: ['FCL (Full Container Load)', 'LCL (Groupage)'],
					},
					{
						name: 'conteneur',
						label: 'Type de conteneur',
						type: 'select',
						half: true,
						options: ['20’', '40’', '40’HC', 'Reefer'],
					},
					{ name: 'informations', label: 'Informations supplémentaires', type: 'textarea' },
				],
			},
			{
				// On the current site this page has a title and nothing under it: no form was ever put
				// there. Until the client says what it should hold, it sends visitors to the contact page.
				key: 'cotationNational',
				slug: 'transport-national',
				icon: 'routier',
				name: 'Cotation de transport national',
				title: ['Cotation de', 'transport national'],
				formTitle: '',
				fields: [],
			},
		] satisfies ReadonlyArray<{
			key: RouteKey;
			slug: string;
			icon: string;
			name: string;
			title: readonly [string, string];
			formTitle: string;
			fields: readonly FormField[];
		}>,
		submit: 'Envoyer',
	},

	tracking: {
		title: 'Tracking',
		intro:
			'Afin de garantir une transparence totale et une accessibilité facilitée à l’information, nous vous offrons la possibilité de suivre en temps réel le dédouanement de vos marchandises. Pour ce faire, il vous suffit de saisir la référence de votre dossier dans le champ dédié ci-dessous.',
		fields: [
			{ name: 'nom', label: 'Nom', type: 'text', required: true, half: true, autocomplete: 'name' },
			{ name: 'email', label: 'E-mail', type: 'email', required: true, half: true, autocomplete: 'email' },
			{ name: 'dossier', label: 'N° de dossier', type: 'text', required: true },
		] satisfies readonly FormField[],
		submit: 'Consulter',
		note: 'Si vous ne disposez pas de votre numéro de dossier, veuillez nous contacter. Nous nous ferons un plaisir de vous le fournir immédiatement.',
	},

	reclamation: {
		title: 'Réclamations',
		intro:
			'Dans le cadre de l’amélioration continue de notre qualité de service, nous avons centralisé la réception et le traitement des réclamations au niveau du site web à travers ce formulaire. Dès réception de votre réclamation, un accusé de réception contenant la référence de votre requête vous sera envoyé automatiquement.',
		lead: 'Pour soumettre une réclamation, veuillez remplir le formulaire ci-dessous.',
		fields: [
			{ name: 'nom', label: 'Nom', type: 'text', required: true, half: true, autocomplete: 'name' },
			{ name: 'email', label: 'E-mail', type: 'email', required: true, half: true, autocomplete: 'email' },
			{ name: 'entreprise', label: 'Entreprise', type: 'text', required: true, half: true, autocomplete: 'organization' },
			{ name: 'telephone', label: 'Téléphone', type: 'tel', required: true, half: true, autocomplete: 'tel' },
			{
				name: 'service',
				label: 'Le service concerné par votre réclamation',
				type: 'select',
				required: true,
				options: ['Transit', 'Transport international', 'Transport national'],
			},
			{ name: 'objet', label: 'Objet', type: 'text', required: true },
			{ name: 'details', label: 'Décrivez les détails de votre réclamation', type: 'textarea', required: true },
		] satisfies readonly FormField[],
		submit: 'Envoyer',
	},

	qualite: {
		eyebrow: 'Qualité',
		title: ['Notre politique', 'qualité'],
		description:
			'Notre politique qualité reflète nos principes de management et vise à assurer la satisfaction de nos clients et parties intéressées.',
		// The certificate, shown first on the page at the director's request. Its sentence is the
		// homepage's (the ISO message of the first screen); the facts are those of TÜV Rheinland's
		// register (Certipedia), where the button leads.
		certificate: {
			eyebrow: 'Certification',
			title: ['Certifié', 'ISO 9001:2015'],
			text: 'Notre certification ISO 9001 version 2015 de TÜV Maroc, filiale de TÜV Rheinland Allemagne, témoigne de notre engagement en faveur de la qualité de nos services.',
			facts: [
				{ term: 'Organisme certificateur', value: 'TÜV Rheinland' },
				// The certificate's number on TÜV Rheinland's register (Certipedia). 9000026569, which this
				// page gave until 2026-10-26, is the ID of the certification mark, where its QR code leads.
				{ term: 'N° de certificat', value: '01 100 2315350' },
				{ term: 'Périmètre', value: 'Dédouanement à l’import et à l’export' },
			],
			verify: 'Vérifier le certificat',
			verifyNote: 'sur le site de TÜV Rheinland',
			alt: 'Marque de certification TÜV Rheinland : système de management ISO 9001:2015, ID 9000026569',
		},
		intro: [
			{
				p: 'La politique qualité de notre entreprise vise à assurer la satisfaction de nos clients et partenaires, tout en garantissant la pérennité et la croissance de notre activité. Cette politique est fondée sur les principes de management de notre entreprise, qui s’appuient sur des valeurs clés telles que :',
			},
			{
				list: [
					'La satisfaction des clients',
					'La réalisation de prestations fiables',
					'Le développement des compétences de nos collaborateurs',
					'L’amélioration continue des performances',
				],
			},
		] satisfies readonly Block[],
		sections: [
			{
				title: 'La satisfaction de nos clients et parties intéressées',
				text: 'Nous accordons une priorité absolue à la satisfaction de nos clients et parties prenantes. Pour y parvenir, nous nous engageons à adapter en permanence notre offre de services à leurs besoins actuels et futurs.',
			},
			{
				title: 'La réalisation des prestations fiables',
				text: 'Nous sommes déterminés à poursuivre l’amélioration continue de la qualité de nos services. En effet, nous visons des prestations fiables, des coûts et des délais optimaux, ainsi que le respect des exigences légales et réglementaires. Pour y parvenir, nous mettons en place les moyens nécessaires.',
			},
			{
				title: 'Le développement des compétences des collaborateurs',
				text: 'Le développement des compétences de nos collaborateurs est également une priorité clé pour notre entreprise. Nous nous engageons à améliorer les conditions de travail et l’environnement de nos collaborateurs pour leur permettre de donner le meilleur d’eux-mêmes. Nous veillons également à mettre en place des formations régulières pour permettre à nos collaborateurs de développer leurs compétences et de contribuer à l’amélioration continue de la qualité de nos services.',
			},
			{
				title: 'L’amélioration continue',
				text: 'Notre politique qualité est un engagement de tous les jours. En effet, elle doit être précise et formelle, avec des objectifs clairs et des moyens mis en place pour les atteindre. Ainsi, nous ne pouvons la mettre en place qu’en impliquant activement l’ensemble du personnel de l’entreprise et de nos partenaires.',
			},
		],
		conclusion:
			'En somme, notre politique qualité vise à assurer la satisfaction de tous nos partenaires tout en garantissant la pérennité et la croissance de notre entreprise. Nous nous basons sur des valeurs clés telles que la satisfaction des clients, la réalisation de prestations fiables, le développement des compétences de nos collaborateurs et l’amélioration continue des performances. Nous avons mis en place cette politique avec des objectifs précis et des moyens concrets pour les atteindre. Elle ne peut être mise en œuvre que grâce à l’implication de tous les acteurs de notre entreprise.',
	},

	// The company's presentation (pages/presentation-de-l-entreprise.astro): the client's own
	// document, "Présentation de l’entreprise version française VF" (PowerPoint, January 2023,
	// kept as reference/presentation-entreprise.pdf), turned into a page at the client's request.
	// Its six parts follow the document's summary. Its wording is the document's, with only
	// spelling, accents, capitals and typography corrected: "Qui somme nous" is "Qui sommes-nous",
	// "TUV" is "TÜV", "A travers" is "À travers", "permet" is "permettent" after its two subjects,
	// "EX-Inspecteur des Douanes" is "Ex-inspecteur des douanes", numbers are written as on the
	// rest of the site. Where the document sets the logo inside a sentence, the company's name
	// stands, as on the homepage. Its cover and its last slide (the logo with the motto) are the
	// page's head and its closing line; its "Merci" slide, with the contacts, is the column's help
	// card (its e-mail address, manal.accesstransit@gmail.com, is not the site's).
	presentation: {
		title: ['Présentation de', 'l’entreprise'],
		toc: 'Sommaire',
		about: {
			title: 'Qui sommes-nous ?',
			items: [
				{
					icon: 'users-three',
					text: 'Dès sa création, ACCESS TRANSIT regroupe une équipe de cadres expérimentés ayant une grande maîtrise des procédures et réglementations relatives aux techniques douanières et au commerce international. Cela nous permet d’occuper une position de leader dans notre secteur d’activité.',
				},
				{
					icon: 'chart-line-up',
					text: 'Notre engagement en faveur de la célérité et de la transparence contribue à améliorer la compétitivité de nos clients dans un environnement de plus en plus concurrentiel.',
				},
				{
					icon: 'shield-check',
					text: 'Notre certification ISO 9001 version 2015 de TÜV Maroc, filiale de TÜV Rheinland Allemagne, témoigne de notre engagement en faveur de la qualité de nos services.',
				},
			] satisfies ReadonlyArray<{ icon: IconName; text: string }>,
		},
		services: {
			title: 'Nos prestations',
			intro: 'Nous offrons à nos clients des services personnalisés et un pilotage systématique de chaque opération en totale conformité avec les réglementations en vigueur et en application des normes et des bonnes pratiques professionnelles :',
			list: [
				'Dédouanement import',
				'Dédouanement export',
				'Conseil en négoce international',
				'Conseil & rédaction de contrats internationaux',
				'Conseil en commerce international',
				'Choix des fournisseurs',
				'Simulations des coûts',
				'Conseil en gestion de chaîne logistique',
				'Conseil et accompagnement des investissements d’envergure',
			],
			transport: 'Notre société offre aussi une large gamme de services en transport international & national pour répondre à tous vos besoins. À travers son réseau d’agents et ses partenaires nationaux & internationaux, soigneusement sélectionnés et répartis sur tous les continents.',
			// The three cards lead to the pages of the services.
			modes: [
				{ key: 'routier', title: 'Transport routier', text: 'Nous garantissons un service de transport terrestre régulier entre le Maroc et l’Europe.' },
				{ key: 'maritime', title: 'Transport maritime', text: 'Nous assurons vos opérations de transport maritime par mer depuis les différents ports du monde.' },
				{ key: 'aerien', title: 'Transport aérien', text: 'Notre équipe en fret aérien vous offre un service personnalisé sur tous les aéroports européens et internationaux.' },
			] satisfies ReadonlyArray<{ key: RouteKey; title: string; text: string }>,
		},
		skills: {
			title: 'Nos compétences',
			text: 'ACCESS TRANSIT tire sa force de l’expertise et de la coordination de ses filiales. Une parfaite maîtrise des procédures et un degré de synergie très élevé entre les filiales permettent au groupe d’offrir des prestations de qualité à des coûts compétitifs.',
			list: ['Freight forwarding', 'Transit', 'Transport & affrètement', 'Logistique d’entreposage', 'Logistique de distribution'],
		},
		// The addresses are the site's (data/site.ts), which are the document's.
		addresses: { title: 'Nos adresses', cities: ['Casablanca', 'Tanger'] },
		director: {
			toc: 'Directeur général',
			name: 'Mohamed EZZAHRAOUI',
			role: 'Directeur général',
			photoAlt: 'Mohamed EZZAHRAOUI, directeur général d’ACCESS TRANSIT',
			// The document's two boxes: what he does, then his degrees. They have no titles there.
			career: [
				'Auditeur international certifié IRCA ISO 9001, 14001, 45001 (TÜV Rheinland).',
				'Consultant en commerce international.',
				'Ex-inspecteur des douanes (1998–2008).',
			],
			education: [
				'Titulaire d’un mastère en Commerce & Management des affaires internationales à l’université de Lille I.',
				'Diplômé du cycle supérieur de Commerce International à l’ISCAE.',
				'Titulaire d’un CES ès Relations Économiques Internationales à l’université Hassan II à Casablanca.',
			],
			// His own numbers and addresses, as the document gives them (2023).
			contact: 'Contact',
			phones: ['+212 6 67 12 23 53', '+212 6 61 33 93 56'],
			email: 'ezzahraoui1@gmail.com',
			linkedin: 'https://www.linkedin.com/in/mohamed-ezzahraoui-11ab9960/',
			labels: { phone: 'Téléphone :', email: 'E-mail :', linkedin: 'LinkedIn' },
		},
		motto: 'Notre force, votre atout',
	} satisfies PresentationText,

	// The blog's own texts. The articles are not here: each is a Markdown file in src/content/blog/
	// (README.md, "Writing an article"). The intro and the categories' lines came with the blog's
	// plan, which the client approved.
	blog: {
		title: ['Le blog', 'ACCESS TRANSIT'],
		intro: 'La réglementation douanière, le transport international et des conseils pratiques pour vos opérations d’import et d’export.',
		featured: 'À la une',
		all: 'Tous les articles',
		categoriesNav: 'Catégories du blog',
		categoryLabel: 'Catégorie',
		readMore: 'Lire l’article',
		minutes: 'min de lecture',
		writtenBy: 'Écrit par',
		contactAuthor: 'Contacter notre équipe',
		toc: 'Sommaire',
		share: 'Partager',
		shareOn: 'Partager sur',
		copyLink: 'Copier le lien',
		copied: 'Lien copié',
		related: 'À lire aussi',
		back: 'Retour au blog',
		empty: 'Aucun article dans cette catégorie pour le moment.',
		soon: 'Les prochains articles paraîtront ici.',
		newer: 'Articles plus récents',
		older: 'Articles plus anciens',
		page: 'Page',
		service: 'Notre service',
		discoverService: 'Découvrir le service',
		// The categories (approved by the client; the company's news have since moved to the
		// Actualités page). Their keys are the end of their address, /category/<key>/:
		// "import-export" is the current site's.
		categories: {
			'douane-reglementation': { name: 'Douane & réglementation', description: 'Procédures, régimes et réglementation douanière au Maroc.' },
			'transport-international': { name: 'Transport international', description: 'Transport maritime, aérien et routier entre le Maroc et le monde.' },
			'import-export': { name: 'Import-Export', description: 'Le commerce international et ses enjeux pour les entreprises marocaines.' },
			'guides-pratiques': { name: 'Guides pratiques', description: 'Des explications pas à pas pour préparer vos opérations.' },
		},
	},

	// The Actualités page: the company's news, its notices to clients, its events and
	// certifications. Each news item is a Markdown file in src/content/actualites/.
	actualites: {
		title: ['Actualités', 'ACCESS TRANSIT'],
		intro: 'Les nouvelles d’ACCESS TRANSIT, nos avis aux clients, nos événements et nos certifications.',
		featured: 'À la une',
		latest: 'Dernières actualités',
		notices: 'Avis aux clients',
		all: 'Toutes les actualités',
		filterAll: 'Toutes',
		filterLabel: 'Afficher',
		// Read out when a filter is chosen: "3 actualités".
		count: ['actualité', 'actualités'],
		readMore: 'Lire la suite',
		empty: 'Les premières actualités paraîtront ici.',
		others: 'Autres actualités',
		back: 'Retour aux actualités',
		types: {
			entreprise: 'Entreprise',
			'avis-clients': 'Avis aux clients',
			evenements: 'Événements',
			certifications: 'Certifications',
		},
		press: {
			title: 'Espace presse',
			text: 'Journalistes et partenaires : nos contacts, notre logo et nos documents.',
			contact: 'Contact presse',
			kit: 'Kit média',
			logo: 'Logo ACCESS TRANSIT',
			certificate: 'Certificat ISO 9001:2015',
			follow: 'Suivez-nous',
			linkedin: 'ACCESS TRANSIT sur LinkedIn',
		},
	},

	// The import duties simulator (pages/e-services/simulateur.astro), asked for by the client on
	// 2026-11-01: new copy, not on the current site. Its fields are those of Mirage's calculator (the
	// client's reference); its calculation is the company's (L99 rules, data/simulateur.ts). The
	// client wants the page plain: short labels, no explanations ("lève les écritures
	// supplémentaires"). {…} are filled in by the page's script.
	simulateur: {
		title: ['Simulateur des droits', 'et taxes à l’import'],
		description:
			'Estimez les droits et taxes de votre importation au Maroc : valeur en douane, droit d’importation, taxe parafiscale, TIC et TVA.',
		intro: 'Estimez les droits et taxes de votre importation au Maroc.',
		// The five steps of the form.
		steps: {
			invoice: 'Facture et change',
			value: 'Incoterm et valeur en douane',
			duty: 'Droit d’importation',
			other: 'Autres droits et taxes',
			vat: 'TVA à l’importation',
		},
		fields: {
			invoice: 'Montant de la facture ({currency})',
			currency: 'Devise',
			rate: 'Taux de change (MAD pour 1 {currency})',
			incoterm: 'Incoterm',
			freight: 'Fret',
			insurance: 'Assurance',
			glass: 'Marchandise en verre',
			amountCurrency: 'Devise',
			mad: 'MAD',
			aconage: 'Aconage en MAD',
			dutyRate: 'Droit d’importation (%)',
			origin: 'Origine',
			originCommon: 'Droit commun',
			originPreferential: 'Origine préférentielle',
			preferentialRate: 'Taux préférentiel (%)',
			pfi: 'Taxe parafiscale (TPI 0,25 %)',
			tic: 'TIC en MAD',
			otherDuties: 'Autres droits en MAD',
			vatRate: 'TVA',
			// Short notes under the fields where the visitor needs them (small type).
			rateHint: 'Le cours de référence de Bank Al-Maghrib du jour.',
			insuranceHint: 'Sans montant, nous retenons un forfait de 0,3 % de la facture et du fret (3 % pour le verre).',
			aconageHint: 'Frais portuaires locaux. Sans montant, nous retenons une estimation de 3 600 MAD.',
			dutyRateHint: 'Le taux de la position tarifaire de votre marchandise.',
			preferentialHint: 'Avec une preuve d’origine valide : EUR.1, EUR-MED, certificat d’origine.',
			pfiHint: 'Due sur toute importation : laissez-la cochée, sauf si un accord en exonère votre marchandise.',
			ticHint: 'Seulement si votre produit y est soumis.',
		},
		vatRates: ['20 %', '10 %', '0 %'],
		// The Incoterms in the list: their French names (Incoterms 2020).
		incoterms: {
			EXW: 'EXW, à l’usine',
			FCA: 'FCA, franco transporteur',
			FAS: 'FAS, franco le long du navire',
			FOB: 'FOB, franco à bord',
			CFR: 'CFR, coût et fret',
			CPT: 'CPT, port payé jusqu’à',
			CIF: 'CIF, coût, assurance et fret',
			CIP: 'CIP, port payé, assurance comprise',
			DAP: 'DAP, rendu au lieu de destination',
			DPU: 'DPU, rendu au lieu de destination déchargé',
			DDP: 'DDP, rendu droits acquittés',
		},
		currencies: { EUR: 'EUR', USD: 'USD', CNY: 'CNY', GBP: 'GBP', TRY: 'TRY', AED: 'AED', MAD: 'MAD' },
		// The button that shows the result.
		submit: 'Estimer les coûts',
		result: {
			title: 'Estimation',
			missing: 'À renseigner : {fields}.',
			// How the missing fields are named in that sentence.
			short: { invoice: 'montant de la facture', rate: 'taux de change', incoterm: 'Incoterm', freight: 'fret', dutyRate: 'droit d’importation', preferentialRate: 'taux préférentiel', insurance: 'assurance', aconage: 'aconage', tic: 'TIC', otherDuties: 'autres droits' },
			total: 'Droits et taxes à payer',
			totalBySeller: 'Droits et taxes, à la charge du vendeur (DDP)',
			unit: 'MAD',
			ved: 'Valeur en douane',
			landed: 'Coût total dédouané',
			saving: 'Économie par rapport au droit commun : {amount} MAD.',
			details: 'Détail du calcul',
			included: 'Inclus',
			lines: {
				goods: 'Facture en dirhams',
				freight: 'Fret',
				insurance: 'Assurance',
				aconage: 'Aconage',
				ved: 'Valeur en douane (CAF)',
				duty: 'Droit d’importation',
				pfi: 'Taxe parafiscale',
				tic: 'TIC',
				otherDuties: 'Autres droits',
				vatBase: 'Base de la TVA',
				vat: 'TVA',
				total: 'Total droits et taxes',
			},
			insuranceBasis: { given: '', rate: 'forfait 0,3 %', glass: 'forfait 3 %' },
			aconageEstimated: 'estimation',
			disclaimer: 'Estimation indicative.',
		},
		// After the result: for an exact figure, the company's e-mail and phone, which open the visitor's
		// mail or call them (the client asked for this in place of a call-back form).
		contact: {
			title: 'Besoin d’une estimation précise et détaillée ?',
			text: 'Nos déclarants classent votre marchandise, calculent le droit d’importation et vous remettent un chiffrage complet. Contactez-nous :',
			emailLabel: 'Écrire à',
			phoneLabel: 'Appeler le',
			// The subject of the e-mail the link opens.
			subject: 'Estimation des droits et taxes à l’importation',
		},
		// Under the simulator: questions on the simulator and its calculation (the company's rules,
		// data/simulateur.ts: change an answer when a rate changes).
		faq: {
			title: ['Questions', 'fréquentes'],
			items: [
				{
					q: 'Comment le simulateur calcule-t-il les droits et taxes ?',
					a: 'Il part de la valeur en douane (CAF) de votre marchandise, puis y applique le droit d’importation, la taxe parafiscale, la TIC éventuelle et la TVA à l’importation. Le détail ligne par ligne s’affiche sous l’estimation.',
				},
				{
					q: 'Qu’est-ce que la valeur en douane (CAF) ?',
					a: 'C’est la valeur de la marchandise à son arrivée au Maroc : le montant de la facture converti en dirhams, augmenté du fret, de l’assurance et de l’aconage, arrondi au dirham supérieur. Tous les droits et taxes sont calculés sur cette base.',
				},
				{
					q: 'Quel taux de change indiquer ?',
					a: 'Le cours de référence publié par Bank Al-Maghrib. Le simulateur propose un cours indicatif : remplacez-le par celui du jour pour une estimation plus juste. Si votre facture est en dirhams, aucun taux n’est demandé.',
				},
				{
					q: 'Pourquoi le fret n’est-il demandé que pour certains Incoterms ?',
					a: 'Avec EXW, FCA, FAS et FOB, la facture ne comprend pas le transport jusqu’au Maroc : il faut l’ajouter à la valeur en douane. Indiquez le montant de votre facture de fret, il n’est jamais estimé. Avec les autres Incoterms, le fret est déjà compris dans la facture.',
				},
				{
					q: 'Je ne connais pas le montant de l’assurance : que faire ?',
					a: 'Laissez le champ vide : le simulateur retient un forfait de 0,3 % de la facture et du fret, ou de 3 % pour le verre et les produits en verre.',
				},
				{
					q: 'Qu’est-ce que l’aconage ?',
					a: 'Ce sont les frais portuaires locaux : manutention, passage, stationnement, sûreté… Ils entrent dans la valeur en douane. Sans montant, le simulateur retient une estimation de 3 600 MAD.',
				},
				{
					q: 'Où trouver le taux du droit d’importation ?',
					a: 'Il dépend de la position tarifaire de votre marchandise, dans le tarif des douanes. Si vous ne la connaissez pas, nos déclarants la déterminent pour vous.',
				},
				{
					q: 'Qu’est-ce que l’origine préférentielle ?',
					a: 'Une marchandise originaire d’un pays lié au Maroc par un accord de libre-échange (Union européenne, Turquie, États-Unis…) peut bénéficier d’un droit réduit ou nul, à condition de présenter une preuve d’origine valide (EUR.1, EUR-MED, certificat d’origine). Le simulateur indique alors l’économie réalisée par rapport au droit commun.',
				},
				{
					q: 'Pourquoi la taxe parafiscale est-elle cochée ?',
					a: 'La taxe parafiscale à l’importation (TPI) est due sur toute importation, à 0,25 % de la valeur en douane. Ne la décochez que si un accord en exonère votre marchandise.',
				},
				{
					q: 'Comment la TVA à l’importation est-elle calculée ?',
					a: 'Elle s’applique à la valeur en douane augmentée du droit d’importation, de la taxe parafiscale, de la TIC et des autres droits d’entrée. Le taux normal est de 20 % ; certains produits relèvent du taux réduit de 10 % ou sont exonérés.',
				},
				{
					q: 'L’estimation vaut-elle déclaration en douane ?',
					a: 'Non. Elle est indicative : le montant définitif dépend de la position tarifaire, de la validité de la preuve d’origine, du cours du jour et des frais réellement engagés. Pour un chiffrage exact, contactez nos déclarants.',
				},
			],
		},
	},

	// The pages added to the menu and still to be built (ComingSoon.astro): what they say meanwhile.
	soon: {
		text: 'Cette page est en cours de préparation. Elle sera bientôt disponible.',
	},

	contact: {
		title: 'Contact',
		team: 'Contactez notre équipe :',
		// The team, as the director drew it (TeamDiagram.astro): the general manager in the middle,
		// seven people round him. Names and roles are the director's diagram, spelled out ("DG" is
		// "directeur général", "ex" is "exploitation", as on the current site); names are written
		// family name first, in capitals, as on the current site's contact page. The diagram's numbers
		// and addresses (all "@societe.ma", numbers that run 12 34 56 78) are samples: they are not
		// used. The seven's own mobile numbers and addresses were sent by the client (2026-10-26). The
		// director's are still to come: null, and `pending` stands in their place. The photos are still
		// to come too.
		// "key" is how an article of the blog names its author (author: fahmi-larbi).
		director: { key: 'ezzahraoui-mohamed', name: 'M. EZZAHRAOUI Mohamed', role: 'Directeur général', phone: null, email: null },
		// Shown in place of a number and an address not sent yet.
		pending: 'Coordonnées à venir',
		members: [
			{ key: 'fahmi-larbi', name: 'FAHMI Larbi', role: 'Directeur général délégué', icon: 'users-three', phone: '+212 6 61 95 39 47', email: 'fahmilarbi@gmail.com' },
			{ key: 'fahmi-omar', name: 'FAHMI Omar', role: 'Chef des déclarants', icon: 'customs-file', phone: '+212 6 61 30 19 41', email: 'omarfahmi49@gmail.com' },
			{ key: 'beidouri-zohra', name: 'BEIDOURI Zohra', role: 'Responsable d’exploitation commerciale', icon: 'chart-line-up', phone: '+212 6 61 33 89 64', email: 'z.access21@gmail.com' },
			{ key: 'boussry-khadija', name: 'BOUSSRY Khadija', role: 'Responsable transport national', icon: 'truck', phone: '+212 6 62 37 54 98', email: 'khadijabousry25@gmail.com' },
			{ key: 'ouatid-ghizlane', name: 'OUATID Ghizlane', role: 'Suppléante, exploitation commerciale', icon: 'users-three', phone: '+212 6 61 39 25 03', email: 'gouatid@gmail.com' },
			{ key: 'sabir-hind', name: 'SABIR Hind', role: 'Responsable administrative et financière', icon: 'coins', phone: '+212 6 62 38 05 33', email: 'sabir.accesstransit@gmail.com' },
			{ key: 'laaraj-ibtissam', name: 'LAARAJ Ibtissam', role: 'Responsable transport international', icon: 'globe', phone: '+212 6 61 83 16 39', email: 'ibtissamlj.accesstransit@gmail.com' },
		] satisfies ReadonlyArray<{ key: string; name: string; role: string; icon: IconName; phone: string | null; email: string | null }>,
	},
};

export default pages;
