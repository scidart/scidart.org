<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	type Out = { pdf: number; cdf: number; sf: number; ppf: number; interval: number[]; curve: [number, number][] };
	let mean = $state(170);
	let std = $state(8);
	let x = $state(180);
	let p = $state(0.95);
	let out = $state<Out | null>(null);
	let error = $state('');

	$effect(() => {
		const args = { mean, std, x, p, confidence: 0.95 };
		call<Out>('normal', args).then((r) => {
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
	<label>mean <input type="number" bind:value={mean} step="1" /></label>
	<label>std <input type="number" bind:value={std} step="0.5" min="0.01" /></label>
	<label>x <input type="number" bind:value={x} step="1" /></label>
	<label>p for ppf <input type="number" bind:value={p} step="0.01" min="0" max="1" /></label>
</div>
{#if error}<p class="pg-error">{error}</p>{/if}
{#if out}
	<div class="pg-grid">
		<Plot
			ariaLabel="normal density with the area up to x shaded"
			series={[{ points: out.curve, fillTo: 0, fillUntil: x, color: 'var(--plot-1)' }]}
			vlines={[{ x: out.ppf, label: `ppf(${p})` }]}
			xLabel="x"
			yLabel="pdf"
		/>
		<dl class="readout">
			<dt>pdf(x)</dt><dd>{fmt(out.pdf)}</dd>
			<dt>cdf(x)</dt><dd>{fmt(out.cdf)}</dd>
			<dt>sf(x)</dt><dd>{fmt(out.sf)}</dd>
			<dt>ppf(p)</dt><dd>{fmt(out.ppf)}</dd>
			<dt>interval(0.95)</dt><dd>[{fmt(out.interval[0])}, {fmt(out.interval[1])}]</dd>
		</dl>
	</div>
	<p class="pg-note">Shaded area: cdf(x). Dashed line: ppf(p).</p>
{/if}
