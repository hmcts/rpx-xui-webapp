const { $, elementByXpath } = require('../../../../helpers/globals');

class UpdateFlagAddTranslationPage {

  get container() {
    return $('ccd-update-flag-add-translation-form');
  }

  get fieldMapping() {
    return {
      'Other description': elementByXpath('//label[contains(text(),\'Other description\')]/..//textarea'),
      'Other description (Welsh)': elementByXpath('//label[contains(text(),\'Other description (Welsh)\')]/..//textarea'),
      'Flag comments': elementByXpath('//label[contains(text(),\'Flag comments\')]/..//textarea'),
      'Flag comments (Welsh)': elementByXpath('//label[contains(text(),\'Flag comments (Welsh)\')]/..//textarea')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Other description':
      case 'Other description (Welsh)':
      case 'Flag comments':
      case 'Flag comments (Welsh)':
        await this.fieldMapping[field].fill(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = UpdateFlagAddTranslationPage;
