---
title: Root finding
description: Roots of scalar functions and of systems of nonlinear equations.
section: SciDart
order: 5
scipy: scipy.optimize.root_scalar, scipy.optimize.root
---

## Scalar functions

`rootScalar` finds `x` with `f(x) = 0`. Each method needs different arguments:

| Method | Needs | Notes |
| --- | --- | --- |
| `brentq` | `bracket` where `f` changes sign | fast, and converges for any valid bracket |
| `bisect` | `bracket` | slower, halves the bracket each step |
| `newton` | `x0` and the derivative `fprime` | very fast near the root, can diverge far from it |
| `secant` | `x0`, optionally `x1` | no derivative needed |

Without `method`, `rootScalar` picks `brentq` when there is a bracket, `newton` when there is `fprime`, and `secant` otherwise.

{{example:optimize_root_scalar}}

The result is a `RootScalarResult`. When a method does not converge, `converged` is false and `message` says why; it does not throw. An invalid bracket throws `FormatException`.

Watch each method look for the root:

{{playground:root}}

## Systems of equations

`root` solves `f(x) = 0` for `f` from R^n to R^n. The default method is `lm` (Levenberg-Marquardt); `newton` and `broyden1` are also available in `RootMethod`. Pass a `jacobian` to avoid finite differences.

{{example:optimize_root_system}}
