// title: Low-pass FIR filter
// module: signal
// description: Design a filter with firwin and apply it with lfilter to remove a high frequency.
// order: 1
import 'dart:math' as math;

import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  var fs = 100.0;
  var t = linspace(0, 1, num: 100, endpoint: false);
  var slow = arraySin(arrayMultiplyToScalar(t, 2 * math.pi * 2));
  var fast = arraySin(arrayMultiplyToScalar(t, 2 * math.pi * 30));
  var x = slow + fast;

  // 31 taps, cutoff at 10 Hz
  Array b = firwin(31, Array([10]), fs: fs);
  var y = lfilter(b, Array([1]), x);

  // after the filter delay (15 samples), y follows the slow wave
  var error = 0.0;
  for (var i = 30; i < 100; i++) {
    error = math.max(error, (y[i] - slow[i - 15]).abs());
  }
  print('taps: ${b.length}, sum of taps: ${arraySum(b).toStringAsFixed(6)}');
  print('max difference to the 2 Hz wave: ${error.toStringAsFixed(4)}');
}
