'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const { Given, When, Then } = require('cucumber');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const BrowserWaits = require('../../e2e/support/customWaits');

const CucumberReportLog = require("../../e2e/support/reportLogger");

const MockApp = require('../../nodeMock/app');

defineSupportCode(({ Before, After }) => {
    Before(function (scenario) {
        MockApp.init();
        const world = this;
        global.scenarioData = {};
        CucumberReportLog.setScenarioWorld(this);
        // done();
    });

    After(async function (scenario) {
        if(argv.debug){
            await BrowserWaits.waitForSeconds(600);
        }
        
        await MockApp.stopServer();

        CucumberReportLog.AddMessage("NG Integration test status : " + scenario.result.status);
        // done();
    });
});
