import changelog from '$lib/generated/changelog.json';
import library from '$lib/generated/library.json';
import { site } from '$lib/site';
import { renderNote } from '$lib/server/markdown';
import type { Release } from '$lib/types';

export function load() {
	const tags = new Set(library.tags);
	const releases = (changelog as Release[]).map((r) => ({
		version: r.version,
		prerelease: r.prerelease,
		date: r.date,
		githubRelease: tags.has(r.version) ? `${site.repo}/releases/tag/v${r.version}` : null,
		pub: `${site.pub}/versions/${r.version}`,
		breaking: r.groups.some((g) => /breaking/i.test(g.title)),
		groups: r.groups.map((g) => ({
			title: g.title,
			breaking: /breaking/i.test(g.title),
			items: g.items.map((i) => renderNote(i, site.repo))
		}))
	}));
	return { releases };
}
