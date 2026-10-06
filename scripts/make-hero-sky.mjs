// Draws the backdrop that sits behind the client's cut-out picture in the first screen's frame:
// a bright sky with soft clouds, a strip of sea and a quay. It is generated here from gradients
// and noise, so there is no photo to license. Run it again only to change the sky:
//
//   node scripts/make-hero-sky.mjs
//
// It writes src/assets/photos/hero/ciel.jpg (three times the frame's reference size).

import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = fileURLToPath(new URL('../src/assets/photos/hero/ciel.jpg', import.meta.url));
const W = 1884;
const H = 1260;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
	<defs>
		<linearGradient id="sky" x1="0.95" y1="0" x2="0.2" y2="0.85">
			<stop offset="0" stop-color="#7db6ea"/>
			<stop offset="0.3" stop-color="#9dcaf1"/>
			<stop offset="0.62" stop-color="#cfe4f7"/>
			<stop offset="1" stop-color="#f4f8fc"/>
		</linearGradient>
		<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0.45" stop-color="#fff" stop-opacity="0"/>
			<stop offset="0.78" stop-color="#fff" stop-opacity="0.85"/>
		</linearGradient>
		<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#b9d0ea"/>
			<stop offset="1" stop-color="#8fb1d9"/>
		</linearGradient>
		<linearGradient id="quay" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#c3cedb"/>
			<stop offset="1" stop-color="#a9b8c8"/>
		</linearGradient>
		<filter id="clouds" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.0016 0.0042" numOctaves="5" seed="23"/>
			<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -1.12"/>
			<feGaussianBlur stdDeviation="5"/>
		</filter>
		<filter id="wisps" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.0009 0.006" numOctaves="4" seed="5"/>
			<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.9 0 0 0 -0.92"/>
			<feGaussianBlur stdDeviation="9"/>
		</filter>
		<linearGradient id="cloudband" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0.02" stop-color="#fff" stop-opacity="0.35"/>
			<stop offset="0.3" stop-color="#fff" stop-opacity="1"/>
			<stop offset="0.66" stop-color="#fff" stop-opacity="1"/>
			<stop offset="0.76" stop-color="#fff" stop-opacity="0"/>
		</linearGradient>
		<mask id="band"><rect width="${W}" height="${H}" fill="url(#cloudband)"/></mask>
	</defs>
	<rect width="${W}" height="${H}" fill="url(#sky)"/>
	<g mask="url(#band)">
		<rect width="${W}" height="${H}" filter="url(#wisps)" opacity="0.55"/>
		<rect width="${W}" height="${H}" filter="url(#clouds)" opacity="0.92"/>
	</g>
	<rect width="${W}" height="${H * 0.8}" fill="url(#haze)"/>
	<rect y="${H * 0.775}" width="${W}" height="${H * 0.11}" fill="url(#sea)"/>
	<rect y="${H * 0.775}" width="${W}" height="6" fill="#fff" opacity="0.5"/>
	<rect y="${H * 0.875}" width="${W}" height="${H * 0.125}" fill="url(#quay)"/>
	<rect y="${H * 0.875}" width="${W}" height="5" fill="#e6edf4" opacity="0.9"/>
</svg>`;

const info = await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(`saved ciel.jpg (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB)`);
