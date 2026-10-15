import { parse } from 'yaml';
import type { Guide } from '$lib/types';

const files = import.meta.glob('/content/docs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

const SECTIONS: Guide['section'][] = ['Getting started', 'NumDart', 'SciDart'];

export function parseGuide(path: string, raw: string): Guide {
	const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!m) throw new Error(`${path}: missing front matter`);
	const meta = parse(m[1]) as Partial<Guide>;
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	for (const key of ['title', 'description', 'section'] as const) {
		if (!meta[key]) throw new Error(`${path}: missing "${key}" in front matter`);
	}
	if (!SECTIONS.includes(meta.section!)) throw new Error(`${path}: unknown section "${meta.section}"`);
	return {
		slug,
		title: meta.title!,
		description: meta.description!,
		section: meta.section!,
		order: meta.order ?? 100,
		scipy: meta.scipy,
		source: raw.slice(m[0].length)
	};
}

export const guides: Guide[] = Object.entries(files)
	.map(([path, raw]) => parseGuide(path, raw))
	.sort((a, b) => SECTIONS.indexOf(a.section) - SECTIONS.indexOf(b.section) || a.order - b.order);

export function guidesBySection() {
	return SECTIONS.map((section) => ({ section, guides: guides.filter((g) => g.section === section) })).filter(
		(s) => s.guides.length
	);
}
