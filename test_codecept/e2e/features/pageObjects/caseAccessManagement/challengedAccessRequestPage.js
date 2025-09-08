const { $, elementByXpath } = require('../../../../helpers/globals');

class ChallengedAccessRequestPage{
  constructor(){}

  get container() {
    return $('ccd-case-challenged-access-request');
  }

  get header() {
    return $('h1.govuk-fieldset__heading');
  }

  get caseReferenceInput() {
    return $('#case-reference');
  }

  get otherReasonTextArea() {
    return $('#other-reason');
  }

  get submitBtn() {
    return $('ccd-case-challenged-access-request div.govuk-button-group button');
  }

  get cancelLink() {
    return $('ccd-case-challenged-access-request div.govuk-button-group a');
  }

  get challengedAccessSuccessContainer() {
    return $('ccd-case-challenged-access-success');
  }

  getRadioInputWithLabel(label){
    return elementByXpath(`//ccd-case-challenged-access-request//label[contains(@class,'govuk-radios__label')][contains(text(),'${label}')]/../input`);
  }

  async selectRadioOption(option){
    const radioInput = this.getRadioInputWithLabel(option);
    await radioInput.click();
  }
}

module.exports = new ChallengedAccessRequestPage();

