<script lang="ts">
	import Seo from '$lib/ui/Seo.svelte';

	let { data } = $props();
</script>

<Seo title="Docs | SciDart" description="Guides for every scidart module, with runnable examples and interactive demos." path="/docs" />

<div class="wrap page">
	<p class="eyebrow">Documentation</p>
	<h1>Guides</h1>
	<p class="lede">
		One guide per module. Each one explains the main functions, shows examples with their real output and links every name to the <a href="/api/index.html" data-sveltekit-reload>API reference</a>.
	</p>
	{#each data.sections as s (s.section)}
		<h2>{s.section}</h2>
		<div class="table-scroll">
			<table>
				<thead><tr><th>Guide</th><th>Covers</th><th>NumPy / SciPy</th></tr></thead>
				<tbody>
					{#each s.guides as g (g.slug)}
						<tr>
							<td><a href="/docs/{g.slug}">{g.title}</a></td>
							<td>{g.description}</td>
							<td class="mono">{g.scipy ?? ''}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}
</div>

<style>
	.page {
		padding-block: 40px;
	}
	.mono {
		font: 0.8rem var(--font-mono);
		color: var(--muted);
	}
</style>
