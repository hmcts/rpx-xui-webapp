const { $ } = require('../../../../helpers/globals');

const BrowserWaits = require('../../../support/customWaits');
class Spinner {

  get loadingSpinner() {
    return $('.loading-spinner-in-action');
  }

  async isSpinnerDisplayed() {
    return await this.loadingSpinner.isPresent();
  }

  async waitForSpinnerToDissappear() {
    await BrowserWaits.waitForCondition(async () => {
      return !(await this.loadingSpinner.isPresent());
    });
  }
}

module.exports = Spinner;
