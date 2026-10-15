import { describe, expect, it } from 'vitest';
import { apiIndex } from './api-index.mjs';

describe('apiIndex', () => {
	it('keeps top-level symbols with absolute links', () => {
		const index = [
			{ name: 'PolyFit', href: 'numdart/PolyFit-class.html', enclosedBy: { name: 'numdart', kind: 9 } },
			{ name: 'R2', href: 'numdart/PolyFit/R2.html', enclosedBy: { name: 'PolyFit', kind: 3 } },
			{ name: 'numdart', href: 'numdart/', kind: 9 }
		];
		expect(apiIndex(index)).toEqual({ PolyFit: '/api/numdart/PolyFit-class.html' });
	});
});
