<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	let name = $state('hann');
	let m = $state(51);
	let beta = $state(8.6);
	let values = $state<number[]>([]);
	let error = $state('');

	$effect(() => {
		call<{ values: number[] }>('window', { name, m, beta }).then((r) => {
				error = '';
				values = r.values;
			})
			.catch((e: Error) => {
				error = e.message;
			});
	});
</script>

<div class="controls">
	<label>window
		<select bind:value={name}>
			<option>hann</option><option>hamming</option><option>blackman</option><option>blackmanharris</option><option>nuttall</option><option>flattop</option><option>kaiser</option>
		</select>
	</label>
	<label>M {m}<input type="range" min="3" max="101" step="2" bind:value={m} /></label>
	{#if name === 'kaiser'}<label>beta <input type="number" bind:value={beta} step="0.5" /></label>{/if}
</div>
{#if error}<p class="pg-error">{error}</p>{/if}
{#if values.length}
	<Plot ariaLabel="window values" height={200} series={[{ points: values.map((v, i) => [i, v]), kind: m <= 31 ? 'stem' : 'line' }]} xLabel="n" yLabel="w[n]" />
	<p class="pg-note">Symmetric window of {m} points. Sum: {fmt(values.reduce((s, v) => s + v, 0), 8)}.</p>
{/if}
