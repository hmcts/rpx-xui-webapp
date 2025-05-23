Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');
const BrowserWaits = require('../../support/customWaits');
const RuntimeTestData = require('../../support/runtimeTestData');
const CucumberReportLogger = require('../../support/reportLogger');
const headerPage = require('./headerPage');
class SearchPage {
  constructor(){
    this.header = '#content h1';
    this.jurisdiction = $('#s-jurisdiction');
    this.searchFilterContainer = $('ccd-search-filters form,ccd-workbasket-filters form');
    this.caseType = $('#s-case-type');
    this.applyButton = $('ccd-search-filters button:not(.button-secondary),ccd-workbasket-filters button:not(.button-secondary)');
    this.resetButton = $('#reset');
    this.caseReference='#\\[CASE_REFERENCE\\]';
    this.sccaseNumber='#caseReference';
    this.appellantNINO='#generatedNino';
    this.appellantSurname='#generatedSurname';
    this.appellantEmailAddress='#generatedEmail';
    this.appellantMobileNumber='#generatedMobile';
    this.appellantDOBDay='#generatedDOB-day';
    this.appellantDOBMonth='#generatedDOB-month';
    this.appellantDOBYear='#generatedDOB-year';
    this.regionCenter='#region';
    this.evidencePresentYes='#evidencePresent-Yes';
    this.evidencePresentNo='#evidencePresent-No';
    this.isCORDecisionYes='#isCorDecision-Yes';
    this.isCORDecisionNo='#isCorDecision-No';
    this.documentsSentToDWPYes='#documentSentToDwp-Yes';
    this.documentsSentToDWPNo='#documentSentToDwp-No';

    this.searchResultsTopPagination = $('ccd-search-result .pagination-top');
    this.noResultsNotification = $('ccd-search-result .notification');
    this.searchResultComponent = $('.search-block');

    this.firstResultCaseLink = $('ccd-search-result>table>tbody>tr:nth-of-type(1)>td:nth-of-type(1)>a');
  }

  async _waitForSearchComponent() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.searchFilterContainer, 'search page filters display', 10);
    }, 'Wait for search page, search input form to display');
    await BrowserWaits.waitForSpinnerToDissappear();
  }

  async selectJurisdiction(jurisdiction){
    await this._waitForSearchComponent();

    await BrowserWaits.waitForElement(this.jurisdiction);

    const options = jurisdiction.split('|');
    let locatorString = '//option[';
    let i = 0;
    for (const option of options) {
      if (i === 0) {
        locatorString += `contains(text(), '${option.trim()}')`;
      } else {
        locatorString += `or contains(text(), '${option.trim()}')`;
      }
      i++;
    }
    const elementLocator = by.xpath(locatorString + ']');

    const optionElement = this.jurisdiction.element(elementLocator);
    await BrowserWaits.waitForElement(optionElement);

    await optionElement.click();

    CucumberReportLogger.LogTestDataInput('Search  page Jurisdiction : ');

    RuntimeTestData.searchCasesInputs.jurisdiction = jurisdiction;
    const caseTypeElements = this.caseType.$$('option');
    const caseTypesSize = await caseTypeElements.count();
    RuntimeTestData.searchCasesInputs.casetypes = [];
    for (let i = 0; i < caseTypesSize; i++) {
      const option = await caseTypeElements.get(i);
      const optionText = await option.getText();
      RuntimeTestData.searchCasesInputs.casetypes.push(optionText);
    }
  }

  async selectCaseType(option){
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.caseType);

    const optionElement = this.caseType.element(by.xpath('//*[text() = \'' + option + '\']'));
    await BrowserWaits.waitForElement(optionElement);

    await optionElement.click();
    CucumberReportLogger.LogTestDataInput(`Search  page case type : ${option}`);

    RuntimeTestData.searchCasesInputs.casetype = option;
  }

  async clickApplyButton() {
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.applyButton);
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.waitForElementClickable(this.applyButton);

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.applyButton);
    expect(await this.applyButton.isEnabled(), 'Apply buttin is not enabled').to.be.true;
    await this.applyButton.click();
  }

  async clickResetButton() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await this._waitForSearchComponent();
      await BrowserWaits.waitForSpinnerToDissappear();
      await BrowserWaits.waitForElement(this.resetButton);
      await browser.executeScript('arguments[0].scrollIntoView()',
        this.resetButton);
      await this.resetButton.click();
    });
  }

  async openFirstCaseInResults(){
    await this.searchResultsTopPagination.isPresent();
    await BrowserWaits.waitForElement(this.firstResultCaseLink);
    const thisPageUrl = await browser.getCurrentUrl();

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();
      await browser.executeScript('arguments[0].scrollIntoView()',
        this.firstResultCaseLink);
      await this.firstResultCaseLink.click();
    });

    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    await this._waitForSearchComponent();
    const header = await this.getPageHeader();
    console.log('Header test : '+header);
    return header === 'Search';
  }

  async hasSearchReturnedResults(){
    return await this.searchResultsTopPagination.isPresent();
  }

  async waitForAtleastOneSearchResult(){
    await BrowserWaits.waitForElement(this.searchResultsTopPagination);
  }

  async waitForSearchWithNoResults(){
    await BrowserWaits.waitForElement(this.noResultsNotification);
  }
}
module.exports = SearchPage;
