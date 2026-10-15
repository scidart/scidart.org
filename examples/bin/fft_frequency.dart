// title: Estimate a frequency precisely
// module: fftpack
// description: Window the signal, find the FFT peak and refine it with parabolic interpolation.
// order: 2
import 'dart:math' as math;

import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  var fs = 128.0;
  var f0 = 3.7; // between two FFT bins
  var n = linspace(0, 4, num: (4 * fs).toInt(), endpoint: false);
  var signal = arraySin(arrayMultiplyToScalar(n, 2 * math.pi * f0));

  var windowed = signal * blackmanharris(signal.length);
  var spectrum = arrayComplexAbs(rfft(windowed));
  var i = arrayArgMax(spectrum);
  var refined = parabolic(arrayLog(spectrum), i)[0];

  print('naive estimate: ${fs * i / windowed.length} Hz');
  print(
      'refined estimate: ${(fs * refined / windowed.length).toStringAsFixed(4)} Hz');
}
