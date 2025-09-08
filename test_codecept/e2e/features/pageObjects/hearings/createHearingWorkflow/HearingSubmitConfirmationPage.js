const { $, getText } = require('../../../../../helpers/globals');

class HearingSubmitConfirmationPage{
  get pageContainer() {
    return $('exui-hearing-confirmation');
  }

  get confirmationBanner() {
    return $('.govuk-panel--confirmation');
  }

  async confirmationbannerMessage(){
    return await getText(this.confirmationBanner);
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }
}

module.exports = HearingSubmitConfirmationPage;
