const { $, elementByXpath, elementsByXpath, getText } = require('../../../../helpers/globals');

class SummaryTable{
  constructor(pageElementTag){
    this.pageElementTag = pageElementTag;
  }

  get summaryContainer() {
    return $(`${this.pageElementTag ? this.pageElementTag : ''} .govuk-summary-list`);
  }

  getTableKeyElementXpath(key) {
    return `//*[contains(@class,'govuk-summary-list__key')][contains(text(),'${key}')]`;
  }

  getTableValueElementXpath(forKey) {
    const keyElement = this.getTableKeyElementXpath(forKey);
    return `${keyElement}/../*[contains(@class,'govuk-summary-list__value')]`;
  }

  getTableChangeLinkElementXpath(forKey) {
    const keyElement = this.getTableKeyElementXpath(forKey);
    return `${keyElement}/../*[contains(@class,'govuk-summary-list__actions')]//a`;
  }

  getTableActionsElementXpath(forKey) {
    const keyElement = this.getTableKeyElementXpath(forKey);
    return `${keyElement}/../*[contains(@class,'govuk-summary-list__actions')]`;
  }

  getTableAmendedElementXpath(forKey) {
    const keyElement = this.getTableKeyElementXpath(forKey);
    return `${keyElement}/..//exui-amendment-label//strong`;
  }

  async isFieldDisplayed(forKey) {
    const e = elementByXpath(this.getTableKeyElementXpath(forKey)).first();
    return await e.isVisible();
  }

  async getValueForField(forKey) {
    const e = elementByXpath(this.getTableValueElementXpath(forKey)).first();
    return await getText(e);
  }

  async getValuesForField(forKey) {
    const values = [];
    const elements = elementsByXpath(this.getTableValueElementXpath(forKey)+'/div');
    const count = await elements.count();
    for (let i = 0; i < count; i++){
      const e = await elements.nth(i);
      values.push(await getText(e));
    }
    return values;
  }

  async isChangeLinkDisplayedForField(forKey) {
    const e = elementByXpath(this.getTableChangeLinkElementXpath(forKey)).first();
    return await e.isVisible();
  }

  async clickChangeLinkForField(forKey){
    const e = elementByXpath(this.getTableChangeLinkElementXpath(forKey)).first();
    await e.click();
  }

  async isAmendedFlagDisplayedForField(forKey){
    const e = elementByXpath(this.getTableAmendedElementXpath(forKey)).first();
    return await e.isVisible();
  }
}

module.exports = SummaryTable;
