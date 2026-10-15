import { findExample } from './markdown';
import type { Guide } from '$lib/types';

/** Guide as plain markdown, for llms.txt readers: examples expanded with their output. */
export function guideToMarkdown(g: Guide): string {
	const body = g.source
		.replace(/^\{\{example:([a-z0-9_]+)\}\}\s*$/gm, (_, id) => {
			const e = findExample(id);
			return `### Example: ${e.title}\n\n${e.description}\n\n\`\`\`dart\n${e.code}\n\`\`\`\n\nOutput:\n\n\`\`\`text\n${e.output}\n\`\`\``;
		})
		.replace(/^\{\{playground:([a-z0-9-]+)\}\}\s*$/gm, '(An interactive demo of this section runs on the web page.)');
	return `# ${g.title}\n\n> ${g.description}\n\n${body.trim()}\n`;
}
