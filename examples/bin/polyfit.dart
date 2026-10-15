// title: Fit a polynomial
// module: polynomial
// description: Least squares fit of a degree 2 polynomial, like numpy.polyfit.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  var x = Array([0, 1, 2, 3, 4, 5]);
  var y = Array([1.1, 2.9, 9.2, 19.1, 32.8, 51.2]);

  var fit = PolyFit(x, y, 2);
  print(fit);
  print('coefficients (lowest power first): ${fit.coefficients().toList()}');
  print('R2 = ${fit.R2()}');
  print('prediction at x = 6: ${fit.predict(6)}');
}
