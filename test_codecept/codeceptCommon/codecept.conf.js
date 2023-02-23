
const global = require('./globals')
const path = require('path')

const functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-e2e`)

exports.config = {
  timeout: 120,
  "gherkin": {
    "features": "../e2e/features/app/**/*.feature",
    "steps": "../e2e/features/step_definitions/**/*.steps.js",
  },
  output: functional_output_dir,
  helpers: {
    CustomHelper:{
      require:"./customHelper.js"
    },
    "Mochawesome": {
      "uniqueScreenshotNames": "true"
    },
    Puppeteer: {
      url: 'https://manage-case.aat.platform.hmcts.net/',
      show: true,
      waitForNavigation: ['domcontentloaded'],
      restart: true,
      keepCookies: false,
      keepBrowserState: false,
      smartWait: 50000,
      waitForTimeout: 90000,
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
          '--headless',
          '—disable-notifications',
          '--smartwait',
          '--disable-gpu',
          '--no-sandbox',
          '--allow-running-insecure-content',
          '--ignore-certificate-errors',
          '--window-size=1440,1400',

           '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks'
        ]
      }
      
    },
    // Playwright: {
    //   url: "https://manage-case.aat.platform.hmcts.net",
    //   restart: false,
    //   show:true,
    //   waitForNavigation: "domcontentloaded",
    //   waitForAction: 500
    // }
    // WebDriver:{
    //   url: 'https://manage-case.aat.platform.hmcts.net/',
    //   browser: 'chrome',
    //   show: true,

    // }
  },
  "mocha": {
    reporter: 'mochawesome',
    "reporterOptions": {
      "reportDir": functional_output_dir,
      reportName:'XUI_MC',
      // inlineAssets: true
    }
    // "reporterOptions":{
    //   "codeceptjs-cli-reporter": {
    //     "stdout": "-",
    //     "options": {
    //       "verbose": true,
    //       "steps": true,
    //     }
    //   },
    //   "mochawesome": {
    //     "stdout": `${functional_output_dir}/`,
    //     "options": {
    //       "reportDir": `${functional_output_dir}/output`,
    //       "reportFilename": `${functional_output_dir}/output/report`
    //     }
    //   },
    //   "mocha-junit-reporter": {
    //     "stdout": "./output/console.log",
    //     "options": {
    //       "mochaFile": "./output/result.xml",
    //       "attachments": true //add screenshot for a failed test
    //     }
    //   }
    // }
   
  },
  plugins:{
    "allure": {
      "enabled": true
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: 'true'
    },
   
    "myPlugin": {
      "require": "./hooks",
      "enabled": true
    }
  },
  bootstrap: false,
  include: {
  },
  // teardown: () => {
  //   console.log("Run complete...")
    
  //   return true
  // }
}