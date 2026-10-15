---
title: Calculus
description: Numerical integration with the trapezoidal and Simpson rules, cumulative integrals and derivatives.
section: NumDart
order: 5
scipy: scipy.integrate.trapezoid, scipy.integrate.simpson
---

{{example:calculus}}

- Sampled data: `trapzArray`, `simpsArray` and `cumIntegration` take the samples `y` and either the positions `x` or a constant spacing `dx`.
- Functions: `trapzFunction` and `simpsFunction` integrate a Dart function between `a` and `b` with `n` intervals.
- Derivatives: `differentiateFunction` uses a finite difference at one point, and `differentiateArray` differentiates sampled data.
