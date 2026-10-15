<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	type Out = { signal: number[]; magnitude: number[]; freqs: number[]; peakBin: number; peakRefined: number | null };
	let f1 = $state(5.3);
	let a1 = $state(1);
	let f2 = $state(18);
	let a2 = $state(0.4);
	let fs = $state(64);
	let n = $state(128);
	let windowName = $state('blackmanharris');
	let out = $state<Out | null>(null);
	let error = $state('');

	$effect(() => {
		const args = { fs, n, window: windowName, tones: [{ f: f1, amp: a1 }, { f: f2, amp: a2 }] };
		call<Out>('spectrum', args).then((r) => {
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
	<label>tone 1 Hz <input type="number" bind:value={f1} step="0.1" /></label>
	<label>amp <input type="number" bind:value={a1} step="0.1" /></label>
	<label>tone 2 Hz <input type="number" bind:value={f2} step="0.1" /></label>
	<label>amp <input type="number" bind:value={a2} step="0.1" /></label>
	<label>fs Hz <input type="number" bind:value={fs} step="1" min="1" /></label>
	<label>samples
		<select bind:value={n}>
			<option value={64}>64</option><option value={128}>128</option><option value={256}>256</option><option value={512}>512</option><option value={100}>100 (DFT)</option>
		</select>
	</label>
	<label>window
		<select bind:value={windowName}>
			<option value="none">none</option><option>hann</option><option>hamming</option><option>blackman</option><option>blackmanharris</option><option>flattop</option>
		</select>
	</label>
</div>
{#if error}<p class="pg-error">{error}</p>{/if}
{#if out}
	<div class="pg-grid">
		<Plot ariaLabel="signal in time" height={200} series={[{ points: out.signal.map((v, i) => [i / fs, v]) }]} xLabel="time (s)" yLabel="signal" />
		<Plot
			ariaLabel="magnitude spectrum"
			height={200}
			series={[{ points: out.magnitude.map((m, i) => [out!.freqs[i], m]), kind: 'stem', color: 'var(--plot-2)' }]}
			xLabel="frequency (Hz)"
			yLabel="|rfft|"
		/>
	</div>
	<dl class="readout" style="margin-top:10px">
		<dt>largest bin</dt><dd>{fmt(out.peakBin)} Hz</dd>
		<dt>parabolic</dt><dd>{out.peakRefined === null ? '-' : `${fmt(out.peakRefined, 6)} Hz`}</dd>
		<dt>bin width</dt><dd>{fmt(fs / n)} Hz</dd>
	</dl>
	<p class="pg-note">The parabolic estimate refines the strongest peak. Try tone 1 between two bins with and without a window.</p>
{/if}
