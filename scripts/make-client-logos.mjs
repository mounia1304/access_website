// Prepares the client logos the client supplied as files (reference/logos-clients/, as they came:
// PNGs 600 to 825px wide, on white) for the conveyor of the homepage. Run it again only if the
// client sends new files:
//
//   node scripts/make-client-logos.mjs
//
// Each logo is trimmed to its drawing with a thin white margin, so that it fills the conveyor's
// box like the others, and its white ground is made pure white: the conveyor blends white into
// the page (References.astro), and the off-white of these files would show as a pale box. Only
// near-white greys are changed; coloured pixels are left as they are. The size is kept (twice
// the conveyor's box at least).
//
// PERI, Roca and OCP are not here: their files are the companies' own, used as they came
// (src/data/references.ts says where from).

import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const file = (path) => fileURLToPath(new URL(path, import.meta.url));

// The supplied file, and the name it takes in src/assets/clients/.
const LOGOS = {
	'Logo_Oland_Group.png': 'oland-group',
	'Logo_Ines.png': 'ines',
	'Logo_Euro_Couleur.png': 'euro-couleur',
	'Logo_Electro_Tadart.png': 'electro-tadart',
	'Logo_BMZ_Biscuiterie_Moderne_Zine.png': 'bmz',
	'Logo_Aphysem.png': 'aphysem',
	'Logo_Pharma_5.png': 'pharma-5',
	'Logo_Somapex.png': 'somapex',
};
const MARGIN = 0.02; // white kept round the drawing, in parts of its width
// Greys at least this light (and nearly colourless) go to white, fully from WHITE_FULL up.
const WHITE_FROM = 238;
const WHITE_FULL = 248;
const GREY = 8; // the most a "grey" pixel's channels may differ

for (const [source, name] of Object.entries(LOGOS)) {
	const trimmed = await sharp(file(`../reference/logos-clients/${source}`))
		.removeAlpha()
		.trim({ background: '#ffffff', threshold: 18 })
		.toBuffer({ resolveWithObject: true });
	const margin = Math.max(6, Math.round(trimmed.info.width * MARGIN));
	const { data, info } = await sharp(trimmed.data)
		.extend({ top: margin, bottom: margin, left: margin, right: margin, background: '#ffffff' })
		.raw()
		.toBuffer({ resolveWithObject: true });
	for (let i = 0; i < data.length; i += 3) {
		const low = Math.min(data[i], data[i + 1], data[i + 2]);
		const high = Math.max(data[i], data[i + 1], data[i + 2]);
		if (low < WHITE_FROM || high - low > GREY) continue;
		const t = Math.min(1, (low - WHITE_FROM) / (WHITE_FULL - WHITE_FROM));
		for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] + (255 - data[i + c]) * t);
	}
	const written = await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
		.png({ compressionLevel: 9 })
		.toFile(file(`../src/assets/clients/${name}.png`));
	console.log(`${name}.png: ${written.width} x ${written.height}`);
}
