// English copy of the inner pages. For now only the company's presentation
// (pages/en/company-presentation.astro): the rest of the English site comes in phase 3.
//
// It is the client's own document, "ACCESS TRANSIT Presentation English version VF" (PowerPoint,
// January 2023, kept as reference/company-presentation-en.pdf), the translation of the French one,
// turned into a page at the client's request. Its wording is the document's, with only spelling,
// capitals and punctuation corrected: "TUV" is "TÜV", "allows" is "allow" after its two subjects,
// "EX-Customs Inspector" is "Ex-Customs Inspector", "Your" after a comma is "your", a stray comma
// before "serves" is gone, numbers are written as on the rest of the site. Where the document sets
// the logo inside a sentence, the company's name stands. The interface labels that are not in
// the document (the summary's label, what is read out to screen readers) are translations of the
// French page's.

import type { PresentationText } from './fr.pages';

const pages = {
	presentation: {
		title: ['ACCESS TRANSIT', 'Presentation'],
		toc: 'Contents',
		about: {
			title: 'Who Are We?',
			items: [
				{
					icon: 'users-three',
					text: 'Since its creation, ACCESS TRANSIT has assembled a highly skilled and experienced management team with a deep understanding of customs procedures and regulations related to international trade. This has enabled us to establish ourselves as a leading player in our field.',
				},
				{
					icon: 'chart-line-up',
					text: 'Our commitment to efficiency and transparency enhances the competitiveness of our clients in an increasingly competitive environment.',
				},
				{
					icon: 'shield-check',
					text: 'Our ISO 9001 version 2015 certification from TÜV Rheinland Germany serves as proof of our dedication to providing high-quality services.',
				},
			],
		},
		services: {
			title: 'Our Services',
			intro: 'We provide personalized services to our clients, managing each operation in compliance with regulations and industry standards. Our services include:',
			list: [
				'Import customs clearance',
				'Export customs clearance',
				'International trade consulting',
				'Drafting of international contracts',
				'International commerce consulting',
				'Supplier selection',
				'Cost simulations',
				'Supply chain management consulting',
				'Investment advice and support for large-scale investments',
			],
			transport: 'Our company also offers a wide range of international and domestic transportation services to meet all your needs. Through its network of agents and carefully selected national and international partners spanning all continents, we are able to provide comprehensive transportation solutions.',
			// The cards lead to the French pages of the services: there are no English ones yet.
			modes: [
				{ key: 'routier', title: 'Land transportation', text: 'We guarantee regular land transportation service between Morocco and Europe.' },
				{ key: 'maritime', title: 'Sea transportation', text: 'We offer comprehensive sea transportation services from a wide range of ports globally.' },
				{ key: 'aerien', title: 'Air transportation', text: 'Our air freight team provides a tailored service at all European and international airports.' },
			],
		},
		skills: {
			title: 'Our Competencies',
			text: 'ACCESS TRANSIT draws its strength from the expertise and coordination of its subsidiaries. Perfect mastery of procedures and a high degree of synergy between subsidiaries allow the group to offer high-quality services at competitive costs.',
			list: ['Freight Forwarding', 'Customs Clearance', 'Transportation & Chartering', 'Warehousing', 'Distribution'],
		},
		references: { title: 'Our Portfolio' },
		// The document's own English wording of the two addresses.
		addresses: {
			title: 'Our Locations',
			cities: ['Casablanca', 'Tangier'],
			lines: ['126 Ambassador Ben Aicha Avenue, 3rd Floor, No. 5, Roches Noires, Casablanca 20290', '8 FARABIE STREET, Building 6th Floor, No. 18B, Tangier'],
		},
		director: {
			toc: 'CEO',
			name: 'Mohamed EZZAHRAOUI',
			role: 'CEO',
			photoAlt: 'Mohamed EZZAHRAOUI, CEO of ACCESS TRANSIT',
			career: [
				'Certified International Auditor IRCA ISO 9001, 14001, 45001 (TÜV Rheinland).',
				'International trade consultant.',
				'Ex-Customs Inspector (1998–2008).',
			],
			education: [
				'Holder of a Master’s degree in Business and International Management from Lille I University.',
				'Graduated from the Higher Cycle in International Commerce at ISCAE.',
				'Holder of a CES in International Economic Relations from Hassan II University in Casablanca.',
			],
			contact: 'Contact',
			phones: ['+212 6 67 12 23 53', '+212 6 61 33 93 56'],
			email: 'ezzahraoui1@gmail.com',
			linkedin: 'https://www.linkedin.com/in/mohamed-ezzahraoui-11ab9960/',
			labels: { phone: 'Phone:', email: 'E-mail:', linkedin: 'LinkedIn' },
		},
		motto: 'Our power, your asset',
	} satisfies PresentationText,
	// What the page reads out or shows round the document: translations of the French page's.
	certificate: {
		alt: 'TÜV Rheinland certification mark: ISO 9001:2015 management system, ID 9000026569',
		verify: 'Verify the certificate on TÜV Rheinland’s website',
	},
	external: 'opens in a new tab',
};

export default pages;
