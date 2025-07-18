
const functional_output_dir = '../../../functional_output';
const codeceptCommonDir = '../../codeceptCommon';
const global = require(`${codeceptCommonDir}/globals`);
const head = process.env.HEAD !== 'false'

exports.config = {
  grep: '@smoke',
  timeout: 120,
  'gherkin': {
    'features': '../features/app/**/*.feature',
    'steps': ['../features/step_definitions/setup.steps.js', '../features/step_definitions/**/*.steps.js']
  },
  output: `${functional_output_dir}/output`,
  helpers: {
    Playwright: {
      url: 'https://manage-case.aat.platform.hmcts.net/',
      browser: 'chromium',
      show: head,
      restart: true,
      waitForNavigation: 'domcontentloaded',
      ignoreHTTPSErrors: true,
      fullPageScreenshots: true,
      windowSize: '1600x900',
      chrome: { args: ['--no-sandbox'] } 
    }
  },
  'mocha': {
    'codeceptjs-cli-reporter': {
      'stdout': '-',
      'options': {
        'verbose': true,
        'steps': true
      }
    },
    'mochawesome': {
      'stdout': `${functional_output_dir}/functional/console.log`,
      'options': {
        'reportDir': `${functional_output_dir}/functional/`,
        'reportFilename': 'report'
      }
    },
    'mocha-junit-reporter': {
      'stdout': `${functional_output_dir}/functional/console.log`,
      'options': {
        'mochaFile': `${functional_output_dir}/functional/junit.xml`,
        'attachments': true //add screenshot for a failed test
      }
    }
  },
  plugins: {
    'allure': {
      'enabled': true
    }
  },
  include: {
  },
  bootstrap: async () => {
    const path = require('path');
    require(path.resolve(__dirname, `${codeceptCommonDir}/hooks.js`)); // 🟢 This ensures hooks execute
  },
  teardown: () => {
    console.log('Run complete...');

    return true;
  }
};
