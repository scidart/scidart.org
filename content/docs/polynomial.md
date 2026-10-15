---
title: Polynomial fitting
description: Least squares polynomial fits with one input (PolyFit) or several inputs and outputs (PolyFitMultivariate).
section: NumDart
order: 3
scipy: numpy.polyfit, sklearn PolynomialFeatures
---

## One input

`PolyFit` fits `y = b0 + b1 x + ... + bd x^d` by least squares, like `numpy.polyfit`. The columns of the Vandermonde matrix are scaled before the QR decomposition, so very large or very small `x` values keep their precision.

{{example:polyfit}}

Note that `coefficients()` lists the lowest power first, the reverse of `numpy.polyfit`. When there are not enough distinct `x` values for the requested degree, or a power of `x` overflows, the degree is reduced: check `polyDegree()`.

Try it: drag the degree and watch the fit and R² change.

{{playground:polyfit}}

## Several inputs and outputs

`PolyFitMultivariate` takes a matrix of samples (one row per sample, one column per feature) and a matrix of outputs. It builds every product of features up to the degree, in the same order as `sklearn.preprocessing.PolynomialFeatures`, and fits all outputs at once.

{{example:polyfit_multivariate}}

`powers[t][f]` is the exponent of feature `f` in term `t`, and `coefficients[t][o]` is the coefficient of that term for output `o`. With more terms than samples it returns the minimum norm solution, like `numpy.linalg.lstsq`, and `rank` tells how many terms were really determined.
