// title: Descriptive statistics
// module: statistic
// description: Mean, median, mode, variance and standard deviation of a sample.
// order: 1
import 'package:scidart/numdart.dart';

void main() {
  var a = Array([2, 4, 4, 4, 5, 5, 7, 9]);

  print('mean: ${mean(a)}');
  print('median: ${median(a)}');
  print('mode: ${mode(a)}');
  print('multimode: ${multimode(Array([1, 1, 2, 2, 3])).toList()}');
  print('variance: ${variance(a)}');
  print('standard deviation: ${standardDeviation(a)}');
}
