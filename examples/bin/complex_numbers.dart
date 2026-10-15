// title: Complex numbers
// module: numbers
// description: Arithmetic, magnitude, conjugate and the complex exponential.
// order: 1
import 'dart:math' as math;

import 'package:scidart/numdart.dart';

String show(Complex z) =>
    '${z.real} ${z.imaginary < 0 ? '-' : '+'} ${z.imaginary.abs()}i';

void main() {
  var a = Complex(real: 3, imaginary: 4);
  var b = Complex.ri(1, -2);

  print('a + b = ${show(a + b)}');
  print('a * b = ${show(a * b)}');
  print('a / b = ${show(a / b)}');
  print('|a| = ${complexAbs(a)}');
  print('conj(a) = ${show(complexConjugate(a))}');
  // Euler: e^(i pi) = -1
  print('e^(i pi) = ${show(complexExp(Complex(imaginary: math.pi)))}');
}
