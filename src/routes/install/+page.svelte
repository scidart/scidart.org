<script lang="ts">
	import Prose from '$lib/ui/Prose.svelte';
	import Seo from '$lib/ui/Seo.svelte';

	let { data } = $props();
</script>

<Seo title="Install | SciDart" description="Add scidart to a Dart or Flutter project: requirements, platforms and imports." path="/install" />

<div class="wrap page">
	<p class="eyebrow">Install</p>
	<h1>Install scidart {data.version}</h1>
	<p class="lede">One dependency, no native setup. The same code runs in a CLI, a Flutter app and the browser.</p>
	<Prose html={data.html} />
</div>

<style>
	.page {
		padding-block: 40px;
	}
</style>
