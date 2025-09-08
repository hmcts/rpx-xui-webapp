const { $, elementByXpath } = require('../../../../helpers/globals');

class AddSupportCommentsPage {
  constructor() {}

  get container() {
    return $('ccd-add-comments');
  }

  get fieldMapping() {
    return {
      'Tell us more about the request': elementByXpath('//ccd-add-comments//label[contains(text(),\'Tell us more about the request\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Tell us more about the request':
        const ele = elementByXpath('//ccd-add-comments//label[contains(text(),\'Tell us more about the request\')]/../..//textarea');
        await ele.fill(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = AddSupportCommentsPage;
