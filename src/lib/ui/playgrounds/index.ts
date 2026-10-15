import type { Component } from 'svelte';
import Fir from './Fir.svelte';
import Normal from './Normal.svelte';
import Polyfit from './Polyfit.svelte';
import Root from './Root.svelte';
import Spectrum from './Spectrum.svelte';
import Stats from './Stats.svelte';
import Window from './Window.svelte';

/** `{{playground:name}}` in a guide mounts the component with that name. */
export const playgrounds: Record<string, Component> = {
	fir: Fir,
	normal: Normal,
	polyfit: Polyfit,
	root: Root,
	spectrum: Spectrum,
	stats: Stats,
	window: Window
};
