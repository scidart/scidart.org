import { guides } from '$lib/server/guides';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const paths = ['/', '/install', '/docs', '/examples', '/releases', ...guides.map((g) => `/docs/${g.slug}`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
