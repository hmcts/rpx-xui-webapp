const { $, $$, elementByXpath, getText } = require('../../../../helpers/globals');

class SpecificAccessReviewPage{
  constructor(){}

  get container() {
    return $('exui-specific-access-review');
  }

  get requestDetails() {
    return $$('exui-specific-access-review table tbody tr');
  }

  get fieldMapping() {
    return {
      'Review specific access request': elementByXpath('//h1[contains(text(),\'Review specific access request\')]/../../table'),
      'What do you want to do with this request?': elementByXpath('//h1[contains(text(),\'What do you want to do with this request?\')]/../..//exui-choose-radio-option'),
      'Approve request': elementByXpath('//label[contains(text(),\'Approve request\')]/../input'),
      'Reject request': elementByXpath('//label[contains(text(),\'Reject request\')]/../input'),
      'Request more information': elementByXpath('//label[contains(text(),\'Request more information\')]/../input')
    };
  }

  async inputValues(field, value){
    switch (field){
      case 'What do you want to do with this request?':
        const ele = elementByXpath(`//h1[contains(text(),'What do you want to do with this request?')]/../..//exui-choose-radio-option//label[contains(text(),'${value}')]/../input`);
        await ele.click();
        break;
      default:
        throw new Error(`${field} not configured`);
    }
  }

  async getAccessRequestDetails() {
    const requestDetails = {};
    const rowsCount = await this.requestDetails.count();
    for (let i = 0; i < rowsCount; i++) {
      const row = await this.requestDetails.get(i);
      const name = await getText(row.locator('th'));
      const value = await getText(row.locator('td'));
      requestDetails[name] = value;
    }
    return requestDetails;
  }
}
module.exports = SpecificAccessReviewPage;
