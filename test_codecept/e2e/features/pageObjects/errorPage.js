const { LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
const { elementByXpath } = require('../../../helpers/globals');
const reportLogger = require('../../../codeceptCommon/reportLogger');

class ErrorPage {
  get title() {
    return elementByXpath("//main[@id='content']//h1[contains(text(),'Sorry')]");
  }

  get tryAgainMessage() {
    return elementByXpath("//p[contains(text(),'Try again later')]");
  }

  async isErrorPageDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.title);
      const headerMessage = await this.title.textContent();
      console.log('Error message displayed : ' + headerMessage);
      return headerMessage.includes('Sorry');
    } catch (err) {
      reportLogger.AddMessage('Error page not displayed : ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async getErrorMessage() {
    expect(await this.isErrorPageDisplayed(), 'Not on error page').to.be.true;
    await BrowserWaits.waitForElement(this.title);
    return await this.title.textContent();
  }

  async isTryAgainMsgDisplayed() {
    expect(await this.isErrorPageDisplayed(), 'Not on error page').to.be.true;
    await BrowserWaits.waitForElement(this.title);
    try {
      await BrowserWaits.waitForElement(this.tryAgainMessage);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = new ErrorPage();