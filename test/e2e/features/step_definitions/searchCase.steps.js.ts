let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage.js');
let CaseCreatedPage = require('../pageObjects/caseCreatedPage.js');
let TestData = require('../../utils/TestData.js');
let baseSteps = require('./baseSteps.js');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
CustomError = require('../../utils/errors/custom-error.js');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {
  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();
  let SearchCasePage= new SearchCasePage();
  async function createCase(){
    await baseSteps.navigateToCreateCasePage();
    await baseSteps.fillOutAndSubmitForm();
  }


  Given(/^I am on expert ui case list page$/, function (callback) {

    callback.pending();
  });
  When(/^I click on search button$/, async function () {
    await caseListPage.clickSearchButton();

  });
  Then(/^Search page should be displayed$/, async function () {
    expect(await new SearchCasePage().amOnPage()).to.be.true
  });

  When(/^I enter mandatory fields jurisdiction,case type and click on start button$/, async function () {

    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.clickStartButton();


  });


Then(/^I should navigate to search criteria page$/, function () {

});
When(/^I select the search criteria details and click on apply button$/, function () {

});
Then(/^Case details should be displayed based on selected search criteria$/, function () {

});
When(/^I select the search criteria details and click on reset button$/, function () {

});
Then(/^search criteria details should be reset$/, function () {

});
