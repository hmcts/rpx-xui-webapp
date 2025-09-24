const { $ } = require('../../../helpers/globals');
Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');
Dropdown = require('./webdriver-components/dropdown.js');

class ProbatePage {
  constructor() {
    this.header = '#content h1';
  }

  get continueButton() { return new Button('button[type="submit"]'); }
  get saveandContinueButton() { return new Button('button[type="submit"]'); }

  get firmName() { return $('#solsSolicitorFirmName'); }

  get postCodeTextField() { return $('#solsSolicitorAddress_solsSolicitorAddress_postcodeInput'); }
  get addressList() { return $('#solsSolicitorAddress_solsSolicitorAddress_addressList'); }
  get selectanAddressDropdown() { return new Dropdown('#solsSolicitorAddress_solsSolicitorAddress_addressList'); }

  get reference() { return $('#solsSolicitorAppReference'); }
  get emailAddress() { return $('#solsSolicitorEmail'); }

  get findAddress() { return new Button('button[type="button"]'); }

  async getPageHeader() {
    return await $(this.header).textContent();
  }

  async enterProbateValues() {
    await this.firmName.fill('Rajesh');
    await this.postCodeTextField.fill('SW20 0BX');
    await this.findAddress.click();
    await this.reference.fill('Rajesh12345');
    await this.emailAddress.fill('Rajesh1234@gmail.com');
  }

  async enterFirmName(value) {
    await this.firmName.fill('Rajesh');
  }

  async enterPostCodeTextField(value) {
    await this.postCodeTextField.fill('SW20 0BX');
    await this.findAddress.click();
  }

  async enterReference(value) {
    await this.reference.fill('Rajesh12345');
  }

  async enterEmailAddress(value) {
    await this.emailAddress.fill('Rajesh1234@gmail.com');
  }

  async selectanAddress() {
    await this.selectanAddressDropdown.selectFromDropdownByIndex(3);
  }

  async amOnPage() {
    const header = await this.getPageHeader();
    return header === 'Apply for probate';
  }

  async clickOnSaveAndContinue() {
    await this.saveandContinueButton.click();
  }
}
module.exports = ProbatePage;
