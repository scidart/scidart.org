<script lang="ts">
	// Small SVG chart for the demos: lines, stems and dots on one scale.
	export interface Series {
		points: [number, number][];
		color?: string;
		kind?: 'line' | 'stem' | 'dots';
		fillTo?: number; // shade between the line and this y, up to fillUntil
		fillUntil?: number;
		label?: string;
	}

	let {
		series,
		vlines = [],
		hlines = [],
		xLabel = '',
		yLabel = '',
		height = 240,
		ariaLabel
	}: {
		series: Series[];
		vlines?: { x: number; color?: string; label?: string }[];
		hlines?: { y: number; color?: string }[];
		xLabel?: string;
		yLabel?: string;
		height?: number;
		ariaLabel: string;
	} = $props();

	const W = 640;
	const pad = { l: 64, r: 14, t: 14, b: 44 };

	function niceTicks(lo: number, hi: number, count = 5): number[] {
		if (!(hi > lo)) return [lo];
		const raw = (hi - lo) / count;
		const mag = 10 ** Math.floor(Math.log10(raw));
		const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
		const out: number[] = [];
		for (let v = Math.ceil(lo / step) * step; v <= hi + step * 1e-9; v += step) out.push(Number(v.toPrecision(12)));
		return out;
	}

	const finite = $derived(series.flatMap((s) => s.points).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y)));
	const xMin = $derived(Math.min(...finite.map((p) => p[0])));
	const xMax = $derived(Math.max(...finite.map((p) => p[0])));
	const yRange = $derived.by(() => {
		let lo = Math.min(...finite.map((p) => p[1]), ...hlines.map((h) => h.y));
		let hi = Math.max(...finite.map((p) => p[1]), ...hlines.map((h) => h.y));
		if (series.some((s) => s.kind === 'stem' || s.fillTo !== undefined)) lo = Math.min(lo, 0);
		if (hi === lo) {
			hi += 1;
			lo -= 1;
		}
		const m = (hi - lo) * 0.06;
		return [lo - m, hi + m];
	});
	const sx = (x: number) => pad.l + ((x - xMin) / (xMax - xMin || 1)) * (W - pad.l - pad.r);
	const sy = (y: number) => height - pad.b - ((y - yRange[0]) / (yRange[1] - yRange[0])) * (height - pad.t - pad.b);
	const clampY = (y: number) => Math.min(Math.max(y, yRange[0]), yRange[1]);

	function path(points: [number, number][]) {
		let d = '';
		let pen = false;
		for (const [x, y] of points) {
			if (!Number.isFinite(y)) {
				pen = false;
				continue;
			}
			d += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(clampY(y)).toFixed(1)}`;
			pen = true;
		}
		return d;
	}
	function fill(s: Series) {
		const pts = s.points.filter(([x, y]) => Number.isFinite(y) && (s.fillUntil === undefined || x <= s.fillUntil));
		if (!pts.length) return '';
		const base = sy(clampY(s.fillTo!));
		return `M${sx(pts[0][0])} ${base}` + pts.map(([x, y]) => `L${sx(x).toFixed(1)} ${sy(clampY(y)).toFixed(1)}`).join('') + `L${sx(pts.at(-1)![0])} ${base}Z`;
	}
	const label = (v: number) => {
		const a = Math.abs(v);
		return a !== 0 && (a < 1e-3 || a >= 1e5) ? v.toExponential(1) : String(Number(v.toPrecision(6)));
	};
</script>

<svg viewBox="0 0 {W} {height}" role="img" aria-label={ariaLabel}>
	{#if finite.length}
		{#each niceTicks(yRange[0], yRange[1]) as t (t)}
			<line class="grid" x1={pad.l} x2={W - pad.r} y1={sy(t)} y2={sy(t)} />
			<text class="tick" x={pad.l - 6} y={sy(t) + 4} text-anchor="end">{label(t)}</text>
		{/each}
		{#each niceTicks(xMin, xMax, 6) as t (t)}
			<text class="tick" x={sx(t)} y={height - pad.b + 19} text-anchor="middle">{label(t)}</text>
		{/each}
		{#if yRange[0] < 0 && yRange[1] > 0}
			<line class="axis" x1={pad.l} x2={W - pad.r} y1={sy(0)} y2={sy(0)} />
		{/if}
		{#each series as s, i (i)}
			{#if s.fillTo !== undefined}
				<path d={fill(s)} fill="var(--plot-fill)" />
			{/if}
			{#if s.kind === 'stem'}
				{#each s.points as [x, y], j (j)}
					<line x1={sx(x)} x2={sx(x)} y1={sy(clampY(0))} y2={sy(clampY(y))} stroke={s.color ?? 'var(--plot-1)'} stroke-width="1.6" />
				{/each}
			{:else if s.kind === 'dots'}
				{#each s.points as [x, y], j (j)}
					<circle cx={sx(x)} cy={sy(clampY(y))} r="4" fill={s.color ?? 'var(--plot-3)'} />
				{/each}
			{:else}
				<path d={path(s.points)} fill="none" stroke={s.color ?? 'var(--plot-1)'} stroke-width="2" />
			{/if}
		{/each}
		{#each hlines as h, i (i)}
			<line x1={pad.l} x2={W - pad.r} y1={sy(h.y)} y2={sy(h.y)} stroke={h.color ?? 'var(--muted)'} stroke-dasharray="4 4" />
		{/each}
		{#each vlines as v, i (i)}
			{#if v.x >= xMin && v.x <= xMax}
				<line x1={sx(v.x)} x2={sx(v.x)} y1={pad.t} y2={height - pad.b} stroke={v.color ?? 'var(--plot-3)'} stroke-width="2" stroke-dasharray="6 4" />
				{#if v.label}<text class="vlabel" x={sx(v.x) + 5} y={pad.t + 14} fill={v.color ?? 'var(--plot-3)'}>{v.label}</text>{/if}
			{/if}
		{/each}
		<text class="axis-label" x={(W + pad.l) / 2} y={height - 4} text-anchor="middle">{xLabel}</text>
		<text class="axis-label" transform="translate(14 {(height - pad.b) / 2}) rotate(-90)" text-anchor="middle">{yLabel}</text>
	{/if}
</svg>

<style>
	svg {
		width: 100%;
		height: auto;
		display: block;
		font-family: var(--font-mono);
	}
	.grid {
		stroke: var(--line);
	}
	.axis {
		stroke: var(--muted);
	}
	.tick,
	.axis-label {
		font-size: 14px;
		fill: var(--muted);
	}
	.vlabel {
		font-size: 14px;
	}
</style>
