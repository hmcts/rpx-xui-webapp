const common = require('./support/common.conf');

const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    sauceSeleniumAddress: 'ondemand.saucelabs.com:443/wd/hub',
    allScriptsTimeout: 111000,
    specs: common.specFilesFilter,
    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: common.argv.env || 'local'
    },
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    allScriptsTimeout: 111000,
    useAllAngular2AppRoots: true,
    multiCapabilities: [
        {
            browserName: 'chrome',
            version: 'latest',
            platform: 'Windows 10',
            name: 'chrome-tests',
            'tunnel-identifier': 'reformtunnel',
            extendedDebugging: true,
            shardTestFiles: true,
            maxInstances: 1
        }
    ],
    exclude: [],
    cucumberOpts: {
        strict: true,
        format: ['json:cb_reports/saucelab_results.json','node_modules/cucumber-pretty'],
        require: ['../features/step_definitions/**/*.steps.js'],
        tags: ['@crossbrowser']
    },
    onComplete() {
        const printSessionId = function(jobName) {
            browser.getSession()
                .then(session => {
                });
        };
        printSessionId('XUI Cross Browser Tests');
    },
    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'XUI CrossBrowser Tests',
                jsonDir: '/reports/crossbrowser/reports',
                reportPath: './functional-output/crossbrowser/reports'
            }
        }
    ],
    onPrepare() {
        const caps = browser.getCapabilities();
        browser.manage()
            .window()
        browser.waitForAngularEnabled(false);
        global.expect = common.chai.expect;
        global.assert = common.chai.assert;
        global.should = common.chai.should;
    }
};

exports.config = config;
