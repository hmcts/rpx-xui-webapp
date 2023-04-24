// eslint-disable-next-line no-undef
require('dotenv-extended').load({ path: 'api/.env.defaults' });

const modulesArr = [
  'accessManagement',
  'activityTracker',
  'amendedJurisdictions',
  'auth',
  'caseshare',
  'health',
  'healthCheck',
  'lib',
  'noc',
  'organisations',
  'searchCases',
  'services',
  'termsAndConditions',
  'user',
  'userTermsAndConditions',
  'workAllocation'
];

const modulesString = modulesArr.join(',');

// eslint-disable-next-line no-undef
module.exports = {
  fileLogLevel: 'trace',
  // logLevel: 'trace',
  mutate: [`api/{${modulesString}}/*.ts`, '!api/**/*.spec.ts', '!api/test/**/*.ts'],
  checkers: ['typescript'],
  testRunner: 'mocha',
  reporters: ['clear-text', 'progress', 'html'],
  tsconfigFile: 'tsconfig.json',
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: true
  },
  mochaOptions: {
    spec: ['api/{,!(test)/**/}*.spec.ts'],
    require: ['ts-node/register']
  },
  htmlReporter: {
    fileName: 'reports/tests/mutation/node/index.html'
  },
  ignoreStatic: true
};

