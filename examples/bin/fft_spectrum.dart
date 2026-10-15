// title: Spectrum of a signal with the FFT
// module: fftpack
// description: Sample two sine waves, take the real FFT and read the strongest frequencies.
// order: 1
import 'dart:math' as math;

import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  var fs = 64.0; // sampling rate in Hz
  var t = linspace(0, 1, num: 64, endpoint: false);
  var signal = arraySin(arrayMultiplyToScalar(t, 2 * math.pi * 5)) +
      arrayMultiplyToScalar(
          arraySin(arrayMultiplyToScalar(t, 2 * math.pi * 12)), 0.5);

  var spectrum = arrayComplexAbs(rfft(signal));
  var freqs = fftFreq(signal.length, d: 1 / fs, realFrequenciesOnly: true);

  for (var i = 0; i < spectrum.length; i++) {
    if (spectrum[i] > 1) {
      print('${freqs[i]} Hz: magnitude ${spectrum[i].toStringAsFixed(3)}');
    }
  }
}
