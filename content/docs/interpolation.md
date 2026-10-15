---
title: Interpolation
description: Parabolic interpolation to find a peak between samples.
section: NumDart
order: 6
---

`parabolic` fits a parabola through a sample and its two neighbours and returns the position and height of its vertex. It is the standard way to read a peak position with more precision than the sample spacing, for example the frequency of an FFT peak.

{{example:interpolation}}

The [FFT guide](/docs/fft) uses it to estimate a frequency between two FFT bins.
