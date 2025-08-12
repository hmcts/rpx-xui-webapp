const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingWelshPage {
  get pageContainer() {
    return $('exui-hearing-welsh');
  }

  get fieldMapping() {
    return {
      'Does this hearing need to be in Welsh?': elementByXpath('//exui-hearing-welsh//h1[contains(text(),\'Does this hearing need to be in Welsh?\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Does this hearing need to be in Welsh?':
        const div = value === 'Yes' ? 'div[1]' : 'div[2]';
        const ele = elementByXpath(`//exui-hearing-welsh/div/form/div/fieldset/div[2]/${div}/label[contains(text(),'${value}')]/../input`);
        await ele.click();
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }
}

module.exports = HearingWelshPage;
