const { setHeadlessWhen } = require('@codeceptjs/configure'); // Add CodeceptJS configuration
setHeadlessWhen(process.env.HEADLESS); // Enable headless mode if specified
const testType = process.env.TEST_TYPE;

const config = {
  tests: '../features/app/**/*.feature',
  output: `${__dirname}/../../functional-output/tests/codecept-${testType}`, // Specify output directory
  helpers: {
    Playwright: {
      url: process.env.TEST_URL || 'http://localhost:3000/',
      browser: 'chromium', // Set default browser to Playwright's Chromium
      // Add Sauce Labs options
      connection: {
        server: 'https://ondemand.eu-central-1.saucelabs.com/wd/hub',
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY
      }
      // Additional Playwright options can be added here
    }
  },
  include: {
    I: '../../**/*.steps.js' // Include steps file
  },
  bootstrap: null,
  mocha: {},
  name: 'crossbrowser-tests',
  plugins: {
    retryFailedStep: {
      enabled: true // Enable retry for failed steps
    }
  },
  params: {
    serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
    targetEnv: process.argv[2] || 'local', // Use argv for target environment
    username: 'lukesuperuserxui_new@mailnesia.com',
    password: 'Monday01',
    caseworkerUser: 'mahesh_fr_courtadmn@mailinator.com',
    caseworkerPassword: 'London01',
    probate_username: process.env.PROBATE_EMAIL || 'probaterequesteraat@mailnesia.com',
    probate_password: process.env.PROBATE_PASSWORD || 'LevelAt12',
    fr_judge_username: process.env.FR_EMAIL,
    fr_judge_password: process.env.FR_PASSWORD,
    sscs_username: process.env.SSCS_EMAIL,
    sscs_password: process.env.SSCS_PASSWORD,
    caseworker_iac_off_username: process.env.CASEWORKER_IAC_OFF_USERNAME ? process.env.CASEWORKER_IAC_OFF_USERNAME : 'xui_auto_co_r1@justice.gov.uk',
    caseworker_iac_off_password: process.env.CASEWORKER_IAC_OFF_PASSWORD ? process.env.CASEWORKER_IAC_OFF_PASSWORD : 'Welcome01',
    hrsTesterUser: 'xui.hrs.tester@hmcts.net',
    hrsTesterPassword: 'Monday01',
    ia_users_credentials: {
      case_officer: {
        username: process.env.TEST_CASEOFFICER_USERNAME || 'ia.caseofficer.ccd@gmail.com',
        password: process.env.TEST_CASEOFFICER_PASSWORD || 'AldgateT0wer'
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
        password: process.env.TEST_JUDICIARY_PASSWORD || 'AldgateT0wer'
      }
    }
  },
  multiCapabilities: [
    {
      browserName: 'chromium',
      platform: 'Windows 10',
      version: 'latest',
      name: 'chrome-win-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'firefox',
      platform: 'Windows 10',
      version: 'latest',
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
      name: 'edge-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'chromium',
      platform: 'macOS 10.15',
      version: 'latest',
      name: 'chrome-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    },
    {
      browserName: 'firefox',
      platform: 'macOS 10.15',
      version: 'latest',
      name: 'ff-mac-tests',
      tunnelIdentifier: 'reformtunnel',
      extendedDebugging: true,
      sharedTestFiles: false,
      maxInstances: 1
    }
  ],
  cucumberOpts: {
    strict: true,
    require: [
      '../support/timeout.js',
      '../support/hooks.js',
      '../support/world.js',
      '../support/*.js',
      '../features/step_definitions/**/*.steps.js'
    ],
    tags: ['@crossbrowser']
  },
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