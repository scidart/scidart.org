// title: Random arrays
// module: random
// description: Uniform random arrays of real and complex values.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  var a = randomArray(5);
  print(
      'length ${a.length}, all in [0, 1): ${a.every((v) => v >= 0 && v < 1)}');
  var m = randomArray2d(2, 3);
  print('matrix ${m.length} x ${m[0].length}');
  print('complex values: ${randomArrayComplex(2).length}');
}
