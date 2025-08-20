const { $, getText } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');

class ChooseRadioOptionComponent{
  get component() {                               // <exui-choose-radio-option>
    return $('exui-choose-radio-option');
  }

  /* elements inside the component ------------------------------------- */
  get header()         { return this.component.locator('h1'); }
  get headerCaption()  { return this.component.locator('h1 span'); }

  // all <div class="govuk-radios"> groups inside the component
  get radioOptions()   { return this.component.locator('.govuk-radios'); }

  /* cross-component error message (same selector as before) ------------ */
  get errorMessage()   { return $('exui-choose-radio-option #error-message'); }

  async isDisplayed(){
    try {
      await BrowserWaits.waitForElement(this.component);
      return await this.component.isVisible();
    } catch (err){
      return false;
    }
  }

  async isValidationErrorMessageDisplayed(){
    try {
      await BrowserWaits.waitForElement(this.errorMessage);
      return await this.component.isVisible();
    } catch (err) {
      return false;
    }
  }

  async getValidationErrorMeessage(){
    const isMsgDisplayed = await this.isValidationErrorMessageDisplayed();
    if (!isMsgDisplayed){
      throw new Error('Validation error message is not displayed.');
    }
    return getText(this.errorMessage);
  }

  async getHeaderCaption(){
    return getText(this.headerCaption);
  }

  async getHeaderText(){
    await this.isVisible();
    return getText(this.header);
  }

  async getCountOfRadioOptions(){
    return await this.radioOptions.count();
  }

  async isRadioOptionPresent(radioLabel){
    return await this.component.locator(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]`).isVisible();
  }

  async getRadioOptionInputElement(radioLabel){
    return await this.component.locator(`//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${radioLabel}')]//../input`);
  }

  async selectRadioOption(radioLabel){
    const radioInput = await this.getRadioOptionInputElement(radioLabel);
    await radioInput.wait();
    await radioInput.click();
  }

  async isRadioOptionSelected(radioLabel) {
    const radioInput = await this.getRadioOptionInputElement(radioLabel);
    return await radioInput.isChecked();
  }
}

module.exports = ChooseRadioOptionComponent;
