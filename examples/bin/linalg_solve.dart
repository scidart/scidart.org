// title: Solve a linear system
// module: linalg
// description: Solve A x = b, then check the determinant, inverse and rank of A.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  // 3x + 2y - z = 1, 2x - 2y + 4z = -2, -x + y/2 - z = 0
  var a = Array2d([
    Array([3, 2, -1]),
    Array([2, -2, 4]),
    Array([-1, 0.5, -1]),
  ]);
  var b = Array2d([
    Array([1]),
    Array([-2]),
    Array([0]),
  ]);

  var x = matrixSolve(a, b);
  print('x = ${matrixColumnToArray(x, 0).toList()}');
  print('det(A) = ${matrixDeterminant(a)}');
  print('rank(A) = ${matrixRank(a)}');
  print('A * x = ${matrixColumnToArray(matrixDot(a, x), 0).toList()}');
}
