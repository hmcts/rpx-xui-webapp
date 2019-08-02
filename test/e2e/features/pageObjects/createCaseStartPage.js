Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')

class CreateCaseStartPage {

  constructor(){
    this.header = '#content h1';
    this._jurisdiction = new Dropdown('#cc-jurisdiction');
    this._caseType = new Dropdown('#cc-case-type');
    this._event = new Dropdown('#cc-event');
    this._submitButton = new Button('#content button');
  }

  async selectJurisdiction(option){
      await this._jurisdiction.selectFromDropdownByText(option);
  }

  async selectCaseType(option){
      await this._caseType.selectAnOption("Benefit");
  }

  async selectEvent(option){
      await this._event.selectFromDropdownByText(option);
  }

  async clickStartButton() {
    await this._submitButton.waitForElementToBeClickable();
    await this._submitButton.click();

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Create Case'
  }

}

module.exports = CreateCaseStartPage;
