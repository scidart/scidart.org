import { error } from '@sveltejs/kit';
import { guides } from '$lib/server/guides';
import { guideToMarkdown } from '$lib/server/plain';

export const prerender = true;

export function entries() {
	return guides.map((g) => ({ slug: g.slug }));
}

export function GET({ params }) {
	const g = guides.find((x) => x.slug === params.slug);
	if (!g) error(404, 'Guide not found');
	return new Response(guideToMarkdown(g), { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
