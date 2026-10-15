---
title: Special functions
description: Error functions and the modified Bessel function of order zero.
section: SciDart
order: 3
scipy: scipy.special
---

{{example:special_functions}}

- `erf` and `erfc` use W. J. Cody's rational approximations and agree with `scipy.special` to about 1e-14 relative error. `erfc` keeps relative precision far into the tail, down to subnormal results.
- `besselI0` is the modified Bessel function of the first kind and order zero, used by the Kaiser window.
- Array versions: `arrayErf`, `arrayErfc`, `arrayBesselI0`.
