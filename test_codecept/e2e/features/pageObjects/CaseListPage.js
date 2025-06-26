const { $, $$ } = require('../../../helpers/globals');

const BrowserWaits = require('../../support/customWaits');
const TaskMessageBanner = require('./messageBanner');
const RuntimeTestData = require('../../support/runtimeTestData');
const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');
const { LOG_LEVELS } = require('../../support/constants');
class CaseListPage{
  constructor() {
    this.taskInfoMessageBanner = new TaskMessageBanner('.case-list-component');
  }

  get caselistComponent() {
    return $('.case-list-component');
  }

  get jurisdictionSelectElement() {
    return $('#wb-jurisdiction');
  }

  get caseTypeSelectElement() {
    return $('#wb-case-type');
  }

  get stateSelectElement() {
    return $('#wb-case-state');
  }

  get searchApplyBtn() {
    return $('ccd-workbasket-filters form button:not(.button-secondary)');
  }

  get searchReset() {
    return $('ccd-workbasket-filters form button.button-secondary');
  }

  get searchFilterContainer() {
    return $('ccd-workbasket-filters form');
  }

  get searchResultsTopPagination() {
    return $('ccd-search-result .pagination-top');
  }

  get noResultsNotification() {
    return $('ccd-search-result .notification');
  }

  get ccdCaseSearchResult() {
    return $('ccd-search-result');
  }

  get caseListRows() {
    return $$('ccd-search-result>table>tbody>tr');
  }

  // Pagination
  get paginationInfotext() {
    return $('.pagination-top span');
  }

  get paginationControlsContainer() {
    return $('.ngx-pagination');
  }

  get previousPageLink() {
    return $('.ngx-pagination .pagination-previous a');
  }

  get nextPageLink() {
    return $('.ngx-pagination .pagination-next a');
  }

  get sortColumnsIconLinks() {
    return $$('.search-result-column-sort a.sort-widget');
  }

  // Case selection
  get tableHeaderSelectAllInput() {
    return $('ccd-search-result #select-all');
  }

  get caseSelectionCheckboxes() {
    return $$('td .govuk-checkboxes__input');
  }

  get shareCaseButton() {
    return $('#btn-share-button');
  }

  get resetCaseSelectionLink() {
    return $('a.search-result-reset-link');
  }

  // Case viewer
  get ccdCaseViewer() {
    return $('ccd-case-viewer');
  }

  // Spinner
  get loadingSpinner() {
    return $('.loading-spinner-in-action');
  }

  async amOnPage(){
    await BrowserWaits.waitForElement(this.caselistComponent);
    await BrowserWaits.waitForElement(this.searchFilterContainer);

    return (await this.caselistComponent.isPresent());
  }

  async _waitForSearchComponent(){
    await BrowserWaits.waitForElement(this.searchFilterContainer);
    await BrowserWaits.waitForSpinnerToDissappear();
  }

  _getOptionSelectorWithText(optionText){
    let elementLocator = null;
    const options = optionText.split('|');
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
    elementLocator = by.xpath(locatorString + ']');

    return elementLocator;
  }

  async selectJurisdiction(jurisdiction){
    await BrowserWaits.waitForSeconds(1);
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list page Jurisdiction : ${jurisdiction}`);
    // const optionSelector = this._getOptionSelectorWithText(jurisdiction);

    const options = await this.jurisdictionSelectElement.getSelectOptions();
    const matchingOption = options.find((opt) => opt.includes(jurisdiction));

    // const optionText = await element(optionSelector).getText();
    await this.jurisdictionSelectElement.select(matchingOption);

    RuntimeTestData.workbasketInputs.jurisdiction = jurisdiction;
    RuntimeTestData.workbasketInputs.casetypes = [];
    RuntimeTestData.workbasketInputs.casetypes = await this.caseTypeSelectElement.getSelectOptions();
  }

  async selectCaseType(caseType) {
    await BrowserWaits.waitForSeconds(1);
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list page Case type : ${caseType}`);
    // const selectOption = element(this._getOptionSelectorWithText(caseType))

    const options = await this.caseTypeSelectElement.getSelectOptions();
    const matchingOption = options.find((opt) => opt.includes(caseType));

