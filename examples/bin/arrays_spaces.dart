// title: Ranges, linspace and filled arrays
// module: arrays
// description: Build evenly spaced samples like numpy.arange (createArrayRange) and numpy.linspace.
// order: 2
import 'package:scidart/numdart.dart';

void main() {
  print(createArrayRange(start: 0, stop: 10, step: 2).toList());
  print(linspace(0, 1, num: 5).toList());
  print(linspace(0, 1, num: 4, endpoint: false).toList());
  print(ones(3).toList());
  print(zeros(3).toList());
  print(Array2d.fixed(2, 3, initialValue: 7).map((r) => r.toList()).toList());
}
