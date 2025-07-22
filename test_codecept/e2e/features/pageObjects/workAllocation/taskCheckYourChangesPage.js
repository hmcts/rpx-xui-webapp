const { $ } = require('../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');
const CucumberReporter = require('../../../../codeceptCommon/reportLogger');
const CheckyourChangesTable = require('../common/checkYourChangesTable');
class TaskCheckYourChangesPage {
  get checkyourChangesTable() {
    return new CheckyourChangesTable(this.pageContainer);
  }

  get pageContainer() { return $('exui-task-assignment-confirm'); }
  get header() { return this.pageContainer.locator('h1'); }
  get headerCaption() { return this.header.locator('span'); }
  get checkYourChangesHintText() { return $('exui-task-assignment-confirm #reassign-confirm-hint, exui-task-assignment-confirm #assign-confirm-hint'); }

  get submitButton() { return this.pageContainer.locator('button[type="submit"]'); }
  get cancelLink() { return elementByXpath('//exui-task-assignment-confirm//p/a[contains(text(),"Cancel")]'); }

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
    const heaerText = await this.header.textContent();
    expect(heaerText).to.contains('Check your answers');
    await BrowserWaits.waitForElement(this.checkYourChangesTable.changesTable);
    expect(await this.checkYourChangesTable.isLinkWithTextPresentAtRow(1, 'Change')).to.be.true;
  }

  async getColumnValue(header) {
    const coltext = await this.checkYourChangesTable.getColumnValueAtRow(1, header);
    return coltext;
  }

  async clickChangeLink() {
    await this.checkyourChangesTable.clickLinkWithTextAtRow(1, 'change');
  }

  async isTaskTableHeaderDisplayed(headerCol) {
    const colheaderPos = await this.checkyourChangesTable.isTableHeaderDisplayed(headerCol);
    return colheaderPos !== -1;
  }

  async getHeaderText() {
    return await this.header.textContent();
  }

  async getHeaderCaption() {
    return await this.headerCaption.textContent();
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

module.exports = new TaskCheckYourChangesPage();
