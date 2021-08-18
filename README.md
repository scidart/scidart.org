<div style="text-align:center">
    <img class="img-fluid" src="https://github.com/scidart/scidart.org/blob/master/img/logo_small.png?raw=true"  alt="SciDart logo"/>
</div>

**SciDart** is an experimental cross-platform scientific platform for Dart.

## 🏹 Goals

The main goal of **SciDart** is run the main module where Dart can run, in other words, run on Flutter, Dart CLI, Dart web, etc. Beside, offer tools to help the data analysis.

## 🏃 Motivation

Some time ago I tried make a guitar tuner (frequency estimator) with Flutter and, I faced with the problem: Dart didn't have a unified scientific library. So, I tried implement something to help me and the community with this problem.

## 📦 SciDart modules

The **SciDart** are the combination of the following modules:

- **SciDart**: main library with all the numerical processing routines. It can run everywhere ([Github](https://github.com/scidart/scidart) / [PUB](https://pub.dev/packages/scidart));
- **SciDart IO**: library to handle data files, for now, was made to run only in Desktop ([Github](https://github.com/scidart/scidart_io) / [PUB](https://pub.dev/packages/scidart_io));
- **SciDart Plot**: library to plot the data ([Github](https://github.com/scidart/scidart_plot) / [PUB](https://pub.dev/packages/scidart_plot));

## 🔌 Installation

Choose your package and following the instructions in the PUB website.

## 📁 Documentation

- [SciDart docs](https://pub.dev/documentation/scidart/latest/);
- [SciDart IO docs](https://pub.dev/documentation/scidart_io/latest/);
- [SciDart Plot docs](https://pub.dev/documentation/scidart_plot/latest/);

## 🧬 SciDart modules functions

### 🧪 SciDart

- NumDart: Numerical computation libraries;
  - array_base: array manipulation;
  - calculus: calculus base;
  - constants: scientific constants;
  - fastmath: optimized math operations;
  - geometric: geometric related operations;
  - interpolation: discrete function interpolation;
  - linalg: linear algebra algorithms: matrix, decomposition, etc;
  - numbers: numeric functions that are missing in Dart by default: Complex, double truncation, etc;
  - polynomial: polynomial estimation, regression, etc;
  - random: random data generation;
  - spaces: vector linear spaces generators: arrange, ones, linspace, etc;
  - statistic: statistic computation;
  - time: execution time measurement;
- SciDart: Scientific computation libraries;
  - fftpack: fourier transformer tools;
    - dbfft
    - fft
    - fftfreq
    - rfft
  - signal: signal manipulation tools;
    - convolution
    - fir
    - lfilter
    - peaks
    - windows
  - special: special functions;
    - bessel

### 📡 SciDart IO

- IO: File manipulation libraries;
  - csv: [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file manipulation;
  - txt: text file manipulation;

### 📈 SciDart Plot

- Plot types:
  - Bar plot ([code](https://github.com/scidart/scidart_plot/blob/55c08e4fbf55c80cd03f516f7c977a7dfe92560f/test/plot/general_test/bar_test.dart#L10)):
   
  ![Bar plot](https://raw.githubusercontent.com/scidart/scidart_plot/master/test/plot/general_test/test_files/barSimple.svg)
  
  - Dot plot ([code](https://github.com/scidart/scidart_plot/blob/55c08e4fbf55c80cd03f516f7c977a7dfe92560f/test/plot/general_test/dot_test.dart#L10)):
  
  ![Dot plot](https://raw.githubusercontent.com/scidart/scidart_plot/master/test/plot/general_test/test_files/dotSimple.svg)

  - Line plot ([code](https://github.com/scidart/scidart_plot/blob/55c08e4fbf55c80cd03f516f7c977a7dfe92560f/test/plot/general_test/line_test.dart#L10)):
  
  ![Line plot](https://raw.githubusercontent.com/scidart/scidart_plot/master/test/plot/general_test/test_files/plotSimple.svg)

  - Stem plot ([code](https://github.com/scidart/scidart_plot/blob/55c08e4fbf55c80cd03f516f7c977a7dfe92560f/test/plot/general_test/stem_test.dart#L10)):
  
  ![Stem plot](https://raw.githubusercontent.com/scidart/scidart_plot/master/test/plot/general_test/test_files/stemSimple.svg)

  - Pie plot ([code](https://github.com/scidart/scidart_plot/blob/55c08e4fbf55c80cd03f516f7c977a7dfe92560f/test/plot/pie_test/pie_test.dart#L10)):
  
  ![Pie plot](https://raw.githubusercontent.com/scidart/scidart_plot/master/test/plot/pie_test/test_files/plotSimple.svg)


- Plot export formats: SVG string that can saved or redered anywhere;

## 🖥 Dart REPL for prototyping quickly

Dart don't have [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) by default, but I found [this amazing post from Andreas Kirsch
](https://medium.com/dartlang/dart-repl-poc-f327e3769b6f) and He implemented an experimental Dart REPL but the [current library don't support Dart SDK > 2.0.0](https://github.com/BlackHC/dart_repl/issues/5).
So, I decided to leave this work pending for now.

## 🙌 How to contribute

I recommend check the __Projects__ section and choose a task or choose and solve a problem with **SciDart** and 
implement the missing parts and read the file CONTRIBUTING.md.

The reference values for all functions came from with SciPy. The contributions need use SciPy as reference too.

Every contribution need to have tests, documentation and examples, otherwise, the pull request will be blocked.

## ☕ Supporters

SciDart is an open source project that runs on donations to pay the bills e.g. our domain name. If you want to support SciDart, you can ☕ [**buy a coffee here**](https://www.buymeacoffee.com/polotto).

## 📚 References

Below, the list of the main references of **SciDart**:

- SciPy: https://www.scipy.org/
- Jupyter: https://jupyter.org/
- JAMA A Java Matrix Package: https://math.nist.gov/javanumerics/jama/
- Commons Math The Apache Commons Mathematics Library: https://commons.apache.org/proper/commons-math/
- Rosetta code: https://rosettacode.org/

## ⚠ License

Copyright (c) 2019-present [Angelo Polotto](https://github.com/polotto) and Contributors. Scidart is free and open-source software licensed under the [Apache-2.0 License](./LICENSE). The official logo was created by [Juliano Polotto](https://www.linkedin.com/in/juliano-polotto-550ba379/) and distributed under Creative Commons license (CC BY-SA 4.0 International).