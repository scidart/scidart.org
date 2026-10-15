// title: Normal distribution
// module: stats
// description: Density, probabilities, quantiles and samples of a normal distribution, like scipy.stats.norm.
// order: 1
import 'dart:math' as math;

import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

void main() {
  // adult height in cm
  var height = NormalDistribution(mean: 170, std: 8);

  print('density at 170: ${height.pdf(170)}');
  print('P(height < 180): ${height.cdf(180)}');
  print('P(height > 190): ${height.sf(190)}');
  print('95th percentile: ${height.ppf(0.95)}');
  print('central 95%: ${height.interval(0.95).toList()}');

  var s = height.sample(10000, random: math.Random(42));
  print(
      'sample mean: ${mean(s).toStringAsFixed(2)}, std: ${standardDeviation(s).toStringAsFixed(2)}');
}
