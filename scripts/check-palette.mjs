// Checks that the colours in src/styles/tokens.css keep text readable.
// Run it after changing the palette or the roles:  npm run check:palette
//
// It reads the tokens, works out every blended shade, and computes the contrast of each
// pair that appears on the site (WCAG: 4.5:1 for text, 3:1 for very large text and icons).
// No text sits on a photo any more, so nothing escapes this check.

import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

// The first :root block holds every colour; later blocks only adjust sizes.
const root = css.slice(css.indexOf(':root'), css.indexOf('\n}', css.indexOf(':root')));
const tokens = Object.fromEntries(
	[...root.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
);

/** Splits "a, b(c, d), e" on the commas that are not inside brackets. */
function splitArgs(text) {
	const parts = [];
	let depth = 0;
	let current = '';
	for (const char of text) {
		if (char === '(') depth++;
		if (char === ')') depth--;
		if (char === ',' && depth === 0) {
			parts.push(current.trim());
			current = '';
		} else current += char;
	}
	return [...parts, current.trim()];
}

/** Turns a CSS colour into [r, g, b, alpha]. Handles what tokens.css uses, nothing more. */
function resolve(value) {
	const v = value.trim();
	if (v === 'white') return [255, 255, 255, 1];
	if (v === 'black') return [0, 0, 0, 1];
	if (v === 'transparent') return [0, 0, 0, 0];
	if (/^#[0-9a-f]{3}$/i.test(v)) return [...v.slice(1)].map((c) => parseInt(c + c, 16)).concat(1);
	if (/^#[0-9a-f]{6}$/i.test(v)) return [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).concat(1);

	const variable = v.match(/^var\((--[\w-]+)\)$/);
	if (variable) {
		if (!(variable[1] in tokens)) throw new Error(`${variable[1]} is not defined in tokens.css`);
		return resolve(tokens[variable[1]]);
	}

	const rgb = v.match(/^rgb\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)$/);
	if (rgb) return [+rgb[1], +rgb[2], +rgb[3], rgb[4] === undefined ? 1 : +rgb[4]];

	const mixed = v.match(/^color-mix\(\s*in srgb\s*,([\s\S]+)\)$/);
	if (mixed) {
		const [first, second] = splitArgs(mixed[1]).map((part) => {
			const share = part.match(/\s([\d.]+)%$/);
			return { colour: resolve(share ? part.slice(0, share.index) : part), share: share ? +share[1] / 100 : null };
		});
		const p1 = first.share ?? (second.share === null ? 0.5 : 1 - second.share);
		const p2 = second.share ?? 1 - p1;
		const alpha = first.colour[3] * p1 + second.colour[3] * p2;
		const channel = (i) => (alpha ? (first.colour[i] * first.colour[3] * p1 + second.colour[i] * second.colour[3] * p2) / alpha : 0);
		return [channel(0), channel(1), channel(2), alpha];
	}

	throw new Error(`check-palette cannot read this colour: ${v}`);
}

const colour = (name) => resolve(`var(--${name})`);
/** Lays a (possibly see-through) colour over a solid one. */
const over = (top, bottom) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
const luminance = ([r, g, b]) =>
	[r, g, b].map((c) => c / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (text, background) => {
	const [a, b] = [luminance(over(text, background)), luminance(background)];
	return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
const hex = (c) => '#' + c.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, '0')).join('');

const TEXT = 4.5;
const LARGE = 3; // very large text, icons, lines, focus rings
const white = [255, 255, 255, 1];

/** [what it is, text colour, background, minimum] */
const pairs = [
	['button label', colour('c-on-accent'), colour('c-accent'), TEXT],
	['button label, hover', colour('c-on-accent'), colour('c-accent-hover'), TEXT],
	['links and names on the footer', colour('c-on-accent'), colour('c-accent'), TEXT],
	['paragraphs on the footer', colour('c-on-accent-soft'), colour('c-accent'), TEXT],
	['figure on the dark banner', white, colour('c-dark'), TEXT],
	['text on the dark banner', colour('c-on-dark'), colour('c-dark'), TEXT],
	['quote on the testimonial card', colour('c-on-feature'), colour('c-feature'), TEXT],
	['name under the quote', colour('c-on-feature-soft'), colour('c-feature'), TEXT],
	['second button label', colour('c-on-soft'), colour('c-soft'), TEXT],
	['second button label, hover', colour('c-on-soft'), colour('c-soft-hover'), TEXT],
	['tagline chip', colour('c-label'), colour('c-tint'), TEXT],
	['language pill', colour('c-on-chip'), colour('c-tint'), TEXT],
	['top bar text', colour('c-text'), colour('c-topbar'), TEXT],
	['icon in its tile', colour('c-label'), colour('c-tile'), LARGE],
	['arrow in its disc', colour('c-accent'), colour('c-tile'), LARGE],
	['arrow in the disc of a selected card', colour('c-accent'), colour('c-tile-strong'), LARGE],
	['line of a form field', colour('c-field-line'), colour('c-surface'), LARGE],
	['focus ring on the page', colour('c-accent'), colour('c-bg'), LARGE],
	['focus ring on the footer', colour('c-on-accent'), colour('c-accent'), LARGE],
	['focus ring on the dark banner', colour('c-soft'), colour('c-dark'), LARGE],
];

// Surfaces that carry titles, paragraphs, labels and accent-coloured text. A glow fades from
// its own colour to nothing, so its strongest point is the hardest case.
const glow = over(colour('c-glow'), colour('c-bg'));
const surfaces = [
	['the page', colour('c-bg')],
	['a white card', colour('c-surface')],
	['the panel of cards', colour('c-panel')],
	['a tinted card or notice', colour('c-tint')],
	['the strongest point of a glow', glow],
	['the menu bar over a glow', over(colour('c-bar'), glow)],
];
for (const [name, surface] of surfaces) {
	pairs.push(
		[`titles on ${name}`, colour('c-ink'), surface, TEXT],
		[`paragraphs on ${name}`, colour('c-text'), surface, TEXT],
		[`labels on ${name}`, colour('c-label'), surface, TEXT],
		[`accent text on ${name}`, colour('c-accent'), surface, TEXT],
	);
}
// The lighter indigo is for the large half of titles only.
pairs.push(['coloured half of a title on the page', colour('c-display'), colour('c-bg'), LARGE]);
pairs.push(['coloured half of a title on a glow', colour('c-display'), glow, LARGE]);

let failures = 0;
console.log('Palette:', Object.entries(tokens).filter(([name]) => name.startsWith('--p-')).map(([name, value]) => `${name.slice(4)} ${value}`).join('  '));
for (const [label, text, background, minimum] of pairs) {
	const ratio = contrast(text, background);
	const ok = ratio >= minimum;
	if (!ok) failures++;
	console.log(`${ok ? 'ok  ' : 'LOW '} ${ratio.toFixed(2).padStart(5)}  (needs ${minimum})  ${label}  ${hex(over(text, background))} on ${hex(background)}`);
}
console.log(failures ? `\n${failures} pair(s) too faint: adjust the roles in tokens.css.` : '\nAll pairs are readable.');
process.exit(failures ? 1 : 0);
