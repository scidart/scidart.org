// title: Find the true peak between samples
// module: interpolation
// description: Parabolic interpolation around the largest sample gives the peak position between grid points.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  // samples of -(x - 2.3)^2 at x = 0..5: the real peak is at 2.3
  var y = Array([for (var x = 0; x < 6; x++) -(x - 2.3) * (x - 2.3)]);
  var i = arrayArgMax(y);
  var peak = parabolic(y, i);
  print('largest sample at index $i');
  print('interpolated peak at ${peak[0]}, value ${peak[1]}');
}
