const showdown = require('showdown');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const liveServer = require("live-server");

function convertMarkdown(file) {
    const converter = new showdown.Converter();

    const filePath = path.join(__dirname, file);
    const fileRaw = fs.readFileSync(filePath, 'utf-8');
    return  converter.makeHtml(fileRaw);
}

function renderHtml(templatePath, view) {
    const templateFilePath = path.join(__dirname, templatePath);
    const templateFile = fs.readFileSync(templateFilePath, 'utf-8');
    return mustache.render(templateFile, view);
}

function renderTemplates() {
    const readmeHTML = convertMarkdown('./README.md');

    const view = {
        body: readmeHTML
    };

    const indexRendered = renderHtml('./templates/index.html', view)

    fs.writeFileSync('./dist/index.html', indexRendered, 'utf-8');
}

const params = {
    port: 8080, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./dist", // Set root directory that's being served. Defaults to cwd.
    file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    mount: [['./img', './favicon.ico']], // Mount a directory to a route.
};
liveServer.start(params);

fs.watch('./templates', (curr, prev) => {
    console.log(`${prev} file Changed`);
    renderTemplates();
});

fs.watch('./README.md', (curr, prev) => {
    console.log(`${prev} file Changed`);
    renderTemplates();
});