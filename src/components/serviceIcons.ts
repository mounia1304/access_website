// The four service icons, drawn by hand for this site (ServiceIcon.astro shows them). The client
// asked for icons that look made by a designer, in place of glass tiles that read as generated.
// The three online services (EServices.astro) have theirs in the same family.
//
// ONE FAMILY, ON ONE GRID. Each icon is drawn in a box of 64 by 64, with the same line (2.5
// wide, round ends and round corners) and the same three layers:
//   fill   the silhouette of the thing, flat and pale, printed a little off its outline (down and
//          to the right), like a second colour that missed its register on a shipping label;
//   lines  the thing itself, in the logo's blue;
//   mark   what it does, in the logo's orange: the seal that clears a file, the speed of a
//          lorry, the trail of a plane, the swell under a ship. Every path of this layer has
//          pathLength="1": ServiceIcon.astro draws them again when the icon is set going.
// An element with class "k" is filled with the colour of what the icon lies on, so that it
// hides the lines under it (the wheels over the lorry's floor); "k0" does the same without an
// outline (the clear ring round the seal). In the mark, "late" starts a moment after the rest.
//
// To add an icon, keep to the grid: 6 clear all round, tops and feet on whole or half units.

export interface DrawnIcon {
	fill: string;
	lines: string;
	mark: string;
}

// The plane is drawn pointing up, then turned an eighth of a turn; it is moved a little towards
// the top right corner, which leaves the opposite corner to its trail.
const PLANE =
	'M32 5.5C34.6 5.5 36 9.3 36 13.5V24.5L56 36.4Q57.6 37.4 57.6 39V40.6L36 36.6V47L43.5 52V55L35 53.4 32 57.5 29 53.4 20.5 55V52L28 47V36.6L6.4 40.6V39Q6.4 37.4 8 36.4L28 24.5V13.5C28 9.3 29.4 5.5 32 5.5Z';
const TURNED = 'transform="translate(3 -3) rotate(45 32 32)"';

const DOCUMENT = 'M17 9H33L43 19V49a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4Z';
const BOX = '<rect x="15" y="18" width="28" height="23" rx="3"/>';
const CAB = 'M43 26h7.2a3 3 0 0 1 2.5 1.3l5 7.4a3 3 0 0 1 .5 1.7V41H43Z';
const HULL = 'M6 30.5H58L52.4 40.3a3.4 3.4 0 0 1-3 1.7H12a3.4 3.4 0 0 1-3.3-2.5Z';
const BRIDGE = 'M9.5 30.5V21a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v9.5';
const CARGO = 'M24 30.5V19.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V24h7a2 2 0 0 1 2 2v4.5';
const CALCULATOR = '<rect x="16" y="7" width="32" height="48" rx="5"/>';
const PIN = 'M41 40c-6.2-6.6-10.5-13.8-10.5-20.5a10.5 10.5 0 0 1 21 0c0 6.7-4.3 13.9-10.5 20.5Z';
const BUBBLE = 'M15 10H47a6 6 0 0 1 6 6V35a6 6 0 0 1-6 6H27l-9 8.5V41h-3a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z';

export const serviceIcons = {
	// Customs clearance: the file, and the seal that clears it.
	douane: {
		fill: `<path d="${DOCUMENT}"/>`,
		lines: `<path d="${DOCUMENT}"/><path d="M33 9v6a4 4 0 0 0 4 4h6"/><path d="M20 28h15M20 35h11M20 42h7"/>`,
		mark:
			'<circle class="k0" cx="43" cy="44" r="13"/>' +
			'<path pathLength="1" d="M43 34.5a9.5 9.5 0 1 1 0 19a9.5 9.5 0 1 1 0-19"/>' +
			'<path class="late" pathLength="1" d="M38.6 44.2l3.1 3.1 5.8-6.4"/>',
	},
	// Road: a lorry, its box and its cab, and the lines of its speed.
	routier: {
		fill: `${BOX}<path d="${CAB}"/>`,
		lines:
			`${BOX}<path d="${CAB}"/><path d="M48 26v8.5h9.5"/>` +
			'<circle class="k0" cx="24" cy="43.5" r="7"/><circle class="k0" cx="50.5" cy="43.5" r="7"/>' +
			'<circle class="k" cx="24" cy="43.5" r="4.5"/><circle class="k" cx="50.5" cy="43.5" r="4.5"/>',
		mark: '<path pathLength="1" d="M10.5 25h-5"/><path pathLength="1" d="M10.5 31.5H3"/><path pathLength="1" d="M10.5 38h-4"/>',
	},
	// Air: a plane on its way up, and its trail.
	aerien: {
		fill: `<path ${TURNED} d="${PLANE}"/>`,
		lines: `<path ${TURNED} d="${PLANE}"/>`,
		mark:
			`<path pathLength="1" ${TURNED} d="M32 61.5v5.5"/><path pathLength="1" ${TURNED} d="M26.4 59v3.5"/>` +
			`<path pathLength="1" ${TURNED} d="M37.6 59v3.5"/>`,
	},
	// Sea: a ship with its boxes on deck, and the swell under it.
	maritime: {
		fill: `<path d="${HULL}"/><path d="${BRIDGE}Z"/><path d="${CARGO}Z"/>`,
		lines:
			`<path d="${HULL}"/><path d="${BRIDGE}"/><path d="M14 19v-5M12.5 23.5h3"/>` +
			`<path d="${CARGO}"/><path d="M24 24h18M33 17.5v13M42 24v6.5"/>`,
		mark: '<path pathLength="1" d="M8 50q4-3.6 8 0t8 0 8 0 8 0 8 0 8 0"/>',
	},

	// ── The online services ──
	// Quote request: a calculator; its tall key is pressed, and the figure comes up on its screen.
	cotation: {
		fill: CALCULATOR,
		lines:
			`${CALCULATOR}<rect x="21.5" y="13" width="21" height="11" rx="2.5"/>` +
			'<path d="M22.5 32h3M30.5 32h3M38.5 32h3M22.5 39.5h3M30.5 39.5h3M22.5 47h3M30.5 47h3"/>',
		mark: '<path pathLength="1" d="M40 39.5V47"/><path class="late" pathLength="1" d="M29.5 18.5h9"/>',
	},
	// Tracking: the point a consignment leaves from, and its route to the pin where it is due.
	tracking: {
		fill: `<path d="${PIN}"/>`,
		lines: `<path d="${PIN}"/><circle cx="41" cy="19.5" r="3.75"/>`,
		mark:
			'<path pathLength="1" d="M8 33a3 3 0 1 1 6 0a3 3 0 1 1-6 0"/>' +
			'<path class="late" pathLength="1" d="M11 36.5V45a7.5 7.5 0 0 0 7.5 7.5H33.5a7.5 7.5 0 0 0 7.5-7.5V44.5"/>',
	},
	// Complaint: a message, and the point it raises.
	reclamation: {
		fill: `<path d="${BUBBLE}"/>`,
		lines: `<path d="${BUBBLE}"/><path d="M17.5 20.5h15M17.5 27.5h10"/>`,
		mark: '<path pathLength="1" d="M43.5 18v10.5"/><path class="late" pathLength="1" d="M43.5 33.3v0.4"/>',
	},
} satisfies Record<string, DrawnIcon>;

export type ServiceIconName = keyof typeof serviceIcons;
