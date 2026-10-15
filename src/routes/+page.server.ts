import changelog from '$lib/generated/changelog.json';
import { guidesBySection } from '$lib/server/guides';
import { exampleHtml, findExample, highlight } from '$lib/server/markdown';
import type { Release } from '$lib/types';

export async function load() {
	const releases = changelog as Release[];
	const latest = releases.find((r) => !r.prerelease) ?? releases[0];
	return {
		install: await highlight('dart pub add scidart', 'bash'),
		example: await exampleHtml(findExample('stats_normal')),
		sections: guidesBySection().map((s) => ({
			section: s.section,
			guides: s.guides.map(({ slug, title, description }) => ({ slug, title, description }))
		})),
		latest
	};
}
