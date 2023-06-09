Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');

class AppealCreatedPage{

  constructor() {
    this.header = '.page .heading-h1';
    this.submitButton = new Button('button[type=submit]');
    this.previousButton = new Button('button[type=button]');
    this.cancelButton = new Button('.cancel a');
    this.eventSummary = element(by.css("#field-trigger-summary"));
    this.eventDescription = element(by.css("#field-trigger-description"));

  }
  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEvent(value){
    await this.eventSummary.sendKeys(value);
    //await this.password.sendKeys(password);
  }

  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEventDes(value){
    await this.eventDescription.sendKeys(value);
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
