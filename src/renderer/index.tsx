import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { toPascalCase } from '../utils';

const PORT = 3000
const app = express();

app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'templates'));
app.use('/static', express.static(path.join(__dirname, 'static')))

const manifest = fs.readFileSync(
    path.join(__dirname, 'static/manifest.json'),
    'utf-8'
)
const assets: { [key: string]: string } = JSON.parse(manifest)

Object.keys(assets).forEach(key => {
    const appName = key.replace(".js", "");
    
    app.get(`/apps/${appName}`, async (req, res) => {
        const module = require(`../apps/${appName}/app`);

        const App = module[toPascalCase(appName)];
        const props = await module['getStaticProps']?.(req) || {};

        const app = ReactDOMServer.renderToString(
            <div id={appName}>
                <App {...props} />
            </div>
        );

        const asset = assets[key];
        res.render('client.ejs', { asset, app, props })
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))