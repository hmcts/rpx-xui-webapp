// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const fs = require('fs');
const {conf} = require('./config');
const { SpecReporter } = require('jasmine-spec-reporter');
const MockApp = require('../../nodeMock/app');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const {getScenarioCookie} = require('../helpers/pa11yUtil');

const isParallelExecution = argv.parallel ? argv.parallel === "true" : true;

const capability = {
    'browserName': 'chrome',
    'chromeOptions': { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks', '--disable-notifications'] }

}

if (isParallelExecution) {
    capability.shardTestFiles = true;
    capability.maxInstances = 4;
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

        timeout: 120000
    },
    beforeLaunch() {
        if (isParallelExecution) {
            MockApp.setServerPort(3001);
            MockApp.init();
            MockApp.startServer();
        }
    },

    async onPrepare() {
        if (isParallelExecution) {
            MockApp.getNextAvailableClientPort().then(res => {
                MockApp.setServerPort(res.data.port);
                MockApp.init();
                MockApp.startServer();

            });
        } else {
            MockApp.setServerPort(3001);
            await MockApp.startServer();
            MockApp.setLogMessageCallback(customReporter.AddMessage);
        }
    },
    async onComplete() {
        await generateMergedReport();
        return null;
    }
};



async function generateMergedReport() {
    let destDir = process.env.PWD + "/" + conf.reportPath;

    const results = fs.readdirSync(destDir, { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name)
    

    const mergedReportData = {
        appName: 'EXUI Manage Cases a11y Test Report',
        passed:0,
        failed:0,
        tests:[]
    };

    for (let result of results ){

        if (!result.includes('.json')){
            continue;
        }

        const reportData = fs.readFileSync(destDir + result);
        const jsonObj = JSON.parse(reportData);

        mergedReportData.passed += jsonObj.passed;
        mergedReportData.failed += jsonObj.failed;
        mergedReportData.tests.push(...jsonObj.tests);


    }


    let sourceReport = __dirname + '/../reporter/Report.html';
   
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }
    let destReport = `${destDir}Report.html`
    let destJson = `${destDir}report_output.json`

    fs.copyFileSync(sourceReport, destReport);

    let htmlData = fs.readFileSync(sourceReport, 'utf8');
    fs.writeFileSync(destJson, mergedReportData);
    htmlData = htmlData.replace('replacejsoncontent', JSON.stringify(mergedReportData));
    fs.writeFileSync(destReport, htmlData);


}
