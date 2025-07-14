const { $, elementByXpath, getText, isPresent } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');

class EXUIErrorMessageComponent{

  get component() {
    return $('exui-error-message');
  }

  get summaryTitle() {
    return this.component.locator('h2#error-summary-title');
  }

  get summaryBody() {
    return this.component.locator('.govuk-error-summary__body .govuk-list.govuk-error-summary__list');
  }

  async isDisplayed(){
    try {
      await BrowserWaits.waitForElement(this.component);
      return true;
    } catch (err){
      return false;
    }
  }

  async getSummaryTitle(){
    return await getText(this.summaryTitle);
  }

  async isMessageDisplayedInSummary(message){
    const messages = await await getText(this.summaryBody);
    return messages.includes(message);
  }

  async getFieldLevelErrorMessage(fieldText){
    const formGroupErrorFieldElement = this.getFormGroupErrorFieldWithText(fieldText);
    expect(await isPresent(formGroupErrorFieldElement)).to.be.true;

    const fieldLevelErrorMessageElement = formGroupErrorFieldElement.locator('.govuk-error-message');
    return await getText(fieldLevelErrorMessageElement);
  }

  async isFieldLevelErrorDisplayed(fieldText){
    const formGroupErrorFieldElement = this.getFormGroupErrorFieldWithText(fieldText);
    return await isPresent(formGroupErrorFieldElement);
  }

  getFormGroupErrorFieldWithText(fieldtext){
    return elementByXpath(`//div[contains(@class,'form-group-error')]//*[contains(text(),'${fieldtext}')]//ancestor::div[contains(@class,'form-group-error')]`);
  }
}

module.exports = new EXUIErrorMessageComponent();
