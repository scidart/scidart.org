---
title: Linear algebra
description: Solve linear systems, invert matrices and use the QR, LU and SVD decompositions.
section: NumDart
order: 2
scipy: numpy.linalg
---

Matrices are `Array2d` values. The functions live in the `linalg` module and the decompositions are ports of [JAMA](https://math.nist.gov/javanumerics/jama/).

## Solving systems

`matrixSolve` solves `A x = b`. With a square `A` it uses `LU`; with more rows than columns it returns the least squares solution through `QR`. `b` is a column matrix, built with `Array2d` or `arrayToColumnMatrix`.

{{example:linalg_solve}}

Related functions: `matrixDot` (matrix product), `matrixInverse`, `matrixPseudoInverse`, `matrixDeterminant`, `matrixRank`, `matrixTranspose`, `matrixIdentity`, `matrixNormOne` and `matrixNormTwo`.

## Decompositions

{{example:linalg_decompositions}}

- `QR` uses Householder reflections, with the same signs as NumPy. `isFullRank` accepts a tolerance.
- `LU` uses partial pivoting and gives the determinant and `solve`.
- `SVD` gives the singular values, the 2-norm, the condition number and the numerical rank. It throws `FormatException` for non-finite input.
