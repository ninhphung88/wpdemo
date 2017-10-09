// @flow
/* eslint-disable import/first, no-unused-vars, import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved, import/extensions, import/no-dynamic-require */
const { RawSource } = require('webpack-sources');

module.exports = class DemoPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const { name } = this.options;

        compiler.plugin('emit', (compilation, cb) => {
            compilation.assets[name] = new RawSource('demo');

            cb();
        });
    }
};