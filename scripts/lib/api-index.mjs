// Reduces the dart doc index.json to { symbol: href } for the top-level
// symbols of the libraries (classes, functions, enums, constants).
// When a name exists in both libraries, the scidart one wins: it is the
// library users import for everything.

const LIBRARY_KIND = 9;

/** @param {{name: string, href: string, enclosedBy?: {kind: number, name: string}}[]} index */
export function apiIndex(index) {
	const out = {};
	for (const e of index) {
		if (e.enclosedBy?.kind !== LIBRARY_KIND) continue;
		if (out[e.name] && e.enclosedBy.name !== 'scidart') continue;
		out[e.name] = `/api/${e.href}`;
	}
	return out;
}
