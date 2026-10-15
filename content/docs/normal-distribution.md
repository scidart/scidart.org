---
title: Normal distribution
description: Density, cumulative probability, quantiles, intervals and random samples of a normal distribution.
section: SciDart
order: 4
scipy: scipy.stats.norm
---

`NormalDistribution(mean: m, std: s)` is the equivalent of `scipy.stats.norm(loc=m, scale=s)`.

| Method | Meaning |
| --- | --- |
| `pdf`, `logPdf` | density at x |
| `cdf` | P(X ≤ x) |
| `sf` | P(X > x), precise in the upper tail |
| `ppf` | quantile: the x with cdf(x) = p |
| `isf` | inverse of `sf` |
| `interval` | central interval with the given probability |
| `sample` | random values, with an optional `Random` for a fixed seed |

{{example:stats_normal}}

`ppf` stays accurate in the extreme tails: `ppf(1e-300)` and even `ppf(5e-324)` match SciPy.

{{playground:normal}}
