// title: Convolution and moving average
// module: signal
// description: Convolve a signal with a kernel; a box kernel gives a moving average.
// order: 4
import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  var x = Array([1, 2, 3, 4, 5]);
  print(convolution(x, Array([1, 1, 1])).toList());
  print(arrayDivisionToScalar(convolution(x, Array([1, 1, 1])), 3).toList());
  print(correlate(x, Array([0, 1, 0.5])).toList());
}
