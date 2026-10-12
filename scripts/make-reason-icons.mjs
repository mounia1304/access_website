// Cuts the four icons of the "Pourquoi choisir" plates out of the picture supplied by the client
// (src/assets/reasons/icons-source.webp, 1024 x 1536: four cards one above the other, each with
// an icon in a rounded tile of glass on a pale leaning shape). Only the icons are taken, not
// the cards' texts. Run it again only if the client sends a new picture:
//
//   node scripts/make-reason-icons.mjs
//
// It writes one file per reason in src/assets/reasons/, all of the same size, with the tile
// at the same place in each (Why.astro relies on it). As for the service icons, the white is
// turned into transparency in such a way that, over white (the plates are white), every pixel
// is exactly the client's.

import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const file = (path) => fileURLToPath(new URL(path, import.meta.url));
const source = file('../src/assets/reasons/icons-source.webp');

// The middle of each glass tile in the picture, in the order of the reasons. The tiles are
// about 168px wide.
const TILES = { qualite: [281, 266], delais: [284, 604], prix: [286, 940], support: [286, 1282] };
// The cut around that middle: the tile and the pale shape behind it, which reaches further up
// and to the right. If these change, change the ratios in Why.astro too.
const CUT = { left: 105, right: 145, up: 138, down: 130 };
const WIDTH = CUT.left + CUT.right;
const HEIGHT = CUT.up + CUT.down;
const PAGE = 254; // the white of the picture, which is not quite white
const FEATHER = 12; // the cut fades over this many px at its sides, so that no edge can show

for (const [name, [cx, cy]] of Object.entries(TILES)) {
	const { data } = await sharp(source)
		.extract({ left: cx - CUT.left, top: cy - CUT.up, width: WIDTH, height: HEIGHT })
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const out = Buffer.alloc(WIDTH * HEIGHT * 4);
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const i = (y * WIDTH + x) * 3;
			const rgb = [0, 1, 2].map((c) => Math.min(255, (data[i + c] * 255) / PAGE));
			// As transparent as the pixel can be while still giving its colour over white.
			let alpha = 1 - Math.min(...rgb) / 255;
			if (alpha < 0.012) alpha = 0;
			const colour = alpha ? rgb.map((c) => Math.max(0, Math.min(255, 255 - (255 - c) / alpha))) : [255, 255, 255];
			const edge = Math.min(x, y, WIDTH - 1 - x, HEIGHT - 1 - y);
			const o = (y * WIDTH + x) * 4;
			out[o] = Math.round(colour[0]);
			out[o + 1] = Math.round(colour[1]);
			out[o + 2] = Math.round(colour[2]);
			out[o + 3] = Math.round(alpha * Math.min(1, edge / FEATHER) * 255);
		}
	}
	await sharp(out, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
		.png({ compressionLevel: 9 })
		.toFile(file(`../src/assets/reasons/${name}.png`));
	console.log(`${name}.png: ${WIDTH} x ${HEIGHT}`);
}
