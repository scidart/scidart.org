// Exposes scidart to the interactive demos of scidart.org.
//
// The page calls `scidart.call(name, argsJson)` and gets JSON back, so every
// number shown in a demo comes from the library itself. Errors come back as
// `{"error": "..."}` instead of throwing into the page.

import 'dart:convert';
import 'dart:js_interop';
import 'dart:js_interop_unsafe';
import 'dart:math' as math;

import 'package:scidart/numdart.dart';
import 'package:scidart/scidart.dart';

typedef Handler = Object? Function(Map<String, dynamic> args);

List<double> _list(Object? v) => [for (var x in v as List) (x as num).toDouble()];
double _num(Map<String, dynamic> a, String k) => (a[k] as num).toDouble();

final _handlers = <String, Handler>{
  'version': (_) => {'ok': true},
  'normal': _normal,
  'rootScalar': _rootScalar,
  'polyfit': _polyfit,
  'polyfitMultivariate': _polyfitMultivariate,
  'spectrum': _spectrum,
  'fir': _fir,
  'stats': _stats,
  'window': _window,
};

Object? _normal(Map<String, dynamic> a) {
  var n = NormalDistribution(mean: _num(a, 'mean'), std: _num(a, 'std'));
  var x = _num(a, 'x');
  var p = _num(a, 'p');
  var curve = [
    for (var i = 0; i <= 200; i++)
      [n.mean - 4 * n.std + 8 * n.std * i / 200, n.pdf(n.mean - 4 * n.std + 8 * n.std * i / 200)]
  ];
  return {
    'pdf': n.pdf(x),
    'cdf': n.cdf(x),
    'sf': n.sf(x),
    'ppf': n.ppf(p),
    'interval': n.interval(_num(a, 'confidence')).toList(),
    'curve': curve,
  };
}

final _functions = <String, (double Function(double), double Function(double))>{
  'cos(x) - x': ((x) => math.cos(x) - x, (x) => -math.sin(x) - 1),
  'x^3 - 2x - 5': ((x) => x * x * x - 2 * x - 5, (x) => 3 * x * x - 2),
  'exp(x) - 3': ((x) => math.exp(x) - 3, math.exp),
  'x^2 - 2': ((x) => x * x - 2, (x) => 2 * x),
  'x^2 + 1 (no real root)': ((x) => x * x + 1, (x) => 2 * x),
};

Object? _rootScalar(Map<String, dynamic> a) {
  var (f, df) = _functions[a['f']]!;
  var method = RootScalarMethod.values.byName(a['method'] as String);
  var bracketed = method == RootScalarMethod.bisect || method == RootScalarMethod.brentq;
  var trace = <List<double>>[];
  double traced(double x) {
    var y = f(x);
    trace.add([x, y]);
    return y;
  }

  var r = rootScalar(traced,
      method: method,
      bracket: bracketed ? [_num(a, 'a'), _num(a, 'b')] : null,
      x0: bracketed ? null : _num(a, 'x0'),
      x1: method == RootScalarMethod.secant ? _num(a, 'x0') + 0.5 : null,
      fprime: method == RootScalarMethod.newton ? df : null,
      maxIter: 60);
  var lo = _num(a, 'plotMin');
  var hi = _num(a, 'plotMax');
  return {
    'root': r.root,
    'converged': r.converged,
    'iterations': r.iterations,
    'functionCalls': r.functionCalls,
    'message': r.message,
    'fAtRoot': f(r.root),
    'trace': trace,
    'curve': [for (var i = 0; i <= 200; i++) [lo + (hi - lo) * i / 200, f(lo + (hi - lo) * i / 200)]],
  };
}

Object? _polyfit(Map<String, dynamic> a) {
  var x = Array(_list(a['x']));
  var y = Array(_list(a['y']));
  var fit = PolyFit(x, y, a['degree'] as int);
  var lo = x.reduce(math.min);
  var hi = x.reduce(math.max);
  var pad = (hi - lo) * 0.1 + 1e-9;
  return {
    'degree': fit.polyDegree(),
    'coefficients': fit.coefficients().toList(),
    'r2': fit.R2(),
    'text': fit.toString(),
    'curve': [
      for (var i = 0; i <= 200; i++)
        [lo - pad + (hi - lo + 2 * pad) * i / 200, fit.predict(lo - pad + (hi - lo + 2 * pad) * i / 200)]
    ],
  };
}

