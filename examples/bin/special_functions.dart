// title: Special functions
// module: special
// description: Error function, complementary error function and the modified Bessel function I0.
// order: 1
import 'package:scidart/scidart.dart';

void main() {
  print('erf(0.5) = ${erf(0.5)}');
  print('erfc(3) = ${erfc(3)}');
  // erfc keeps precision deep in the tail
  print('erfc(26.6) = ${erfc(26.6)}');
  print('I0(1) = ${besselI0(1)}');
}
