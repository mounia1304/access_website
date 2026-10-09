// Draws the trail of chevrons that runs between the sections of the homepage
// (src/components/ChevronTrail.astro): pairs of the logo's chevron, one after the other, along
// a line that runs flat, climbs a step on the slant of the logo, then runs flat again.
// Run it again only to change the drawing:
//
//   node scripts/make-chevron-trail.mjs
//
// It writes src/assets/decor/chevron-trail.svg. The component uses that file as a stencil (a
// CSS mask) and gives it its colours, so the drawing itself has none. If WIDTH or HEIGHT change
// here, change them in the component too.
//
// It also writes chevron-pair-down.svg: one pair of the same chevrons pointing down, which the
// fourth screen repeats down a rail (src/components/Why.astro).

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../src/assets/decor/chevron-trail.svg', import.meta.url));
const outPair = fileURLToPath(new URL('../src/assets/decor/chevron-pair-down.svg', import.meta.url));

const WIDTH = 3840; // wider than any screen: the page shows the middle of it
const RISE = 84; // how much higher the trail runs after the step
const MARGIN = 12; // room above and below the two runs, for the chevrons
const HEIGHT = RISE + 2 * MARGIN;
const STEP_AT = WIDTH / 2 + 420; // the step sits 420px to the right of the middle of the page
const SLANT = 35.4; // degrees from the vertical: the slant of the logo (--slant in tokens.css)
const RADIUS = 80; // rounding of the two bends: wide, so the step reads as one smooth S
const PAIR_EVERY = 40; // from one pair of chevrons to the next, along the trail
const PAIR_GAP = 9; // between the two chevrons of a pair

// The chevron of the logo (LogoSlot.astro), 13px tall, pointing right, centred on 0 0.
const CHEVRON = [
	[-5.06, -6.5],
	[-0.72, -6.5],
	[5.06, 0],
	[-0.72, 6.5],
	[-5.06, 6.5],
	[0.72, 0],
];

const rad = (degrees) => (degrees * Math.PI) / 180;
const low = MARGIN + RISE;
const high = MARGIN;
const climb = rad(90 - SLANT); // the step's angle above the horizontal
const run = RISE * Math.tan(rad(SLANT)); // what the step covers sideways
const reach = RADIUS * Math.tan(climb / 2); // from a corner to where its bend starts

// The trail as a list of pieces, each able to say where a point is and which way it heads
// (angle 0 = to the right, negative = upwards) at a given distance from its start.
const pieces = [];
const line = (x, y, heading, length) => {
	pieces.push({ length, at: (d) => ({ x: x + Math.cos(heading) * d, y: y + Math.sin(heading) * d, heading }) });
	return { x: x + Math.cos(heading) * length, y: y + Math.sin(heading) * length };
};
/** A bend from one heading to another; `side` is -1 to turn upwards (left), 1 to turn back (right). */
const bend = (x, y, from, to, side) => {
	const centre = { x: x + side * RADIUS * -Math.sin(from), y: y + side * RADIUS * Math.cos(from) };
	const point = (heading) => ({
		x: centre.x - side * RADIUS * -Math.sin(heading),
		y: centre.y - side * RADIUS * Math.cos(heading),
		heading,
	});
	const length = RADIUS * Math.abs(to - from);
	pieces.push({ length, at: (d) => point(from + (to - from) * (d / length)) });
	return point(to);
};

let pen = line(0, low, 0, STEP_AT - run / 2 - reach);
pen = bend(pen.x, pen.y, 0, -climb, -1);
pen = line(pen.x, pen.y, -climb, RISE / Math.sin(climb) - 2 * reach);
pen = bend(pen.x, pen.y, -climb, 0, 1);
line(pen.x, pen.y, 0, WIDTH - pen.x);

const total = pieces.reduce((sum, piece) => sum + piece.length, 0);
const pointAt = (distance) => {
	let left = distance;
	for (const piece of pieces) {
		if (left <= piece.length) return piece.at(left);
		left -= piece.length;
	}
	return pieces.at(-1).at(pieces.at(-1).length);
};

const round = (n) => Number(n.toFixed(2));
const chevron = ({ x, y, heading }) =>
	CHEVRON.map(([px, py], i) => {
		const cx = round(x + px * Math.cos(heading) - py * Math.sin(heading));
		const cy = round(y + px * Math.sin(heading) + py * Math.cos(heading));
		return `${i ? 'L' : 'M'}${cx} ${cy}`;
	}).join('') + 'Z';

let path = '';
let pairs = 0;
for (let distance = PAIR_EVERY / 2; distance < total - PAIR_EVERY / 2; distance += PAIR_EVERY) {
	path += chevron(pointAt(distance - PAIR_GAP / 2)) + chevron(pointAt(distance + PAIR_GAP / 2));
	pairs++;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path d="${path}"/></svg>\n`;
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg);
console.log(`${pairs} pairs of chevrons, ${WIDTH} x ${HEIGHT}, ${(svg.length / 1024).toFixed(1)} kB -> ${out}`);

// The pair pointing down: a tile as tall as the distance between two pairs, so that repeating
// it keeps the trail's rhythm. If its size changes, change it in Why.astro too.
const TILE = { width: 14, height: PAIR_EVERY };
const down = (y) => chevron({ x: TILE.width / 2, y, heading: Math.PI / 2 });
const pair = down(TILE.height / 2 - PAIR_GAP / 2) + down(TILE.height / 2 + PAIR_GAP / 2);
writeFileSync(
	outPair,
	`<svg xmlns="http://www.w3.org/2000/svg" width="${TILE.width}" height="${TILE.height}" viewBox="0 0 ${TILE.width} ${TILE.height}"><path d="${pair}"/></svg>
`,
);
console.log(`pair pointing down, ${TILE.width} x ${TILE.height} -> ${outPair}`);
