var screenShotUtils = require("protractor-screenshot-utils").ProtractorScreenShotUtils;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));


const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),


    sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',

    host: 'ondemand.eu-central-1.saucelabs.com',
    sauceregion: 'eu',
    port: 80,
    specs: ['../features/**/*.feature'],

    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),

    params: {
      serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
      targetEnv: argv.env || 'local',
      username: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
      fr_judge_username: process.env.FR_EMAIL,
      fr_judge_password: process.env.FR_PASSWORD
    },


    // sauceProxy: 'https://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/',
    allScriptsTimeout: 111000,

    useAllAngular2AppRoots: true,
    multiCapabilities: [
      {
        browserName: 'chrome',
        version: 'latest',
        platform: 'Windows 10',
        name: 'chrome-tests',
        tunnelIdentifier: 'reformtunnel',
        extendedDebugging: true,
        shardTestFiles: true,
        sharedTestFiles: false,
        maxInstances: 1
      },

  // },

  // {
  //     browserName: 'chrome',
  //     name: 'MAC_CHROME_LATEST',
  //     platform: 'macOS 10.13',
  //     version: 'latest',
  //     'tunnel-identifier': 'reformtunnel'
  //         // shardTestFiles: true,
  //         // maxInstances: 1
  //
  // },

  //
  // {
  //     browserName: 'firefox',
  //     name: 'WIN_FIREFOX_LATEST',
  //     platform: 'Windows 10',
  //     version: 'latest',
  //     'tunnel-identifier': 'reformtunnel',
  //     shardTestFiles: false,
  //     maxInstances: 1
  //
  //  }
  //
  // {
  //     browserName: 'firefox',
  //     name: 'MAC_FIREFOX_LATEST',
  //     platform: 'macOS 10.13',
  //     version: 'latest',
  //     'tunnel-identifier': 'reformtunne',
  //     shardTestFiles: true,
  //     maxInstances: 1
  // }
  //

  //
  // {
  //     'browserName': 'internet explorer',
  //     'platform': 'Windows 10',
  //     'version': '11.103',
  //     'name': 'XUI-MO-IE11-TEST',
  //     'tunnelIdentifier': 'reformtunnel',
  //     'extendedDebugging': true,
  //     'shardTestFiles': true,
  //     'maxInstances': 1
  //
  // }
  //

  ],


  exclude: [],

  cucumberOpts: {
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:cb_reports/saucelab_results.json'],
    require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
    tags: ['@crossbrowser']
},


//
// onComplete() {
//     const printSessionId = function(jobName) {
//         browser.getSession()
//             .then(session => {
//             });
//     };
//     printSessionId('JUI CB Tests');
// },



plugins: [
  {
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      reportName: 'XUI MC CrossBrowser Tests',
      jsonDir: 'reports/tests/crossbrowser',
      reportPath: 'reports/tests/crossbrowser'

    }
  }
],
  onPrepare() {
  // const caps = browser.getCapabilities();
  browser.manage()
    .window()
    .maximize();
  browser.waitForAngularEnabled(false);
  global.expect = chai.expect;
  global.assert = chai.assert;
  global.should = chai.should;
  global.screenShotUtils = new screenShotUtils({
    browserInstance: browser
  })
}


};


exports.config = config;
