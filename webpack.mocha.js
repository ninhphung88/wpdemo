// @flow
/* eslint-disable import/first, no-unused-vars, import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/no-dynamic-require */
import path from 'path';
import merge from 'webpack-merge';

const parts = require('./webpack.parts');

module.exports = merge([
    parts.devServer(),
    parts.page({
        title: 'Mocha demo',
        entry: {
            tests: path.join(__dirname, 'tests'),
        },
    }),
]);