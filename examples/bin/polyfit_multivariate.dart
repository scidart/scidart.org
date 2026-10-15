// title: Polynomial regression with several features
// module: polynomial
// description: Fit y from two inputs with interaction terms, like sklearn PolynomialFeatures plus LinearRegression.
// order: 2
import 'package:scidart/numdart.dart';

void main() {
  // y = 1 + 1.5 x0 + x1 + 0.5 x0^2 + 2 x0 x1
  var x = Array2d([
    Array([0, 0]),
    Array([1, 0]),
    Array([0, 1]),
    Array([1, 1]),
    Array([2, 1]),
    Array([1, 2]),
    Array([2, 2]),
  ]);
  var y = Array2d([
    for (var r in x)
      Array([1 + 1.5 * r[0] + r[1] + 0.5 * r[0] * r[0] + 2 * r[0] * r[1]])
  ]);

  var fit = PolyFitMultivariate(x, y, 2);
  for (var t = 0; t < fit.powers.length; t++) {
    var c = fit.coefficients[t][0];
    print('powers ${fit.powers[t]}: ${c.toStringAsFixed(6)}');
  }
  print('rank: ${fit.rank}, R2: ${fit.R2().toList()}');
  print('predict [3, 1]: ${fit.predict(Array([3, 1])).toList()}');
}
