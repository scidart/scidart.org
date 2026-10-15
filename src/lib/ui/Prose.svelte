<script lang="ts">
	import { mount, unmount } from 'svelte';
	import { playgrounds } from './playgrounds';

	let { html }: { html: string } = $props();
	let root: HTMLElement;

	// Server rendered HTML; demos are mounted in their placeholders in the browser.
	$effect(() => {
		void html;
		const mounted: Record<string, unknown>[] = [];
		for (const el of root.querySelectorAll<HTMLElement>('[data-playground]')) {
			const component = playgrounds[el.dataset.playground!];
			if (!component) {
				el.textContent = `Unknown demo "${el.dataset.playground}".`;
				continue;
			}
			el.replaceChildren();
			mounted.push(mount(component, { target: el }));
		}
		return () => mounted.forEach((m) => unmount(m));
	});
</script>

<div class="prose" bind:this={root}>{@html html}</div>

<style>
	.prose {
		min-width: 0;
		max-width: 76ch;
	}
	.prose :global(> p),
	.prose :global(> ul) {
		max-width: 68ch;
	}
</style>
