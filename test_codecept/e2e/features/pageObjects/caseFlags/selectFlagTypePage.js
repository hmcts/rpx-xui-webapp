const { $, elementByXpath } = require('../../../../helpers/globals');

class SelectFlagTypePage {
  constructor (flagType) {
    this.flagType = flagType;          // keep the value only – not the locators
  }

  get container () {
    return $('ccd-select-flag-type');
  }

  get flagHeading () {
    return elementByXpath(
      `//ccd-select-flag-type//h1[contains(text(),"${this.flagType}")]`
    );
  }

  byName (name) {
    switch (name) {
      case this.flagType:
        return this.flagHeading;
      /* add further named locators here */
      default:
        throw new Error(`No locator found for “${name}”`);
    }
  }

  async inputValue(field, value) {
    if (field.includes('Enter a flag type')){
      const ele = elementByXpath('//label[contains(text(),\'Enter a flag type\')]/..//input');
      await ele.fill(value);
    } else {
      const ele = elementByXpath(`//ccd-select-flag-type//h1[contains(text(),'${this.flagType}')]/../..//label[contains(text(),'${value}')]/..//input`);
      await ele.click();
    }
  }
}
module.exports = SelectFlagTypePage;

