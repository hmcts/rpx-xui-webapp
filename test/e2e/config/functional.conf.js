const common = require('./support/common.conf');
const localConfig = require('./support/local.conf')
const jenkinsConfig = require('./support/jenkins.conf')

const cap = (common.argv.local) ? localConfig : jenkinsConfig;

const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: common.specFilesFilter,
    baseUrl: process.env.TEST_URL || 'http://localhost:3000/',

    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: common.argv.env || 'local'
    },

    directConnect: true,
    getPageTimeout: 120000,
    allScriptsTimeout: 500000,
    multiCapabilities: cap,

    onPrepare() {
        browser.waitForAngularEnabled(false);
        global.expect = common.chai.expect;
        global.assert = common.chai.assert;
        global.should = common.chai.should;
    },

    cucumberOpts: {
        strict: true,
        format: ['node_modules/cucumber-pretty', 'json:reports_json/results.json'],
        tags: ['@functional'],
        require: ['../features/step_definitions/**/*.steps.js']
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'XUI Functional Tests',
                jsonDir: 'reports/tests/functional',
                reportPath: 'reports/tests/functional'
            }
        }
    ]
};


exports.config = config;
