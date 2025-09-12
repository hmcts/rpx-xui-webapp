const { $, elementByXpath } = require('../../../../helpers/globals');

class ManageSupportCommentPage {
  get container() {
    return $('ccd-update-flag');
  }

  get fieldMapping() {
    return {
      'Tell us why the support is no longer needed': elementByXpath('//ccd-update-flag//label[contains(text(),\'Tell us why the support is no longer needed\')]')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Tell us why the support is no longer needed':
        const ele = elementByXpath('//ccd-update-flag//label[contains(text(),\'Tell us why the support is no longer needed\')]/../..//textarea');
        await ele.sendKeys(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = ManageSupportCommentPage;
