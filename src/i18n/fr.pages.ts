// French copy of the inner pages (services, online services, quality policy, blog, contact).
//
// The wording is the wording of the same pages of the current access-transit.com, with only
// spelling, typography and capitals corrected ("Marise des délais" is "Maîtrise des délais",
// "INCOTERME" is "Incoterm", "n'hésitez pas de" is "n'hésitez pas à"...). Do not rewrite it
// without the client's say-so.
//   is a non-breaking space (before : ; ! ?).

import type { RouteKey } from './routes';

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

	// The column beside the text of a service page.
	aside: {
		trades: 'Nos métiers',
		documents: 'Documents',
		// The two presentations are files the company keeps on Google Drive, as on the current site.
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
				{ term: 'N° de certificat', value: '9000026569' },
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

	blog: {
		title: 'Blog',
		readMore: 'Lire la suite',
		back: 'Retour au blog',
		// One article so far, as on the current site. Its address is the one it has there.
		posts: [
			{
				slug: 'reduire-les-delais-dattente-pour-lexport-enjeu-crucial-pour-limage-de-marque-du-maroc-en-tant-que-destination',
				category: 'Import Export',
				date: '2023-02-22',
				dateText: '22 février 2023',
				title:
					'Réduire les délais d’attente pour l’export : enjeu crucial pour l’image de marque du Maroc en tant que destination d’exportation',
				subtitle: 'File d’attente au port de Tanger Med',
				paragraphs: [
					'Les délais d’attente sur les plateformes d’exportation au niveau des ports marocains, tels que Tanger Med, s’allongent pour les transporteurs, impactant la compétitivité des produits marocains. Les autorités portuaires, notamment la Douane, sont appelées à agir pour remédier à cette situation qui est devenue la norme dans le premier port africain et méditerranéen. Les camions sont souvent contraints de patienter sur les plateformes d’exportation pendant 24 heures au lieu de 4 heures, ce qui affecte les produits transportés et les coûts de conditionnement, notamment pour les produits périssables. Les transporteurs et opérateurs économiques préconisent des solutions durables, notamment la catégorisation qui permettrait une meilleure performance dans le traitement des opérations de dédouanement de marchandises. Le port Tanger Med tente de simplifier ses procédures en dématérialisant les formalités du passage portuaire à l’import et à l’export depuis novembre 2021.',
					'Cependant, la dématérialisation des procédures ne suffit pas à elle seule à résoudre les problèmes d’attente et de congestion sur les plateformes d’exportation. D’autres mesures doivent être mises en place pour améliorer la fluidité des échanges commerciaux. Les autorités portuaires et douanières devraient collaborer étroitement avec les transporteurs et les opérateurs économiques pour identifier les goulots d’étranglement et trouver des solutions adaptées. Parmi les solutions envisageables, on peut citer l’augmentation des capacités d’accueil des ports, l’amélioration des infrastructures routières et ferroviaires, la réduction des délais de traitement des formalités douanières et la mise en place d’une gestion plus efficace des flux de marchandises.',
					'Enfin, il est important de souligner que les délais d’attente sur les plateformes d’exportation ne sont pas seulement un problème pour les transporteurs et les opérateurs économiques, mais également pour l’image de marque du Maroc en tant que destination d’exportation. Les retards dans la livraison des produits peuvent affecter la satisfaction des clients étrangers et nuire à la compétitivité des produits marocains sur les marchés internationaux. Il est donc essentiel que les autorités concernées prennent rapidement des mesures pour améliorer la fluidité des échanges commerciaux et préserver la réputation du Maroc en tant que pays exportateur fiable et compétitif.',
				],
			},
		],
	},

	contact: {
		title: 'Contact',
		team: 'Contactez notre équipe :',
		// Names, roles, addresses and numbers as published on the contact page of the current site.
		people: [
			{ name: 'BEIDOURI Zohra', role: 'Responsable d’exploitation commerciale', email: 'z.accesstransit@gmail.com', phone: '+212 5 22 24 17 17' },
			{ name: 'SNOUSSI Manal', role: 'Responsable de développement commercial', email: 'manal.accesstransit@gmail.com', phone: '+212 5 22 24 17 17' },
			{ name: 'LAARAJ Ibtissam', role: 'Responsable de transport international', email: 'ibtissamlj.accesstransit@gmail.com', phone: '+212 5 22 24 17 17' },
			{ name: 'EL BALGHITI Yassine', role: 'Responsable management qualité', email: 'yassineelbalghiti@gmail.com', phone: '+212 5 22 24 17 17' },
			{ name: 'EL ALLAM Younes', role: 'Responsable logistique', email: 'youneselallam1@gmail.com', phone: '+212 6 62 68 44 07' },
			{ name: 'FAHMI Laarbi', role: 'Directeur délégué', email: 'fahmilarbi@gmail.com', phone: '+212 5 22 24 17 17' },
		],
	},
};

export default pages;
