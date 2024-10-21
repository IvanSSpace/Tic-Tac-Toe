import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.browser,
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
    },
];
