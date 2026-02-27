/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  fileLogLevel: 'trace',
  // logLevel: 'trace',
  comment:
    'This config was generated using a preset. Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/angular.md#angular',
  mutate: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/test.ts', '!src/environments/*.ts'],

  mutator: 'typescript',
  // mutator1:{
  //   name: "typescript",
  //   excludedMutations: ["EqualityOperator", "BooleanLiteral", "ConditionalExpression", "LogicalOperator", "StringLiteral", "MethodExpression"]
  // },

  testRunner: 'karma',
  karma: {
    configFile: 'src/karma.conf.js',
    projectType: 'angular-cli',
    config: {
      browsers: ['ChromeHeadless'],
    },
  },
  reporters: ['progress', 'clear-text', 'html'],
  maxConcurrentTestRunners: 4,
  maxConcurrentTestRunners_comment: 'Recommended to use about half of your available cores when running stryker with angular',
  coverageAnalysis: 'off',
};
