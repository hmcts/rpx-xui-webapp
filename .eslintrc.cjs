module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './tsconfig.json',
      './src/tsconfig.app.json',
      './src/tsconfig.spec.json',
      './api/tsconfig.json'
    ],
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': 'error',
    'curly': ['error', 'all'],
    'dot-notation': 'error',
    'eol-last': ['error', 'always'],
    'eqeqeq': 'error',
    'func-call-spacing': ['error', 'never'],
    'getter-return': 'error',
    'key-spacing': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'lines-between-class-members': ['error', 'always', {
      'exceptAfterSingleLine': true
    }],
    'new-parens': ['error', 'always'],
    'no-case-declarations': 'off',
    'no-extra-boolean-cast': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 1
    }],
    'no-prototype-builtins': 'off',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-unreachable': 'error',
    // 'object-curly-newline': ['error', { 'multiline': true }],
    'object-curly-spacing': ['error', 'always'],
    // 'object-property-newline': 'error',
    'padded-blocks': ['error', 'never'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always', {
      'omitLastInOneLineBlock': false
    }],
    'semi-spacing': 'error',
    'semi-style': ['error', 'last'],
    'space-in-parens': ['error', 'never'],
    'switch-colon-spacing': 'error'
  }
};
