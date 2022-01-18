var VirtualModulesPlugin = require('webpack-virtual-modules');

const fs = require("fs");
const path = require("path");

/** @type { import('webpack').Configuration } */
const server = require("./.webpack/webpack.config.server");

/** @type { import('webpack').Configuration } */
const client = require("./.webpack/webpack.config.client");

function toPascalCase(string) {
    return `${string}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

const appsNames = fs.readdirSync(path.join(__dirname, "src", "apps"));

module.exports = [
  appsNames.reduce((config, appName) => {
    const componentName = toPascalCase(appName)
    const name = appName
    const file = `
        import React from 'react';
        import ReactDOM from 'react-dom';
        
        import { ${componentName} } from './app';
        
        const data = document.querySelector('#${name} + #data')
        let props = {}
        
        if (data) {
            props = JSON.parse(data.textContent || '{}')
        }
        
        ReactDOM.hydrate(React.createElement(${componentName}, props), document.getElementById("${name}"));
        `;

    config.entry[appName] = [path.resolve("src", "apps", appName, "index.ts")];

    config.plugins.push(
      new VirtualModulesPlugin({
        [path.resolve("src", "apps", appName, "index.ts")]: file,
      })
    );
    return config;
  }, client),
  server,
];
