// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');


exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '../tests/*.test.js'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks', '--disable-notifications'] }

    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'mocha',
    mochaOpts: {
        reporter: 'test/accessibility/reporter/customReporter.js',
        // reporter: 'spec',

        timeout: 120000
    },
    onPrepare() {

    },
    onComplete() {
    }
};