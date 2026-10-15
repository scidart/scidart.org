import { guides } from '$lib/server/guides';
import { guideToMarkdown } from '$lib/server/plain';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const text = [`# SciDart documentation\n\n> ${site.description}\n`, ...guides.map(guideToMarkdown)].join('\n---\n\n');
	return new Response(text, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
