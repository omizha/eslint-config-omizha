module.exports = {
    extends: ['prettier', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint'],
    // configs: {
    //   base: {
    //     plugins: [],
    //     rules: {}
    //   }
    // },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'lf',
                orderedImports: true,
                parser: 'typescript',
                printWidth: 140,
                semi: true,
                singleQuote: true,
                tabWidth: 2,
                trailingComma: 'all',
                useTabs: false,
            },
        ],
    },
};
