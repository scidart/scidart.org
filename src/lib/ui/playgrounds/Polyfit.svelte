<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	type Out = { degree: number; coefficients: number[]; r2: number; curve: [number, number][] };
	let data = $state('0 1.1\n1 2.9\n2 9.2\n3 19.1\n4 32.8\n5 51.2\n6 70.5\n7 99.7');
	let degree = $state(2);
	let out = $state<Out | null>(null);
	let error = $state('');

	const points = $derived(
		data
			.split('\n')
			.map((l) => l.trim().split(/[\s,;]+/).map(Number))
			.filter((p) => p.length >= 2 && p.every(Number.isFinite)) as [number, number][]
	);

	$effect(() => {
		const x = points.map((p) => p[0]);
		const y = points.map((p) => p[1]);
		if (x.length < 1) {
			error = 'add at least one point';
			out = null;
			return;
		}
		call<Out>('polyfit', { x, y, degree }).then((r) => {
				error = '';
				out = r;
			})
			.catch((e: Error) => {
				error = e.message;
				out = null;
			});
	});
</script>

<div class="pg-grid">
	<div>
		<label class="field">points: x y (one per line)<textarea bind:value={data} spellcheck="false"></textarea></label>
		<div class="controls" style="margin-top:12px">
			<label>degree {degree}<input type="range" min="0" max="7" bind:value={degree} /></label>
		</div>
		{#if error}<p class="pg-error">{error}</p>{/if}
		{#if out}
			<dl class="readout">
				<dt>degree used</dt><dd>{out.degree}</dd>
				<dt>R²</dt><dd>{fmt(out.r2, 12)}</dd>
				{#each out.coefficients as c, i (i)}<dt>x^{i}</dt><dd>{fmt(c)}</dd>{/each}
			</dl>
		{/if}
	</div>
	{#if out}
		<Plot ariaLabel="data points and fitted polynomial" series={[{ points: out.curve }, { points, kind: 'dots' }]} xLabel="x" yLabel="y" />
	{/if}
</div>
