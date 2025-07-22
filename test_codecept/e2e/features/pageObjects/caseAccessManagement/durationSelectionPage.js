const { $, elementByXpath } = require('../../../../helpers/globals');

class SpecificAccessDuration {
  constructor() {}

  get container() {
    return $('exui-specific-access-duration');
  }

  get fieldMapping() {
    return {
      'How long do you want to give access to this case for?':
        elementByXpath('//h1[contains(text(),\'How long do you want to give access to this case for?\')]/..//div[contains(@class,\'govuk-radios--conditional\')]'),
      'Access Starts':
        $('#conditional-specific-access-3:not(.govuk-radios__conditional--hidden) .date-input-container'),
      'Access Ends':
        $('#conditional-specific-access-3:not(.govuk-radios__conditional--hidden) .date-input-container')
    };
  }

  async inputValues(field, value){
    switch (field){
      case 'How long do you want to give access to this case for?':
        const ele = elementByXpath(`//h1[contains(text(),'How long do you want to give access to this case for?')]/..//div[contains(@class,'govuk-radios--conditional')]//label[contains(text(),'${value}')]/..//input`);
        await ele.click();
        break;
      case 'Access Ends':
        const values = value.split('-');
        const day = elementByXpath('//legend[contains(text(),\'Access Ends\')]/..//div[contains(@id,\'endDate-date\')]//label/span[contains(text(),\'Day\')]/../../..//input');
        const month = elementByXpath('//legend[contains(text(),\'Access Ends\')]/..//div[contains(@id,\'endDate-date\')]//label/span[contains(text(),\'Month\')]/../../..//input');
        const year = elementByXpath('//legend[contains(text(),\'Access Ends\')]/..//div[contains(@id,\'endDate-date\')]//label/span[contains(text(),\'Year\')]/../../..//input');

        await day.fill(values[0]);
        await month.fill(values[1]);
        await year.fill(values[2]);
        break;
      default:
        throw new Error(`${field} not configured`);
    }
  }
}

module.exports = SpecificAccessDuration;
