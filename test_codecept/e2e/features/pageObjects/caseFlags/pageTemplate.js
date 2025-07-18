const { $ } = require('../../../../helpers/globals');

class TemplatePage {
  get container() {
    return $('app-company-house-details');
  }

  get fieldMapping() {
    return {
      'Enter the name of the organisation': $('#company-name')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Enter the name of the organisation':
        await this.fieldMapping[field].fill(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = TemplatePage;
