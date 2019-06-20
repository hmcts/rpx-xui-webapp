let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage.js');
let CaseCreatedPage = require('../pageObjects/caseCreatedPage.js');
let SearchCasePage = require('../pageObjects/SearchCasePage.js');
let TestData = require('../../utils/TestData.js');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
TextField = require('../pageObjects/webdriver-components/textField.js');
CustomError = require('../../utils/errors/custom-error.js');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {
  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();
  let searchCasePage= new SearchCasePage();

  When(/^I click on search button$/, async function () {
    await caseListPage.clickSearchButton();

    });

  Then(/^Search page should be displayed$/, async function () {
    pausecomp(5000);
    expect(await new SearchCasePage().amOnPage()).to.be.true
  });

  When(/^I enter mandatory fields jurisdiction,case type and click on start button$/, async function () {
    pausecomp(5000);
    await searchCasePage.selectJurisdiction(TestData.jurisdiction);
    await searchCasePage.selectCaseType(TestData.caseType);

  });

Then(/^I should navigate to search criteria page$/, async function () {
  pausecomp(5000);
  expect(await new SearchCasePage().amOnPage()).to.be.true
});
When(/^I select the search criteria details and click on apply button$/, async function (){
  await searchCasePage.clickApplyButton();

});
Then(/^Case details should be displayed based on selected search criteria$/, async function () {

});
When(/^I select the search criteria details and click on reset button$/, async function () {
  await searchCasePage.clickResetButton();
});
Then(/^search criteria details should be reset$/, async function () {
  pausecomp(5000);
  expect(await new SearchCasePage().amOnPage()).to.be.true

});

  function pausecomp(millis)
  {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
  }

});

