const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const tsNode = require('ts-node');

const config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      '../crossbrowser/stepDefinitions/**/*.steps',
    ],
    keepAlive: false,
    tags: ['@crossbrowser'],
    profile: false,
    'fail-fast': false,
    'no-source': true,
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:./cb_reports/saucelab_results.json'],
    retry: 1,
  },

  sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
  host: 'ondemand.eu-central-1.saucelabs.com',
  sauceRegion: 'eu',
  port: 80,
  processes: 23,
  sauceConnect: true,
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',

  specs: ['../crossbrowser/**/*.feature'],
  baseUrl: 'https://manage-case.aat.platform.hmcts.net',
  allScriptsTimeout: 240000,
  useAllAngular2AppRoots: true,
  multiCapabilities: [
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'Windows 10',
      name: 'MC-firefox-windows-test',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      capturePerformance: true,
      maxInstances: 1
    },
    {
      browserName: 'chrome',
      version: 'latest',
      platform: 'macOS 10.15',
      name: 'MC-chrome-mac-test',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      capturePerformance: true,
      maxInstances: 1,
    },
    {
      browserName: 'MicrosoftEdge',
      version: 'latest',
      platform: 'Windows 10',
      name: 'MC-microsoft-edge-windows-test',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      capturePerformance: true,
      maxInstances: 1,
    },
  ],
  maxSessions: 1,

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        saveCollectedJSON: true,
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: 'MC Cross Browser Test',
        jsonDir: 'reports/tests/crossbrowser',
        reportPath: 'reports/tests/crossbrowser',
        pageFooter: '<div><p> </p></div>',
      },
    },
  ],

  onPrepare() {
    browser.getCapabilities().then(function (caps) {
      browser.browserName = caps.get('browserName');
    });

    browser.waitForAngularEnabled(false);

    tsNode.register({
      project: path.join(__dirname, './tsconfig.e2e.json')
    });
  },

  onComplete() {
    return browser.getProcessedConfig().then(function (c) {
      return browser.getSession().then(function (session) {
        // required to be here so saucelabs picks up reports to put in jenkins
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=mv-xb-tests');
      });
    });
  }
};
config.defaultTimeout = 30000;
exports.config = config;