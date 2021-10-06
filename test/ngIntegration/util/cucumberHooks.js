'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const { Given, When, Then } = require('cucumber');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const BrowserUtil = require('./browserUtil');
const config = require('../config/protractor-cucumber.conf');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const CucumberReportLog = require("../../e2e/support/reportLogger");

const MockApp = require('../../nodeMock/app');
const BrowserWaits = require('../../e2e/support/customWaits');

defineSupportCode(({ Before, After, BeforeAll }) => {
    BeforeAll(async function(){
        const scenarioServerPort = MockApp.serverPort;

        await browser.driver.get(config.config.baseUrl);
    });

    Before(async function (scenario) {
        const scenarioServerPort = MockApp.serverPort;
        await browser.manage().addCookie({ name: 'scenarioMockPort', value: scenarioServerPort + "", domain: 'localhost:3000' });
        CucumberReportLog.setScenarioWorld(this);

        MockApp.init();
        await MockApp.startServer();
    });
// 
    After(async function (scenario) {

        if(argv.debug || true){
        //    await BrowserWaits.waitForSeconds(600);
        }
        
        await MockApp.stopServer();
        const scenarioId = await BrowserUtil.getScenarioIdCookieValue();
        MockApp.deleteScenarioSession(scenarioId);
        CucumberReportLog.AddMessage("NG Integration test status : " + scenario.result.status);
        CucumberReportLog.AddJson(MockApp.requestLogs);
    });
})
