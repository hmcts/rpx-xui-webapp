const { $, elementByXpath, getText } = require('../../../../helpers/globals');
const reportLogger = require('../../../../codeceptCommon/reportLogger');

class ReviewDetailsPage {

  get container() {
    return $('ccd-case-edit-submit');
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async clickChangeLinkForField(field) {
    const fieldLocators = this.getRowElementLocators(field);
    const changeLinkForField = elementByXpath(fieldLocators.changeLinkElement);
    await changeLinkForField.click();
  }

  getRowElementLocators(field) {
    let nameELement = null;
    let valueElement = null;
    let changeLinkElement = null;

    switch (field) {
      case 'special fields':

        break;
      default:
        nameELement = `//div[contains(@class,'govuk-summary-list')]//dt[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]`;
        valueElement = `//div[contains(@class,'govuk-summary-list')]//dt[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]/../dd[contains(@class,'govuk-summary-list__value')]`;
        changeLinkElement = `//div[contains(@class,'govuk-summary-list')]` +
          `//dt[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]` +
          `/../dd[contains(@class,'govuk-summary-list__actions')]/a` +
          ` | ` +
          `//div[contains(@class,'govuk-summary-list')]` +
          `//dt[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]` +
          `/../dd[contains(@class,'govuk-summary-list__actions')]/button`;
    }

    return {
      nameElement: nameELement,
      valueElement: valueElement,
      changeLinkElement: changeLinkElement
    };
  }

  async validateSummaryFieldWithValueDisplayed(field, value, isChangeLinkDisplayed) {
    const fieldLevelLocators = this.getRowElementLocators(field);
    await reportLogger.AddMessage(`${JSON.stringify(fieldLevelLocators, null, 2)}`);
    expect(await elementByXpath(fieldLevelLocators.nameElement).first().isVisible(), `field ${field} not displayed`).to.be.true;
    const valuesList = value.split(',');
    for (const val of valuesList) {
      expect(await getText(elementByXpath(fieldLevelLocators.valueElement).first()), `field ${field} value ${val} not included`).includes(val.trim());
    }

    expect(await elementByXpath(fieldLevelLocators.changeLinkElement).first()).isVisible().to.equal(isChangeLinkDisplayed);
  }

  async validateSummaryFieldNotDisplayed(field) {
    const fieldLevelLocators = this.getRowElementLocators(field);
    await reportLogger.AddMessage(`${JSON.stringify(fieldLevelLocators, null, 2)}`);
    expect(await elementByXpath(fieldLevelLocators.nameElement).first().isVisible(), `field ${field} is displayed`).to.be.false;
  }
}

module.exports = new ReviewDetailsPage();
