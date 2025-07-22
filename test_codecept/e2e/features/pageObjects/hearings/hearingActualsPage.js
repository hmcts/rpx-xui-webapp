const { $, elementByXpath, getText } = require('../../../../helpers/globals');

class HearingActualsPage {
  get container() { return $('exui-hearing-actuals'); }
  get hearinsgSummaryContainer() { return $('exui-hearing-actuals-add-edit-summary .govuk-summary-list'); }

  get hearingStageAndResultUpdateLink() { return $('#hearing-stage-result-update-link'); }

  get continueBtn() { return elementByXpath('//button[contains(text(),"Continue")]'); }
  get submitBtn() { return elementByXpath('//button[contains(text(),"Submit hearing details")]'); }

  get checkYourAnswersHeader() { return elementByXpath('//exui-hearing-actuals//h1[contains(text(),"Check your answers")]'); }

  getTableKeyElementXpath(key) {
    return `//dt[contains(@class,'govuk-summary-list__key')][contains(text(),'${key}')]`;
  }

  getTableValueElementXpath(forKey) {
    const keyElement = this.getTableKeyElementXpath(forKey);
    return `${keyElement}/../dd`;
  }

  async isFieldDisplayed(forKey) {
    const e = elementByXpath(this.getTableKeyElementXpath(forKey)).first();
    return e.isVisible();
  }

  async getValueForField(forKey) {
    const e = elementByXpath(this.getTableValueElementXpath(forKey)).first();
    return getText(e);
  }

  getHearingDateObject(hearingDate) {
    return new ActualHearingDate(hearingDate);
  }
}

class ActualHearingDate {
  constructor(hearingDate) {
    this.hearingDateDetailsSummary = `//div[@id='actual-hearing-dates']//summary//div[contains(text(),'${hearingDate}')]/..`;

    this.hearingDateDetailsContainer = `${this.hearingDateDetailsSummary}/..`;

    this.headingRows = [
      'Hearing timings',
      'Participants'
    ];
  }

  async clickHearingSummary() {
    await await elementByXpath(this.hearingDateDetailsSummary).first().click();
  }

  async isDisplayed() {
    return await elementByXpath(this.hearingDateDetailsSummary).first().isVisible();
  }

  async getSummaryText() {
    return await getText(elementByXpath(this.hearingDateDetailsSummary).first());
  }

  async getValue(field) {
    const fieldEleXpath = this.headingRows.includes(field) ?
      `${this.hearingDateDetailsContainer}//div//h2[contains(text(),'${field}')]` :
      `${this.hearingDateDetailsContainer}//dt[contains(text(),'${field}')]`;
    const valueEleXpath = this.headingRows.includes(field) ?
      `${fieldEleXpath}/../../dd[contains(@class,'govuk-summary-list__value')]` :
      `${fieldEleXpath}/../dd[contains(@class,'govuk-summary-list__value')]`;

    expect(await elementByXpath(fieldEleXpath).isVisible(), `${field} not displayed`).to.be.true;
    return await getText(elementByXpath(valueEleXpath));
  }

  async clickAction(field, action) {
    const fieldEleXpath = this.headingRows.includes(field) ?
      `${this.hearingDateDetailsContainer}//div//h2[contains(text(),'${field}')]` :
      `${this.hearingDateDetailsContainer}//dt[contains(text(),'${field}')]`;
    const actionEleXpath = this.headingRows.includes(field) ?
      `${fieldEleXpath}/../../dd[contains(@class,'govuk-summary-list__actions')]/a[contains(text(),'${action}')]` :
      `${fieldEleXpath}/../dd[contains(@class,'govuk-summary-list__actions')]/a[contains(text(),'${action}')]`;

    expect(await elementByXpath(fieldEleXpath).isVisible()).to.be.true;
    await elementByXpath(actionEleXpath).click();
  }

  async getActions(field) {
    const fieldEleXpath = this.headingRows.includes(field) ?
      `${this.hearingDateDetailsContainer}//div//h2[contains(text(),'${field}')]` :
      `${this.hearingDateDetailsContainer}//dt[contains(text(),'${field}')]`;
    const actionEleXpath = this.headingRows.includes(field) ?
      `${fieldEleXpath}/../../dd[contains(@class,'govuk-summary-list__actions')]` :
      `${fieldEleXpath}/../dd[contains(@class,'govuk-summary-list__actions')]`;

    expect(await elementByXpath(fieldEleXpath).isVisible()).to.be.true;
    return await getText(elementByXpath(actionEleXpath));
  }
}

module.exports = new HearingActualsPage();

