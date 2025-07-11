const { $, elementByXpath } = require('../../../helpers/globals');

const BrowserWaits = require('../../support/customWaits');

function headerPage () { return require('./headerPage')(); }

class DateSearchField{
  constructor(fieldname) {
    this.fieldname = fieldname;
  }

  get day() {
    return elementByXpath(`//xuilib-gov-uk-date//fieldset/legend[contains(text(),'${this.fieldname}')]/..//input[contains(@name,'day')]`);
  }

  get month() {
    return elementByXpath(`//xuilib-gov-uk-date//fieldset/legend[contains(text(),'${this.fieldname}')]/..//input[contains(@name,'month')]`);
  }

  get year() {
    return elementByXpath(`//xuilib-gov-uk-date//fieldset/legend[contains(text(),'${this.fieldname}')]/..//input[contains(@name,'year')]`);
  }

  get errorMessage() {
    return elementByXpath(`//xuilib-gov-uk-date//fieldset/legend[contains(text(),'${this.fieldname}')]/..//xuilib-gov-uk-error-message//span`);
  }

  async getErrorMessageText(){
    return await this.errorMessage.getText();
  }

  async isErrorMessageDisplayed(){
    return await this.errorMessage.isDisplayed();
  }

  async getDayValue(){
    return await this.day.getAttribute('value');
  }

  async getMonthValue(){
    return await this.month.getAttribute('value');
  }

  async getYearValue(){
    return await this.year.getAttribute('value');
  }

  async isHeaderSearchDisplayed(){
    return await headerPage().headerSearch.container.isDisplayed();
  }

  async inputHeaderSearchFiled(inputVal){
    await headerPage().headerSearch.input.clear();
    await headerPage().headerSearch.input.sendKeys(inputVal);
  }

  async clickHeaderSearchFind(){
    await headerPage().headerSearch.button.click();
  }
}

class InputSearchField{
  constructor(fieldid) {
    this.fieldid = fieldid;
  }

  get input() {
    return elementByXpath(`//xuilib-gov-uk-input//input[@id='${this.fieldid}']`);
  }

  get label() {
    return elementByXpath(`//xuilib-gov-uk-input//input[@id='${this.fieldid}']/../xuilib-gov-label/label`);
  }

  get hintText() {
    return elementByXpath(`//xuilib-gov-uk-input//input[@id='${this.fieldid}']/../span[contains(@class,'govuk-hint')]`);
  }

  get errorMessage() {
    return elementByXpath(`//xuilib-gov-uk-input//input[@id='${this.fieldid}']/../xuilib-gov-uk-error-message`);
  }

  async getInputFieldValue(){
    return await this.input.getAttribute('value');
  }

  async inputText(inputVal){
    await this.input.clear();
    if (inputVal !== ''){
      await this.input.sendKeys(inputVal);
    }
  }

  async getLabel(){
    return await this.label.getText();
  }

  async getHintText(){
    return await this.hintTex.getText();
  }

  async getErrorMessageText(){
    return await this.errorMessage.getText();
  }

  async isErrorMessageDisplayed(){
    return await this.errorMessage.isDisplayed();
  }
}

class GlobalSearchCasesPage{
  constructor() {
    this.otherReference = new InputSearchField('otherRef');
    this.fullName = new InputSearchField('fullName');
    this.firstLineOfAddress = new InputSearchField('addressLine1');
    this.postCode = new InputSearchField('postcode');
    this.emailAddress = new InputSearchField('email');
    this.dateOfBirth = new DateSearchField('Date of birth');
    this.dateOfdeath = new DateSearchField('Date of death');
  }

  get pageHeader() {
    return elementByXpath(`//h1[contains(text(),'Search cases')]`);
  }

  get caseReference() {
    return $('input#caseRef');
  }

  get servicesSelect() {
    return elementByXpath(`//xuilib-gov-select//select[@id='servicesList']`);
  }

  get errorSummaryContainer() {
    return $('.govuk-error-summary');
  }

  get errorSummaryHeader() {
    return $('.govuk-error-summary h2');
  }

  get errorSummary() {
    return $('.govuk-error-summary govuk-error-summary__body ui');
  }

  get searchButton() {
    return $('exui-case-reference-search-box button');
  }

  async amOnPage(){
    try {
      await BrowserWaits.waitForElement(this.pageHeader);
      return true;
    } catch (err){
      return false;
    }
  }

  async getServicesFieldsOptions() {
    const options = this.servicesSelect.$$('option');
    const optionsCount = await options.count();
    const optionValues = [];

    for (let i = 0; i < optionsCount; i++) {
      const optionElement = await options.get(i);
      optionValues.push(await optionElement.getText());
    }
    return optionValues;
  }
}

module.exports = new GlobalSearchCasesPage();
