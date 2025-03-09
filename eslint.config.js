import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import importPlugin from 'eslint-plugin-import';
import sortExports from 'eslint-plugin-sort-exports';
import importNewlines from 'eslint-plugin-import-newlines';

export default tseslint.config(
  { ignores: ['dist', '.react-router'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'import': importPlugin,
      'sort-exports': sortExports,
      'import-newlines': importNewlines,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...importPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/no-default-export': 'off',
      'import/named': 'off',
      'import/no-namespace': [
        'error',
        { ignore: ['*.ext', '@testing-library/jest-dom/matchers', 'vitest'] },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-internal-modules': 'off',
      'import/order': [
        'error',
        {
          'groups': [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index', 'type'],
            ['object'],
          ],
          'newlines-between': 'always',
          'pathGroups': [
            {
              pattern: '{react,react-dom/**,redux}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '*.{scss,css}',
              group: 'object',
              patternOptions: { matchBase: true },
              position: 'after',
            },
          ],
          'warnOnUnassignedImports': true,
          'pathGroupsExcludedImportTypes': ['react', 'react-dom/**'],
          'distinctGroup': false,
          'alphabetize': {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
          allowSeparatedGroups: false,
        },
      ],
      'sort-exports/sort-exports': [
        'error',
        {
          sortDir: 'asc',
          ignoreCase: false,
          sortExportKindFirst: 'type',
          pattern: '**/index.*',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
