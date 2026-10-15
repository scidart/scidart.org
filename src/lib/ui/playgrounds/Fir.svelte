<script lang="ts">
	import { call, fmt } from '$lib/bridge';
	import Plot from '../Plot.svelte';

	type Out = { taps: number[]; input: number[]; output: number[]; response: number[]; responseFreqs: number[] };
	const fs = 100;
	let numtaps = $state(31);
	let cutoff = $state(10);
	let windowName = $state('hamming');
	let passZero = $state('lowpass');
	let out = $state<Out | null>(null);
	let error = $state('');

	$effect(() => {
		const args = {
			fs,
			n: 200,
			numtaps,
			cutoff: [cutoff],
			window: windowName,
			passZero,
			tones: [{ f: 2, amp: 1 }, { f: 30, amp: 0.6 }]
		};
		call<Out>('fir', args).then((r) => {
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
	<label>taps {numtaps}<input type="range" min="3" max="101" step="2" bind:value={numtaps} /></label>
	<label>cutoff Hz <input type="number" bind:value={cutoff} step="1" min="1" max="49" /></label>
	<label>pass_zero
		<select bind:value={passZero}><option>lowpass</option><option>highpass</option></select>
	</label>
	<label>window
		<select bind:value={windowName}><option>hamming</option><option>hann</option><option>blackman</option><option>nuttall</option></select>
	</label>
</div>
{#if error}<p class="pg-error">{error}</p>{/if}
{#if out}
	<div class="pg-grid">
		<Plot
			ariaLabel="frequency response of the filter"
			height={200}
			series={[{ points: out.response.map((h, i) => [out!.responseFreqs[i], h]) }]}
			vlines={[{ x: cutoff, label: 'cutoff' }]}
			xLabel="frequency (Hz)"
			yLabel="|H(f)|"
		/>
		<Plot
			ariaLabel="input signal with 2 Hz and 30 Hz, and the filtered output"
			height={200}
			series={[
				{ points: out.input.map((v, i) => [i / fs, v]), color: 'var(--line)' },
				{ points: out.output.map((v, i) => [i / fs, v]), color: 'var(--plot-2)' }
			]}
			xLabel="time (s)"
			yLabel="signal"
		/>
	</div>
	<p class="pg-note">Input: 2 Hz plus 30 Hz. The output (teal) keeps the 2 Hz wave in low-pass mode and the 30 Hz wave in high-pass mode, delayed by {fmt((numtaps - 1) / 2)} samples. Sum of taps: {fmt(out.taps.reduce((s, v) => s + v, 0), 6)}.</p>
{/if}
