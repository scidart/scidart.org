import { describe, expect, it } from 'vitest';
import { compareVersions, latestTag, parseChangelog } from './changelog.mjs';

describe('parseChangelog', () => {
	it('splits releases, groups and multi-line items', () => {
		const text = [
			'## 0.1.0',
			'',
			'New:',
			'- `erf` in `special`',
			'- `root` for systems',
			'  of equations',
			'',
			'## 0.0.3',
			'',
			'Breaking changes:',
			'- `rifft` follows numpy',
			'',
			'## 0.0.2-dev.13',
			'',
			'- Sort array before median calculation (#59 Closed)'
		].join('\n');
		const r = parseChangelog(text);
		expect(r.map((x) => x.version)).toEqual(['0.1.0', '0.0.3', '0.0.2-dev.13']);
		expect(r[0].groups).toEqual([{ title: 'New', items: ['`erf` in `special`', '`root` for systems of equations'] }]);
		expect(r[1].groups[0].title).toBe('Breaking changes');
		expect(r[2]).toMatchObject({ prerelease: true, groups: [{ title: '', items: ['Sort array before median calculation (#59 Closed)'] }] });
	});

	it('ignores text before the first version', () => {
		expect(parseChangelog('# Changelog\n\nintro\n\n## 1.0.0\n- a')).toHaveLength(1);
	});
});

describe('versions', () => {
	it('orders prereleases before the release and numbers numerically', () => {
		const v = ['0.0.2-dev.10', '0.1.0', '0.0.2-dev.9', '0.0.3', '0.0.2'];
		expect(v.sort(compareVersions)).toEqual(['0.0.2-dev.9', '0.0.2-dev.10', '0.0.2', '0.0.3', '0.1.0']);
	});

	it('picks the latest stable tag', () => {
		const out = 'a\trefs/tags/v0.0.3\nb\trefs/tags/v0.1.0\nc\trefs/tags/v0.10.0-dev.1\nd\trefs/tags/v0.9.0';
		expect(latestTag(out)).toBe('v0.9.0');
	});
});
