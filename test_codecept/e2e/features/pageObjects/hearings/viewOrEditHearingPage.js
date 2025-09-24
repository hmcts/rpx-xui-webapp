const { $, elementByXpath, getText } = require('../../../../helpers/globals');
const SummaryTable = require('../common/summaryTable');

class ViewOrEditHearingPage{
  get container()               { return $('exui-hearing-view-edit-summary'); }
  get headerElement()           { return $('exui-hearing-view-edit-summary exui-hearing-summary h1'); }
  get summaryTable()            { return new SummaryTable('exui-hearing-view-edit-summary'); }
  get submitUpdatedRequestBtn() { return $('button[type="submit"]'); }   // keep same name
  get multiValueFields() {
    return [
      'Reasonable adjustments',
      'Does the hearing need to take place on a specific date?'
    ];
  }

  async getHeader(){
    return await getText(this.headerElement);
  }

  async isKeyFieldDisplayed(field){
    return await this.summaryTable.isFieldDisplayed(field);
  }

  async getKeyFieldValue(field) {
    let values = [];

    if (this.multiValueFields.includes(field)){
      values = await this.summaryTable.getValuesForField(field);
    } else {
      values.push(await this.summaryTable.getValueForField(field));
    }

    if (values.length === 0){
      values.push(await this.summaryTable.getValueForField(field));
    }
    return values;
  }

  async isChangeLinkDisplayedForKeyField(field){
    return await this.summaryTable.isChangeLinkDisplayedForField(field);
  }

  async getActionColumnTextForKeyField(field) {
    const actionColumnElement = this.summaryTable.getTableActionsElementXpath(field);
    return await getText(elementByXpath(actionColumnElement));
  }

  async clickChangeLinkForField(field) {
    return await this.summaryTable.clickChangeLinkForField(field);
  }

  async isAmendedFlagDisplayedForKeyField(field, value) {
    return await this.summaryTable.isAmendedFlagDisplayedForField(field);
  }

  async getSectionHeadingLabel(heading){
    const e = elementByXpath(`//h2[contains(text(),'${heading}')]//exui-amendment-label`);
    const isDisplayed = await e.isVisible();
    return isDisplayed ? await getText(e) : '';
  }
}

module.exports = new ViewOrEditHearingPage();
