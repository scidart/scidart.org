// title: Window functions
// module: signal
// description: Hann, Hamming, Blackman and Kaiser windows, like scipy.signal.windows.
// order: 3
import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  String show(Array w) => w.map((v) => v.toStringAsFixed(4)).join(', ');
  print('hann(5):     ${show(hann(5))}');
  print('hamming(5):  ${show(hamming(5))}');
  print('blackman(5): ${show(blackman(5))}');
  print('kaiser(5, 8): ${show(kaiser(5, 8))}');
}
