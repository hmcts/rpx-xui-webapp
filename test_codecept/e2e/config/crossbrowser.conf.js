const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const retry = require('protractor-retry').retry;

console.log(process.env.SAUCE_USERNAME)
console.log(process.env.SAUCE_ACCESS_KEY)
console.log(process.env.TUNNEL_IDENTIFIER)
const config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./cucumber.crossbrowser.conf.js', '../features/stepDefinitions/**/*.steps'],
    keepAlive: false,
    tags: '@crossbrowser',
    profile: false,
    'no-source': true,
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:./cb_reports/saucelab_results.json'],
    retry: 1,
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
  baseUrl: 'https://manage-case.aat.platform.hmcts.net',
  allScriptsTimeout: 240000,
  useAllAngular2AppRoots: true,
  multiCapabilities: [
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'Windows 10',
      name: 'ia-firefox-windows-test',
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      capturePerformance: true,
      maxInstances: 1
    },
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'macOS 10.13',
      name: 'ia-firefox-mac-test',
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      capturePerformance: true,
      maxInstances: 1,
    },
    {
      browserName: 'MicrosoftEdge',
      version: 'latest',
      platform: 'Windows 10',
      name: 'ia-microsoft-edge-windows-test',
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
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

  onCleanUp(results, files) {
    retry.onCleanUp(results, files);
  },

  onPrepare() {
    const caps = browser.getCapabilities();
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(true);
    retry.onPrepare();
    browser.manage().logs().get('browser').then(function(browserLog) {
      browserLog.forEach(function(log) {
        console.log(log.message);
      });
    });
  },
  afterLaunch() {
    return retry.afterLaunch(1);
  },
  onComplete() {
    return browser.getProcessedConfig().then(function (c) {
      return browser.getSession().then(function (session) {
        // required to be here so saucelabs picks up reports to put in jenkins
        console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=mc-e2e-tests');
      });
    });
  },
};

exports.config = config;