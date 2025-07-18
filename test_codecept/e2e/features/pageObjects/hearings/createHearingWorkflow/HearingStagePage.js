const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingStagePage {
  get pageContainer() {
    return $('exui-hearing-stage');
  }

  get hearingStagesListContainer() {
    return $('#hearing-stage');
  }

  get fieldMapping() {
    return {
      'What stage is this hearing at?': $('#hearing-stage')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'What stage is this hearing at?':
        await this.selectHearingStage(value);
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async validatePage() {
    expect(await this.hearingStagesListContainer.isVisible(), 'Hearing stages list not displayed').to.be.true;
  }

  async selectHearingStage(stage) {
    const ele = elementByXpath(`//fieldset[@id='hearing-stage']//label[contains(text(),'${stage}')]/../input`);
    await ele.click();
  }
}

module.exports = HearingStagePage;
