const { $, $$, elementByXpath } = require('../../../helpers/globals');

Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');

const { LOG_LEVELS } = require('../../support/constants.js');
const BrowserWaits = require('../../support/customWaits');
const CucumberRepprter = require('../../../codeceptCommon/reportLogger');

class CreateCaseStartPage {
  constructor() {
    this._jurisdiction = new Dropdown('#cc-jurisdiction');
    this._caseType = new Dropdown('#cc-case-type');
    this._event = new Dropdown('#cc-event');
  }

  get caseCaseFilterContainer() {
    return $('exui-filter-case ccd-create-case-filters');
  }

  get header() {
    return $('#content h1');
  }

  get submitButton() {
    return $('#content button');
  }

  get jurisdictionSelector() {
    return $('#cc-jurisdiction');
  }

  get startBtn() {
    return elementByXpath("//button[text() = 'Start']");
  }

  get jurisdictionOptions() {
    return $$('#cc-jurisdiction option');
  }

  async selectJurisdiction(jurisdictionText) {
    const dropdown = $('#cc-jurisdiction');
    await dropdown.selectOption({ label: jurisdictionText });
  }

  async selectCaseType(caseTypeText) {
    const dropdown = $('#cc-case-type');
    await dropdown.selectOption({ label: caseTypeText });
  }

  async selectEvent(eventText) {
    const dropdown = $('#cc-event');
    await dropdown.selectOption({ label: eventText });
  }

  async startCaseCreation(jurisdiction, caseType, event){
    this.selectJurisdiction(jurisdiction);

    this.selectCaseType(caseType);
    this.selectEvent(event);
  }

  async clickStartButton() {
    await this._submitButton.wait();
    await this._submitButton.click();

    // await BrowserWaits.waitForElementClickable(this._startBtn);
    // await browser.executeScript('arguments[0].scrollIntoView()',
    //   this._startBtn.getWebElement());
    // await this._startBtn.click();
  }

  async getPageHeader(){
    await BrowserWaits.waitForElement($(this.header));
    return await $(this.header).textContent();
  }

  async amOnPage(){
    try {
      await BrowserWaits.waitForElement(this.caseCaseFilterContainer);
      return true;
    } catch (err){
      await CucumberRepprter.AddMessage('Create case page not displayed ' + err.message + ' : ' + err.stack), LOG_LEVELS.Error;
      return false;
    }
  }

  async getLoadedJurisdictionsCount(){
    return await this.jurisdictionOptions.count();
  }
}

module.exports = CreateCaseStartPage;
