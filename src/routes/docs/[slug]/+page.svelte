<script lang="ts">
	import DocsNav from '$lib/ui/DocsNav.svelte';
	import Prose from '$lib/ui/Prose.svelte';
	import Seo from '$lib/ui/Seo.svelte';
	import { site } from '$lib/site';

	let { data } = $props();
</script>

<Seo title="{data.guide.title} | SciDart" description={data.guide.description} path="/docs/{data.guide.slug}" />

<div class="wrap docs">
	<aside><DocsNav sections={data.sections} current={data.guide.slug} /></aside>
	<article>
		<p class="eyebrow">{data.guide.section}</p>
		<h1>{data.guide.title}</h1>
		<p class="lede">{data.guide.description}</p>
		{#if data.guide.scipy}<p class="scipy">Like <code>{data.guide.scipy}</code></p>{/if}
		<Prose html={data.html} />
		<nav class="pager" aria-label="Guides">
			{#if data.prev}<a href="/docs/{data.prev.slug}">← {data.prev.title}</a>{:else}<span></span>{/if}
			{#if data.next}<a href="/docs/{data.next.slug}">{data.next.title} →</a>{/if}
		</nav>
		<p class="edit"><a href="{site.siteRepo}/blob/master/content/docs/{data.guide.slug}.md">Edit this guide on GitHub</a></p>
	</article>
	{#if data.headings.length > 1}
		<aside class="toc" aria-label="On this page">
			<p class="toc-title">On this page</p>
			<ul>
				{#each data.headings as h (h.id)}<li><a href="#{h.id}">{h.text}</a></li>{/each}
			</ul>
		</aside>
	{/if}
</div>

<style>
	.docs {
		display: grid;
		grid-template-columns: 220px minmax(0, 1fr) 180px;
		gap: 36px;
		padding-block: 32px;
		align-items: start;
	}
	article {
		min-width: 0;
	}
	.scipy {
		color: var(--muted);
		font-size: 0.9rem;
	}
	.toc {
		position: sticky;
		top: 70px;
		font-size: 0.86rem;
	}
	.toc-title {
		font: 600 0.72rem var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--muted);
	}
	.toc ul {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	.toc a {
		color: var(--ink);
		text-decoration: none;
	}
	.pager {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 40px;
		padding-top: 16px;
		border-top: 1px solid var(--line);
	}
	.edit {
		font-size: 0.85rem;
	}
	@media (max-width: 1100px) {
		.docs {
			grid-template-columns: 200px minmax(0, 1fr);
		}
		.toc {
			display: none;
		}
	}
	@media (max-width: 900px) {
		.docs {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
