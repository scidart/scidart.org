---
title: Fourier transform
description: FFT, inverse FFT, real FFT, frequency bins and spectra in dB.
section: SciDart
order: 1
scipy: scipy.fft
---

| Function | Does | NumPy / SciPy |
| --- | --- | --- |
| `fft` | complex FFT | `numpy.fft.fft` |
| `ifft` | inverse complex FFT | `numpy.fft.ifft` |
| `rfft` | FFT of a real signal, positive frequencies only | `numpy.fft.rfft` |
| `rifft` | inverse of `rfft` | `numpy.fft.irfft` |
| `fftFreq` | frequency of each bin | `numpy.fft.fftfreq` |
| `dbfft` | spectrum in dB with a window | |

Lengths that are a power of two use the Cooley-Tukey algorithm. Other lengths use a direct DFT, which is much slower for long signals.

## Spectrum of a signal

{{example:fft_spectrum}}

## Precise frequency estimation

A tone between two bins spreads over several of them. A window reduces the leakage and parabolic interpolation on the log magnitude finds the true peak.

{{example:fft_frequency}}

Change the tones, the window and the number of samples:

{{playground:spectrum}}
