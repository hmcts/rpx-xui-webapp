const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');
const { $, currentUrl, isPresent } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');
const RuntimeTestData = require('../../support/runtimeTestData');
Button = require('./webdriver-components/button.js');
Dropdown = require('./webdriver-components/dropdown.js');

class SearchPage {
  constructor() {}

  get header() {
    return $('#content h1');
  }

  get jurisdiction() {
    return $('#s-jurisdiction');
  }

  get searchFilterContainer() {
    return $('ccd-search-filters form, ccd-workbasket-filters form');
  }

  get caseType() {
    return $('#s-case-type');
  }

  get applyButton() {
    return $('ccd-search-filters button:not(.button-secondary), ccd-workbasket-filters button:not(.button-secondary)');
  }

  get resetButton() {
    return $('#reset');
  }

  get caseReference() {
    return $('#\\[CASE_REFERENCE\\]');
  }

  get sccaseNumber() {
    return $('#caseReference');
  }

  get appellantNINO() {
    return $('#generatedNino');
  }

  get appellantSurname() {
    return $('#generatedSurname');
  }

  get appellantEmailAddress() {
    return $('#generatedEmail');
  }

  get appellantMobileNumber() {
    return $('#generatedMobile');
  }

  get appellantDOBDay() {
    return $('#generatedDOB-day');
  }

  get appellantDOBMonth() {
    return $('#generatedDOB-month');
  }

  get appellantDOBYear() {
    return $('#generatedDOB-year');
  }

  get regionCenter() {
    return $('#region');
  }

  get evidencePresentYes() {
    return $('#evidencePresent-Yes');
  }

  get evidencePresentNo() {
    return $('#evidencePresent-No');
  }

  get isCORDecisionYes() {
    return $('#isCorDecision-Yes');
  }

  get isCORDecisionNo() {
    return $('#isCorDecision-No');
  }

  get documentsSentToDWPYes() {
    return $('#documentSentToDwp-Yes');
  }

  get documentsSentToDWPNo() {
    return $('#documentSentToDwp-No');
  }

  get searchResultsTopPagination() {
    return $('ccd-search-result .pagination-top');
  }

  get noResultsNotification() {
    return $('ccd-search-result .notification');
  }

  get searchResultComponent() {
    return $('.search-block');
  }

  get firstResultCaseLink() {
    return $('ccd-search-result>table>tbody>tr:nth-of-type(2)>td:nth-of-type(1)>a');
  }

  get secondResultCaseLink() {
    return $('ccd-search-result>table>tbody>tr:nth-of-type(2)>td:nth-of-type(1)>a');
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

    const options = await this.jurisdiction.getSelectOptions();
    const option = options.find((opt) => opt.includes(jurisdiction));
    await this.jurisdiction.selectOption({ label: option });

    CucumberReportLogger.LogTestDataInput('Search  page Jurisdiction : ');

    RuntimeTestData.searchCasesInputs.jurisdiction = jurisdiction;
    RuntimeTestData.searchCasesInputs.casetypes = await this.caseType.getSelectOptions();
  }

  async selectCaseType(option){
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.caseType);
    // await this.caseType.selectWithLabelContains(option);
    const options = await this.caseType.getSelectOptions();
    const optionToSelect = options.find((opt) => opt.includes(option));

    await this.caseType.select(optionToSelect);
    // await optionElement.click();
    CucumberReportLogger.LogTestDataInput(`Search  page case type : ${option}`);
  }

  async clickApplyButton() {
    // await browser.executeScript('arguments[0].scrollIntoView()',
    // this.applyButton);
    // expect(await this.applyButton.isEnabled(),"Apply buttin is not enabled").to.be.true
    await this.applyButton.click();
  }

  async clickResetButton() {
    await BrowserWaits.retryWithActionCallback(async () => {
      // await this._waitForSearchComponent();
      await BrowserWaits.waitForSpinnerToDissappear();
      await BrowserWaits.waitForElement(this.resetButton);
      // await browser.executeScript('arguments[0].scrollIntoView()',
      // this.resetButton);
      await this.resetButton.click();
    });
  }

  async openFirstCaseInResults(){
    await isPresent(this.searchResultsTopPagination);
    await BrowserWaits.waitForElement(this.firstResultCaseLink);
    const thisPageUrl = await currentUrl();

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();
      // await browser.executeScript('arguments[0].scrollIntoView()',
      //   this.firstResultCaseLink);
      await this.firstResultCaseLink.click();
    });

    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async openSecondCaseInResults(){
    await isPresent(this.searchResultsTopPagination);
    await BrowserWaits.waitForElement(this.secondResultCaseLink);
    const thisPageUrl = await currentUrl();

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();
      await this.secondResultCaseLink.click();
    });

    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async getPageHeader(){
    return await $(this.header).textContent();
  }

  async amOnPage(){
    await this._waitForSearchComponent();
    const header = await this.getPageHeader();
    console.log('Header test : '+header);
    return header === 'Search';
  }

  async hasSearchReturnedResults(){
    return await isPresent(this.searchResultsTopPagination);
  }

  async waitForAtleastOneSearchResult(){
    await BrowserWaits.waitForElement(this.searchResultsTopPagination);
  }

  async waitForSearchWithNoResults(){
    await BrowserWaits.waitForElement(this.noResultsNotification);
  }
}
module.exports = SearchPage;
