const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));


const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    sauceSeleniumAddress: 'ondemand.saucelabs.com:443/wd/hub',
    allScriptsTimeout: 111000,
    specs: ['../features/**/*.feature'],

    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),

    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
        fr_judge_username: process.env.FR_EMAIL,
        fr_judge_password: process.env.FR_PASSWORD

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

        // {
        //     browserName: 'chrome',
        //     name: 'MAC_CHROME_LATEST',
        //     platform: 'macOS 10.13',
        //     version: 'latest',
        //     'tunnel-identifier': 'reformtunnel'
        //         // shardTestFiles: true,
        //         // maxInstances: 1
        //
        // },


        // {
        //     browserName: 'firefox',
        //     name: 'WIN_FIREFOX_LATEST',
        //     platform: 'Windows 10',
        //     version: 'latest',
        //     'tunnel-identifier': 'reformtunne',
        //     shardTestFiles: true,
        //     maxInstances: 1
        //
        // },
        //
        // {
        //     browserName: 'firefox',
        //     name: 'MAC_FIREFOX_LATEST',
        //     platform: 'macOS 10.13',
        //     version: 'latest',
        //     'tunnel-identifier': 'reformtunne',
        //     shardTestFiles: true,
        //     maxInstances: 1
        // }
        //


        // {
        //     'browserName': 'internet explorer',
        //     'platform': 'Windows 10',
        //     'version': '11.103',
        //     'name': ‘JUI-IE-TEST',
        // 'tunnel-identifier': 'reformtunnel',
        //     'extendedDebugging': true,
        //     'shardTestFiles': true,
        //     'maxInstances': 2
        //
        // }
        //


    ],


    exclude: [],

    cucumberOpts: {
        strict: true,
        format: ['json:cb_reports/saucelab_results.json','node_modules/cucumber-pretty'],
        require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
        tags: ['@crossbrowser']
    },


    onComplete() {
        const printSessionId = function(jobName) {
            browser.getSession()
                .then(session => {
                });
        };
        printSessionId('JUI CB Tests');
    },


    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'JUI CrossBrowser Tests',
                jsonDir: '/reports/crossbrowser/reports',
                reportPath: './functional-output/crossbrowser/reports'


            }
        }
    ],


    onPrepare() {
        const caps = browser.getCapabilities();
        browser.manage()
            .window()
            .maximize();
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    }


};


exports.config = config;
