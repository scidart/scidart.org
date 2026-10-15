## Requirements

- Dart SDK `{{sdk}}`. Flutter 3.10 or newer ships a compatible Dart.
- No native code and no platform channels: scidart is pure Dart.

| Platform | Status |
| --- | --- |
| Dart VM (CLI, server) | tested in CI on Linux, macOS and Windows |
| Flutter (Android, iOS, macOS, Windows, Linux) | runs on the Dart VM |
| Web (dart2js) | tested in CI on Chrome; the demos on this site run this way |
| Web (WebAssembly) | not tested yet |

## Add the package

Dart project:

```bash
dart pub add scidart
```

Flutter project:

```bash
flutter pub add scidart
```

Or edit `pubspec.yaml` and run `dart pub get`:

```yaml
dependencies:
  scidart: ^{{version}}
```

## Import

```dart
// NumPy side: arrays, linalg, polynomial, statistics, calculus, constants
import 'package:scidart/numdart.dart';

// SciPy side: fft, signal, special, stats, optimize (also exports numdart)
import 'package:scidart/scidart.dart';
```

## Check that it works

{{example:arrays_basics}}

## Upgrading

Read the [release notes](/releases) before upgrading. Versions before 1.0 can change the API in a minor release; breaking changes are listed first in each release.

## Related packages

These packages are experimental and have not been updated since 2023:

- [scidart_io](https://pub.dev/packages/scidart_io): read and write CSV and text files (desktop only).
- [scidart_plot](https://pub.dev/packages/scidart_plot): line, bar, stem, dot and pie plots as SVG strings.
