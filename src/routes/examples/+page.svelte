<script lang="ts">
	import Seo from '$lib/ui/Seo.svelte';
	import library from '$lib/generated/library.json';

	let { data } = $props();
</script>

<Seo title="Examples | SciDart" description="Runnable scidart examples for every module, with the real output of each one." path="/examples" />

<div class="wrap page">
	<p class="eyebrow">Examples</p>
	<h1>{data.count} examples with their real output</h1>
	<p class="lede">
		Each example is a Dart program in the <a href="https://github.com/scidart/scidart.org/tree/master/examples/bin">site repository</a>. The build runs all of them against scidart {library.version}; if one fails, the site is not published.
	</p>
	<nav class="jump" aria-label="Modules">
		{#each data.groups as g (g.module)}<a href="#{g.module}">{g.title}</a>{/each}
	</nav>
	{#each data.groups as g (g.module)}
		<section id={g.module}>
			<h2>{g.title} <a class="guide" href="/docs/{g.guide}">guide</a></h2>
			{#each g.items as e (e.id)}{@html e.html}{/each}
		</section>
	{/each}
</div>

<style>
	.page {
		padding-block: 40px;
		max-width: 920px;
	}
	.jump {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 20px 0;
	}
	.jump a {
		font-size: 0.86rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 3px 10px;
		text-decoration: none;
		color: var(--ink);
		background: var(--surface);
	}
	.guide {
		font: 0.8rem var(--font-mono);
		font-weight: 400;
		margin-left: 8px;
	}
</style>
