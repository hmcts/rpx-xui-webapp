module.exports = {
  extends: ['../.eslintrc.js'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    extraFileExtensions: ['.json'],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
}
