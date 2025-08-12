const CucumberReporter = require('../../../../codeceptCommon/reportLogger');
const { $, $$, elementByXpath, getText } = require('../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');

class CaseAllocationCheckYourChangesPage {
  get pageContainer()            { return $('exui-allocate-role-check-answers'); }
  get header()                   { return $('exui-allocate-role-check-answers h1'); }
  get headerCaption()            { return $('exui-allocate-role-check-answers h1 span'); }

  get checkYourChangesHintText() { return $('exui-allocate-role-check-answers #reassign-confirm-hint, exui-allocate-role-check-answers #assign-confirm-hint'); }

  get submitButton()             { return $('exui-allocate-role-navigation button'); }
  get cancelLink()               { return elementByXpath(`//exui-allocate-role-check-answers//p/a[contains(text(),'Cancel')]`); }

  get checkYourChangesTable()    { return $('.govuk-summary-list'); }
  get answerRows()               { return $$('.govuk-summary-list .govuk-summary-list__row'); }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.pageContainer);
      return true;
    } catch (err) {
      CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
      return false;
    }
  }

  async validatePage() {
    const heaerText = await getText(this.header);
    expect(heaerText).to.contains('Check your');
    await BrowserWaits.waitForElement(this.checkYourChangesTable);

    const answerRow = await this.answerRows.nth(1);
    expect(await answerRow.isVisible()).to.be.true;
  }

  async getColumnValue(header) {
    const rowsCount = await this.answerRows.count();
    let colvalue = null;
    for (let i = 0; i< rowsCount; i++){
      const row = await this.answerRows.nth(i);
      const headerName = row.locator('.govuk-summary-list__key');
      const thisHeadername = await getText(headerName);

      if (thisHeadername === header){
        const headerValue = row.locator('.govuk-summary-list__value');
        colvalue = await getText(headerValue);
      }
    }
    if (colvalue === null){
      throw new Error(`${header} is not found`);
    }
    return colvalue;
  }

  async clickChangeLink() {
    await this.checkyourChangesTable.clickLinkWithTextAtRow(1, 'change');
  }

  async isTaskTableHeaderDisplayed(headerCol) {
    const colheaderPos = await this.checkyourChangesTable.isTableHeaderDisplayed(headerCol);
    return colheaderPos !== -1;
  }

  async getHeaderText() {
    return await getText(this.header);
  }

  async getHeaderCaption() {
    return await getText(this.headerCaption);
  }

  async clickContinueButton() {
    expect(await this.amOnPage(), 'Not on Check your changes page').to.be.true;
    await this.submitButton.click();
  }

  async clickCancelLink() {
    expect(await this.amOnPage(), 'Not on Check your changes page').to.be.true;
    await this.cancelLink.click();
  }
}

module.exports = new CaseAllocationCheckYourChangesPage();
