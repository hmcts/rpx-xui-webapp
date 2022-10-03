const BrowserWaits = require('../../../support/customWaits');
// const TaskMessageBanner = require("./messageBanner");
const RuntimeTestData = require('../../../support/runtimeTestData');
const CucumberReportLogger = require('../../../support/reportLogger');
class hearingPage{

  constructor(){
    this.caselistComponent = $('.case-list-component');

    this.jurisdictionSelectElement = $("#wb-jurisdiction");
    this.caseTypeSelectElement = $("#wb-case-type");
    this.stateSelectElement = $("#wb-case-state");

    this.caseListRegion = $("#region");
    this.caseBenefitCode = $("#benefitCode");
    this.caseIssueCode = $("#issueCode");
    this.caseLinkSSCS = element(by.xpath('//*[@id="search-result"]/ccd-search-result/table/tbody/tr[2]/td[1]/a/ccd-field-read/div/ccd-field-read-label/div/ng-component/span'));
    this.headerTab= $("body > exui-root > exui-case-home > div > exui-case-details-home > exui-case-viewer-container > ccd-case-viewer > div > ccd-case-full-access-view > div:nth-child(4) > div > mat-tab-group > mat-tab-header > div.mat-tab-header-pagination.mat-tab-header-pagination-after.mat-elevation-z4.mat-ripple");
    this.requestHearingButton= element(by.xpath('//body/exui-root[1]/exui-case-home[1]/div[1]/exui-case-details-home[1]/exui-case-viewer-container[1]/ccd-case-viewer[1]/div[1]/ccd-case-full-access-view[1]/div[2]/div[1]/exui-case-hearings[1]/div[1]/a[1]'));

    this.currentUpcomingText= element(by.xpath('/html/body/exui-root/exui-case-home/div/exui-case-details-home/exui-case-viewer-container/ccd-case-viewer/div/ccd-case-full-access-view/div[2]/div/exui-case-hearings/div/exui-case-hearings-list[1]/table/thead/tr/th[1]'));
    this.hearingsTab = element(by.xpath('//*[@id="mat-tab-label-0-12"]'));

   // this.hearingsContinue = element(by.xpath('//button[contains(text(),\'Continue\')]'));
    this.hearingsContinue = $("#content > button");

    this.hearingsHeading1 = element(by.xpath('//h1[contains(text(),\'Do you require any additional facilities?\')]'));
    this.hearingsHeadingAttendance = element(by.xpath('//h1[contains(text(),\'How will each participant attend the hearing?\')]'));
    this.hearingsHeading2 = element(by.xpath('//input[@id=\'BBA3-SUB\']'));
    this.hearingAttendance = element(by.xpath('//option[contains(text(),\'In Person\')]'));
    this.hearingsHeading3 = element(by.xpath('//a[contains(text(),\'CARDIFF SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL\')]'));
    this.hearingsHeading4 = element(by.xpath('//h1[contains(text(),\'Does this hearing need to be in Welsh?\')]'));
    this.hearingsHeading5 = element(by.xpath('//h1[contains(text(),\'Do you want a specific judge?\')]'));

    this.specificJudge = $("#specificJudgeName");
    this.enterJudgeName = element(by.xpath('//input[@id=\'inputSelectPerson\']'));
    this.selectJudge = element(by.xpath('//span[contains(text(),\'Pratik Patel (4923393EMP-@ejudiciary.net)\')]'));


    this.searchApplyBtn = $("ccd-workbasket-filters form button:not(.button-secondary)");
    this.searchReset = $("ccd-workbasket-filters form button.button-secondary");

    this.searchFilterContainer = $("ccd-workbasket-filters form");

    this.searchResultsTopPagination = $("ccd-search-result .pagination-top");
    this.noResultsNotification = $("ccd-search-result .notification");

    this.ccdCaseSearchResult = $('ccd-search-result');
    this.caseListRows = $$("ccd-search-result>table>tbody>tr");

    //case list pagination navigation
    this.paginationInfotext = $(".pagination-top span");

    this.paginationControlsContainer = $(".ngx-pagination");
    this.previousPageLink = $(".ngx-pagination .pagination-previous a");
    this.nextPageLink = $(".ngx-pagination .pagination-next a");

    this.sortColumnsIconLinks = $$(".search-result-column-sort a.sort-widget");

    //Case list selection feature elements
    this.tableHeaderSelectAllInput = $("ccd-search-result #select-all");
    this.caseSelectionCheckboxes = $$("td .govuk-checkboxes__input");
    this.shareCaseButton = $("#btn-share-button");
    this.resetCaseSelectionLink = $("a.search-result-reset-link");

    //ccd-case-viewer
    this.ccdCaseViewer = $("ccd-case-viewer");

    this.loadingSpinner = $(".loading-spinner-in-action");

   // this.taskInfoMessageBanner = new TaskMessageBanner(".case-list-component");

  }




