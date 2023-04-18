// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const chai = require('chai');

const { SpecReporter } = require('jasmine-spec-reporter');
const screenShotUtils = require('protractor-screenshot-utils').ProtractorScreenShotUtils;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // '../tests/*.js',
    // '../tests/**/*.js'
    '../tests/ccdToolkit_testCaseType.test.js',
    '../tests/ccdToolkit_Caselist_Poc.test.js'
  ],
  exclude: [
    '../tests/hiddenFields.test.js',
    '../tests/caseFieldCollectionsPermissions.test.js',
    '../tests/workAllocation1/*.test.js'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks', '--disable-notifications'] }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'mocha',
  mochaOpts: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportFilename: 'index.html',
      reportDir: 'reports/tests/ngIntegration',
      quiet: true
    },
    timeout: 120000
  },
  onPrepare() {
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
    global.screenShotUtils = new screenShotUtils({
      browserInstance: browser
    });
  },
  onComplete(){}
};
