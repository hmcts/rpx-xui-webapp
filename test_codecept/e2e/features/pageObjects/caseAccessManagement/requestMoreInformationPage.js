const { $, elementByXpath } = require('../../../../helpers/globals');

class SARRequestMoreInformationPage{
  constructor(){}

  get container() {
    return $('exui-specific-access-information h1');
  }

  get fieldMapping() {
    return {
      'Request more information': elementByXpath('//h1[contains(text(),\'Request more information\')]/..//textarea')
    };
  }

  async inputValues(field, value){
    await this.fieldMapping[field].fill(value);
  }
}

module.exports = SARRequestMoreInformationPage;
