module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prefer-arrow'],
    extends: [
        'eslint:recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    overrides: [
        {
            files: ['**/__tests__/**/*.ts'],
            rules: {
                // to prevent false positives on `expect(mock.mockFn)`
                '@typescript-eslint/unbound-method': 'off',
            },
        },
    ],
    env: {
        jest: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        'class-methods-use-this': 'off',
        'comma-dangle': [
            2,
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        'function-paren-newline': ['error', 'consistent'],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-classes-per-file': 'off',
        'max-len': ['error', { code: 120 }],
        'object-curly-newline': ['error', { consistent: true }],
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'padded-blocks': 0,
        semi: ['error', 'always'],
        'space-before-function-paren': 0,
    },
};
