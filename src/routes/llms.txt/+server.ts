import library from '$lib/generated/library.json';
import { guidesBySection } from '$lib/server/guides';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const lines = [
		'# SciDart',
		'',
		`> ${site.description} Current version: ${library.version} (pub.dev package \`scidart\`).`,
		'',
		'Function names follow NumPy and SciPy. `package:scidart/numdart.dart` is the NumPy side and `package:scidart/scidart.dart` the SciPy side (it also exports numdart).',
		''
	];
	for (const s of guidesBySection()) {
		lines.push(`## ${s.section}`, '');
		for (const g of s.guides) lines.push(`- [${g.title}](${site.url}/docs/${g.slug}.md): ${g.description}`);
		lines.push('');
	}
	lines.push(
		'## Reference',
		'',
		`- [Install](${site.url}/install): requirements and platforms`,
		`- [Release notes](${site.url}/releases): every version and its changes`,
		`- [API reference](${site.url}/api/): generated with dart doc`,
		`- [Full text](${site.url}/llms-full.txt): all guides in one file`,
		''
	);
	return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
