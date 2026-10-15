<script lang="ts">
	import Seo from '$lib/ui/Seo.svelte';
	import { site } from '$lib/site';

	let { data } = $props();
	let showPre = $state(true);
	const shown = $derived(data.releases.filter((r) => showPre || !r.prerelease));
	const day = (iso: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : null);
</script>

<Seo title="Release notes | SciDart" description="Every scidart release with its changes, from the first dev version to the latest." path="/releases" />

<div class="wrap page">
	<p class="eyebrow">Release notes</p>
	<h1>Every scidart release</h1>
	<p class="lede">
		From the project <a href="{site.repo}/blob/master/CHANGELOG.md">CHANGELOG</a>, with the publication date on pub.dev. Breaking changes come first in each release.
	</p>
	<label class="toggle"><input type="checkbox" bind:checked={showPre} /> Show dev versions</label>

	<ol class="timeline">
		{#each shown as r (r.version)}
			<li id="v{r.version}" class:pre={r.prerelease}>
				<header>
					<h2><a href="#v{r.version}">{r.version}</a></h2>
					{#if day(r.date)}<time datetime={r.date}>{day(r.date)}</time>{/if}
					{#if r.prerelease}<span class="tag">dev</span>{/if}
					{#if r.breaking}<span class="tag breaking">breaking</span>{/if}
					<span class="links">
						<a href={r.pub}>pub.dev</a>
						{#if r.githubRelease}<a href={r.githubRelease}>GitHub release</a>{/if}
					</span>
				</header>
				{#each r.groups as g, i (i)}
					{#if g.title}<h3 class:breaking={g.breaking}>{g.title}</h3>{/if}
					<ul>
						{#each g.items as item, j (j)}<li>{@html item}</li>{/each}
					</ul>
				{/each}
			</li>
		{/each}
	</ol>
</div>

<style>
	.page {
		padding-block: 40px;
		max-width: 900px;
	}
	.toggle {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		font-size: 0.9rem;
		color: var(--muted);
	}
	.timeline {
		list-style: none;
		padding: 0;
		margin: 24px 0 0;
		border-left: 2px solid var(--line);
	}
	.timeline > li {
		position: relative;
		padding: 0 0 28px 22px;
	}
	.timeline > li::before {
		content: '';
		position: absolute;
		left: -7px;
		top: 10px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--teal);
	}
	.timeline > li.pre::before {
		background: var(--line);
	}
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 6px 12px;
	}
	h2 {
		margin: 0;
		font-size: 1.35rem;
	}
	h2 a {
		color: var(--ink);
		text-decoration: none;
	}
	.pre h2 {
		font-size: 1.1rem;
	}
	time {
		font: 0.82rem var(--font-mono);
		color: var(--muted);
	}
	.tag {
		font: 500 0.7rem var(--font-mono);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 1px 8px;
		color: var(--muted);
	}
	.tag.breaking {
		color: var(--warn);
		border-color: var(--warn);
	}
	.links {
		display: flex;
		gap: 12px;
		font-size: 0.85rem;
		margin-left: auto;
	}
	h3 {
		font-size: 0.95rem;
		margin: 14px 0 4px;
	}
	h3.breaking {
		color: var(--warn);
	}
	ul {
		margin: 6px 0 0;
		padding-left: 1.2em;
		display: grid;
		gap: 4px;
		min-width: 0;
	}
	ul li {
		overflow-wrap: anywhere;
	}
</style>
