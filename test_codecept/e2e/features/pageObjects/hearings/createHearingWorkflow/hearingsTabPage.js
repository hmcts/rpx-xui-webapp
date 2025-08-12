const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingsTab{
  get tabContainer() {
    return $('exui-case-hearings');
  }

  get requesthearingBtn() {
    return elementByXpath('//exui-case-hearings//a[contains(text(),\'Request a hearing\')]');
  }

  async isHearingsTabDisplayed(){
    return await this.tabContainer.isVisible();
  }

  async clickRequestHearingButton(){
    await this.requesthearingBtn.click();
  }
}

module.exports = new HearingsTab();

