const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var screenShotUtils = require("protractor-screenshot-utils").ProtractorScreenShotUtils;

chai.use(chaiAsPromised);
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const MockApp = require('../../nodeMock/app');
const browserUtil = require('../util/browserUtil');

const appTestConfig = require('../../e2e/config/appTestConfig');
const {LOG_LEVELS} = require("../../e2e/support/constants");

appTestConfig.testEnv = 'aat';

process.env['LOG_LEVEL'] = LOG_LEVELS.Info

console.log(process.env['TEST_ENV_URL'])
if (!process.env['TEST_ENV_URL'] || process.env['TEST_ENV_URL'] === undefined){
    process.env['TEST_ENV_URL'] = process.env['TEST_URL'];

}
process.env['TEST_URL'] = argv.debug ? 'http://localhost:3000/' : 'http://localhost:4200/'


const isParallelExecution = argv.parallel ? argv.parallel === "true" : !getBDDTags().includes('@none') ? true : false;

const chromeOptArgs = [ '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks'];



let  nodeMockPort = require('../../nodeMock/availablePortFinder').getAvailablePort();

if (argv.debug){
    nodeMockPort = 3001;
}

const perfLoggingPrefs = {
    'enableNetwork': true,
    'enablePage': false
};

const loggingPrefs = {
    performance: 'ALL',
    browser: 'ALL'
};

if (!argv.head ){
    chromeOptArgs.push('--headless');
}
const jenkinsConfig = [

    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        nogui: true,
        chromeOptions: { args: chromeOptArgs, perfLoggingPrefs: perfLoggingPrefs  },
        loggingPrefs: loggingPrefs
    }
];

const localConfig = [
    {

        browserName: 'chrome',
        acceptInsecureCerts: true,
        chromeOptions: { args: chromeOptArgs, perfLoggingPrefs: perfLoggingPrefs },
        loggingPrefs: loggingPrefs,
        proxy: {
            proxyType: 'manual',
            httpProxy: 'proxyout.reform.hmcts.net:8080',
            sslProxy: 'proxyout.reform.hmcts.net:8080',
            noProxy: 'localhost:3000'
        }
    }
];

if(isParallelExecution){
    jenkinsConfig[0].shardTestFiles = true;
    jenkinsConfig[0].maxInstances = 5;
}

const cap = (argv.local) ? localConfig : jenkinsConfig;

const config = {
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../tests/features/**/*.feature'],
    baseUrl: process.env['TEST_URL'] ,
    params: {

    },
    directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 120000,
    allScriptsTimeout: 500000,
    multiCapabilities: cap,

    beforeLaunch(){
        if (isParallelExecution) {
            MockApp.setServerPort(nodeMockPort);
            MockApp.init(parseInt(nodeMockPort) + 1);
            MockApp.startServer();
        }
    },

    onPrepare() {
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;

        global.screenShotUtils = new screenShotUtils({
            browserInstance: browser
        });


        if (isParallelExecution){
            MockApp.getNextAvailableClientPort().then(res => {
                MockApp.setServerPort(res.data.port);
                MockApp.init();
                //MockApp.startServer();

            });
        }else{
            MockApp.setServerPort(nodeMockPort);
            //await MockApp.startServer();
        }


        //Set default explict timeout default value to 10sec
        const customWaits = require('../../e2e/support/customWaits');
        customWaits.setDefaultWaitTime(8000);
        customWaits.setLoglevelINFO();
        customWaits.setRetryCount(2);

    },
    cucumberOpts: {
        'fail-fast': argv.failFast ? argv.failFast.includes("true") : false,
        strict: true,
        // format: ['node_modules/cucumber-pretty'],
        format: ['node_modules/cucumber-pretty', 'json:functional-output/tests/ngIntegrationtests/json/results.json'],
        tags: getBDDTags() ,
        require: [
            '../../e2e/support/timeout.js',
            '../util/cucumberHooks.js',
            '../../e2e/support/hooks.js',
            '../../e2e/support/world.js',
            '../../e2e/support/*.js',
            '../tests/stepDefinitions/*.steps.js',
            '../tests/stepDefinitions/**/*.steps.js',
            '../../e2e/features/step_definitions/*.steps.js',
            '../../e2e/features/step_definitions/**/*.steps.js'

        ]
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'XUI Manage Cases Functional Tests',
                // openReportInBrowser: true,
                jsonDir: 'functional-output/tests/ngIntegration',
                reportPath: 'functional-output/tests/ngIntegration',
                displayDuration : true,
                durationInMS : false
            }
        }
    ]


};

function getBDDTags() {
    let tags = [];
    console.log(`*********************** process.env['TEST_URL'] : ${process.env['TEST_URL']}`);
    console.log(`*********************** process.env['TEST_ENV_URL'] : ${process.env['TEST_ENV_URL']}`);
    if (process.env['TEST_ENV_URL'].includes("pr-") ||
        process.env['TEST_ENV_URL'].includes("localhost")
        ) {
        if (argv.tags){
            tags = argv.tags.split(',');
        }else{
            tags = ["@ng", "~@ignore"];
        }
    }else{
        tags.push("@none");
    }

    console.log(`BDD tags ${JSON.stringify(tags)}`);
    return argv.tags ? argv.tags.split(','): tags;
}

exports.config = config;
