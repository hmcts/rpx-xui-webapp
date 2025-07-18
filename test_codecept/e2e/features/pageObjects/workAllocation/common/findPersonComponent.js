const { $, elementByXpath, getText, isPresent } = require('../../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../../support/constants');
const BrowserWaits = require('../../../../support/customWaits');
const CucumberReporter = require('../../../../../codeceptCommon/reportLogger');

class FindPersonComponent {
  get findPersonContainer() { return $('xuilib-find-person'); }
  get header() { return $('xuilib-find-person h1'); }
  get headerCaption() { return $('xuilib-find-person h1 span'); }

  get searchInput() { return $('xuilib-find-person #inputSelectPerson'); }
  get searchInputHintText() { return $('xuilib-find-person .govuk-hint'); }
  get searchResultsContainer() { return $('.cdk-overlay-container .mat-autocomplete-visible'); }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.findPersonContainer);
      return true;
    } catch (err) {
      CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
      return false;
    }
  }

  async isDisplayed() {
    return await this.amOnPage();
  }

  async validatePage() {
    const heaerText = await getText(this.header);
    const inputHintText = await getText(this.searchInputHintText);
    expect(heaerText.includes('Find the person')).to.be.true;
    expect(inputHintText.includes('Type the name of the person and select them.')).to.be.true;
  }

  async getHeaderText() {
    expect(await this.amOnPage(), 'Not on find person page').to.be.true;
    return await getText(this.header);
  }

  async getHeaderCaption() {
    return await getText(this.headerCaption);
  }

  async inputSearchTerm(searchTerm) {
    await this.amOnPage();
    await BrowserWaits.waitForElementClickable(this.searchInput, 5);
    await this.searchInput.clear();
    await this.searchInput.fill(searchTerm);
  }

  async isSearchResultSelectionContainerDisplayed() {
    try {
      await BrowserWaits.waitForConditionAsync(async () => await this.searchResultsContainer.isVisible(), 5000);
      return true;
    } catch (err) {
      CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
      return false;
    }
  }

  async getPersonsReturned() {
    return await BrowserWaits.retryWithActionCallback(async () => {
      const results = this.searchResultsContainer.locator('.mat-option-text');
      const resultCount = await results.count();
      const resulttexts = [];
      for (let i = 0; i < resultCount; i++) {
        const resultItem = await results.nth(i);
        resulttexts.push(await getText(resultItem));
      }
      return resulttexts;
    });
  }

  async getResultElementWithText(resulttext) {
    const elementWithResulst = elementByXpath('//*[contains(@class,\'cdk-overlay-container\')]//*[contains(@class,\'mat-autocomplete-visible\')]');
    await elementWithResulst.waitFor({ state: 'visible' });
    CucumberReporter.AddMessage(await getText(elementWithResulst), LOG_LEVELS.Debug);
    return elementByXpath(`//*[contains(@class,'cdk-overlay-container')]//*[contains(@class,'mat-autocomplete-visible')]//mat-option//*[contains(@class,'mat-option-text') and contains(text(),'${resulttext}')]`);
  }

  async isPersonReturned(result) {
    CucumberReporter.AddMessage(`Checking is person returned "${result}"`, LOG_LEVELS.Debug);

    const resultElement = await this.getResultElementWithText(result);
    return await isPresent(resultElement) && resultElement.isVisible();
  }

  async selectPerson(result) {
    const resultElement = await this.getResultElementWithText(result);
    CucumberReporter.AddMessage(` Select person "${result}"`, LOG_LEVELS.Debug);
    await resultElement.waitFor({ state: 'visible' });
    expect(await this.isPersonReturned(result), `Result is not found "${result}"`).to.be.true;
    await resultElement.click();
  }

  async isPersonSelected(personText) {
    const searchInputvalue = await this.searchInput.getAttribute('value');
    return searchInputvalue.includes(personText);
  }
}

module.exports = FindPersonComponent;
