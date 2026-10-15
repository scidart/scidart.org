// Loads the library compiled to JS (static/scidart.js) once and calls it.
// Every number in a demo comes from scidart itself.

let loading: Promise<void> | undefined;

function load(): Promise<void> {
	if (window.scidart) return Promise.resolve();
	loading ??= new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.src = '/scidart.js';
		s.async = true;
		s.onload = () => (window.scidart ? resolve() : reject(new Error('scidart.js loaded without the API')));
		s.onerror = () => reject(new Error('could not load scidart.js'));
		document.head.append(s);
	});
	return loading;
}

/** Calls the library; an error from it (like a FormatException) rejects with its message. */
export async function call<T>(name: string, args: Record<string, unknown>): Promise<T> {
	await load();
	const r = JSON.parse(window.scidart!.call(name, JSON.stringify(args)));
	if (r && typeof r === 'object' && 'error' in r) throw new Error(r.error);
	return r as T;
}

/** Short, readable number for the read-outs. */
export function fmt(v: number | null | undefined, digits = 10): string {
	if (v === null || v === undefined) return '-';
	if (!Number.isFinite(v)) return String(v);
	const a = Math.abs(v);
	if (a !== 0 && (a < 1e-4 || a >= 1e7)) return v.toExponential(6);
	return String(Number(v.toPrecision(digits)));
}
