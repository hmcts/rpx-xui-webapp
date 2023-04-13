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
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'no-case-declarations': 'off',
    'no-extra-boolean-cast': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 1
    }],
    'no-prototype-builtins': 'off',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always', {
      "omitLastInOneLineBlock": false
    }]
  }
};