    // const selectOptionText = await selectOption.getText();
    await this.caseTypeSelectElement.select(matchingOption);
    CucumberReportLogger.LogTestDataInput(`Case list page Case type : ${caseType}`);
    RuntimeTestData.workbasketInputs.casetype = caseType;
  }

  async selectState(state) {
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list page event: ${state}`);

    const options = await this.stateSelectElement.getSelectOptions();
    const matchingOption = options.find((opt) => opt.includes(state));

    // const optionText = await  element(this._getOptionSelectorWithText(state)).getText()
    await this.stateSelectElement.select(matchingOption);
    RuntimeTestData.workbasketInputs.state = state;
  }

  async clickSearchApplyBtn(){
    await BrowserWaits.retryWithActionCallback(async () => {
      await this._waitForSearchComponent();
      await BrowserWaits.waitForSpinnerToDissappear();
      // await browser.executeScript('arguments[0].scrollIntoView()',
      //     this.searchApplyBtn);
      await BrowserWaits.waitForElementClickable(this.searchApplyBtn);
      CucumberReportLogger.AddMessage('Clicking Apply in case list Work basket filter.', LOG_LEVELS.Debug);
      await this.searchApplyBtn.click();
      await BrowserWaits.waitForSpinnerToDissappear();
    });
  }

  async clickSearchResetBtn() {
    await this._waitForSearchComponent();
    await browser.executeScript('arguments[0].scrollIntoView()',
      this.searchReset);
    await this.searchReset.click();
  }

  async waitForCaseResultsToDisplay(){
    await BrowserWaits.waitForElement(this.searchResultsTopPagination);
    await CucumberReportLogger.AddMessage('starting wait for 2 sec for list to render  : ' + new Date().toTimeString(), LOG_LEVELS.Debug);
    await BrowserWaits.waitForSeconds(2);
    await CucumberReportLogger.AddMessage('wait complete : ' + new Date().toTimeString(), LOG_LEVELS.Debug);
  }

  async waitForNoCaseResultsToDisplay() {
    await BrowserWaits.waitForElement(this.noResultsNotification);
  }

  async hasCaseListAnyResults(){
    await this.searchResultsTopPagination.isPresent();
  }

  async clickFirstCaseLink(){
    const currentPageUrl = await browser.getCurrentUrl();
    CucumberReportLogger.AddMessage(` Before navigation :   ${currentPageUrl}`);

    await BrowserWaits.waitForElement(this.ccdCaseSearchResult);
    let isNavigationSuccess = false;
    let retryAttemptsCounter = 0;
    while (retryAttemptsCounter <= 3 && !isNavigationSuccess){
      try {
        await this.caseListRows.get(0).$('td a').click();
        await BrowserWaits.waitForPageNavigation(currentPageUrl);
        isNavigationSuccess = true;
      } catch (err){
        retryAttemptsCounter++;
        CucumberReportLogger.AddMessage(`Error opening first case from case list. Retrying attempt ${retryAttemptsCounter} :   ${err}`);
      }
    }
    CucumberReportLogger.AddMessage(` After navigation :   ${await browser.getCurrentUrl()}`);
  }

  async getCountOfCasesListedInPage(){
    return await this.caseListRows.count();
  }

  async isSelectAllColumnDisplayed(){
    return await this.tableHeaderSelectAllInput.isPresent();
  }

  async isSelectCheckboxDisplayedForAllCases(){
    const casesInPage = await this.getCountOfCasesListedInPage();
    const countOfSelectCheckboxes = await this.caseSelectionCheckboxes.count();
    return casesInPage === countOfSelectCheckboxes;
  }

  async isSelectAllCheckboxSelected(){
    return await this.tableHeaderSelectAllInput.isSelected();
  }

  async clickSelectAll(){
    await this.tableHeaderSelectAllInput.click();
  }

  async isCaseSelectCheckboxSelected(rowNum){
    const checkBoxAtRowNum = await this.caseSelectionCheckboxes.get(rowNum - 1);
    // await BrowserWaits.waitForElement(checkBoxAtRowNum);
    return await checkBoxAtRowNum.isSelected();
  }

  async clickCaseSelectCheckBoxAtRow(rowNum){
    const checkBoxAtRowNum = await this.caseSelectionCheckboxes.get(rowNum - 1);
    await checkBoxAtRowNum.click();
  }

  async getCountOfCasesSelectedInPage() {
    const totalCasesInPage = await this.caseSelectionCheckboxes.count();
    let seledtedCaseCount = 0;
    for (let counter = 0; counter < totalCasesInPage; counter++){
      const checkBox = await this.caseSelectionCheckboxes.get(counter);
      if (await checkBox.isSelected()){
        seledtedCaseCount++;
      }
    }
    return seledtedCaseCount;
  }

  async clickPaginationNextPage(){
    const paginationInfobefore = await this.paginationInfotext.getText();
    expect(await this.nextPageLink.isPresent(), 'Case list next page not present. current page info : ' + paginationInfobefore).to.be.true;

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.nextPageLink);
    await this.nextPageLink.click();
    await BrowserWaits.waitForCondition(async () => {
      const paginationInfoCurrent = await this.paginationInfotext.getText();
      return paginationInfobefore === paginationInfoCurrent;
    });
    await BrowserWaits.waitForElement(this.paginationControlsContainer, undefined, 'Data load taking too long on pagination');
  }

  async clickPaginationPreviousPage() {
    const paginationInfobefore = await this.paginationInfotext.getText();
    expect(await this.previousPageLink.isPresent(), 'Case list previous page not present. current page info : ' + paginationInfobefore).to.be.true;

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.previousPageLink);
    await this.previousPageLink.click();
    await BrowserWaits.waitForCondition(async () => {
      const paginationInfoCurrent = await this.paginationInfotext.getText();
      return paginationInfobefore === paginationInfoCurrent;
    });
    await BrowserWaits.waitForElement(this.paginationControlsContainer, undefined, 'Data load taking too long on pagination');
  }

  async clickCaseLinkAtRow(rowNum){
    const caseRow = await this.caseListRows.get(rowNum - 1);
    await caseRow.$('.search-result-column-cell a').click();
    await BrowserWaits.waitForElement(this.ccdCaseViewer, undefined, 'Case view page is not displayed');
  }

  async sortTableByColAt(colNum){
    (await this.sortColumnsIconLinks.get(colNum-1)).click();
    await browser.sleep(1);
  }

  async clickShareCaseButton(){
    await this.shareCaseButton.click();
  }
}

module.exports = CaseListPage;
