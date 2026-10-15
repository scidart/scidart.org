export interface Example {
	id: string;
	title: string;
	module: string;
	description: string;
	order: number;
	code: string;
	output: string;
}

export interface Release {
	version: string;
	prerelease: boolean;
	date: string | null;
	groups: { title: string; items: string[] }[];
}

export interface Library {
	version: string;
	ref: string;
	commit: string;
	sdk: string;
	tags: string[];
}

export interface Guide {
	slug: string;
	title: string;
	description: string;
	section: 'Getting started' | 'NumDart' | 'SciDart';
	order: number;
	scipy?: string;
	source: string;
}
