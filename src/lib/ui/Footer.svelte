<script lang="ts">
	import { site } from '$lib/site';

	let { version, commit }: { version: string; commit: string } = $props();
</script>

<footer>
	<div class="wrap cols">
		<div>
			<p class="word"><span class="sci">Sci</span>Dart</p>
			<p class="muted">Scientific computing for Dart and Flutter. Apache-2.0 license.</p>
			<p class="muted">Docs built from scidart {version} (<a href="{site.repo}/commit/{commit}">{commit.slice(0, 7)}</a>).</p>
		</div>
		<nav aria-label="Footer">
			<a href={site.pub}>pub.dev</a>
			<a href={site.repo}>Source code</a>
			<a href={site.issues}>Report an issue</a>
			<a href="{site.repo}/blob/master/CONTRIBUTING.md">Contributing</a>
			<a href={site.siteRepo}>Edit this site</a>
			<a href={site.coffee}>Buy a coffee</a>
		</nav>
	</div>
	<div class="wrap muted small">
		Copyright 2019-present Angelo Polotto and contributors. Logo by Juliano Polotto, CC BY-SA 4.0.
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--line);
		margin-top: 64px;
		padding-block: 32px;
		background: var(--surface);
	}
	.cols {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
	}
	.word {
		font: italic 700 1.2rem var(--font-display);
		color: var(--brand);
		margin: 0 0 6px;
	}
	.sci {
		color: var(--teal);
	}
	.muted {
		color: var(--muted);
		margin: 0 0 4px;
		font-size: 0.92rem;
	}
	.small {
		font-size: 0.8rem;
		margin-top: 16px;
	}
	nav {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		gap: 6px 24px;
		align-content: start;
	}
	nav a {
		color: var(--ink);
		font-size: 0.92rem;
	}
</style>
