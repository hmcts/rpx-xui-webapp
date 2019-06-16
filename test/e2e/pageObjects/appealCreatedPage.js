BasePage = require('./basePage');
Button = require('./webdriver-components/button.js');


class AppealCreatedPage extends BasePage{

  constructor() {
    super();
    this.header = '.page .heading-h1';
    this.submitButton = new Button('button[type=submit]');

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
