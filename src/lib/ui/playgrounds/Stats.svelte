<script lang="ts">
	import { call, fmt } from '$lib/bridge';

	type Out = { n: number; mean: number; median: number; mode: number; multimode: number[]; variance: number | null; std: number | null; min: number; max: number };
	let text = $state('2 4 4 4 5 5 7 9');
	let out = $state<Out | null>(null);
	let error = $state('');
	const values = $derived(text.split(/[\s,;]+/).filter(Boolean).map(Number));

	$effect(() => {
		if (!values.length || values.some((v) => !Number.isFinite(v))) {
			error = 'type numbers separated by spaces or commas';
			out = null;
			return;
		}
		call<Out>('stats', { values }).then((r) => {
				error = '';
				out = r;
			})
			.catch((e: Error) => {
				error = e.message;
				out = null;
			});
	});
</script>

<label class="field">values<textarea bind:value={text} spellcheck="false" style="min-height:4em"></textarea></label>
{#if error}<p class="pg-error">{error}</p>{/if}
{#if out}
	<dl class="readout" style="margin-top:12px">
		<dt>n</dt><dd>{out.n}</dd>
		<dt>mean</dt><dd>{fmt(out.mean)}</dd>
		<dt>median</dt><dd>{fmt(out.median)}</dd>
		<dt>mode</dt><dd>{fmt(out.mode)}</dd>
		<dt>multimode</dt><dd>{out.multimode.map((v) => fmt(v)).join(', ')}</dd>
		<dt>variance</dt><dd>{fmt(out.variance)}</dd>
		<dt>standardDeviation</dt><dd>{fmt(out.std)}</dd>
		<dt>min / max</dt><dd>{fmt(out.min)} / {fmt(out.max)}</dd>
	</dl>
{/if}
