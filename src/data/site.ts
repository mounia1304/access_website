// Company facts shared by every page and language.
// Everything here is copied from the current access-transit.com site.

export const site = {
	name: 'Access Transit',
	brand: 'ACCESS TRANSIT', // how the company writes its own name in running text
	url: 'https://access-transit.com',
	founded: 2010,
	email: 'contact@access-transit.com',
	// One landline, written the two ways the current site writes it.
	phone: { display: '+212 5 22 24 17 17', short: '+212 522 241 717', href: 'tel:+212522241717' },
	mobile: { display: '+212 6 62 39 86 48', href: 'tel:+212662398648' },
	linkedin: 'https://www.linkedin.com/company/access-transit',
	// The page of the company's ISO 9001 certificate on TÜV Rheinland's own register (Certipedia):
	// the QR code of the certification mark leads there.
	certificate: 'https://www.certipedia.com/quality_marks/9000026569',
	// Google's map of the company, as embedded on the current site's homepage.
	map: 'https://maps.google.com/maps?q=Access%20transit&t=m&z=15&output=embed&iwloc=near',
	location: 'Casablanca, MAROC',
	hours: 'Lun - Ven 8H30-17H30',
	// Addresses exactly as published (the Tanger wording is to be confirmed by the client).
	addresses: [
		'126 Avenue Ambassadeur Ben Aicha 3ème Etage N° 5 Roches Noires Casablanca 20290',
		'8 RUE FARABIE Immeuble 6-ème étage N° 18B Tanger',
	],
	// Head office, split into fields for search engines.
	postalAddress: {
		streetAddress: '126 Avenue Ambassadeur Ben Aicha, 3ème étage N° 5, Roches Noires',
		postalCode: '20290',
		addressLocality: 'Casablanca',
		addressCountry: 'MA',
	},
} as const;
