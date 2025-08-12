const { $ } = require('../../../../../helpers/globals');

class HearingAdditionalInstructionsPage {
  get pageContainer() {
    return $('exui-hearing-additional-instructions');
  }

  get instructionsInput() {
    return $('#additionalInstructionsTextarea');
  }

  get fieldMapping() {
    return {
      'Enter any additional instructions for the hearing': this.instructionsInput
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Enter any additional instructions for the hearing':
        await this.instructionsInput.fill(value);
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }
}

module.exports = HearingAdditionalInstructionsPage;
