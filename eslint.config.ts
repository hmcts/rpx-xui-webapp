import { defineConfig } from 'eslint/config';

import tsEslint from 'typescript-eslint';
import js from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig(
  js.configs.recommended,
  tsEslint.configs.recommended,

  // languageOptions: {
  //     parser: tsParser,

  //     parserOptions: {
  //         project: [
  //             "./tsconfig.json",
  //             "./src/tsconfig.app.json",
  //             "./src/tsconfig.spec.json",
  //             "./api/tsconfig.json",
  //         ],

  //         tsconfigRootDir: __dirname,
  //     },
  // },

  // plugins: {
  //     "@typescript-eslint": typescriptEslint,
  // },

  {
    rules: {
      // "@typescript-eslint/ban-ts-comment": "off",
      '@typescript-eslint/no-explicit-any': 'warn',
      // "@typescript-eslint/no-extra-semi": "off",
      // "@typescript-eslint/no-inferrable-types": "off",
      // "@typescript-eslint/no-var-requires": "off",
      // "@typescript-eslint/no-duplicate-enum-values": "off",
      // "@typescript-eslint/no-unused-vars": "error",
      // "@typescript-eslint/no-require-imports": "off",
      // "array-bracket-spacing": "error",
      // "arrow-parens": ["error", "always"],
      // "arrow-spacing": "error",
      // "block-spacing": "error",
      // "brace-style": ["error", "1tbs"],
      // "comma-dangle": ["error", "never"],
      // "comma-spacing": "error",
      // "comma-style": "error",
      // "computed-property-spacing": "error",
      // "curly": ["error", "all"],
      // "dot-notation": "error",
      // "eol-last": "error",
      // "eqeqeq": "error",
      // "func-call-spacing": ["error", "never"],
      // "getter-return": "error",
      // "grouped-accessor-pairs": ["error", "getBeforeSet"],
      // "key-spacing": "error",
      // "keyword-spacing": "error",

      // "indent": ["error", 2, {
      //     "SwitchCase": 1,
      // }],

      // "linebreak-style": "error",

      // "lines-between-class-members": ["error", "always", {
      //     "exceptAfterSingleLine": true,
      // }],

      // "new-parens": ["error", "always"],
      'no-case-declarations': 'warn',
      // "no-else-return": "error",
      // "no-empty": "error",
      // "no-extra-boolean-cast": "off",
      // "no-extra-semi": "error",
      // "no-mixed-spaces-and-tabs": "error",
      // "no-multi-spaces": "error",

      // "no-multiple-empty-lines": ["error", {
      //     "max": 1,
      //     "maxEOF": 1,
      // }],

      'no-prototype-builtins': 'warn',
      // "no-tabs": "error",
      // "no-trailing-spaces": "error",
      // "no-whitespace-before-property": "error",
      // "no-unreachable": "error",

      // "no-unused-expressions": ["error", {
      //     "allowTernary": true,
      // }],

      // "no-var": "error",
      // "object-curly-spacing": ["error", "always"],
      // "padded-blocks": ["error", "never"],
      // "prefer-const": "error",
      // "quotes": ["error", "single"],

      // "semi": ["error", "always", {
      //     "omitLastInOneLineBlock": false,
      // }],

      // "semi-spacing": "error",
      // "semi-style": ["error", "last"],
      // "space-in-parens": ["error", "never"],
      // "switch-colon-spacing": "error",
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
  }
);
