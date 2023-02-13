
const global = require('./globals')


const functional_output_dir = '../../../functional_output'

exports.config = {
  timeout: 120,
  "gherkin": {
    "features": "../e2e/features/app/**/*.feature",
    "steps": "../e2e/features/step_definitions/**/*.steps.js"
  },
  output: './output',
  helpers: {
    // Puppeteer: {
    //   url: 'https://manage-case.aat.platform.hmcts.net/',
    //   browser: 'chrome',
    //   show: true,
    //   restart:false,
    //   // chrome: {
    //   //   args: ['--no-sandbox', '--headless1', '--window-size=1920,1080', '--disable-web-security'],
    //   //   ignoreHTTPSErrors: true,
    //   // },
    // },
    Playwright: {
      url: "https://manage-case.aat.platform.hmcts.net",
      restart: false,
      show:true,
      waitForNavigation: "domcontentloaded",
      waitForAction: 500
    }
    // WebDriver:{
    //   url: 'https://manage-case.aat.platform.hmcts.net/',
    //   browser: 'chrome',
    //   show: true,

    // }
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
      "stdout": `${functional_output_dir}/`,
      "options": {
        "reportDir": "./output",
        "reportFilename": "report"
      }
    },
    "mocha-junit-reporter": {
      "stdout": "./output/console.log",
      "options": {
        "mochaFile": "./output/result.xml",
        "attachments": true //add screenshot for a failed test
      }
    }
  },
  plugins:{
    "allure": {
      "enabled": true
    },
    "myPlugin": {
      "require": "./hooks.js",
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