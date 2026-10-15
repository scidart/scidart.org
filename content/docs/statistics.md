---
title: Statistics
description: Mean, median, mode, variance and standard deviation of a sample.
section: NumDart
order: 4
scipy: numpy.mean, numpy.median, scipy.stats.mode
---

{{example:statistics}}

- `variance` and `standardDeviation` use the sample formula, dividing by `n - 1`. This matches `numpy.var(a, ddof=1)`, not the NumPy default.
- `median` does not change the order of the input.
- `mode` returns the first of the most frequent values, in the order they appear; `multimode` returns all of them in that order.

For probability distributions, see [Normal distribution](/docs/normal-distribution).

{{playground:stats}}
