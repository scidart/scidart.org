---
title: Arrays
description: Array, Array2d and ArrayComplex, element-wise math and evenly spaced samples.
section: NumDart
order: 1
scipy: numpy.ndarray, numpy.linspace, numpy.arange
---

SciDart has three containers:

- `Array`: a list of `double`, the equivalent of a 1-D NumPy array.
- `Array2d`: a list of `Array` rows, used as a matrix.
- `ArrayComplex`: a list of `Complex`, used by the FFT.

All of them are real Dart lists, so `map`, `where`, `length` and `for` loops work as usual.

## Element-wise operations

`+`, `-`, `*` and `/` between two arrays of the same length work element by element. Operations with a scalar have their own functions, such as `arrayMultiplyToScalar` and `arrayAddToScalar`. Math functions follow the same naming: `arraySin`, `arrayCos`, `arrayLog`, `arraySqrt`, `arrayPow`.

{{example:arrays_basics}}

Reductions return a `double` or an index: `arraySum`, `arrayMax`, `arrayMin`, `arrayArgMax`, `arrayNorm`. `arrayCumSum` and `arrayDiff` return a new array.

## Creating arrays

{{example:arrays_spaces}}

- `linspace` returns `num` samples between `start` and `stop`, including `stop` unless `endpoint` is false.
- `createArrayRange` works like `numpy.arange`, with integer steps.
- `ones`, `zeros`, `Array.fixed` and `Array2d.fixed` create filled arrays. `logSpace` gives samples evenly spaced on a log scale.

## Copying

Arrays are mutable lists. Use `Array.fromArray` (or `copy()`) when a function must not change the caller's data.
