"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'prettier',
        '@typescript-eslint',
    ],
    configs: {
        base: {
            plugins: ['@omizha'],
            rules: {}
        }
    },
    rules: {},
};
