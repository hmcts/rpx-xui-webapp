Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');

const { LOG_LEVELS } = require('../../support/constants.js');
const BrowserWaits = require('../../support/customWaits');
const CucumberRepprter = require('../../support/reportLogger');

class CreateCaseStartPage {
  constructor(){
    this.caseCaseFilterContainer = $('exui-filter-case ccd-create-case-filters');
    this.header = '#content h1';
    this._jurisdiction = new Dropdown('#cc-jurisdiction');
    this._caseType = new Dropdown('#cc-case-type');
    this._event = new Dropdown('#cc-event');
    this._submitButton = new Button('#content button');
    this._jurisdictionSelector = '#cc-jurisdiction';

    this._startBtn = element(by.xpath('//button[text() = \'Start\']'));

    this.jurisdictionOptions = $$('#cc-jurisdiction option');
  }

  async selectJurisdiction(jurisdiction){
    let locatorString = '//*[@id = \'cc-jurisdiction\']/option[';
    let i = 0;
    const options = jurisdiction.split('|');
    for (const option of options) {
      if (i === 0) {
        locatorString += `contains(text(), '${option.trim()}')`;
      } else {
        locatorString += ` or contains(text(), '${option.trim()}')`;
      }
      i++;
    }
    locatorString = locatorString + ']';

    const e = element(by.xpath(locatorString));
    await BrowserWaits.waitForElement(e);
    await e.click();
  }

  async selectCaseType(caseType){
    let locatorString = '//*[@id = \'cc-case-type\']/option[';
    let i = 0;
    const options = caseType.split('|');
    for (const option of options) {
      if (i === 0) {
        locatorString += `contains(text(), '${option.trim()}')`;
      } else {
        locatorString += ` or contains(text(), '${option.trim()}')`;
      }
      i++;
    }
    locatorString = locatorString + ']';

    const e = element(by.xpath(locatorString));
    await BrowserWaits.waitForElement(e);
    await e.click();

    // await this._caseType.selectFromDropdownByText(option);
  }

  async selectEvent(option){
    const e = element(by.xpath('//*[@id = "cc-event"]/option[text() = "' + option + '"]'));
    await BrowserWaits.waitForElement(e);
    await e.click();

    // await this._event.selectFromDropdownByText(option);
  }

  async startCaseCreation(jurisdiction, caseType, event){
    this.selectJurisdiction(jurisdiction);

    this.selectCaseType(caseType);
    this.selectEvent(event);
  }

  async clickStartButton() {
    await this._submitButton.waitForElementToBeClickable();
    await this._submitButton.click();

    // await BrowserWaits.waitForElementClickable(this._startBtn);
    // await browser.executeScript('arguments[0].scrollIntoView()',
    //   this._startBtn.getWebElement());
    // await this._startBtn.click();
  }

  async getPageHeader(){
    await BrowserWaits.waitForElement($(this.header));
    return await $(this.header).getText();
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
