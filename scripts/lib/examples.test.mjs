import { describe, expect, it } from 'vitest';
import { parseExample } from './examples.mjs';

describe('parseExample', () => {
	it('reads the header and strips it from the code', () => {
		const src = "// title: Mean\n// module: statistic\n// description: Average of an array.\n\nimport 'package:scidart/numdart.dart';\n\nvoid main() {}\n";
		expect(parseExample('mean.dart', src)).toEqual({
			id: 'mean',
			title: 'Mean',
			module: 'statistic',
			description: 'Average of an array.',
			order: 100,
			code: "import 'package:scidart/numdart.dart';\n\nvoid main() {}"
		});
	});

	it('fails loudly when metadata is missing', () => {
		expect(() => parseExample('x.dart', '// title: X\nvoid main() {}')).toThrow('x.dart: missing module, description');
	});
});
