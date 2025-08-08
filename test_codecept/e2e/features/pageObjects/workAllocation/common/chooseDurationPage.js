const { $, $$, elementByXpath, getText, isPresent } = require('../../../../../helpers/globals');
const BrowserWaits = require('../../../../support/customWaits');

class ChooseDuration {
  get container() { return $('exui-choose-duration'); }
  get header() { return $('exui-choose-duration h1'); }
  get headerCaption() { return $('exui-choose-duration h1 span'); }

  get errorMessage() { return $('#error-message'); }
  get anotherPeriodValidationIndicator() {
    return $('exui-choose-duration #conditional-contact-3.form-group-error');
  }

  get radioConditional() {
    return elementByXpath('//div[contains(@class,"govuk-radios__conditional")]');
  }
  get radioOptions() { return $$('exui-choose-duration .govuk-radios'); }

  async isDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.container);
      return await this.container.isVisible();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async isValidationErrorMessageDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.errorMessage);
      return await this.container.isVisible();
    } catch (err) {
      return false;
    }
  }

  async getValidationErrorMeessage() {
    const isMsgDisplayed = await this.isValidationErrorMessageDisplayed();
    if (!isMsgDisplayed) {
      throw new Error('Validation error message is not displayed.');
    }
    return await getText(this.errorMessage);
  }

  async getHeaderCaption() {
    return await getText(this.headerCaption);
  }

  async getHeaderText() {
    return await getText(this.header);
  }

  async getCountOfRadioOptions() {
    return await this.radioOptions.count();
  }

  async isRadioOptionPresent(radioLabel) {
    return await this.container.locator(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]`).isVisible();
  }

  async getRadioOptionInputElement(radioLabel) {
    return await this.container.locator(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]//../input`);
  }

  async getRadioOptionCaptionText(radioLabel) {
    return await getText(this.container.locator(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]/parent::div[contains(@class,'govuk-radios__item')]//span`));
  }

  async selectRadioOption(radioLabel) {
    const radioInput = await this.getRadioOptionInputElement(radioLabel);
    await radioInput.click();
  }

  async isRadioOptionSelected(radioLabel) {
    const radioInput = await this.getRadioOptionInputElement(radioLabel);
    return await radioInput.isChecked();
  }

  async isDateInputWithLabelDisplayed(label) {
    const dateInput = this.getDateInputFieldWithLabel(label);
    return await isPresent(dateInput) && await dateInput.isVisible();
  }

  async enterDayInDateInputWithLabel(label, val) {
    const dayField = this.getFieldFromDatInput(label, 'Day');
    await dayField.clear();
    await dayField.fill(val);
  }

  async enterMonthInDateInputWithLabel(label, val) {
    const monthField = this.getFieldFromDatInput(label, 'Month');
    await monthField.clear();
    await monthField.fill(val);
  }

  async enterYearInDateInputWithLabel(label, val) {
    const yearField = this.getFieldFromDatInput(label, 'Year');
    await yearField.clear();
    await yearField.fill(val);
  }

  async isDateInputWithLabelDisplayed(label) {
    const containerDisplayed = this.radioConditional.isVisible();
    if (!containerDisplayed) {
      return false;
    }
    const dateInput = this.getStartDateField();
    return await isPresent(dateInput) && dateInput.isVisible();
  }

  async isValidationErrorDisplayedForDateInput(label) {
    const errorMessageElement = this.getDateInputErrorMessageElement(label);
    const errorMessage = await getText(errorMessageElement);
    return errorMessage !== '';
  }

  async getAnotherPeriodValidationMessageForField(label) {
    const errorMessageElement = this.getDateInputErrorMessageElement(label);
    return getText(errorMessageElement);
  }

  getDateInputErrorMessageElement(forFieldWithLabel) {
    return elementByXpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${forFieldWithLabel}')]/parent::fieldset//span[contains(@class ,'govuk-error-message')]`);
  }

  getFieldFromDatInput(forFieldWithLabel, fieldLabel) {
    return elementByXpath(`//div[contains(@class,'govuk-radios__conditional')]//legend[contains(text(),'${forFieldWithLabel}')]/parent::fieldset//label[contains(text() ,'${fieldLabel}')]/following-sibling::input`);
  }

  getDateInputFieldWithLabel(label) {
    return this.container.locator(`//div[contains(@class,'govuk-radios__conditional')]//*[contains(text(),'${label}')]/parent::fieldset`);
  }

  getStartDateField() {
    return this.container.locator('//div[@id,\'date-start\']');
  }
}

module.exports = ChooseDuration;
