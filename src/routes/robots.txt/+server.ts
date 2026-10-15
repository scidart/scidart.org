import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const bots = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];
	const body = ['User-agent: *', 'Allow: /', '', ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${site.url}/sitemap.xml`, ''].join('\n');
	return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
