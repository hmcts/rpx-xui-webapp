Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');
Dropdown = require('./webdriver-components/dropdown.js');

class ApplyForProbatePage {

  constructor() {
    this.header = '#content h1';
    this.saveandContinueButton = new Button('button[type=submit]');

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }


  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Apply for probate'
  }

  async clickOnSaveAndContinue() {

    await this.saveandContinueButton.click();
  }

}
module.exports = ApplyForProbatePage;
