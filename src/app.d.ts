// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {}
	interface Window {
		scidart?: { call(name: string, args: string): string };
	}
}

export {};
