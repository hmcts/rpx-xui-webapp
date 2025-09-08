const { $, elementByXpath } = require('../../../../helpers/globals');

class SelectSupportLocationPage {

  get container() {
    return $('ccd-select-flag-location');
  }

  get fieldMapping() {
    return {
      'Who is the support for?': elementByXpath('//ccd-select-flag-location//h1[contains(text(),\'Who is the support for?\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Who is the support for?':
        const ele = elementByXpath(`//ccd-select-flag-location//h1[contains(text(),'Who is the support for?')]/../..//label[contains(text(),'${value}')]/..//input`);
        await ele.click();
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = SelectSupportLocationPage;
