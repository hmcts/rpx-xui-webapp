const { $ } = require('../../../helpers/globals');
Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');

class FrUserPage {
  constructor() {
    this.header = '#content h1';
  }

  get continueButton() { return new Button('button[type=submit]'); }
  get firmName() { return $('#solsSolicitorFirmName'); }
  get postCodeTextField() { return $('#solsSolicitorAddress_solsSolicitorAddress_postcodeInput'); }
  get addressList() { return $('#solsSolicitorAddress_solsSolicitorAddress_addressList'); }
  get reference() { return $('#solsSolicitorAppReference'); }
  get emailAddress() { return $('#solsSolicitorEmail'); }
  get findAddress() { return new Button('button[type=button]'); }
  get saveandContinueButton() { return new Button('button[type=submit]'); }

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

  async amOnPage() {
    const header = await this.getPageHeader();
    return header === 'Consent Order Application';
  }
}
module.exports = FrUserPage;
