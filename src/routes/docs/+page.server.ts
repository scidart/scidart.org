import { guidesBySection } from '$lib/server/guides';

export function load() {
	return {
		sections: guidesBySection().map((s) => ({
			section: s.section,
			guides: s.guides.map(({ slug, title, description, scipy }) => ({ slug, title, description, scipy }))
		}))
	};
}
