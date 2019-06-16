let CaseListPage = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/pageObjects/caseListPage.js');
let CaseDetailsPage = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/pageObjects/createCaseDetailsPage.js');
let CreateCaseStartPage = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/pageObjects/createCaseStartPage.js');
let TestData = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/utils/TestData.js')
let baseSteps = require('./baseSteps.js');
Dropdown = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/pageObjects/webdriver-components/dropdown.js')
CustomError = require('/Users/nagendrareddyk/GITMOJ/repo/rpx-xui-webapp/test/e2e/utils/errors/custom-error.js');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {

 // let caseWizardPage = new CreateCaseWizardPage();
  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();

  async function createCase(){
    //todo post to data store
    await baseSteps.navigateToCreateCasePage();
    await baseSteps.fillOutAndSubmitForm();
  }


  Given(/^I am on expert ui case list page$/, function (callback) {

    callback.pending();
  });
  When(/^I click on create case button$/, async function () {
    await caseListPage.clickCreateNewCaseButton();

  });
  Then(/^Create case page should be displayed$/, async function () {
    expect(await new CreateCaseStartPage().amOnPage()).to.be.true
  });

  When(/^I enter mandatory fields jurisdiction,case type,event and click on start button$/, async function () {

    console.log("Start console logggg"+ typeof TestData.jurisdiction);
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
    await createCaseStartPage.clickStartButton();
  });
  Then(/^I should navigate to Case details page$/, function (callback) {

  });
  When(/^I Enter mandatory case details and click on continue button$/, function (callback) {
    callback.pending();
  });
  Then(/^I should be on Appeal created page$/, function (callback) {
    callback.pending();
  });
  When(/^I enter event details and click on submit button$/, function (callback) {
    callback.pending();
  });
  Then(/^case should be created successfuly$/, function (callback) {
    callback.pending();
  });
  When(/^I click on cancel button$/, function (callback) {
    callback.pending();
  });
  Then(/^I should be display the expert ui case list page$/, function (callback) {
    callback.pending();
  });
  When(/^I click on previous button$/, function (callback) {
    callback.pending();
  });
});
