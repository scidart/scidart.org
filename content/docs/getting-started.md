---
title: Getting started
description: Install scidart, import it and run your first computation.
section: Getting started
order: 1
---

SciDart brings the core of NumPy and SciPy to Dart. It is written in pure Dart, so the same code runs on the Dart VM, in Flutter apps (Android, iOS, desktop) and on the web.

The package has two libraries:

- `package:scidart/numdart.dart` is the NumPy side: arrays, linear algebra, polynomials, statistics, calculus, constants.
- `package:scidart/scidart.dart` is the SciPy side: FFT, signal processing, special functions, distributions and optimization. It also exports everything from `numdart`, so most programs only need this import.

## Install

```bash
dart pub add scidart
```

In a Flutter project, use `flutter pub add scidart`. See [Install](/install) for the SDK requirements.

## First program

{{example:fft_frequency}}

## How the docs are organized

- Each guide covers one module, with examples whose output comes from running them against the released version of scidart when this site was built.
- Some guides have interactive demos. They call the library compiled to JavaScript, the same code your app runs on the web.
- Names in `code` link to the [API reference](/api/index.html), generated with `dart doc`.
- Function names follow NumPy and SciPy where possible, so their documentation is a good second reference.
