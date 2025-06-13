'use strict';
const { Before, After, BeforeAll } = require('@cucumber/cucumber');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const BrowserUtil = require('./browserUtil');

const headerPage = require('../../e2e/features/pageObjects/headerPage');
const CucumberReportLog = require('../../codeceptCommon/reportLogger');

const MockApp = require('../../nodeMock/app');
const BrowserWaits = require('../../e2e/support/customWaits');

const mockNodeApp = require('../../nodeMock/nodeApp/mockData');

BeforeAll(async function () {
  const scenarioServerPort = MockApp.serverPort;
  this.baseUrl = process.env.TEST_URL || `http://localhost:3000/`;
});

Before(async function (scenario) {
  // Next four lines below were suggestions via chatGPT to remove reliance on protractor
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto(this.baseUrl);
  // global.scenarioData = {}
  await CucumberReportLog.setScenarioWorld(this);
  MockApp.setLogMessageCallback((msg) => CucumberReportLog.AddMessage(msg));
  MockApp.setLogJSONCallback((json) => CucumberReportLog.AddJson(json));

  const scenarioServerPort = MockApp.serverPort;
  await CucumberReportLog.AddMessage('Scenario executing with mock server on port ' + scenarioServerPort);
  await browser.manage().addCookie({ name: 'scenarioMockPort', value: scenarioServerPort + '', domain: 'localhost:3000' });

  MockApp.init();
  await MockApp.startServer();
});
//
After(async function (scenario) {
  if (argv.debug || true) {
    //    await BrowserWaits.waitForSeconds(600);
  }

  await MockApp.stopServer();
  const scenarioId = await BrowserUtil.getScenarioIdCookieValue();
  MockApp.deleteScenarioSession(scenarioId);
  CucumberReportLog.AddMessage('NG Integration test status : ' + scenario.result.status);
  CucumberReportLog.AddJson(mockNodeApp.userDetails);
  CucumberReportLog.AddJson(MockApp.requestLogs);
  // added line below due to protractor removal
  await this.browser?.close();
});
