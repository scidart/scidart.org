import { error } from '@sveltejs/kit';
import { guides, guidesBySection } from '$lib/server/guides';
import { renderMarkdown } from '$lib/server/markdown';

export function entries() {
	return guides.map((g) => ({ slug: g.slug }));
}

export async function load({ params }) {
	const i = guides.findIndex((g) => g.slug === params.slug);
	if (i < 0) error(404, 'Guide not found');
	const guide = guides[i];
	const { html, headings } = await renderMarkdown(guide.source);
	const link = (g?: (typeof guides)[number]) => (g ? { slug: g.slug, title: g.title } : null);
	return {
		guide: { slug: guide.slug, title: guide.title, description: guide.description, section: guide.section, scipy: guide.scipy },
		html,
		headings,
		prev: link(guides[i - 1]),
		next: link(guides[i + 1]),
		sections: guidesBySection().map((s) => ({ section: s.section, guides: s.guides.map(({ slug, title }) => ({ slug, title })) }))
	};
}
