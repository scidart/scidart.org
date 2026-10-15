// Parses the scidart CHANGELOG.md into releases. Each `## <version>` starts a
// release; inside it, a line ending in ':' (like `Breaking changes:`) starts a
// group and `- ` lines are its items. Text before the first group goes into
// a group without a title.

const VERSION_RE = /^##\s+v?(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\s*$/;
const GROUP_RE = /^([A-Z][^:]{0,60}):\s*$/;

/** @returns {{version: string, prerelease: boolean, groups: {title: string, items: string[]}[]}[]} */
export function parseChangelog(text) {
	const releases = [];
	let release = null;
	let group = null;
	let item = null;
	for (const raw of text.split(/\r?\n/)) {
		const line = raw.trimEnd();
		const v = line.match(VERSION_RE);
		if (v) {
			release = { version: v[1], prerelease: v[1].includes('-'), groups: [] };
			releases.push(release);
			group = item = null;
			continue;
		}
		if (!release || !line.trim()) {
			item = null;
			continue;
		}
		const g = line.match(GROUP_RE);
		if (g) {
			group = { title: g[1], items: [] };
			release.groups.push(group);
			item = null;
			continue;
		}
		const bullet = line.match(/^\s*[-*]\s+(.*)$/);
		if (!group) {
			group = { title: '', items: [] };
			release.groups.push(group);
		}
		if (bullet) {
			item = bullet[1];
			group.items.push(item);
		} else if (item !== null) {
			// continuation of the previous item
			group.items[group.items.length - 1] += ' ' + line.trim();
		} else {
			group.items.push(line.trim());
		}
	}
	return releases;
}

/** Orders versions like semver: prerelease before release, numeric parts as numbers. */
export function compareVersions(a, b) {
	const split = (v) => {
		const [core, pre = ''] = v.replace(/^v/, '').split('-', 2);
		return { core: core.split('.').map(Number), pre };
	};
	const x = split(a);
	const y = split(b);
	for (let i = 0; i < 3; i++) if (x.core[i] !== y.core[i]) return x.core[i] - y.core[i];
	if (x.pre === y.pre) return 0;
	if (!x.pre) return 1;
	if (!y.pre) return -1;
	const xp = x.pre.split('.');
	const yp = y.pre.split('.');
	for (let i = 0; i < Math.max(xp.length, yp.length); i++) {
		if (xp[i] === undefined) return -1;
		if (yp[i] === undefined) return 1;
		const xn = Number(xp[i]);
		const yn = Number(yp[i]);
		if (!isNaN(xn) && !isNaN(yn) && xn !== yn) return xn - yn;
		if (xp[i] !== yp[i]) return xp[i] < yp[i] ? -1 : 1;
	}
	return 0;
}

/** Latest stable `vX.Y.Z` tag from `git ls-remote --tags` output. */
export function latestTag(lsRemote) {
	const tags = [...lsRemote.matchAll(/refs\/tags\/(v\d+\.\d+\.\d+)$/gm)].map((m) => m[1]);
	if (!tags.length) throw new Error('no vX.Y.Z tag found in the scidart repository');
	return tags.sort(compareVersions).at(-1);
}
