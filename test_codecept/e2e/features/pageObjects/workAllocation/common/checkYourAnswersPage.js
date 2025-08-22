const { $, elementByXpath, getText, isPresent } = require('../../../../../helpers/globals');
const BrowserWaits = require('../../../../support/customWaits');

class CheckYourAnswersPage {

  get container() { return $('exui-answers'); }
  get header() { return this.container.locator('h1'); }
  get headerCaption() { return this.header.locator('span'); }

  get hintText() { return this.container.locator('.govuk-hint'); }
  get summaryListContainer() { return this.container.locator('.govuk-summary-list'); }
  get questionRows() { return this.container.locator('.govuk-summary-list__row'); }

  get submitButton() { return $('.govuk-button-group button'); }
  get cancelLink() { return $('.govuk-button-group p>a'); }

  async waitForPage() {
    await BrowserWaits.waitForElement(this.container);
  }

  async getTotalQuestionsCount() {
    return await this.questionRows.count();
  }

  async isSubmitButtonWithLabelPresent(label) {
    return await isPresent(this.getSubmitButtonElementWithLabel(label));
  }

  async clickSubmitButtonWithLabel(label) {
    await this.getSubmitButtonElementWithLabel(label).click();
  }

  async clickCancelLink() {
    await elementByXpath('//div[contains(@class,\'govuk-button-group\')]//p/a[contains(text(),\'Cancel\')]').click();
  }

  getSubmitButtonElementWithLabel(label) {
    return elementByXpath(`//div[contains(@class,'govuk-button-group')]//button[contains(text(),'${label}')]`);
  }

  async isDisplayed() {
    return await this.container.isVisible();
  }

  async getHeaderText() {
    await BrowserWaits.waitForElement(this.container);
    return await getText(this.header);
  }

  async getHeaderCaption() {
    await BrowserWaits.waitForElement(this.container);
    return await getText(this.headerCaption);
  }

  async getHintText() {
    await BrowserWaits.waitForElement(this.container);
    return await getText(this.hintText);
  }

  async isSummayListPresent() {
    await BrowserWaits.waitForElement(this.container);
    return await isPresent(this.summaryListContainer);
  }

  async isQuestionRowPresent(question) {
    await BrowserWaits.waitForElement(this.container);

    const rowWithQuestion = this.getRowElementWithQuestion(question);
    return await isPresent(rowWithQuestion);
  }

  async getAnswerForQuestion(question) {
    await BrowserWaits.waitForElement(this.container);

    const rowWithQuestion = this.getRowElementWithQuestion(question);
    if (!(await isPresent(rowWithQuestion))) {
      throw new Error('Question is now found in page');
    }
    const answer = await getText(rowWithQuestion.locator('.govuk-summary-list__value'));
    return answer;
  }

  async isChangeLinkPresentForQuestion(question) {
    await BrowserWaits.waitForElement(this.container);

    const rowWithQuestion = this.getRowElementWithQuestion(question);
    if (!(await isPresent(rowWithQuestion))) {
      throw new Error('Question is now found in page');
    }
    return await isPresent(rowWithQuestion.locator('.govuk-summary-list__actions a'));
  }

  async clickChangeForQuestion(question) {
    await BrowserWaits.waitForElement(this.container);

    const rowWithQuestion = this.getRowElementWithQuestion(question);
    if (!(await isPresent(rowWithQuestion))) {
      throw new Error('Question is now found in page');
    }
    await rowWithQuestion.locator('.govuk-summary-list__actions a').click();
  }

  getRowElementWithQuestion(question) {
    return this.summaryListContainer.locator(`//*[contains(@class,'govuk-summary-list__row')]//dt[contains(@class,'govuk-summary-list__key') and contains(text(),"${question}")]//ancestor::div[contains(@class,'govuk-summary-list__row')]`);
  }
}

module.exports = new CheckYourAnswersPage();
