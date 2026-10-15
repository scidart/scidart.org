// title: Find peaks
// module: signal
// description: Local maxima of a signal, optionally above a threshold.
// order: 2
import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  var a = Array([0, 2, 1, 3, 0, 1, 5, 2, 0]);
  var all = findPeaks(a);
  print(
      'indexes: ${(all[0] as Array).toList()}, values: ${(all[1] as Array).toList()}');

  var tall = findPeaks(a, threshold: 3);
  print(
      'above 3: indexes ${(tall[0] as Array).toList()}, values ${(tall[1] as Array).toList()}');
}
