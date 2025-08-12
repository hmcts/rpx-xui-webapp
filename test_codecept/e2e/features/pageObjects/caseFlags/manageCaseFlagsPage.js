const { $, elementByXpath } = require('../../../../helpers/globals');

class ManageCaseFlagsPage {
  get container() {
    return $('ccd-manage-case-flags');
  }

  get h1ManageCaseFlags() {
    return elementByXpath(
      '//ccd-manage-case-flags//h1[contains(text(),"Manage case flags")]'
    );
  }

  get h1Any() {
    return elementByXpath('//ccd-manage-case-flags//h1');
  }

  get fieldMapping() {
    return {
      'Manage case flags': this.h1ManageCaseFlags,
      'Manage case flags1': this.h1Any
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Manage case flag':
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

