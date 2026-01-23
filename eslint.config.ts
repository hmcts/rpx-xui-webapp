import { defineConfig } from 'eslint/config';

import tsEslint from 'typescript-eslint';
import eslintComments from 'eslint-plugin-eslint-comments';
import * as js from '@eslint/js';

export default defineConfig(
  js.configs.recommended,
  tsEslint.configs.recommended,

  {
    plugins: { 'eslint-comments': eslintComments },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-case-declarations': 'warn',
      'no-prototype-builtins': 'warn',

      'eslint-comments/no-use': 'warn',
    },
  },
  {
    files: ['**/**.spec.ts', '**/**.spec.js'],

    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/assets/**/*.js'],

    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['api/**/test/**', 'api/**/**.spec.js', 'api/**/**.spec.ts'],

    rules: {
      '@typescript-eslint/no-require-imports': 'warn',
    },
  }
);
