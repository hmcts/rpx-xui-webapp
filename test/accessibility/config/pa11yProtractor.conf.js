// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const fs = require('fs');
const {conf} = require('./config');
const { SpecReporter } = require('jasmine-spec-reporter');
const MockApp = require('../../nodeMock/app');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const {getScenarioCookie} = require('../helpers/pa11yUtil');


const nodeMockPort = require('../../nodeMock/availablePortFinder').getAvailablePort();

const isParallelExecution = true;

const generateMergedReport = require('../reporter/reportsMerger');

const capability = {
    'browserName': 'chrome',
    'chromeOptions': { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks', '--disable-notifications'] }

}

if (isParallelExecution) {
    capability.shardTestFiles = true;
    capability.maxInstances = 5;
}


exports.config = {
    parallelExecution: isParallelExecution,
    allScriptsTimeout: 11000,
    specs: [
        '../tests/**/*.test.js',

    ],
    multiCapabilities: [capability],
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'mocha',
    mochaOpts: {
        reporter: 'test/accessibility/reporter/customReporter.js',
        // reporter: 'spec',

        timeout: 180000
    },
    beforeLaunch() {
        if (isParallelExecution) {
            MockApp.setServerPort(nodeMockPort);
            MockApp.init();
            MockApp.startServer();
            console.log(`Before launch : mock started on ${nodeMockPort} `);
        }
    },

    async onPrepare() {
        MockApp.init();
        if (isParallelExecution) {
            MockApp.getNextAvailableClientPort().then(res => {
                MockApp.setServerPort(res.data.port);
                MockApp.startServer();

            });
        } else {
            MockApp.setServerPort(nodeMockPort);
            await MockApp.startServer();
            console.log("On prepare : mock started on " + nodeMockPort );
        }
    },
    onComplete() {

    },

    async afterLaunch(){
        try{

            await generateMergedReport();

        }catch(err){
            console.log(JSON.stringify(err));
        }
    }
};
