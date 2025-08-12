const { $, elementByXpath } = require('../../../../helpers/globals');

const BrowserWaits = require('../../../support/customWaits');

class SARActionConfirmationPage{
  constructor(action){
    this.tag = this.getContainerTagForAction(action);
  }

  get header() {
    return $(`${this.tag} .govuk-panel--confirmation h1`);
  }

  get detailsHeader() {
    return $(`${this.tag} h2.govuk-heading-m`);
  }

  get detailsPara() {
    return $(`${this.tag} p`);
  }

  get returnToMyTasksBtn() {
    return elementByXpath(
      `//${this.tag}/../../*[contains(@class,'govuk-button-group')]//button`
    );
  }

  get returnToTasksTabLink() {
    return elementByXpath(
      `//${this.tag}/../../*[contains(@class,'govuk-button-group')]//a`
    );
  }

  async waitForContainer(){
    await BrowserWaits.waitForElement(this.header);
  }

  getContainerTagForAction(action){
    let tag = '';
    action = action.toLowerCase();
    switch (action){
      case 'reject':
      case 'denied':
        tag = 'exui-specific-access-denied';
        break;
      case 'approved':
        tag = 'exui-specific-access-approved';
        break;
      default:
    }
    if (tag === ''){
      throw Error(`SAR action "${action}" not recognised or not implemented in test`);
    }
    return tag;
  }
}

module.exports = SARActionConfirmationPage;
