module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
	  mocha: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,

        // Enable JSX
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: {
        __: true,
    },
    plugins: [
        'react',
    ],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'linebreak-style': [0, 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['warn'],
        'no-console': 0,
        'eol-last':[2, 'never'],
    },
};