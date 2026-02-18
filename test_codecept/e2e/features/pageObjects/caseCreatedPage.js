const { elementByXpath } = require('../../../helpers/globals');
const BrowserWaits = require('../../../e2e/support/customWaits');

class CaseCreatedPage {
  get header() {
    return elementByXpath('//h1');
  }

  async getPageHeader() {
    return await this.header.textContent();
  }

  async amOnPage() {
    return await BrowserWaits.retryWithActionCallback(async () => {
      return await this.header.isVisible();
    });
  }
}

module.exports = CaseCreatedPage;
