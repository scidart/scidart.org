// An example is a Dart file in examples/bin/ that starts with metadata lines:
//
//   // title: Estimate a frequency with the FFT
//   // module: fftpack
//   // description: One sentence about what it shows.
//
// The code shown on the site is the file without those lines.

const META_RE = /^\/\/\s*(title|module|description|order):\s*(.+)$/;
const REQUIRED = ['title', 'module', 'description'];

/** @returns {{id: string, title: string, module: string, description: string, order: number, code: string}} */
export function parseExample(fileName, source) {
	const lines = source.split(/\r?\n/);
	const meta = {};
	let i = 0;
	for (; i < lines.length; i++) {
		const m = lines[i].match(META_RE);
		if (!m) break;
		meta[m[1]] = m[2].trim();
	}
	const missing = REQUIRED.filter((k) => !meta[k]);
	if (missing.length) throw new Error(`${fileName}: missing ${missing.join(', ')} in the header`);
	while (i < lines.length && !lines[i].trim()) i++;
	return {
		id: fileName.replace(/\.dart$/, ''),
		title: meta.title,
		module: meta.module,
		description: meta.description,
		order: Number(meta.order ?? 100),
		code: lines.slice(i).join('\n').trimEnd()
	};
}