  async amOnPage(){
    await BrowserWaits.waitForElement(this.caselistComponent);
    await BrowserWaits.waitForElement(this.searchFilterContainer);
    return await this.caselistComponent.isPresent();
  }

  async _waitForSearchComponent(){
    await BrowserWaits.waitForElement(this.searchFilterContainer);
    await BrowserWaits.waitForSpinnerToDissappear();
  }

  _getOptionSelectorWithText(optionText){
    let elementLocator = null;
    if (optionText.includes('|')){
      const options = optionText.split('|');
      let locatorString = "//option[";
      let i = 0;
      for (const option of options){
        if( i === 0){
          locatorString += `contains(text(), '${option.trim()}')`;
        }else{
          locatorString += `or contains(text(), '${option.trim()}')`;
        }
        i++;
      }
      elementLocator = by.xpath(locatorString +']');

    }else{
      elementLocator = by.xpath("//option[text() = '" + optionText + "']");
    }

    return elementLocator
  }

  async selectJurisdiction(jurisdiction){
    await BrowserWaits.waitForSeconds(1);
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list page Jurisdiction : ${jurisdiction}`);

    await this.jurisdictionSelectElement.element(this._getOptionSelectorWithText(jurisdiction)).click();

    RuntimeTestData.workbasketInputs.jurisdiction = jurisdiction;
    const caseTypeElements = this.caseTypeSelectElement.$$("option");
    const caseTypesSize = await caseTypeElements.count();
    RuntimeTestData.workbasketInputs.casetypes = [];
    for (let i = 0; i < caseTypesSize; i++){
      const option = await caseTypeElements.get(i);
      const optionText = await option.getText();
      RuntimeTestData.workbasketInputs.casetypes.push(optionText);

    }
  }

  // async selectCaseType(caseType) {
  //   await BrowserWaits.waitForSeconds(1);
  //   await BrowserWaits.waitForSpinnerToDissappear();
  //   await this._waitForSearchComponent();
  //   CucumberReportLogger.LogTestDataInput(`Case list page Case type : ${caseType}`);
  //   await this.caseTypeSelectElement.element(this._getOptionSelectorWithText(caseType)).click();
  //   CucumberReportLogger.LogTestDataInput(`Case list page Case type : ${caseType}`);
  //   RuntimeTestData.workbasketInputs.casetype = caseType;
  //
  // }

  async enterRegion(region, benefit, issue) {
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list region: ${region}`);

