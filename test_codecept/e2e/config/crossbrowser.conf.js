const tsNode = require('ts-node');
const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      '../support/world.js',
      '../support/timeout.js',
      '../support/hooks.js',
      '../features/step_definitions/**/*.steps.js'
    ],
    tags: ['@crossbrowser'],
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:cb_reports/saucelab_results.json'],
  },

  sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
  host: 'ondemand.eu-central-1.saucelabs.com',
  sauceRegion: 'eu',
  port: 80,
  sauceConnect: true,
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',

  specs: ['../features/**/*.feature'],
  baseUrl: process.env.TEST_URL,
  allScriptsTimeout: 240000,
  useAllAngular2AppRoots: true,
  multiCapabilities: [
    {
      browserName: 'chrome',
      version: 'latest',
      platform: 'Windows 10',
      name: 'chrome-win-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1,
      'sauce:options': {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        build: 'CodeceptJS Build',
        name: 'Chrome Windows Tests',
      }
    },
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'Windows 10',
      name: 'firefox-win-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1,
      'sauce:options': {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        build: 'CodeceptJS Build',
        name: 'Firefox Windows Tests',
      }
    },
    {
      browserName: 'MicrosoftEdge',
      platform: 'macOS 10.15',
      version: '90.0',
      name: 'chromium-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1,
      'sauce:options': {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        build: 'CodeceptJS Build',
        name: 'Edge Mac Tests',
      }
    },
    {
      browserName: 'chrome',
      version: 'latest',
      platform: 'macOS 10.15',
      name: 'chrome-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1,
      'sauce:options': {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        build: 'CodeceptJS Build',
        name: 'Chrome Mac Tests',
      }
    },
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'macOS 10.15',
      name: 'ff-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1,
      'sauce:options': {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        build: 'CodeceptJS Build',
        name: 'Firefox Mac Tests',
      }
    }
  ],
  maxSessions: 1,

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        saveCollectedJSON: true,
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: 'XUI Service Cross Browser Test',
        jsonDir: 'reports/tests/crossbrowser',
        reportPath: 'reports/tests/crossbrowser',
        pageFooter: '<div><p> </p></div>'
      }
    }
  ],

  onPrepare() {
    const caps = browser.getCapabilities();
    browser.manage()
      .window()
      .maximize();
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;

    global.screenShotUtils = new screenShotUtils({
      browserInstance: browser
    });
  }
};

exports.config = config;