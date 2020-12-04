# SciDart website build instructions

## Build

- install Node.js and NPM in your system;
- open repository folder in the terminal and type: `npm install`
- start developer environment with command: `npm start`
- now you can edit files from `templates` folder, and the `README.md` file. All output files are in `dist` folder.

## How the build works

- read files in `templates` folder;
- read `README.md` markdown file;
- render `README.md` in to HTML;
- put the redered HTML in to `dist` folder;
- start live-serve to serve and reload automatically files from `dist` folder;
- watch `templates` folder and `README.md` for changes and repeat the markdown rendering process;