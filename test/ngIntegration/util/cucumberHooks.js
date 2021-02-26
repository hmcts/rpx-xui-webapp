'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const { Given, When, Then } = require('cucumber');

const CucumberReportLog = require("../../e2e/support/reportLogger");

const MockApp = require('../../nodeMock/app');

defineSupportCode(({ Before, After }) => {
    Before(function (scenario) {
        MockApp.init();
        const world = this;
        CucumberReportLog.setScenarioWorld(this);
        // done();
    });

    After(async function (scenario) {
        await MockApp.stopServer();

        CucumberReportLog.AddMessage("NG Integration test status : " + scenario.result.status);
        // done();
    });
});
