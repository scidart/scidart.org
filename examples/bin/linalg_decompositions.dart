// title: QR, LU and SVD decompositions
// module: linalg
// description: Factor a matrix and rebuild it from the factors.
// order: 2
import 'package:scidart/numdart.dart';

void main() {
  var a = Array2d([
    Array([4, 3]),
    Array([6, 3]),
  ]);

  var qr = QR(a);
  print('Q = ${qr.Q()}');
  print('R = ${qr.R()}');
  print('Q R = ${matrixDot(qr.Q(), qr.R())}');

  var lu = LU(a);
  print('det from LU = ${lu.det()}');

  var svd = SVD(a);
  print('singular values = ${svd.singularValues().toList()}');
  print('condition number = ${svd.cond()}');
}
