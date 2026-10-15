<script lang="ts">
	import { site } from '$lib/site';

	let { title, description, path, jsonLd }: { title: string; description: string; path: string; jsonLd?: object } = $props();
	const url = $derived(site.url + (path === '/' ? '/' : path));
	const ld = $derived(
		JSON.stringify(
			jsonLd ?? {
				'@context': 'https://schema.org',
				'@type': 'SoftwareSourceCode',
				name: 'scidart',
				description: site.description,
				codeRepository: site.repo,
				programmingLanguage: 'Dart',
				license: 'https://www.apache.org/licenses/LICENSE-2.0',
				url: site.url
			}
		).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{site.url}/img/logo_small.png" />
	<meta name="twitter:card" content="summary" />
	{@html `<script type="application/ld+json">${ld}</script>`}
</svelte:head>
