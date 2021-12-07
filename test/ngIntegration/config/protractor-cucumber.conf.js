const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
 
var screenShotUtils = require("protractor-screenshot-utils").ProtractorScreenShotUtils;

chai.use(chaiAsPromised);
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const MockApp = require('../../nodeMock/app');
const browserUtil = require('../util/browserUtil');
const customReporter = require('../../e2e/support/reportLogger');

const isParallelExecution = true;

const jenkinsConfig = [

    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        nogui: true,
        chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks'] }
    }
];

const localConfig = [
    {

        browserName: 'chrome',
        acceptInsecureCerts: true,
        chromeOptions: { args: ['--headless1', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote '] },
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
    jenkinsConfig[0].maxInstances = 3;
}

const cap = (argv.local) ? localConfig : jenkinsConfig;

const config = {
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../tests/features/**/*.feature'],
    baseUrl: argv.debug ? 'http://localhost:3000/': 'http://localhost:4200/',
    params: {

    },
    directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 120000,
    allScriptsTimeout: 500000,
    multiCapabilities: cap,

    beforeLaunch(){
        if (isParallelExecution) {
            MockApp.setServerPort(3001);
            MockApp.init();
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
            MockApp.setServerPort(3001);
            //await MockApp.startServer();
            MockApp.setLogMessageCallback(customReporter.AddMessage);
        }    
        MockApp.setLogMessageCallback(customReporter.AddJson);

        const customWaits = require('../../e2e/support/customWaits');
        customWaits.setDefaultWaitTime(8000);

    },
    cucumberOpts: {
        strict: true,
        // format: ['node_modules/cucumber-pretty'],
        format: ['node_modules/cucumber-pretty', 'json:reports/ngIntegrationtests/json/results.json'],
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
                jsonDir: 'reports/tests/ngIntegration',
                reportPath: 'reports/tests/ngIntegration'
            }
        }
    ]


};

function getBDDTags() {
    let tags = [];
    if (!process.env.TEST_URL ||
        process.env.TEST_URL.includes("pr-") ||
        process.env.TEST_URL.includes("localhost")) {
        tags.push("@ng");
        if (argv.tags){
            tags = argv.tags.split(',');
        }
    }else{
        tags.push("@none"); 
    }

    console.log(`BDD tags ${JSON.stringify(tags)}`);
    return argv.tags ? argv.tags.split(','): tags;
}

exports.config = config;
