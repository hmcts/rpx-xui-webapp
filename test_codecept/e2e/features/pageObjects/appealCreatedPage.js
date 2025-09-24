const { $, elementByCss } = require('../../../helpers/globals');
Button = require('./webdriver-components/button.js');
TextField = require('./webdriver-components/textField.js');

class AppealCreatedPage {
  get header() { return elementByCss('.page .heading-h1'); }

  get submitButton() { return new Button('button[type=submit]'); }

  get previousButton() { return new Button('button[type=button]'); }

  get cancelButton() { return new Button('.cancel a'); }

  get eventSummary() { return elementByCss('#field-trigger-summary'); }

  get eventDescription() { return elementByCss('#field-trigger-description'); }

  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEvent(value) {
    await this.eventSummary.fill(value);
    //await this.password.sendKeys(password);
  }

  /**
   * Enter random text into the Text field
   * @returns EUIStringField Object
   */
  async enterIntoTextFieldEventDes(value) {
    await this.eventDescription.fill(value);
  }

  /**
   * Final button to cancel the case/event
   * @returns {Promise<void>}
   */
  async clickCancelButton() {
    await this.cancelButton.click();
  }

  /**
   * Final button to previous the case/event
   * @returns {Promise<void>}
   */
  async clickPreviousButton() {
    await this.previousButton.click();
  }

  async getPageHeader() {
    return await $(this.header).textContent();
  }

  async submitCase() {
    await this.submitButton.click();
  }

  async amOnPage() {
    const header = await this.getPageHeader();
    return header === 'Appeal created';
  }
}

module.exports = AppealCreatedPage;
