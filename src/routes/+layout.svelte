<script lang="ts">
	import '$lib/ui/global.css';
	import library from '$lib/generated/library.json';
	import Header from '$lib/ui/Header.svelte';
	import Footer from '$lib/ui/Footer.svelte';

	let { children } = $props();
</script>

<a class="skip" href="#content">Skip to content</a>
<Header version={library.version} />
<main id="content">
	{@render children()}
</main>
<Footer version={library.version} commit={library.commit} />

<style>
	.skip {
		position: absolute;
		left: -999px;
	}
	.skip:focus {
		left: 12px;
		top: 12px;
		z-index: 20;
		background: var(--surface);
		padding: 6px 10px;
	}
	main {
		min-height: 60vh;
	}
</style>
