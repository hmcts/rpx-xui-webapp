const { $, elementByXpath, getText } = require('../../../../helpers/globals');
const SummaryTable = require('../common/summaryTable');

class ViewHearingPage {
  get container()      { return $('exui-hearing-viewsummary'); }
  get headerElement()  { return $('exui-hearing-viewsummary exui-hearing-summary h1'); }

  get summaryTable()   { return new SummaryTable('exui-hearing-viewsummary'); }

  get editHearingBtn() {
    return elementByXpath(
      '//exui-hearing-viewsummary//button[contains(text(),"Edit hearing")]'
    );
  }

  async isEditHearingBtnDisplayed(){
    return await this.editHearingBtn.isVisible();
  }

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
}

module.exports = new ViewHearingPage();
