import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Whole site is static: every route becomes a file in build/.
		adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),
		prerender: {
			handleHttpError: 'fail',
			// Pages no other page links to, but that must exist.
			entries: ['*', '/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt']
		}
	}
};

export default config;
