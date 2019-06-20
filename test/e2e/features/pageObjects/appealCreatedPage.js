BasePage = require('./basePage');
Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');

class AppealCreatedPage extends BasePage{

  constructor() {
    super();
    this.header = '.page .heading-h1';
    this.submitButton = new Button('button[type=submit]');
    this.previousButton = new Button('button[type=button]');
    this.cancelButton = new Button('.cancel a');
    this.eventSummary = '#field-trigger-summary';
    this.eventDescription = '#field-trigger-description';

  }
  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEvent(value){
    await this.eventSummary.enterText(value);
  }

  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEventDes(value){
    await this.eventDescription.enterText(value);
  }

  /**
   * Final button to cancel the case/event
   * @returns {Promise<void>}
   */
  async clickCancelButton(){
    await this.cancelButton.click();
  }

  /**
   * Final button to previous the case/event
   * @returns {Promise<void>}
   */
  async clickPreviousButton(){
    await this.previousButton.click();
  }


  async getPageHeader(){
    return await $(this.header).getText();
  }

  async submitCase() {
    await this.submitButton.click();
  }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Appeal created'
  }

}

module.exports = AppealCreatedPage;
