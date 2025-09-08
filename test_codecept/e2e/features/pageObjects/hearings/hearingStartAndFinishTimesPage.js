const { $, elementByXpath } = require('../../../../helpers/globals');

class HearingStartAndFinishTimesPage {
  get container() { return $('exui-hearing-actuals-timing'); }

  get hearingStageSelect() { return $('#hearing-stage'); }
  get hearingResultRadios() { return elementByXpath('//h1[contains(text(),"Hearing result")]/../../div[contains(@class,"govuk-radios")]'); }

  get saveAndContinueButton() { return elementByXpath('//button[contains(text(),"Save and continue")]'); }

  getTimeInputFieldElement(fieldName) {
    return elementByXpath(`//label[contains(text(),'${fieldName}')]/../input`);
  }

  async isInputFieldDisplayed(fieldName) {
    return await this.getTimeInputFieldElement(fieldName).isVisible();
  }

  async inputField(fieldName, value) {
    await this.getTimeInputFieldElement(fieldName).fill(value);
  }

  async selectRecordTimesRadioOption(value) {
    await elementByXpath(`//div[contains(@id,'recordTimes')]//label[contains(text(),'${value}')]/../input`).click();
  }
}

module.exports = new HearingStartAndFinishTimesPage();
