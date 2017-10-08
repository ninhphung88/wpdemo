// Karma and Mocha
module.exports = (config) => {
    const tests = 'tests/*.test.js';

    config.set({
        frameworks: ['mocha'],

        files: [
            {
                pattern: tests,
            },
        ],

        // Preprocess through webpack
        preprocessors: {
            [tests]: ['webpack'],
        },

        singleRun: true,
    });
};

// Generating Coverage Reports  && PhantomJS
//const path = require('path');
//
//module.exports = (config) => {
//    const tests = 'tests/*.test.js';
//
//    process.env.BABEL_ENV = 'karma';
//
//    config.set({
//        frameworks: ['mocha'],
//
//        files: [
//            {
//                pattern: tests,
//            },
//        ],
//
//        // Preprocess through webpack
//        preprocessors: {
//            [tests]: ['webpack'],
//        },
//
//        singleRun: true,
//
//        browsers: ['PhantomJS'],
//
//        webpack: require('./webpack.parts').loadJavaScript({
//            include: path.join(__dirname, 'tests'),
//        }),
//
//        reporters: ['coverage'],
//
//        coverageReporter: {
//            dir: 'coverage',
//            reporters: [
//                { type: 'html' },
//                { type: 'lcov' },
//            ],
//        },
//    });
//};