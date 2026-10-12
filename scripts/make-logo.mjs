// Prepares the logo files from the file supplied by the client
// (src/assets/brand/logo-source.webp: 1697 x 927, transparent background). Run it again only if
// the client sends a new file:
//
//   node scripts/make-logo.mjs
//
// It writes:
// - src/assets/brand/logo.png: the same picture with the empty room around it trimmed off, so
//   that the logo can be sized by its own height (src/components/Logo.astro);
// - public/favicon.png: the "A" of the logo on a white rounded square, for the browser tab.

import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const file = (path) => fileURLToPath(new URL(path, import.meta.url));
const source = file('../src/assets/brand/logo-source.webp');

// ── The logo, trimmed to what is drawn.
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let [left, top, right, bottom] = [info.width, info.height, -1, -1];
for (let y = 0; y < info.height; y++) {
	for (let x = 0; x < info.width; x++) {
		if (data[(y * info.width + x) * 4 + 3] > 20) {
			left = Math.min(left, x);
			right = Math.max(right, x);
			top = Math.min(top, y);
			bottom = Math.max(bottom, y);
		}
	}
}
const box = { left, top, width: right - left + 1, height: bottom - top + 1 };
await sharp(source).extract(box).png({ compressionLevel: 9 }).toFile(file('../src/assets/brand/logo.png'));
console.log(`logo.png: ${box.width} x ${box.height}`);

// ── The favicon: the "A" alone. It is what lies left of a line that follows the A's right leg
// (from its top, 383px in, moving 0.584px right for each px down), which leaves out the orange
// stroke and the first "C".
const A = { width: 660, height: 458 };
const legAt = (y) => 383 + y * 0.584 + 8;
const letter = await sharp(source).extract({ left: box.left, top: box.top, width: A.width, height: A.height }).ensureAlpha().raw().toBuffer();
for (let y = 0; y < A.height; y++) {
	for (let x = Math.ceil(legAt(y)); x < A.width; x++) letter[(y * A.width + x) * 4 + 3] = 0;
}
const SIZE = 192;
const glyph = await sharp(letter, { raw: { width: A.width, height: A.height, channels: 4 } })
	.resize({ width: Math.round(SIZE * 0.76), height: Math.round(SIZE * 0.62), fit: 'inside' })
	.png()
	.toBuffer();
const tile = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="${SIZE * 0.22}" fill="#fff"/></svg>`,
);
await sharp(tile).composite([{ input: glyph, gravity: 'centre' }]).png({ compressionLevel: 9 }).toFile(file('../public/favicon.png'));
console.log(`favicon.png: ${SIZE} x ${SIZE}`);
