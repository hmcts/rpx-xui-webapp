const { $, elementByXpath } = require('../../../../helpers/globals');

class SelectFlagLocationPage{
  get container() {
    return $('ccd-select-flag-location');
  }

  get fieldMapping() {
    return {
      'Where should this flag be added?': elementByXpath('//ccd-select-flag-location//h1[contains(text(),\'Where should this flag be added?\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Where should this flag be added?':
        const ele = elementByXpath(`//ccd-select-flag-location//h1[contains(text(),'Where should this flag be added?')]/../..//label[contains(text(),'${value}')]/..//input`);
        await ele.click();
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = SelectFlagLocationPage;
