

const functional_output_dir = '../../../functional_output'
const codeceptCommonDir = '../../codeceptCommon'

const global = require(`${codeceptCommonDir}/globals`)


exports.config = {
  grep:'@ready',
  timeout: 120,
  "gherkin": {
    "features": "../features/app/**/*.feature",
    "steps": "../features/step_definitions/**/*.steps.js"
  },
  output: `${functional_output_dir}/output`,
  helpers: {
    // Puppeteer: {
    //   url: 'https://manage-case.aat.platform.hmcts.net/',
    //   browser: 'chrome',
    //   show: true,
    //   restart:true,
    //   // chrome: {
    //   //   args: ['--no-sandbox', '--headless1', '--window-size=1920,1080', '--disable-web-security'],
    //   //   ignoreHTTPSErrors: true,
    //   // },
    // },
    WebDriver:{
      url: 'https://manage-case.aat.platform.hmcts.net/',
      browser: 'chrome',
      show: true
    }
  },
  "mocha": {
    "codeceptjs-cli-reporter": {
      "stdout": "-",
      "options": {
        "verbose": true,
        "steps": true,
      }
    },
    "mochawesome": {
      "stdout": `${functional_output_dir}/functional/console.log`,
      "options": {
        "reportDir": `${functional_output_dir}/functional/`,
        "reportFilename": "report"
      }
    },
    "mocha-junit-reporter": {
      "stdout": `${functional_output_dir}/functional/console.log`,
      "options": {
        "mochaFile": `${functional_output_dir}/functional/junit.xml`,
        "attachments": true //add screenshot for a failed test
      }
    }
  },
  plugins:{
    "allure": {
      "enabled": true
    },
    "myPlugin": {
      "require": `${codeceptCommonDir}/hooks.js`,
      "enabled": true
    }
  },
  include: {
  },
  bootstrap: null,
  // teardown: () => {
  //   console.log("Run complete...")

  //   return true
  // }
}
