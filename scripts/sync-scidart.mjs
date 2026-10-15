// Brings everything the site needs from the scidart library, at one tag:
// - src/lib/generated/library.json: version, tag, commit, SDK constraint
// - src/lib/generated/changelog.json: release notes with pub.dev dates
// - src/lib/generated/examples.json: code and real output of examples/bin/*.dart
// - static/api/: API reference from `dart doc`
// - static/scidart.js: the library compiled to JS for the interactive demos
//
// SCIDART_REF=v0.1.0 pins the tag (default: latest vX.Y.Z tag).
// SCIDART_PATH=../scidart uses a local checkout instead of cloning.
// SKIP_API=1 skips `dart doc` (faster local runs).

import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { latestTag, parseChangelog } from './lib/changelog.mjs';
import { parseExample } from './lib/examples.mjs';
import { apiIndex } from './lib/api-index.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'https://github.com/scidart/scidart';
const GENERATED = join(ROOT, 'src/lib/generated');

const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const step = (msg) => console.log(`sync: ${msg}`);

function checkout() {
	if (process.env.SCIDART_PATH) {
		const dir = resolve(process.env.SCIDART_PATH);
		const ref = run('git', ['describe', '--tags', '--always'], dir).trim();
		return { dir, ref };
	}
	const ref = process.env.SCIDART_REF || latestTag(run('git', ['ls-remote', '--tags', REPO]));
	if (!/^v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(ref)) throw new Error(`SCIDART_REF must be a tag like v0.1.0, got "${ref}"`);
	const dir = join(ROOT, '.scidart');
	rmSync(dir, { recursive: true, force: true });
	run('git', ['clone', '--quiet', '--depth', '1', '--branch', ref, REPO, dir]);
	return { dir, ref };
}

async function pubDates() {
	try {
		const res = await fetch('https://pub.dev/api/packages/scidart');
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();
		return Object.fromEntries(data.versions.map((v) => [v.version, v.published]));
	} catch (e) {
		// dates are a nice-to-have: the notes still render without them
		console.warn(`sync: pub.dev dates unavailable (${e.message})`);
		return {};
	}
}

function overridePath(pkgDir, libDir) {
	writeFileSync(join(pkgDir, 'pubspec_overrides.yaml'), `dependency_overrides:\n  scidart:\n    path: ${JSON.stringify(libDir)}\n`);
	run('dart', ['pub', 'get'], pkgDir);
}

function runDart(file, cwd) {
	return new Promise((ok, fail) => {
		const p = spawn('dart', ['run', file], { cwd });
		let out = '';
		let err = '';
		p.stdout.on('data', (d) => (out += d));
		p.stderr.on('data', (d) => (err += d));
		p.on('close', (code) => (code === 0 ? ok(out) : fail(new Error(`${file} exited with ${code}\n${err || out}`))));
	});
}

async function examples(libDir) {
	const dir = join(ROOT, 'examples');
	overridePath(dir, libDir);
	const files = readdirSync(join(dir, 'bin')).filter((f) => f.endsWith('.dart')).sort();
	const result = [];
	const queue = [...files];
	const workers = Array.from({ length: Math.min(4, cpus().length) }, async () => {
		for (let f = queue.shift(); f; f = queue.shift()) {
			const source = readFileSync(join(dir, 'bin', f), 'utf8');
			const example = parseExample(f, source);
			example.output = (await runDart(`bin/${f}`, dir)).trimEnd();
			result.push(example);
		}
	});
	await Promise.all(workers);
	return result.sort((a, b) => a.id.localeCompare(b.id));
}

async function main() {
	mkdirSync(GENERATED, { recursive: true });
	const { dir, ref } = checkout();
	const commit = run('git', ['rev-parse', 'HEAD'], dir).trim();
	const pubspec = readFileSync(join(dir, 'pubspec.yaml'), 'utf8');
	const version = pubspec.match(/^version:\s*(\S+)/m)?.[1];
	const sdk = pubspec.match(/^\s+sdk:\s*['"]?([^'"\n]+)/m)?.[1];
	step(`scidart ${version} (${ref}, ${commit.slice(0, 7)})`);

	const dates = await pubDates();
	const releases = parseChangelog(readFileSync(join(dir, 'CHANGELOG.md'), 'utf8')).map((r) => ({
		...r,
		date: dates[r.version] ?? null
	}));
	// versions with a git tag have a GitHub Release page
	const tags = [...run('git', ['ls-remote', '--tags', REPO]).matchAll(/refs\/tags\/v(\S+?)$/gm)].map((m) => m[1]);
	writeFileSync(join(GENERATED, 'library.json'), JSON.stringify({ version, ref, commit, sdk, tags }, null, '\t'));
	writeFileSync(join(GENERATED, 'changelog.json'), JSON.stringify(releases, null, '\t'));
	step(`${releases.length} releases in the changelog`);

	const ex = await examples(dir);
	writeFileSync(join(GENERATED, 'examples.json'), JSON.stringify(ex, null, '\t'));
	step(`${ex.length} examples run`);

	const bridge = join(ROOT, 'bridge');
	overridePath(bridge, dir);
	run('dart', ['compile', 'js', '-O2', '--no-source-maps', '-o', join(ROOT, 'static/scidart.js'), 'web/main.dart'], bridge);
	rmSync(join(ROOT, 'static/scidart.js.deps'), { force: true });
	step('bridge compiled to static/scidart.js');

	const api = join(ROOT, 'static/api');
	if (process.env.SKIP_API) {
		step('API reference skipped (SKIP_API)');
	} else {
		rmSync(api, { recursive: true, force: true });
		run('dart', ['pub', 'get'], dir);
		run('dart', ['doc', '--output', api], dir);
		if (!existsSync(join(api, 'index.html'))) throw new Error('dart doc did not produce index.html');
		step('API reference in static/api');
	}
	// name -> page of each top-level symbol, so the guides can link `code` to the API
	const index = existsSync(join(api, 'index.json')) ? JSON.parse(readFileSync(join(api, 'index.json'), 'utf8')) : [];
	writeFileSync(join(GENERATED, 'api-index.json'), JSON.stringify(apiIndex(index), null, '\t'));
}

main().catch((e) => {
	console.error(`sync failed: ${e.message}`);
	process.exit(1);
});
