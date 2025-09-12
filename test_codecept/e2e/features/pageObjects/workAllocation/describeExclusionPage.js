const { $, getText } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');

class DescribeExclusionPage {
  get container() { return $('exui-describe-exclusion'); }
  get headerCaption() { return this.container.locator('h1 span'); }
  get header() { return this.container.locator('h1'); }
  get textArea() { return this.container.locator('#exclusion-description'); }

  async isDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.container);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getHeaderCaption() {
    return await getText(this.headerCaption);
  }

  async getHeaderText() {
    return await getText(this.header);
  }

  async enterExclusionDescription(description) {
    await this.textArea.clear();
    await this.textArea.fill(description);
  }
}

module.exports = new DescribeExclusionPage();
