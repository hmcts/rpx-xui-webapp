const { $, elementByXpath } = require('../../../../helpers/globals');

class ManageCaseFlagsPage {
  get container() {
    return $('ccd-manage-case-flags');
  }

  get fieldMapping() {
    return {
      'Which support is no longer needed?': elementByXpath('//ccd-manage-case-flags//h1[contains(text(),\'Which support is no longer needed?\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Which support is no longer needed?':
        const flagDetails = value.split('-');
        const ele = elementByXpath(`//ccd-manage-case-flags//label[contains(text(),'${flagDetails[0].trim()}')]/span[contains(text(),'${flagDetails[1].trim()}')]`);
        await ele.click();
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = ManageCaseFlagsPage;

