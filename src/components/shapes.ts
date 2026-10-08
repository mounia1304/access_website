// Shapes shared by the first two screens: slanted frames with rounded corners.

export type Point = [number, number];

/** Path of a polygon with rounded corners, in 0–1 units of its box (for an SVG clip path). */
export function roundedShape(points: Point[], radii: number[], width: number, height: number) {
	const count = points.length;
	const unit = ([x, y]: Point) => `${(x / width).toFixed(4)} ${(y / height).toFixed(4)}`;
	let path = '';
	points.forEach((corner, i) => {
		const before = points[(i + count - 1) % count];
		const after = points[(i + 1) % count];
		const toBefore: Point = [before[0] - corner[0], before[1] - corner[1]];
		const toAfter: Point = [after[0] - corner[0], after[1] - corner[1]];
		const lengthBefore = Math.hypot(...toBefore);
		const lengthAfter = Math.hypot(...toAfter);
		const angle = Math.acos((toBefore[0] * toAfter[0] + toBefore[1] * toAfter[1]) / (lengthBefore * lengthAfter));
		// How far from the corner a circle of this radius touches both sides.
		const reach = Math.min(radii[i] / Math.tan(angle / 2), lengthBefore / 2, lengthAfter / 2);
		const start: Point = [corner[0] + (toBefore[0] / lengthBefore) * reach, corner[1] + (toBefore[1] / lengthBefore) * reach];
		const end: Point = [corner[0] + (toAfter[0] / lengthAfter) * reach, corner[1] + (toAfter[1] / lengthAfter) * reach];
		path += `${i ? 'L' : 'M'}${unit(start)}Q${unit(corner)} ${unit(end)}`;
	});
	return `${path}Z`;
}
