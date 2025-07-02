'use strict';
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const fs = require('fs');
const mkdirp = require('mkdirp');
const conf = require('../config/conf').config;
const reporter = require('cucumber-html-reporter');
const report = require('cucumber-html-report');

const jsonReports = `${process.cwd()}/reports/json`;
const htmlReports = `${process.cwd()}/reports/html`;
// var xmlReports = process.cwd() + "/reports/xml";
const targetJson = `${jsonReports}/cucumber_report.json`;
// var targetXML = xmlReports + "/cucumber_report.xml";

const BrowserWaits = require('./customWaits');
const CucumberReportLog = require('./reportLogger');
const BrowserLogs = require('./browserLogs');
const browserUtil = require('../../ngIntegration/util/browserUtil');
const RuntimetestData = require('./runtimeTestData');

console.log('[Hook] ⚠️ Secondary hook running (not setting page):', __dirname);

Before(function (scenario) {
  RuntimetestData.init();
  // global.scenarioData = {};
  const world = this;

  CucumberReportLog.setScenarioWorld(this);
});

After(async function (scenario) {
  CucumberReportLog.AddMessage('scenario completed with status : ' + scenario.result.status);
  // await BrowserWaits.waitForSeconds(600);
  const world = this;
  try {
    await CucumberReportLog.AddScreenshot(global.screenShotUtils);
    if (scenario.result.status === 'failed') {
      // await BrowserWaits.waitForSeconds(600);

      CucumberReportLog.AddMessage('****************** User details ******************');
      CucumberReportLog.AddJson(JSON.parse(await browserUtil.getFromSessionStorage('userDetails')));
      CucumberReportLog.AddMessage('****************** User details ******************');

      await BrowserLogs.printAllBrowserLogs();
    }

    await CucumberReportLog.AddMessage('Cleared browser logs after successful scenario.');
    if (global.scenarioData.featureToggles) {
      //CucumberReportLog.AddJson(global.scenarioData['featureToggles'])
    }
  } catch (err) {
    CucumberReportLog.AddMessage('Error in hooks with browserlogs or screenshots. See error details : ' + err);
  }
  await clearSession();
});

async function clearSession() {
  await browser.executeScript('window.sessionStorage.clear();');
  await browser.executeScript('window.localStorage.clear();');
  await browser.manage().deleteAllCookies();
}
