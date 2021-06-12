'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const { Given, When, Then } = require('cucumber');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const BrowserWaits = require('../../e2e/support/customWaits');
const BrowserUtil = require('./browserUtil');
const config = require('../config/protractor-cucumber.conf');

const CucumberReportLog = require("../../e2e/support/reportLogger");

const MockApp = require('../../nodeMock/app');
const { browser } = require('protractor');

defineSupportCode(({ Before, After }) => {
    Before(async function (scenario) {

        const world = this;
        global.scenarioData = {};
        CucumberReportLog.setScenarioWorld(this);

        const scenarioId = scenario.pickle.name.split(' ').join('_').split('"').join('');
        await browser.driver.get(config.config.baseUrl);
        await browser.manage().addCookie({ name:'scenarioId', value : scenarioId});
        
        MockApp.initScenarioSession(scenarioId);
        
        // done();
    });

    After(async function (scenario) {
        //await BrowserWaits.waitForSeconds(600);
        //await MockApp.stopServer();
        const scenarioId = await BrowserUtil.getScenarioIdCookieValue();
        MockApp.deleteScenarioSession(scenarioId);
        CucumberReportLog.AddMessage("NG Integration test status : " + scenario.result.status);
        // done();
    });
});
