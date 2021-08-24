let SearchPage = require('../pageObjects/searchPage.js');
let TestData = require('../../utils/TestData.js');
const headerPage = require('../pageObjects/headerPage');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
TextField = require('../pageObjects/webdriver-components/textField.js');
CustomError = require('../../utils/errors/custom-error.js');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

const BrowserWaits = require('../../support/customWaits');

var {defineSupportCode} = require('cucumber');
defineSupportCode(function ({And, But, Given, Then, When}) {
  let searchPage= new SearchPage();

  When(/^I click on search button$/, async function () {
    await headerPage.clickFindCase();
    });

    When('I click on Case list',async function(){
      await BrowserWaits.retryWithActionCallback(async () => {
        await headerPage.waitForSpinnerToDissappear();
        await headerPage.clickCaseList();
      });
       
    });

  Then(/^Search page should be displayed$/, async function () {
    expect(await new SearchPage().amOnPage()).to.be.true;
  });

  When(/^I enter mandatory fields jurisdiction,case type and click on apply button$/, async function () {
    browser.sleep(AMAZING_DELAY);
    await searchPage.selectJurisdiction(TestData.jurisdiction);
    browser.sleep(AMAZING_DELAY);
    await searchPage.selectCaseType(TestData.caseTypeIndex);

    await searchPage.clickApplyButton();
  });

  When('I enter search fields jurisdiction {string} case type {string}', async function (jurisdiction,caseType) {
    await searchPage.selectJurisdiction(jurisdiction);
    await searchPage.selectCaseType(caseType);
  });

  When('I reset case search fields', async function(){
    await searchPage.clickResetButton();

  });

  When('I click apply to perform case search', async function () {
    await searchPage.clickApplyButton();
  });

  When('I open first case in search results', async function () {
    await searchPage.openFirstCaseInResults();

  });

  Then('I see results returned', async function () {
    await searchPage.waitForAtleastOneSearchResult();
    await expect(await searchPage.hasSearchReturnedResults()).to.be.true;
  });

Then(/^Case details should be displayed based on selected search criteria$/, async function () {
  var searchPage = new SearchPage();
  expect(await searchPage.amOnPage()).to.be.true;
  expect(await searchPage.hasSearchReturnedResults()).to.be.true;
});

When(/^I select the search criteria details and click on reset button$/, async function () {
  await searchPage.selectJurisdiction(TestData.jurisdiction);
  await searchPage.selectCaseType(TestData.caseTypeIndex);
  await searchPage.clickResetButton();
});
Then(/^search criteria details should be reset$/, async function () {
  expect(await new SearchPage().amOnPage()).to.be.true;
  await searchPage.waitForSearchWithNoResults();
  expect(await searchPage.hasSearchReturnedResults()).to.be.false;
});
});

