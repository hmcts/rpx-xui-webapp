const { $, elementByXpath } = require('../../../../helpers/globals');

class SearchLanguageInterpreterPage {

  get container() {
    return $('ccd-search-language-interpreter');
  }

  get fieldMapping() {
    return {
      'Language Interpreter': elementByXpath('//ccd-search-language-interpreter//label[contains(text(),\'Language Interpreter\')]/../..//div[contains(@class,\'auto-complete-container\')]//input'),
      'Enter the language manually': elementByXpath('//label[contains(text(),\'Enter the language manually\')]/..//input'),
      'Enter the language': elementByXpath('//label[text()=\'Enter the language\']/..//input')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Language Interpreter':
        const searchInput = value.split(',');
        await this.fieldMapping[field].fill(searchInput[0].trim());
        await elementByXpath(`//mat-option//span[contains(text(),'${searchInput[1].trim()}')]`).click();
        break;
      case 'Enter the language manually':
        await this.fieldMapping[field].click();
        break;
      case 'Enter the language':
        await this.fieldMapping[field].fill(value);
        break;
      default:
        throw new Error(`${field} not configured in test pageObject`);
    }
  }
}
module.exports = SearchLanguageInterpreterPage;
