
const report = require("multiple-cucumber-html-reporter");
const { merge } = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')

const generateMergedReport = require('../accessibility/reporter/reportsMerger')
import applicationServer from '../localServer'

const path = require('path')

const backendMockApp = require('../backendMock/app');


let appWithMockBackend = null;
const testType = 'a11y'
const parallel = process.env.PARALLEL ? process.env.PARALLEL.includes('y') : false
const head = process.env.HEAD



const functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-a11y`)

exports.config = {
    timeout: 600,
    // tests:['../accessibility/tests/*.test.js'],
    tests: path.resolve(`${__dirname}`, '../accessibility/tests/**/*.test.js'),
    output: functional_output_dir,

    helpers: {
        CustomHelper: {
            require: "./customHelper.js"
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
       
    },
    "mocha": {
        // reporter: 'mochawesome',
        reporter: path.resolve(__dirname, '../accessibility/reporter/customReporter.js'),
        "reporterOptions": {
            "reportDir": functional_output_dir,
            reportName: 'XUI_MC',
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
                "html": false,
                "json": true
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
    plugins: {
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
    bootstrap: async () => {
        if (testType === "a11y" && !parallel) {
            await setup()
        }
    },
    teardown: async () => {
        if (testType === "a11y" && !parallel) {
            await teardown()
        }

    },
    bootstrapAll: async () => {
        if (testType === "a11y" && parallel) {
            await setup()

        }
    },
    teardownAll: async () => {
        if (testType === "a11y" && parallel) {
            await teardown()
        }

        // process.exit(0)
    }
}


async function setup() {
    await backendMockApp.startServer();
    await applicationServer.start()
}

async function teardown() {
    await backendMockApp.stopServer();
    await applicationServer.stop()
    await generateReport()
    process.exit(0);
}

async function generateReport() {
    try {

        await generateMergedReport();

    } catch (err) {
        console.log(JSON.stringify(err));
    }
}


