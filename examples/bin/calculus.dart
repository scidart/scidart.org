// title: Integrate and differentiate
// module: calculus
// description: Integrate sampled data and functions with the trapezoidal and Simpson rules, and differentiate numerically.
// order: 1
import 'dart:math' as math;

import 'package:scidart/numdart.dart';

void main() {
  // integral of sin(x) from 0 to pi is exactly 2
  var x = linspace(0, math.pi, num: 101);
  var y = arraySin(x);
  print('trapezoidal: ${trapzArray(y, x: x)}');
  print('simpson: ${simpsArray(y, x: x)}');
  print('simpson on a function: ${simpsFunction(0, math.pi, 100, math.sin)}');

  // derivative of x^3 at x = 2 is 12
  print('d/dx x^3 at 2: ${differentiateFunction(2, (double x) => x * x * x)}');
  print('cumulative integral: ${cumIntegration(Array([1, 2, 3, 4])).toList()}');
}
