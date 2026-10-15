import library from '$lib/generated/library.json';
import { renderMarkdown } from '$lib/server/markdown';

const files = import.meta.glob('/content/pages/install.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export async function load() {
	const source = Object.values(files)[0].replaceAll('{{version}}', library.version).replaceAll('{{sdk}}', library.sdk);
	return { ...(await renderMarkdown(source)), version: library.version };
}
