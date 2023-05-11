Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');

class DivorcesPage {

  constructor() {
    this.header = '#content h1';
    this.continueButton = new Button('button[type=submit]');
    this.firmName =element(by.css("#solsSolicitorFirmName"));
    this.postCodeTextField = element(by.css("#solsSolicitorAddress_solsSolicitorAddress_postcodeInput"));
    //this.findAddress = new Button('#postcodeLookup > button');
    this.addressList = '#solsSolicitorAddress_solsSolicitorAddress_addressList';
    this.reference = element(by.css("#solsSolicitorAppReference"));
    this.emailAddress = element(by.css("#solsSolicitorEmail"));
    //this.saveandContinueButton = new Button('#content button:nth-child(2)');
    this.findAddress = new Button('button[type=button]');
    this.saveandContinueButton = new Button('button[type=submit]');

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async enterProbateValues() {
    await this.firmName.sendKeys('Rajesh');
    await this.postCodeTextField.sendKeys('SW20 0BX');
    await this.findAddress.click();
    await this.reference.sendKeys('Rajesh12345');
    await this.emailAddress.sendKeys('Rajesh1234@gmail.com');
  }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Apply for a divorce'
  }

  async clickOnSaveAndContinue() {
    await this.saveandContinueButton.click();
  }

}
module.exports = DivorcesPage;
