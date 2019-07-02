let SearchPage = require('../pageObjects/searchPage.js');
let TestData = require('../../utils/TestData.js');
const headerPage = require('../pageObjects/headerPage');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
TextField = require('../pageObjects/webdriver-components/textField.js');
CustomError = require('../../utils/errors/custom-error.js');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

var {defineSupportCode} = require('cucumber');
defineSupportCode(function ({And, But, Given, Then, When}) {
  let searchPage= new SearchPage();

  When(/^I click on search button$/, async function () {
    browser.sleep(LONG_DELAY);
    await headerPage.clickFindCase();

    });

  Then(/^Search page should be displayed$/, async function () {
    browser.sleep(SHORT_DELAY);
    expect(await new SearchPage().amOnPage()).to.be.true;
  });

  When(/^I enter mandatory fields jurisdiction,case type and click on start button$/, async function () {
    browser.sleep(LONG_DELAY);
    await searchPage.selectJurisdiction(TestData.jurisdiction);
    browser.sleep(LONG_DELAY);
    await searchPage.selectCaseType(TestData.caseType);

    await searchPage.clickApplyButton();
  });

Then(/^Case details should be displayed based on selected search criteria$/, async function () {
  expect(await new SearchPage().amOnPage()).to.be.true;
});

When(/^I select the search criteria details and click on reset button$/, async function () {
  browser.sleep(LONG_DELAY);
  await searchPage.selectJurisdiction(TestData.jurisdiction);
  browser.sleep(LONG_DELAY);
  await searchPage.selectCaseType(TestData.caseType);
  browser.sleep(LONG_DELAY);
  await searchPage.clickResetButton();
});
Then(/^search criteria details should be reset$/, async function () {
  browser.sleep(LONG_DELAY);;
  expect(await new SearchPage().amOnPage()).to.be.true

});


});

