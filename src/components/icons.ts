// Icons come from Phosphor (MIT), all in the "regular" weight, which matches the line icons
// of the client's mockups. Only the ones listed here end up in the page.
//
// Exceptions: "play-solid" (fill weight) is the round button of the first screen, and
// "customs-file" is drawn here after a mockup of the client (a document with a badge), in
// Phosphor's proportions: it is the customs service's icon in the menus.

import arrowLeft from '@phosphor-icons/core/assets/regular/arrow-left.svg?raw';
import arrowRight from '@phosphor-icons/core/assets/regular/arrow-right.svg?raw';
import arrowUpRight from '@phosphor-icons/core/assets/regular/arrow-up-right.svg?raw';
import caretDown from '@phosphor-icons/core/assets/regular/caret-down.svg?raw';
import phone from '@phosphor-icons/core/assets/regular/phone.svg?raw';
import envelope from '@phosphor-icons/core/assets/regular/envelope-simple.svg?raw';
import mapPin from '@phosphor-icons/core/assets/regular/map-pin.svg?raw';
import clock from '@phosphor-icons/core/assets/regular/clock.svg?raw';
import linkedin from '@phosphor-icons/core/assets/regular/linkedin-logo.svg?raw';
import list from '@phosphor-icons/core/assets/regular/list.svg?raw';
import x from '@phosphor-icons/core/assets/regular/x.svg?raw';
import check from '@phosphor-icons/core/assets/regular/check.svg?raw';
import pause from '@phosphor-icons/core/assets/regular/pause.svg?raw';
import play from '@phosphor-icons/core/assets/regular/play.svg?raw';
import playSolid from '@phosphor-icons/core/assets/fill/play-fill.svg?raw';

import stamp from '@phosphor-icons/core/assets/regular/stamp.svg?raw';
import truck from '@phosphor-icons/core/assets/regular/truck.svg?raw';
import airplane from '@phosphor-icons/core/assets/regular/airplane-tilt.svg?raw';
import boat from '@phosphor-icons/core/assets/regular/boat.svg?raw';
import shieldCheck from '@phosphor-icons/core/assets/regular/shield-check.svg?raw';
import calculator from '@phosphor-icons/core/assets/regular/calculator.svg?raw';
import fileSearch from '@phosphor-icons/core/assets/regular/file-magnifying-glass.svg?raw';
import chatText from '@phosphor-icons/core/assets/regular/chat-text.svg?raw';
import phoneCall from '@phosphor-icons/core/assets/regular/phone-call.svg?raw';
import globe from '@phosphor-icons/core/assets/regular/globe-hemisphere-west.svg?raw';
import handshake from '@phosphor-icons/core/assets/regular/handshake.svg?raw';
import packageBox from '@phosphor-icons/core/assets/regular/package.svg?raw';
import mapTrifold from '@phosphor-icons/core/assets/regular/map-trifold.svg?raw';
import usersThree from '@phosphor-icons/core/assets/regular/users-three.svg?raw';
import chartLineUp from '@phosphor-icons/core/assets/regular/chart-line-up.svg?raw';
import coins from '@phosphor-icons/core/assets/regular/coins.svg?raw';


// A page with a folded corner and three lines, and a round badge that carries a figure.
const line = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"';
const customsFile = [
	`<path ${line} d="M124 224H56a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h96l56 56v36"/>`,
	`<path ${line} d="M152 32v56h56"/>`,
	`<path ${line} d="M88 124h72M88 156h36M88 188h20"/>`,
	`<circle ${line} cx="184" cy="188" r="38"/>`,
	'<circle cx="184" cy="177" r="10"/>',
	'<path d="M163 207a22 15 0 0 1 42 0 36 36 0 0 1-42 0z"/>',
].join('');

// Keep only what is inside the <svg> tag; Icon.astro supplies its own wrapper.
const inner = (svg: string) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

export const icons = {
	'arrow-left': inner(arrowLeft),
	'arrow-right': inner(arrowRight),
	'arrow-up-right': inner(arrowUpRight),
	'caret-down': inner(caretDown),
	phone: inner(phone),
	envelope: inner(envelope),
	'map-pin': inner(mapPin),
	clock: inner(clock),
	linkedin: inner(linkedin),
	list: inner(list),
	x: inner(x),
	check: inner(check),
	pause: inner(pause),
	play: inner(play),
	'play-solid': inner(playSolid),
	stamp: inner(stamp),
	truck: inner(truck),
	airplane: inner(airplane),
	boat: inner(boat),
	'shield-check': inner(shieldCheck),
	calculator: inner(calculator),
	'file-search': inner(fileSearch),
	'chat-text': inner(chatText),
	'phone-call': inner(phoneCall),
	globe: inner(globe),
	handshake: inner(handshake),
	package: inner(packageBox),
	'map-trifold': inner(mapTrifold),
	'users-three': inner(usersThree),
	'chart-line-up': inner(chartLineUp),
	coins: inner(coins),
	'customs-file': customsFile,
} as const;

export type IconName = keyof typeof icons;
