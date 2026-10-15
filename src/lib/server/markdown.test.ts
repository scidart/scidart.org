import { describe, expect, it } from 'vitest';
import { apiLink, renderNote, slugify } from './markdown';

describe('renderNote', () => {
	it('links issues outside code and API names inside code', () => {
		const html = renderNote('`rootScalar` in `optimize` (#56), see `#1`', 'https://github.com/scidart/scidart');
		expect(html).toContain('<a href="https://github.com/scidart/scidart/issues/56">#56</a>');
		expect(html).toContain('<a class="api-link" href="/api/scidart/rootScalar.html"><code>rootScalar</code></a>');
		expect(html).toContain('<code>optimize</code>');
		expect(html).toContain('<code>#1</code>');
	});
});

describe('helpers', () => {
	it('links known API symbols only', () => {
		expect(apiLink('linspace()')).toBe('/api/numdart/linspace.html');
		expect(apiLink('notAThing')).toBeUndefined();
		expect(apiLink('a + b')).toBeUndefined();
		// names of Object.prototype are not API symbols
		expect(apiLink('toString')).toBeUndefined();
		expect(apiLink('constructor')).toBeUndefined();
	});

	it('slugifies headings', () => {
		expect(slugify('Solving `systems` & more')).toBe('solving-systems-more');
	});
});
