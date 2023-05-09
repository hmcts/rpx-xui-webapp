
const report = require("multiple-cucumber-html-reporter");
const { merge } = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')

const global = require('./globals')
import applicationServer from '../localServer'

const path = require('path')
var spawn = require('child_process').spawn;
const backendMockApp = require('../backendMock/app');


let appWithMockBackend = null;
const testType = process.env.TEST_TYPE
const parallel = process.env.PARALLEL
const head = process.env.HEAD

if (process.env.TEST_URL.includes('pr-29751') ||
    process.env.TEST_URL.includes('localhost'))
  {
    process.env.TEST_ENV='demo';
    process.env.TEST_URL = 'https://manage-case-int1.demo.platform.hmcts.net/';
}

let features = ''
if (testType === 'e2e'){
  features = `../e2e/features/app/**/*.feature`
} else if (testType === 'ngIntegration'){
  features = `../ngIntegration/tests/features/**/*.feature`

}else{
  throw new Error(`Unrecognized test type ${testType}`);
}



const functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-${testType}`)

exports.config = {
  timeout: 600,
  "gherkin": {
    "features": features,
    "steps": "../**/*.steps.js"
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
        defaultViewport: {
          width: 1280,
          height: 960
        },
        args: [
          `${head ? '' : '--headless'}`,
          '—disable-notifications',
          '--smartwait',
          '--disable-gpu',
          '--no-sandbox',
          '--allow-running-insecure-content',
          '--ignore-certificate-errors',
          '--window-size=1440,1400',
          '--viewport-size=1440,1400',

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
      "overwrite": false,
      "html": false,
      "json": true
      // inlineAssets: true
    },
    // "reporterOptions":{
    //   "codeceptjs-cli-reporter": {
    //     "stdout": "-",
    //     "options": {
    //       "verbose": true,
    //       "steps": true,
    //     }
    //   },
      "mochawesome": {
        "stdout": `${functional_output_dir}/`,
        "options": {
          "reportDir": `${functional_output_dir}/output`,
          "reportFilename": `${functional_output_dir}/output/report`,
          "overwrite": false,
          "html":false,
          "json":true
        }
      },
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
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: 'true'
    },
   
    "myPlugin": {
      "require": "./hooks",
      "enabled": true
    },
    retryFailedStep: {
      enabled: true
    },
    // pauseOnFail: {},
    // cucumberJsonReporter: {
    //   require: 'codeceptjs-cucumber-json-reporter',
    //   enabled: true,               // if false, pass --plugins cucumberJsonReporter
    //   attachScreenshots: true,     // true by default
    //   attachComments: true,        // true by default
    //   outputFile: functional_output_dir + '/cucumberOutput/',     // cucumber_output.json by default
    //   uniqueFileNames: true,      // if true outputFile is ignored in favor of unique file names in the format of `cucumber_output_<UUID>.json`.  Useful for parallel test execution
    //   includeExampleValues: false, // if true incorporate actual values from Examples table along with variable placeholder when writing steps to the report
    //   timeMultiplier: 1000000,     // Used when calculating duration of individual BDD steps.  Defaults to nanoseconds
    // }
   
  },
  include: {
  },
  retry: {
    Feature: 3

  },
  bootstrap:async () =>{
    if (testType === "ngIntegration" && !parallel){
      await setup()
    }
  },
  teardown: async () => {
    const status = await mochawesomeGenerateReport()
      if (testType === "ngIntegration" && !parallel){
        await teardown()
      }
    process.exit(status === 'PASS' ? 0 : 1)
    
  },
  bootstrapAll: async () => {
    if (testType === "ngIntegration" && parallel) {
      await setup()

    }
  },
  teardownAll: async () => {  
    const status = await  mochawesomeGenerateReport()
    if (testType === "ngIntegration" && parallel) {
     await teardown()
    }

    process.exit(status === 'PASS' ? 0 : 1)
    // return status === 'PASS' ? 0 : 1  
  }
}


async function setup(){
  await backendMockApp.startServer();
  await applicationServer.start()
}

async function teardown(){
  await backendMockApp.stopServer();
  await applicationServer.stop()
  // process.exit(1);
}

async function mochawesomeGenerateReport(){
  const report = await merge({
    files: [`${functional_output_dir}/*.json`]
  })
  await marge.create(report, {
    "reportDir": `${functional_output_dir}/`,
    "reportFilename": `${functional_output_dir}/report`,
  });
  return report.stats.failures > 0 ? 'FAIL' : 'PASS';
}

function generateCucumberReport(){
   report.generate({
      jsonDir: functional_output_dir + '',
      reportPath: functional_output_dir + '',
      metadata: {
        browser: {
          name: "chrome",
          version: "60",
        },
        device: "Local test machine",
        platform: {
          name: "ubuntu",
          version: "16.04",
        },
      }
    });
}


