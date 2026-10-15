<div align="center">
  <img src="img/logo_small.png" alt="SciDart logo" width="200" />
</div>

# scidart.org

Source of [scidart.org](https://scidart.org), the site of the [scidart](https://github.com/scidart/scidart) library: guides per module, examples with their real output, interactive demos, release notes and the API reference.

## How it works

- [SvelteKit](https://svelte.dev/docs/kit) with `adapter-static`: every page is prerendered to `build/` and published on GitHub Pages.
- `npm run sync` brings everything from the library at one release tag:
  - `examples/bin/*.dart` are run and their output is stored, so the site never shows output that was typed by hand;
  - `bridge/` is compiled with dart2js to `static/scidart.js`; the interactive demos call the library through it;
  - `dart doc` generates the API reference in `static/api/`;
  - `CHANGELOG.md` becomes the release notes, with the publication dates from pub.dev.
- The deploy workflow runs on every push to `master`, on a manual run and when the scidart repository sends a `scidart-release` event after a release.

## Develop

Requirements: Node.js 24 (`.node-version`) and the Dart SDK.

```bash
npm ci
npm run sync          # latest scidart release
npm run dev           # http://localhost:5173
```

Options for `npm run sync`:

- `SCIDART_REF=v0.1.0` documents a specific tag;
- `SCIDART_PATH=../scidart` uses a local checkout instead of cloning;
- `SKIP_API=1` skips `dart doc` for faster runs.

Before opening a pull request:

```bash
npm test
npm run check
npm run build
```

## Add content

- **Example**: a file in `examples/bin/` that starts with:

  ```dart
  // title: Short title
  // module: signal
  // description: One sentence about what it shows.
  ```

  Use it in a guide with `{{example:file_name}}`.
- **Guide**: a markdown file in `content/docs/` with `title`, `description`, `section` (`Getting started`, `NumDart` or `SciDart`) and `order` in the front matter. Names in backticks that exist in the API become links to it.
- **Interactive demo**: a component in `src/lib/ui/playgrounds/`, registered in `index.ts`, used with `{{playground:name}}`. It must get its numbers from `call()` in `src/lib/bridge.ts`, never from JavaScript math of its own.

## License

The site code is Apache-2.0. The SciDart logo was created by Juliano Polotto and is distributed under CC BY-SA 4.0.
