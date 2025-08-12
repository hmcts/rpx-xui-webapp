const { $, getText } = require('../../../../helpers/globals');
const SummaryTable = require('../common/summaryTable');

class ViewOrEditHearingPage {

  get container() { return $('exui-hearing-edit-summary'); }
  get headerElement() { return $('exui-hearing-edit-summary h1'); }

  get summaryTable() { return new SummaryTable('exui-hearing-edit-summary'); }

  get warningMessage() { return $('exui-warning-and-error-section .govuk-warning-text__text'); }
  get errorSummaryMessage() { return $('.govuk-error-summary__body'); }
  get errorMessage() { return $('.govuk-error-message').first(); }

  async getHeader() {
    return await getText(this.headerElement);
  }

  async isKeyFieldDisplayed(field) {
    return await this.summaryTable.isFieldDisplayed(field);
  }

  async getKeyFieldValue(field) {
    return await this.summaryTable.getValueForField(field);
  }

  async isChangeLinkDisplayedForKeyField(field) {
    return await this.summaryTable.isChangeLinkDisplayedForField(field);
  }

  async clickChangeLinkForField(field) {
    return await this.summaryTable.clickChangeLinkForField(field);
  }

  async isAmendedFlagDisplayedForKeyField(field) {
    return await this.summaryTable.isAmendedFlagDisplayedForField(field);
  }

  async isWarningTextBannerDisplayed() {
    return await this.warningMessage.isVisible();
  }

  async getWarningBanerText() {
    return await getText(this.warningMessage);
  }

  async getErrorSummary() {
    return await getText(this.errorSummaryMessage);
  }
}

module.exports = new ViewOrEditHearingPage();

