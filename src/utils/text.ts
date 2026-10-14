/** The start of a text, cut at a word, for a page's description (search results). */
export function excerpt(text: string, max = 155): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;: ]+$/, '')}…`;
}

/** A person's initials, as they stand in for a photo: the first name's (written last), then the
 *  family name's ("FAHMI Larbi" gives LF; a leading "M." is left out). */
export function initialsOf(name: string): string {
	const words = name.replace(/^M\.\s*/, '').split(/\s+/);
	return `${words.at(-1)![0]}${words[0][0]}`.toUpperCase();
}
