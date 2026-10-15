// title: Root of a function
// module: optimize
// description: Solve f(x) = 0 with Brent's method, bisection, Newton or the secant method.
// order: 1
import 'dart:math' as math;

import 'package:scidart/scidart.dart';

void main() {
  double f(double x) => math.cos(x) - x;

  var brent = rootScalar(f, bracket: [0, 1]);
  print('brentq: ${brent.root} after ${brent.iterations} iterations');

  var newton = rootScalar(f,
      method: RootScalarMethod.newton, x0: 1, fprime: (x) => -math.sin(x) - 1);
  print('newton: ${newton.root} after ${newton.iterations} iterations');

  var bisect = rootScalar(f, method: RootScalarMethod.bisect, bracket: [0, 1]);
  print('bisect: ${bisect.root} after ${bisect.iterations} iterations');
}
