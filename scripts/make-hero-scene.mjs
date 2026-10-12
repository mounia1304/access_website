// Prepares the photograph of the first screen from the file supplied by the client
// (src/assets/photos/hero/port.webp, 2000 x 767). Run it again only if that file changes:
//
//   node scripts/make-hero-scene.mjs
//
// On the client's mockup (reference/maquette-premier-ecran-3.webp, 1717px wide) the photograph
// is shown at 74% of its size, 178px from the left and 82px from the top, and the picture
// carries on beyond its four sides (under the menu, under the pale pane on the left, in the
// dark corner on the right). The file supplied stops there: this script adds the missing
// margins by mirroring the photograph's own edges, which gives sky above, sea and sunset on
// the sides. It writes port-scene.webp, which fills the scene exactly (Hero.astro).

import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const file = (path) => fileURLToPath(new URL(path, import.meta.url));

const SCALE = 0.74; // of the photograph on the mockup
const SCENE = { width: 1717, height: 659 }; // the scene on the mockup
const AT = { left: 178, top: 82 }; // where the photograph starts in it

const source = sharp(file('../src/assets/photos/hero/port.webp'));
const { width, height } = await source.metadata();
const margin = {
	left: Math.round(AT.left / SCALE),
	top: Math.round(AT.top / SCALE),
	right: Math.round((SCENE.width - AT.left) / SCALE - width),
	bottom: Math.round((SCENE.height - AT.top) / SCALE - height),
};
await source
	.extend({ ...margin, extendWith: 'mirror' })
	.webp({ quality: 88 })
	.toFile(file('../src/assets/photos/hero/port-scene.webp'));
console.log(`port-scene.webp: ${width + margin.left + margin.right} x ${height + margin.top + margin.bottom}`, margin);