Object? _polyfitMultivariate(Map<String, dynamic> a) {
  var x = Array2d([for (var r in a['x'] as List) Array(_list(r))]);
  var y = Array2d([for (var r in a['y'] as List) Array(_list(r))]);
  var fit = PolyFitMultivariate(x, y, a['degree'] as int);
  return {
    'powers': fit.powers,
    'coefficients': [for (var r in fit.coefficients) r.toList()],
    'rank': fit.rank,
    'r2': fit.R2().toList(),
  };
}

Array _signal(Map<String, dynamic> a) {
  var fs = _num(a, 'fs');
  var n = a['n'] as int;
  var t = linspace(0, n / fs, num: n, endpoint: false);
  var s = Array.fixed(n);
  for (var tone in a['tones'] as List) {
    var f = (tone['f'] as num).toDouble();
    var amp = (tone['amp'] as num).toDouble();
    s = s + arrayMultiplyToScalar(arraySin(arrayMultiplyToScalar(t, 2 * math.pi * f)), amp);
  }
  return s;
}

Object? _spectrum(Map<String, dynamic> a) {
  var fs = _num(a, 'fs');
  var s = _signal(a);
  var window = a['window'] as String;
  var windowed = window == 'none' ? s : s * getWindow(window, s.length, fftbins: false);
  var mag = arrayComplexAbs(rfft(windowed));
  var freqs = fftFreq(s.length, d: 1 / fs, realFrequenciesOnly: true);
  var i = arrayArgMax(mag);
  double? refined;
  if (i > 0 && i < mag.length - 1 && mag.every((m) => m > 0)) {
    refined = fs * parabolic(arrayLog(mag), i)[0] / s.length;
  }
  return {
    'signal': s.toList(),
    'magnitude': mag.toList(),
    'freqs': freqs.toList(),
    'peakBin': fs * i / s.length,
    'peakRefined': refined,
  };
}

Object? _fir(Map<String, dynamic> a) {
  var fs = _num(a, 'fs');
  Array taps = firwin(a['numtaps'] as int, Array(_list(a['cutoff'])),
      fs: fs, window: a['window'], pass_zero: a['passZero']);
  var x = _signal(a);
  var y = lfilter(taps, Array([1]), x);
  // frequency response from the zero padded taps
  var padded = Array.fixed(1024);
  for (var i = 0; i < taps.length; i++) {
    padded[i] = taps[i];
  }
  var h = arrayComplexAbs(rfft(padded));
  return {
    'taps': taps.toList(),
    'input': x.toList(),
    'output': y.toList(),
    'response': h.toList(),
    'responseFreqs': fftFreq(1024, d: 1 / fs, realFrequenciesOnly: true).toList(),
  };
}

Object? _stats(Map<String, dynamic> a) {
  var x = Array(_list(a['values']));
  return {
    'n': x.length,
    'mean': mean(x),
    'median': median(x),
    'mode': mode(x),
    'multimode': multimode(x).toList(),
    'variance': x.length > 1 ? variance(x) : null,
    'std': x.length > 1 ? standardDeviation(x) : null,
    'min': arrayMin(x),
    'max': arrayMax(x),
  };
}

Object? _window(Map<String, dynamic> a) {
  var m = a['m'] as int;
  var name = a['name'] as String;
  Array w = switch (name) {
    'kaiser' => kaiser(m, _num(a, 'beta')),
    _ => getWindow(name, m, fftbins: false),
  };
  return {'values': w.toList()};
}

String _call(String name, String argsJson) {
  var handler = _handlers[name];
  if (handler == null) return jsonEncode({'error': 'unknown function $name'});
  try {
    var args = jsonDecode(argsJson) as Map<String, dynamic>;
    return jsonEncode(handler(args));
  } catch (e) {
    var msg = e is FormatException ? e.message : e.toString();
    return jsonEncode({'error': msg});
  }
}

void main() {
  var api = JSObject();
  api.setProperty('call'.toJS, ((String n, String a) => _call(n, a).toJS).toJS);
  globalContext.setProperty('scidart'.toJS, api);
}
