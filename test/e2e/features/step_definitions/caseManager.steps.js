
const CaseListPage = require('../pageObjects/CaseListPage');
const FRCase = require('../pageObjects/FRCase');
const ProbateCase = require('../pageObjects/ProbateCase');
const DivorceCase = require('../pageObjects/Divorcecase');
const IACCase = require('../pageObjects/iacCase');
const HearingRecordingsCase = require('../pageObjects/hearingRecordingsCase');

const BrowserWaits = require('../../support/customWaits');

const CaseManager = require('../pageObjects/common/CaseManager');

const { Then, When, Given } = require('@cucumber/cucumber');
const CCDCaseDetails = require('../../../nodeMock/ccd/ccdCaseConfig/caseDetailsConfigGenerator');
const caseDetailsPage = require('../pageObjects/caseDetailsPage');

const creatCaseStepTimeout = 600*1000;

const caseListPage = new CaseListPage();
const frCase = new FRCase();
const probateCase = new ProbateCase();
const divorceCase = new DivorceCase();
const iacCase = new IACCase();
const hearingRecordingsCase = new HearingRecordingsCase();

const caseManager = new CaseManager();

When('I start case with jurisdiction {string} case type {string} and event {string}', async function (jurisidiction, casetype, event) {
  await caseManager.startCaseCreation(jurisidiction, casetype, event);
});

When('I create FR case', { timeout: creatCaseStepTimeout }, async function () {
  await frCase.createCase(false);
});

When('I create Divorce case', { timeout: creatCaseStepTimeout }, async function () {
  await divorceCase.createCase(false);
});

When('I create Probate case', { timeout: creatCaseStepTimeout }, async function () {
  await probateCase.createCase(false);
});

When('I create IAC case', { timeout: creatCaseStepTimeout }, async function () {
  await iacCase.createCase(false);
});

When('I create Hearing Recordings case', { timeout: creatCaseStepTimeout }, async function () {
  await hearingRecordingsCase.createCase();
});

When('I start case next step', async function () {
  await BrowserWaits.retryWithActionCallback(async () => {
    await caseManager.startNextStep(false);
  });
});

When('I start case next step {string}', async function (stepName) {
  await BrowserWaits.retryWithActionCallback(async () => {
    await caseManager.startNextStep(stepName);
  });
});

When('I click cancel link', async function () {
  await caseManager.cancelCaseCreation();
});

When('I click previous button', async () => {
  await caseManager.clickPreviousButton();
});

When('I submit case', async function () {
  await caseManager.submitCase(false);
});

Then('I see case details page', async function () {
  await caseManager.AmOnCaseDetailsPage();
});

Then('I am on check your answers page', async function () {
  await caseManager.AmOnChekYourAnswersPage();
});

Then('I am on case form page', async function () {
  await caseManager.AmOnCCDCaseEditPage();
});
