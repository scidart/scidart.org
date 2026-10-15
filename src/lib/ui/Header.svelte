<script lang="ts">
	import { page } from '$app/state';
	import { nav, site } from '$lib/site';

	let { version }: { version: string } = $props();
	const active = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(href + '/');
</script>

<header>
	<div class="wrap bar">
		<a class="brand" href="/" aria-label="SciDart home">
			<span class="word"><span class="sci">Sci</span>Dart</span>
		</a>
		<a class="version" href="/releases" title="Latest release">v{version}</a>
		<nav aria-label="Main">
			{#each nav as item (item.href)}
				<a href={item.href} aria-current={active(item.href) ? 'page' : undefined} data-sveltekit-reload={item.external ? '' : undefined}>{item.label}</a>
			{/each}
			<a href={site.repo} class="gh">GitHub</a>
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--line);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 10px 14px;
		flex-wrap: wrap;
		padding-block: 10px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		color: var(--brand);
	}
	.word {
		font: italic 700 1.35rem/1 var(--font-display);
	}
	.sci {
		color: var(--teal);
	}
	.version {
		font: 500 0.75rem var(--font-mono);
		color: var(--muted);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 2px 8px;
		text-decoration: none;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		margin-left: auto;
	}
	nav a {
		color: var(--ink);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.95rem;
		padding-block: 4px;
		border-bottom: 2px solid transparent;
	}
	nav a:hover,
	nav a[aria-current='page'] {
		border-bottom-color: var(--teal);
	}
	@media (max-width: 640px) {
		nav {
			margin-left: 0;
			width: 100%;
		}
	}
</style>
