// title: Solve a system of nonlinear equations
// module: optimize
// description: Find x where f(x) = 0 for f from R^n to R^n, like scipy.optimize.root.
// order: 2
import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  // x^2 + y^2 = 4 and x y = 1
  Array f(Array v) => Array([
        v[0] * v[0] + v[1] * v[1] - 4,
        v[0] * v[1] - 1,
      ]);

  var result = root(f, Array([2, 0.5]));
  print('success: ${result.success}, ${result.message}');
  print('x = ${result.x.toList()}');
  print('f(x) = ${result.fun.toList()}');

  var broyden = root(f, Array([2, 0.5]), method: RootMethod.broyden1);
  print('broyden1: ${broyden.x.toList()} in ${broyden.iterations} iterations');
}
