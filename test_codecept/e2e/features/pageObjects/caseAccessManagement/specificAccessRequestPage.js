const { $ } = require('../../../../helpers/globals');

class SpecificAccessRequestPage {
  constructor() {}

  get container() {
    return $('ccd-case-specific-access-request');
  }

  get header() {
    return $('h1.govuk-fieldset__heading');
  }

  get provideReasonInput() {
    return $('#specific-reason');
  }

  get submitBtn() {
    return $('ccd-case-specific-access-request div.govuk-button-group button');
  }

  get cancelLink() {
    return $('ccd-case-specific-access-request div.govuk-button-group a');
  }

  get requestSuccessPageContainer() {
    return $('ccd-case-specific-access-success');
  }
}

module.exports = new SpecificAccessRequestPage();

