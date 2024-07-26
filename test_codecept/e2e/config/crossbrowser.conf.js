const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
var screenShotUtils = require("protractor-screenshot-utils").ProtractorScreenShotUtils;


const config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

 sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',

 // sauceSeleniumAddress: 'https://vmuniganti:ed5cdbf5-4d8f-47e4-ab72-1757ee05e15f@eu-central-1.saucelabs.com:443/wd/hub',

  host: 'ondemand.eu-central-1.saucelabs.com',
  sauceRegion: 'eu',
  port: 80,
  sauceConnect: true,
  specs: ['../features/**/*.feature'],

  baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),

  params: {
    serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
    targetEnv: argv.env || 'local',
    username: 'lukesuperuserxui_new@mailnesia.com',
    password: 'Monday01',
    caseworkerUser:'mahesh_fr_courtadmn@mailinator.com',
    caseworkerPassword: 'London01',
    probate_username: process.env.PROBATE_EMAIL || 'probaterequesteraat@mailnesia.com',
    probate_password: process.env.PROBATE_PASSWORD || 'LevelAt12',
    fr_judge_username: process.env.FR_EMAIL,
    fr_judge_password: process.env.FR_PASSWORD,
    sscs_username: process.env.SSCS_EMAIL,
    sscs_password: process.env.SSCS_PASSWORD,

    caseworker_iac_off_username: process.env.CASEWORKER_IAC_OFF_USERNAME ? process.env.CASEWORKER_IAC_OFF_USERNAME :'xui_auto_co_r1@justice.gov.uk' ,
    caseworker_iac_off_password: process.env.CASEWORKER_IAC_OFF_PASSWORD ? process.env.CASEWORKER_IAC_OFF_PASSWORD :'Welcome01',
    hrsTesterUser: 'xui.hrs.tester@hmcts.net',
    hrsTesterPassword: 'Monday01',
    ia_users_credentials: {
      case_officer: {
        username: process.env.TEST_CASEOFFICER_USERNAME || 'ia.caseofficer.ccd@gmail.com',
        password: process.env.TEST_CASEOFFICER_PASSWORD|| 'AldgateT0wer'
      }, 
      legal_rep: {
        username: process.env.TEST_LAW_FIRM_A_USERNAME || 'ia.legalrep.b.ccd@gmail.com',
        password: process.env.TEST_LAW_FIRM_A_PASSWORD || 'AldgateT0wer'
      },
      admin_officer: {
        username: process.env.TEST_ADMINOFFICER_USERNAME || 'ia.adm1nofficer.ccd@gmail.com',
        password: process.env.TEST_ADMINOFFICER_PASSWORD || 'AldgateT0wer'
      },
      homeoffice_respondent: {
        username: process.env.TEST_HOMEOFFICE_GENERIC_USERNAME || 'ia.respondentoffice.ccd@gmail.com',
        password: process.env.TEST_HOMEOFFICE_GENERIC_PASSWORD || 'AldgateT0wer'
      },
      homeoffice_apc: {
        username: process.env.TEST_HOMEOFFICE_APC_USERNAME || 'ia.respondentapc.ccd@gmail.com',
        password: process.env.TEST_HOMEOFFICE_APC_PASSWORD || 'AldgateT0wer'
      },
      homeoffice_larts: {
        username: process.env.TEST_HOMEOFFICE_LART_USERNAME || 'ia.respondentlarts.ccd@gmail.com',
        password: process.env.TEST_HOMEOFFICE_LART_PASSWORD || 'AldgateT0wer'
      },
      homeoffice_pou: {
        username: process.env.TEST_HOMEOFFICE_POU_USERNAME || 'ia.respondentpou.ccd@gmail.com',
        password: process.env.TEST_HOMEOFFICE_POU_PASSWORD || 'AldgateT0wer'
      },
      judge: {
        username: process.env.TEST_JUDICIARY_USERNAME || 'ia.iacjudge.ccd@gmail.com',
        password: process.env.TEST_JUDICIARY_PASSWORD|| 'AldgateT0wer'
      }
    }
  },
  directConnect: true,
 // sauceProxy: 'http://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',
  allScriptsTimeout: 111000,


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
      maxInstances: 1
    },
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'Windows 10',
      name: 'firefox-win-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'MicrosoftEdge',
      platform: 'macOS 10.15',
      version: '90.0',
      name: 'chromium-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'chrome',
      version: 'latest',
      platform: 'macOS 10.15',
      name: 'chrome-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'firefox',
      version: 'latest',
      platform: 'macOS 10.15',
      name: 'ff-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    }
  ],

  exclude: [],

  cucumberOpts: {
    strict: true,
    format: ['node_modules/cucumber-pretty', 'json:cb_reports/saucelab_results.json'],
    require: [
      '../support/world.js',
      '../support/*.js',
      '../features/step_definitions/*.steps.js'],
    tags: ['@crossbrowser']
  },

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
