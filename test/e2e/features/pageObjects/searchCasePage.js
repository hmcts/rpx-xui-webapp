Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')

class SearchCasePage extends BasePage{

  constructor(){
    super();
    this.header = '#content > div > h1';
    this._jurisdiction = new Dropdown('#cc-jurisdiction');
    this._caseType = new Dropdown('#cc-case-type');
    this._submitButton = new Button('#content > div > div > exui-ccd-connector > ccd-create-case-filters > form > button');
  }

  /**
   * Select a Jurisdiction from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectJurisdiction(option){
    await this._jurisdiction.selectFromDropdownByText(option);
  }

  /**
   * Select Case Type from the dropdown
   * @param option to select - case insensitive
   * @returns {Promise<void>}
   */
  async selectCaseType(option){
    await this._caseType.selectFromDropdownByText(option);
  }

  /**
   * Click Start button to submit options and start a new case
   * @returns {Promise<CreateCaseWizardPage|*>}
   */
  async clickStartButton() {
    await this._submitButton.waitForElementToBeClickable();
    await this._submitButton.click();

    //await $(this._submitButton).click();
    //await browser.waitForAngular;
    //return new CreateCaseWizardPage;
  }
  async getPageHeader(){
    return await $(this.header).getText();
  }

  /**
   * Check we are on CreateCaseStartPage by checking the page header is as expected
   * @returns Boolean
   */
  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Search'
  }

}

module.exports = SearchCasePage;
