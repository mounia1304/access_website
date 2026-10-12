/** The start of a text, cut at a word, for a page's description (search results). */
export function excerpt(text: string, max = 155): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;: ]+$/, '')}…`;
}
