
var CaseListPage = require("../pageObjects/CaseListPage");
var FRCase = require('../pageObjects/FRCase');
var ProbateCase = require('../pageObjects/ProbateCase');
var DivorceCase = require('../pageObjects/Divorcecase');


var CaseManager = require('../pageObjects/common/CaseManager');

var { defineSupportCode } = require('cucumber');

const creatCaseStepTimeout = 600*1000;

defineSupportCode(function ({ And, But, Given, Then, When }) {
    var caseListPage = new CaseListPage();
    let frCase = new FRCase();
    let probateCase = new ProbateCase();
    let divorceCase = new DivorceCase();
    let caseManager = new CaseManager();

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
    })

    When('I start case next step', async function () {
        await caseManager.startNextStep(false);
    });


    When('I start case next step {string}', async function (stepName) {
        await caseManager.startNextStep(stepName);
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
});
