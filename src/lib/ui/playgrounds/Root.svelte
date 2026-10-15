<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	type Out = {
		root: number;
		converged: boolean;
		iterations: number;
		functionCalls: number;
		message: string;
		fAtRoot: number;
		trace: [number, number][];
		curve: [number, number][];
	};
	const presets: Record<string, { a: number; b: number; x0: number; lo: number; hi: number }> = {
		'cos(x) - x': { a: 0, b: 1, x0: 0.2, lo: -1, hi: 2 },
		'x^3 - 2x - 5': { a: 2, b: 3, x0: 1, lo: 0, hi: 3.5 },
		'exp(x) - 3': { a: 0, b: 2, x0: 0, lo: -1, hi: 2.5 },
		'x^2 - 2': { a: 0, b: 2, x0: 3, lo: -0.5, hi: 3.5 },
		'x^2 + 1 (no real root)': { a: -1, b: 1, x0: 0.5, lo: -3, hi: 3 }
	};
	let f = $state('cos(x) - x');
	let method = $state('brentq');
	let a = $state(0);
	let b = $state(1);
	let x0 = $state(0.2);
	let out = $state<Out | null>(null);
	let error = $state('');
	const bracketed = $derived(method === 'brentq' || method === 'bisect');

	function pick() {
		({ a, b, x0 } = presets[f]);
	}

	$effect(() => {
		const { lo, hi } = presets[f];
		call<Out>('rootScalar', { f, method, a, b, x0, plotMin: lo, plotMax: hi }).then((r) => {
				error = '';
				out = r;
			})
			.catch((e: Error) => {
				error = e.message;
				out = null;
			});
	});
</script>

<div class="controls">
	<label>f(x)
		<select bind:value={f} onchange={pick}>
			{#each Object.keys(presets) as name (name)}<option>{name}</option>{/each}
		</select>
	</label>
	<label>method
		<select bind:value={method}>
			<option>brentq</option><option>bisect</option><option>newton</option><option>secant</option>
		</select>
	</label>
	<label>a <input type="number" bind:value={a} step="0.5" disabled={!bracketed} /></label>
	<label>b <input type="number" bind:value={b} step="0.5" disabled={!bracketed} /></label>
	<label>x0 <input type="number" bind:value={x0} step="0.5" disabled={bracketed} /></label>
</div>
{#if error}<p class="pg-error">FormatException: {error}</p>{/if}
{#if out}
	<div class="pg-grid">
		<Plot
			ariaLabel="function with the points the method evaluated"
			series={[
				{ points: out.curve, color: 'var(--plot-1)' },
				{ points: out.trace.filter(([t]) => t >= presets[f].lo && t <= presets[f].hi), kind: 'dots' }
			]}
			hlines={[{ y: 0 }]}
			vlines={out.converged ? [{ x: out.root, color: 'var(--plot-2)', label: 'root' }] : []}
			xLabel="x"
			yLabel="f(x)"
		/>
		<dl class="readout">
			<dt>root</dt><dd>{fmt(out.root, 16)}</dd>
			<dt>f(root)</dt><dd>{fmt(out.fAtRoot)}</dd>
			<dt>converged</dt><dd class={out.converged ? 'ok' : 'fail'}>{out.converged}</dd>
			<dt>iterations</dt><dd>{out.iterations}</dd>
			<dt>functionCalls</dt><dd>{out.functionCalls}</dd>
			<dt>message</dt><dd>{out.message}</dd>
		</dl>
	</div>
	<p class="pg-note">Dots: every x where the method evaluated f. Bisection needs many more than Brent's method or Newton.</p>
{/if}
