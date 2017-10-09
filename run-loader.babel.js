// @flow
/* eslint-disable import/first, no-unused-vars, import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders({
    resource: './demo.txt',
    loaders: [
        path.resolve(__dirname, './loaders/demo-loader'),
    ],
    readResource: fs.readFile.bind(fs),
},
(err, result) => err ?
    console.error(err) :
    console.log(result)
);