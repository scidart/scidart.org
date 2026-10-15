import { Marked, type Tokens } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import apiIndex from '$lib/generated/api-index.json';
import examplesJson from '$lib/generated/examples.json';
import type { Example } from '$lib/types';

const examples = examplesJson as Example[];
const api = apiIndex as Record<string, string>;

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
	highlighter ??= createHighlighter({
		themes: ['github-light', 'github-dark'],
		langs: ['dart', 'yaml', 'bash', 'json', 'text']
	});
	return highlighter;
}

export async function highlight(code: string, lang = 'dart'): Promise<string> {
	const h = await getHighlighter();
	const known = h.getLoadedLanguages().includes(lang) ? lang : 'text';
	return h.codeToHtml(code, {
		lang: known,
		themes: { light: 'github-light', dark: 'github-dark' },
		defaultColor: false
	});
}

const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `linspace`, `linspace()` and `PolyFit` link to their API page when dart doc knows them. */
export function apiLink(code: string): string | undefined {
	const name = code.replace(/\(\)$/, '');
	// own keys only: `toString` must not resolve to Object.prototype.toString
	return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) && Object.hasOwn(api, name) ? api[name] : undefined;
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function findExample(id: string): Example {
	const ex = examples.find((e) => e.id === id);
	if (!ex) throw new Error(`unknown example "${id}": add examples/bin/${id}.dart`);
	return ex;
}

export async function exampleHtml(ex: Example): Promise<string> {
	return `<figure class="example" id="example-${ex.id}">
<figcaption><span class="example-title">${escape(ex.title)}</span><span class="example-desc">${escape(ex.description)}</span></figcaption>
${await highlight(ex.code)}
<div class="example-output"><span class="example-output-label">Output</span><pre>${escape(ex.output)}</pre></div>
</figure>`;
}

export interface Rendered {
	html: string;
	headings: { id: string; text: string }[];
}

/**
 * Renders a guide. Besides plain markdown:
 * - a line `{{example:id}}` becomes the example with its real output;
 * - a line `{{playground:name}}` becomes the mount point of an interactive demo.
 */
export async function renderMarkdown(source: string): Promise<Rendered> {
	const headings: Rendered['headings'] = [];
	const blocks = new Map<string, string>();
	let n = 0;
	const placeholder = (html: string) => {
		const key = `SCIDART_BLOCK_${n++}`;
		blocks.set(key, html);
		return `\n\n${key}\n\n`;
	};

	let text = source;
	for (const m of source.matchAll(/^\{\{example:([a-z0-9_]+)\}\}\s*$/gm)) {
		text = text.replace(m[0], placeholder(await exampleHtml(findExample(m[1]))));
	}
	text = text.replace(/^\{\{playground:([a-z0-9-]+)\}\}\s*$/gm, (_, name) =>
		placeholder(`<div class="playground" data-playground="${name}"><p class="playground-loading">Loading the interactive demo…</p></div>`)
	);

	const code = new Map<string, string>();
	const marked = new Marked({
		async: true,
		gfm: true,
		walkTokens: async (token) => {
			if (token.type === 'code') {
				const t = token as Tokens.Code;
				code.set(t.text, await highlight(t.text, t.lang || 'dart'));
			}
		},
		renderer: {
			code(t) {
				return code.get(t.text) ?? `<pre><code>${escape(t.text)}</code></pre>`;
			},
			codespan(t) {
				const href = apiLink(t.text.replace(/&amp;/g, '&'));
				const inner = `<code>${t.text}</code>`;
				return href ? `<a class="api-link" href="${href}">${inner}</a>` : inner;
			},
			heading(t) {
				const inner = this.parser.parseInline(t.tokens);
				const id = slugify(t.text);
				if (t.depth === 2) headings.push({ id, text: t.text.replace(/`/g, '') });
				return `<h${t.depth} id="${id}"><a class="anchor" href="#${id}">${inner}</a></h${t.depth}>\n`;
			},
			paragraph(t) {
				const raw = t.text.trim();
				if (blocks.has(raw)) return blocks.get(raw)!;
				return `<p>${this.parser.parseInline(t.tokens)}</p>\n`;
			}
		}
	});

	const html = (await marked.parse(text))
		.replace(/<table>/g, '<div class="table-scroll"><table>')
		.replace(/<\/table>/g, '</table></div>');
	return { html, headings };
}

const inline = new Marked({
	gfm: true,
	renderer: {
		codespan(t) {
			const href = apiLink(t.text.replace(/&amp;/g, '&'));
			return href ? `<a class="api-link" href="${href}"><code>${t.text}</code></a>` : `<code>${t.text}</code>`;
		}
	}
});

/** One line of release notes: inline markdown, `#N` links to the issue or PR. */
export function renderNote(text: string, repo: string): string {
	const html = inline.parseInline(text) as string;
	// only outside tags and code: split on tags and skip <code> content
	let inCode = false;
	return html
		.split(/(<[^>]+>)/)
		.map((part) => {
			if (part.startsWith('<')) {
				if (/^<code/.test(part)) inCode = true;
				if (/^<\/code/.test(part)) inCode = false;
				return part;
			}
			return inCode ? part : part.replace(/#(\d+)\b/g, `<a href="${repo}/issues/$1">#$1</a>`);
		})
		.join('');
}
