<script lang="ts">
	let { sections, current }: { sections: { section: string; guides: { slug: string; title: string }[] }[]; current?: string } = $props();
</script>

<details class="docs-nav" open>
	<summary>Guides</summary>
	<nav aria-label="Guides">
		{#each sections as s (s.section)}
			<p class="sec">{s.section}</p>
			<ul>
				{#each s.guides as g (g.slug)}
					<li><a href="/docs/{g.slug}" aria-current={g.slug === current ? 'page' : undefined}>{g.title}</a></li>
				{/each}
			</ul>
		{/each}
		<p class="sec">Reference</p>
		<ul>
			<li><a href="/examples">All examples</a></li>
			<li><a href="/api/index.html" data-sveltekit-reload>API (dart doc)</a></li>
			<li><a href="/releases">Release notes</a></li>
		</ul>
	</nav>
</details>

<style>
	.docs-nav {
		position: sticky;
		top: 70px;
		max-height: calc(100vh - 90px);
		overflow-y: auto;
		font-size: 0.93rem;
	}
	summary {
		display: none;
	}
	.sec {
		font: 600 0.72rem var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--muted);
		margin: 18px 0 6px;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	a {
		display: block;
		padding: 4px 10px;
		border-left: 2px solid var(--line);
		color: var(--ink);
		text-decoration: none;
	}
	a[aria-current='page'] {
		border-left-color: var(--teal);
		color: var(--teal);
		font-weight: 600;
	}
	@media (max-width: 900px) {
		.docs-nav {
			position: static;
			max-height: none;
			border: 1px solid var(--line);
			border-radius: var(--radius);
			padding: 8px 12px;
			background: var(--surface);
		}
		summary {
			display: list-item;
			cursor: pointer;
			font-weight: 600;
		}
	}
</style>
