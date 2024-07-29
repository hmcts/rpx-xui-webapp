const { join } = require('path');

exports.config = {
  framework: 'cucumber',
  cucumberOpts: {
    require: ['../step_definitions/**/*.js'],
    format: ['json:reports/cucumber_report.json'],
    timeout: 240000,
  },
  specs: [
    '../features/**/*.feature'
  ],
  baseUrl: 'https://manage-case.aat.platform.hmcts.net',
  maxInstances: 1,
  multiCapabilities: [
    {
      browserName: 'firefox',
      platformName: 'Windows 10',
      browserVersion: 'latest',
        name: 'MC-firefox-windows-test',
        tunnelIdentifier: 'reformtunnel',
        extendedDebugging: true,
        capturePerformance: true,
    },
    {
      browserName: 'chrome',
      platformName: 'macOS 10.13',
      browserVersion: 'latest',
        name: 'MC-chrome-mac-test',
        tunnelIdentifier: 'reformtunnel',
        extendedDebugging: true,
        capturePerformance: true,
    },
    {
      browserName: 'MicrosoftEdge',
      platformName: 'Windows 10',
      browserVersion: 'latest',
        name: 'MC-microsoft-edge-windows-test',
        tunnelIdentifier: 'reformtunnel',
    }
  ],
  services: [
    ['sauce', {
      sauceConnect: true,
      sauceConnectOpts: {
        tunnelIdentifier: 'reformtunnel'
      }
    }]
  ],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  region: 'eu',
  waitforTimeout: 10000,
  connectionRetryTimeout: 240000,
  connectionRetryCount: 3,
  path: '/wd/hub',
  sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
  SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',
  reporters: ['spec', ['json', {
    outputDir: './cb_reports',
    outputFileFormat: function(opts) {
      return `saucelab_results-${opts.cid}.json`
    }
  }]],

  onPrepare() {
    const caps = browser.getCapabilities();
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(true);
    tsNode.register({
      project: path.join(__dirname, '/tsconfig.e2e.json'),
    });
    browser.manage().logs().get('browser').then(function(browserLog) {
      browserLog.forEach(function(log) {
        console.log(log.message);
      });
    });
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