    await this.caseListRegion.sendKeys(region);
  }

  async enterBenefitCode(benefit) {
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list benefit: ${benefit}`);

    await this.caseBenefitCode.sendKeys(benefit);
  }

  async enterIssueCode(issue) {
    await BrowserWaits.waitForSpinnerToDissappear();
    await this._waitForSearchComponent();
    CucumberReportLogger.LogTestDataInput(`Case list issue code: ${issue}`);
    await this.caseIssueCode.sendKeys(issue);
  }

  async clickSearchApplyBtn(){
    await BrowserWaits.retryWithActionCallback(async () => {
      await this._waitForSearchComponent();
    await BrowserWaits.waitForSpinnerToDissappear();
    await browser.executeScript('arguments[0].scrollIntoView()',
      this.searchApplyBtn);
    await BrowserWaits.waitForElementClickable(this.searchApplyBtn);
    CucumberReportLogger.AddMessage("Clicking Apply in case list Work basket filter.");
    await this.searchApplyBtn.click();
  });
  }

  async clickSearchResetBtn() {

    await this._waitForSearchComponent();
    await browser.executeScript('arguments[0].scrollIntoView()',
      this.searchReset);
    await this.searchReset.click();
    await this.caseLinkSSCS.click();

  }

  async waitForCaseResultsToDisplay(){
    await BrowserWaits.waitForElement(this.searchResultsTopPagination);
    await CucumberReportLogger.AddMessage("starting wait for 2 sec for list to render  : " + new Date().toTimeString());
    await BrowserWaits.waitForSeconds(2);
    await  CucumberReportLogger.AddMessage("wait complete : " + new Date().toTimeString());

  }

  async waitForNoCaseResultsToDisplay() {
    await BrowserWaits.waitForElement(this.noResultsNotification);
  }

  async hasCaseListAnyResults(){
    await this.searchResultsTopPagination.isPresent();
  }

  async clickFirstCaseLink(){
    let currentPageUrl = await browser.getCurrentUrl();
    await CucumberReportLogger.AddMessage(` Before navigation :   ${currentPageUrl}`);

    await BrowserWaits.waitForElement(this.ccdCaseSearchResult);
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear();
    await this.caseListRows.get(0).$("td a").click();
    await BrowserWaits.waitForPageNavigation(currentPageUrl);
  });


    await CucumberReportLogger.AddMessage(` After navigation :   ${await browser.getCurrentUrl()}`);

  }

  async getCountOfCasesListedInPage(){
    return await this.caseListRows.count();
  }

  async isSelectAllColumnDisplayed(){
    return await this.tableHeaderSelectAllInput.isPresent();
  }

  async isTextVisible(){
    return await this.currentUpcomingText.getText();

  }

  async isSelectCheckboxDisplayedForAllCases(){
    let casesInPage = await this.getCountOfCasesListedInPage();
    let countOfSelectCheckboxes = await this.caseSelectionCheckboxes.count();
    return casesInPage === countOfSelectCheckboxes;
  }

  async isSelectAllCheckboxSelected(){
    return await this.tableHeaderSelectAllInput.isSelected();
  }

  async clickSelectAll(){
    await this.tableHeaderSelectAllInput.click();
  }

  async isCaseSelectCheckboxSelected(rowNum){
    let checkBoxAtRowNum = await this.caseSelectionCheckboxes.get(rowNum - 1);
    // await BrowserWaits.waitForElement(checkBoxAtRowNum);
    return await checkBoxAtRowNum.isSelected();
  }

  async clickCaseSelectCheckBoxAtRow(rowNum){
    let checkBoxAtRowNum = await this.caseSelectionCheckboxes.get(rowNum - 1);
    await checkBoxAtRowNum.click();
  }

  async getCountOfCasesSelectedInPage() {
    let totalCasesInPage = await this.caseSelectionCheckboxes.count();
    let seledtedCaseCount = 0;
    for (let counter = 0; counter < totalCasesInPage; counter++){
      let checkBox = await this.caseSelectionCheckboxes.get(counter);
      if (await checkBox.isSelected()){
        seledtedCaseCount++;
      }
    }
    return seledtedCaseCount;
  }

  async clickPaginationNextPage(){
    let paginationInfobefore = await this.paginationInfotext.getText();
    expect(await this.nextPageLink.isPresent(), "Case list next page not present. current page info : " + paginationInfobefore).to.be.true

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.nextPageLink);
    await this.nextPageLink.click();
    await BrowserWaits.waitForCondition(async () => {
      let paginationInfoCurrent = await this.paginationInfotext.getText();
    return paginationInfobefore === paginationInfoCurrent;
  });
    await BrowserWaits.waitForElement(this.paginationControlsContainer, undefined, "Data load taking too long on pagination");
  }

  async clickPaginationPreviousPage() {
    let paginationInfobefore = await this.paginationInfotext.getText();
    expect(await this.previousPageLink.isPresent(), "Case list previous page not present. current page info : " + paginationInfobefore).to.be.true

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.previousPageLink);
    await this.previousPageLink.click();
    await BrowserWaits.waitForCondition(async () => {
      let paginationInfoCurrent = await this.paginationInfotext.getText();
    return paginationInfobefore === paginationInfoCurrent;
  });
    await BrowserWaits.waitForElement(this.paginationControlsContainer,undefined,"Data load taking too long on pagination");

  }

  async clickCaseLinkAtRow(rowNum){
    let caseRow = await this.caseListRows.get(rowNum - 1);
    await caseRow.$(".search-result-column-cell a").click();
    await BrowserWaits.waitForElement(this.ccdCaseViewer , undefined, "Case view page is not displayed");
  }

  async sortTableByColAt(colNum){
    (await this.sortColumnsIconLinks.get(colNum-1)).click();
    await browser.sleep(1000);
  }

  async clickShareCaseButton(){
    await this.shareCaseButton.click();
  }

}

module.exports = hearingPage;
