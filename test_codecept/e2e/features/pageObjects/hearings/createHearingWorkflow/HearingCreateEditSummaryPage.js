const { $, elementByXpath, getText } = require('../../../../../helpers/globals');

class HearingCreateEditSummaryPage {
  get pageContainer() {
    return $('exui-hearing-create-edit-summary');
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async clickChangeLinkForField(field){
    const fieldLocators = this.getRowElementLocators(field);
    const changeLinkForField = elementByXpath(fieldLocators.changeLinkElement);
    await changeLinkForField.click();
  }

  getRowElementLocators(field){
    return {
      nameElement: `//div[contains(@class,'govuk-summary-list')]//div[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]`,
      valueElement: `//div[contains(@class,'govuk-summary-list')]//div[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]/../div[contains(@class,'govuk-summary-list__value')]/div`,
      changeLinkElement: `//div[contains(@class,'govuk-summary-list')]//div[contains(@class,'govuk-summary-list__key')][contains(text(),'${field}')]/../div[contains(@class,'govuk-summary-list__actions')]/a`
    };
  }

  async validateSummaryFieldWithValueDisplayed(section, field, value){
    const fieldLevelLocators = this.getRowElementLocators(field);

    const sectionElementLocator = `//exui-hearing-summary//h2[contains(text(),'${section}')]`;

    expect(await elementByXpath(fieldLevelLocators.nameElement).first().isVisible(), `field ${field} not displayed`).to.be.true;
    const valuesList = value.split(',');
    for (const val of valuesList){
      expect(await getText(elementByXpath(fieldLevelLocators.valueElement).first()), `field ${field} value ${val} not included`).includes(val.trim());
    }

    if (section.trim() !== '') {
      expect(await elementByXpath(sectionElementLocator).isVisible(), `hearing section ${section} not displayed`).to.be.true;
      expect(await elementByXpath(fieldLevelLocators.changeLinkElement).first().isVisible(), `hearing field ${field} change link not displayed`).to.be.true;
    } else {
      expect(await elementByXpath(fieldLevelLocators.changeLinkElement).first().isVisible(), `case field ${field} change link displayed`).to.be.false;
    }
  }
}

module.exports = HearingCreateEditSummaryPage;

