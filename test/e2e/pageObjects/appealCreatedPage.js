BasePage = require('./basePage');
Button = require('./webdriver-components/button.js');


class AppealCreatedPage extends BasePage{

  constructor() {
    super();
    this.header = '.page .heading-h1';
    this.submitButton = new Button('button[type=submit]');
    this.previousButton = new Button('button[type=submit]');
    this.cancelButton = new Button('button[type=submit]');
    this.eventSummary = 'field-trigger-summary';
    this.eventDescription = 'field-trigger-description';


  }


  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextField(value){
    await this.eventSummary.enterText(value);
  }

  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextField(value){
    await this.eventDescription.enterText(value);
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
