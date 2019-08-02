const CreateCaseStartPage = require('../pageObjects/createCaseStartPage.js');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage.js');
let AppealCreatedPage = require('../pageObjects/appealCreatedPage.js');
let CaseCreatedPage = require('../pageObjects/caseCreatedPage.js');
const headerPage = require('../pageObjects/headerPage');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');
let TestData = require('../../utils/TestData.js');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
TextField = require('../pageObjects/webdriver-components/textField.js');
CustomError = require('../../utils/errors/custom-error.js');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {

  let createCaseStartPage = new CreateCaseStartPage();
  let createWizardPage = new CreateCaseWizardPage();
  let appealCreatedPage = new AppealCreatedPage();

  When(/^I click on create case button$/, async function () {
    //await caseListPage.clickCreateNewCaseButton();
    await headerPage.clickCreateCase();

  });
  Then(/^Create case page should be displayed$/, async function () {
    browser.sleep(AMAZING_DELAY);
    expect(await new CreateCaseStartPage().amOnPage()).to.be.true;
  });

  When(/^I enter mandatory fields jurisdiction,case type,event and click on start button$/, async function () {
    browser.sleep(LONG_DELAY);
    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType();
    await createCaseStartPage.selectEvent(TestData.event);
    await createCaseStartPage.clickStartButton();


  });
  Then(/^I should navigate to Case details page$/, async function () {
    browser.sleep(LONG_DELAY);
    expect(await new CreateCaseWizardPage().amOnPage()).to.be.true;
  });

  When(/^I Enter mandatory case details and click on continue button$/, async function () {
    browser.sleep(LONG_DELAY);
    await createWizardPage.clickContinueButton()
  });

  Then(/^I should be on Appeal created page$/, async function () {
    browser.sleep(SHORT_DELAY);
    expect(await new AppealCreatedPage().amOnPage()).to.be.true
  });

  When(/^I enter event details and click on submit button$/, async function () {

    await appealCreatedPage.enterIntoTextFieldEvent(TestData.eventSummary);
    await appealCreatedPage.enterIntoTextFieldEventDes(TestData.eventDescription);
    await appealCreatedPage.submitCase();
  });

  Then(/^case should be created successfuly$/, async function () {
    browser.sleep(LONG_DELAY);
    expect(await new CaseCreatedPage().amOnPage()).to.be.true

  });

  When(/^I click on cancel button$/, async function () {
    await appealCreatedPage.clickCancelButton();

  });
  Then(/^I should be display the expert ui case list page$/, async function (){
    //await caseListPage.clickCreateNewCaseButton();

  });
  When(/^I click on previous button$/, async function (){
    await appealCreatedPage.clickPreviousButton();
  });

  Then(/^I should be display the Case details page$/, async function (){
    expect(await new CreateCaseWizardPage().amOnPage()).to.be.true
  });

});
