<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status} | SciDart</title></svelte:head>

<div class="wrap page">
	<p class="eyebrow">{page.status}</p>
	<h1>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p class="lede">{page.error?.message}</p>
	<p><a href="/">Home</a> · <a href="/docs">Docs</a> · <a href="/api/index.html" data-sveltekit-reload>API reference</a></p>
</div>

<style>
	.page {
		padding-block: 64px;
	}
</style>
