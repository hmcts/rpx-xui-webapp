const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingChangeReasonsPage{

  get pageContainer() {
    return $('exui-hearing-change-reasons');
  }

  get fieldMapping() {
    return {
      'Provide a reason for changing this hearing': $('#hearing-option-container')
    };
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Provide a reason for changing this hearing':
        const reasons = value.split(',');
        for (const val of reasons) {
          await this.clickReasonCheckbox(val.trim());
        }
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async clickReasonCheckbox(facility) {
    const ele = elementByXpath(`//label[contains(text(),'${facility}')]/../input`);
    await ele.click();
  }
}

module.exports = HearingChangeReasonsPage;

