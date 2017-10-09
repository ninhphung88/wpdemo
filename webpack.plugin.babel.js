// @flow
/* eslint-disable import/first, no-unused-vars, import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/no-dynamic-require */
const path = require('path');

const DemoPlugin = require('./plugins/demo-plugin.js');

const PATHS = {
    lib: path.join(__dirname, 'lib2'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: {
        lib: PATHS.lib,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new DemoPlugin({ name: 'demo' }),
    ],
};