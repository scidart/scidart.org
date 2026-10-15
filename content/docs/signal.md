---
title: Signal processing
description: FIR filter design, filtering, peaks, window functions and convolution.
section: SciDart
order: 2
scipy: scipy.signal
---

## FIR filters

`firwin` designs a linear phase FIR filter with the window method, like `scipy.signal.firwin`, and `lfilter` applies it. `pass_zero` accepts `true`, `false`, `'lowpass'`, `'highpass'`, `'bandpass'` and `'bandstop'`.

{{example:signal_fir}}

{{playground:fir}}

## Peaks

{{example:signal_peaks}}

## Window functions

`hann`, `hamming`, `blackman`, `blackmanharris`, `nuttall`, `flattop` and `kaiser`, plus `getWindow` to pick one by name. With `sym: false` they return the periodic version used for spectral analysis.

{{example:signal_windows}}

{{playground:window}}

## Convolution

{{example:signal_convolution}}

`convolution` and `correlate` return the full result, like `numpy.convolve(..., mode='full')`. Pass `fast: true` to compute them through the FFT.
