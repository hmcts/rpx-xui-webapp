const { $, isPresent } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');

class Spinner {

  get loadingSpinner() {
    return $('.loading-spinner-in-action');
  }

  async isSpinnerDisplayed() {
    return await isPresent(this.loadingSpinner);
  }

  async waitForSpinnerToDissappear() {
    await BrowserWaits.waitForCondition(async () => {
      return !(await isPresent(this.loadingSpinner));
    });
  }
}

module.exports = Spinner;
