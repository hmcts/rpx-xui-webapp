let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage.js');
let CreateCaseWizardPage = require('../pageObjects/createCaseWizardPage.js');
let AppealCreatedPage = require('../pageObjects/appealCreatedPage.js');
let CaseCreatedPage = require('../pageObjects/caseCreatedPage.js');
let TestData = require('../../utils/TestData.js');
let baseSteps = require('./baseSteps.js');
Dropdown = require('../pageObjects/webdriver-components/dropdown.js');
CustomError = require('../../utils/errors/custom-error.js');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({And, But, Given, Then, When}) {

  let createCaseStartPage = new CreateCaseStartPage();
  let caseListPage = new CaseListPage();
  let createWizardPage = new CreateCaseWizardPage();
  let appealCreatedPage = new AppealCreatedPage();

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

    await createCaseStartPage.selectJurisdiction(TestData.jurisdiction);
    await createCaseStartPage.selectCaseType(TestData.caseType);
    await createCaseStartPage.selectEvent(TestData.event);
    await createCaseStartPage.clickStartButton();


  });
  Then(/^I should navigate to Case details page$/, async function () {
    pausecomp(5000)
    expect(await new CreateCaseWizardPage().amOnPage()).to.be.true
  });

  When(/^I Enter mandatory case details and click on continue button$/, async function () {
    await createWizardPage.clickContinueButton()
  });

  Then(/^I should be on Appeal created page$/, async function () {
    pausecomp(5000);
    expect(await new AppealCreatedPage().amOnPage()).to.be.true
  });

  When(/^I enter event details and click on submit button$/, async function () {

   // await appealCreatedPage.enterIntoTextFieldEvent(TestData.eventSummary);
    //await appealCreatedPage.enterIntoTextFieldEventDes(TestData.eventDescription);
    await appealCreatedPage.submitCase();

  });

  Then(/^case should be created successfuly$/, async function () {
    pausecomp(10000);
    expect(await new CaseCreatedPage().amOnPage()).to.be.true

  });

  When(/^I click on cancel button$/, async function () {
    await appealCreatedPage.clickCancelButton();

  });
  Then(/^I should be display the expert ui case list page$/, async function (){
    await caseListPage.clickCreateNewCaseButton();

  });
  When(/^I click on previous button$/, async function (){
    await appealCreatedPage.clickPreviousButton();
  });

  Then(/^I should be display the Case details page$/, async function (){
    expect(await new CreateCaseWizardPage().amOnPage()).to.be.true
  });

  function pausecomp(millis)
  {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
  }

});
