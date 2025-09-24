const { $, elementByXpath } = require('../../../../helpers/globals');

class SelectSupportTypePage {
  constructor (flagType) {
    this.flagType = flagType;            // just store the value
  }

  /* ───────── static content ───────── */
  get container () {
    return $('ccd-select-flag-type');
  }

  /* ───────── dynamic (per-flag) content ───────── */
  get flagHeading () {
    // <h1>…Urgent case flag…</h1>
    return elementByXpath(
      `//ccd-select-flag-type//h1[contains(text(),"${this.flagType}")]`
    );
  }

  /* (optional) simple mapper to keep old by-name calls working */
  byName (name) {
    if (name === this.flagType) return this.flagHeading;
    throw new Error(`Unknown locator name: ${name}`);
  }

  async inputValue(field, value) {
    if (field.includes('Enter a flag type')) {
      const ele = elementByXpath('//label[contains(text(),\'Enter a flag type\')]/..//input');
      await ele.fill(value);
    } else {
      const ele = elementByXpath(`//ccd-select-flag-type//h1[contains(text(),'${this.flagType}')]/../..//label[contains(text(),'${value}')]/..//input`);
      await ele.click();
    }
  }
}
module.exports = SelectSupportTypePage;

