<script lang="ts">
	import Seo from '$lib/ui/Seo.svelte';
	import Prose from '$lib/ui/Prose.svelte';
	import { site } from '$lib/site';

	let { data } = $props();
	const demo = '<div class="playground" data-playground="spectrum"><p class="playground-loading">Loading the interactive demo…</p></div>';
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText('dart pub add scidart');
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
		}
	}
</script>

<Seo title="SciDart: scientific computing for Dart and Flutter" description={site.description} path="/" />

<section class="hero wrap">
	<div class="hero-text">
		<p class="eyebrow">NumPy and SciPy, in pure Dart</p>
		<h1>Scientific computing for Dart and Flutter</h1>
		<p class="lede">
			Arrays, linear algebra, polynomial fits, FFT, filters, statistics, distributions and root finding. One package that runs on the Dart VM, in Flutter apps and on the web.
		</p>
		<div class="install">
			{@html data.install}
			<button type="button" onclick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
		</div>
		<div class="actions">
			<a class="btn primary" href="/docs/getting-started">Get started</a>
			<a class="btn" href="/docs">Browse the docs</a>
			<a class="btn" href="/api/index.html" data-sveltekit-reload>API reference</a>
		</div>
		<p class="platforms">Dart VM · Flutter (Android, iOS, macOS, Windows, Linux) · Web</p>
	</div>
	<img class="logo" src="/img/logo-320.png" alt="SciDart logo" width="280" height="280" />
</section>

<section class="wrap block">
	<div class="split">
		<div>
			<p class="eyebrow">Try it here</p>
			<h2>The library runs in this page</h2>
			<p>
				This demo calls scidart compiled to JavaScript, the same code a Flutter web app ships. Change the tones and the window, and the FFT and the parabolic peak estimate update.
			</p>
			<p><a href="/docs/fft">Read the Fourier transform guide</a></p>
		</div>
		<Prose html={demo} />
	</div>
</section>

<section class="wrap block">
	<p class="eyebrow">Example</p>
	<h2>Familiar if you know SciPy</h2>
	<p class="lede">Every example on this site runs against the released library when the site is built. The output you see is real.</p>
	<Prose html={data.example} />
	<p><a href="/examples">All examples</a></p>
</section>

<section class="wrap block">
	<p class="eyebrow">Modules</p>
	<h2>What is inside</h2>
	{#each data.sections.filter((s) => s.section !== 'Getting started') as s (s.section)}
		<h3>{s.section} <span class="sub">{s.section === 'NumDart' ? 'package:scidart/numdart.dart' : 'package:scidart/scidart.dart'}</span></h3>
		<ul class="modules">
			{#each s.guides as g (g.slug)}
				<li>
					<a href="/docs/{g.slug}"><strong>{g.title}</strong><span>{g.description}</span></a>
				</li>
			{/each}
		</ul>
	{/each}
</section>

{#if data.latest}
	<section class="wrap block">
		<p class="eyebrow">Latest release</p>
		<h2>
			<a href="/releases#v{data.latest.version}">scidart {data.latest.version}</a>
		</h2>
		{#each data.latest.groups as g, i (i)}
			{#if g.title}<p class="group">{g.title}</p>{/if}
			<ul class="notes">
				{#each g.items.slice(0, 4) as item, j (j)}<li>{item.replace(/`/g, '')}</li>{/each}
			</ul>
		{/each}
		<p><a href="/releases">Full release notes</a></p>
	</section>
{/if}

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 32px;
		align-items: center;
		padding-block: 48px 24px;
	}
	.hero h1 {
		font-size: clamp(2.2rem, 5.5vw, 3.4rem);
	}
	.logo {
		width: 240px;
		height: auto;
		background: #ffffff;
		border-radius: 50%;
		padding: 18px;
		border: 1px solid var(--line);
	}
	.install {
		display: flex;
		align-items: stretch;
		gap: 8px;
		margin: 20px 0 16px;
		max-width: 420px;
	}
	.install :global(pre.shiki) {
		flex: 1;
		margin: 0;
	}
	.install button {
		cursor: pointer;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.btn {
		display: inline-block;
		padding: 9px 16px;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		color: var(--ink);
		background: var(--surface);
		text-decoration: none;
		font-weight: 500;
	}
	.btn.primary {
		background: var(--brand);
		border-color: var(--brand);
		color: var(--surface);
	}
	.platforms {
		margin-top: 18px;
		font: 0.82rem var(--font-mono);
		color: var(--muted);
	}
	.block {
		padding-block: 28px;
	}
	.split {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
		gap: 24px;
		align-items: start;
	}
	.split h2 {
		margin-top: 0.3em;
	}
	.sub {
		font: 0.8rem var(--font-mono);
		color: var(--muted);
		font-weight: 400;
	}
	.modules {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 10px;
	}
	.modules a {
		display: grid;
		gap: 2px;
		height: 100%;
		padding: 12px 14px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		text-decoration: none;
		color: var(--ink);
	}
	.modules a:hover {
		border-color: var(--teal);
	}
	.modules span {
		color: var(--muted);
		font-size: 0.88rem;
	}
	.group {
		font-weight: 600;
		margin: 0.6em 0 0.2em;
	}
	.notes {
		max-width: 76ch;
	}
	@media (max-width: 760px) {
		.hero,
		.split {
			grid-template-columns: 1fr;
		}
		.logo {
			display: none;
		}
	}
</style>
