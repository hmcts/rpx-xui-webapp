const { $, elementByXpath } = require('../../../../helpers/globals');

class AddCommentsPage {
  constructor() {}

  get container() {
    return $('ccd-add-comments');
  }

  get fieldMapping() {
    return {
      'Add comments for this flag': elementByXpath('//ccd-add-comments//label[contains(text(),\'Add comments for this flag\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Add comments for this flag':
        const ele = elementByXpath('//ccd-add-comments//label[contains(text(),\'Add comments for this flag\')]/../..//textarea');
        await ele.fill(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = AddCommentsPage;
