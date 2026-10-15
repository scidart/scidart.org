// title: Arrays and element-wise math
// module: arrays
// description: Create an Array, combine arrays element by element and reduce them.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  var a = Array([1, 2, 3, 4]);
  var b = Array([10, 20, 30, 40]);

  print((a + b).toList()); // element-wise sum
  print((a * b).toList()); // element-wise product
  print(arrayMultiplyToScalar(a, 0.5).toList());
  print(arrayCumSum(a).toList());

  print('sum: ${arraySum(a)}, max: ${arrayMax(b)}, argmax: ${arrayArgMax(b)}');
}
