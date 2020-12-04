# SciDart website build instructions

## Build

- install Node.js and NPM in your system;
- open repository folder in the terminal and type: `npm install`
- start developer environment with command: `npm start`
- now you can edit files from `templates` folder, and the `README.md` file. The output file is `index.html` in the root.

## How the build works

- read files in `templates` folder;
- read `README.md` markdown file;
- render `README.md` in to HTML;
- put the rendered HTML in to `index.html` file in the root;
- start live-serve to serve and reload the browser automatically when `index.html` file in the root is changed;
- watch `templates` folder and `README.md` for changes and repeat the markdown rendering process;