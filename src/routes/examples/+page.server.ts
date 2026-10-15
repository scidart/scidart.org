import examplesJson from '$lib/generated/examples.json';
import { guides } from '$lib/server/guides';
import { exampleHtml } from '$lib/server/markdown';
import type { Example } from '$lib/types';

const MODULES: Record<string, { title: string; guide: string }> = {
	arrays: { title: 'Arrays', guide: 'arrays' },
	linalg: { title: 'Linear algebra', guide: 'linear-algebra' },
	polynomial: { title: 'Polynomial fitting', guide: 'polynomial' },
	statistic: { title: 'Statistics', guide: 'statistics' },
	calculus: { title: 'Calculus', guide: 'calculus' },
	interpolation: { title: 'Interpolation', guide: 'interpolation' },
	numbers: { title: 'Complex numbers', guide: 'complex-numbers' },
	random: { title: 'Random arrays', guide: 'random' },
	constants: { title: 'Constants', guide: 'constants' },
	fftpack: { title: 'Fourier transform', guide: 'fft' },
	signal: { title: 'Signal processing', guide: 'signal' },
	special: { title: 'Special functions', guide: 'special' },
	stats: { title: 'Normal distribution', guide: 'normal-distribution' },
	optimize: { title: 'Root finding', guide: 'optimize' }
};

export async function load() {
	const examples = examplesJson as Example[];
	const order = guides.map((g) => g.slug);
	const groups = [];
	for (const [module, info] of Object.entries(MODULES).sort((a, b) => order.indexOf(a[1].guide) - order.indexOf(b[1].guide))) {
		const items = examples.filter((e) => e.module === module).sort((a, b) => a.order - b.order);
		if (!items.length) continue;
		groups.push({
			module,
			...info,
			items: await Promise.all(items.map(async (e) => ({ id: e.id, title: e.title, html: await exampleHtml(e) })))
		});
	}
	const unknown = examples.filter((e) => !MODULES[e.module]);
	if (unknown.length) throw new Error(`examples with an unknown module: ${unknown.map((e) => `${e.id} (${e.module})`).join(', ')}`);
	return { groups, count: examples.length };
}
