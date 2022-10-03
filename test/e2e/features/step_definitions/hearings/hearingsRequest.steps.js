
var HearingsPage = require("../../pageObjects/hearings/hearingPage");
const CucumberReportLogger = require('../../../support/reportLogger');

const CaseListPage = require("../../pageObjects/caseListPage");
var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");
const BrowserWaits = require("../../../support/customWaits");
const headerPage = require("../../pageObjects/headerPage");
const browserUtil = require("../../../../ngIntegration/util/browserUtil");


defineSupportCode(function ({ And, But, Given, Then, When }) {
  var hearingsPage = new HearingsPage();
  var caseListPage = new CaseListPage ();

  When('I select a case and click on hearing Tab and see hearings Summary', async function () {
   // expect(await caseListPage.amOnPage()).to.be.true;
    browser.sleep(10000);
    await BrowserWaits.waitForSpinnerToDissappear();
    // await hearingsPage.caseLinkSSCS.click();
    // await BrowserWaits.waitForSpinnerToDissappear();
    // browser.sleep(10000);
   //  var currentUrl = await browser.getCurrentUrl();
   //  browser.sleep(5000);
   //  var url = currentUrl.replace('#Summary','/hearings');
   //  console.log('url1 :'+ url);
   // //  browser.sleep(5000);
   //  browser.driver.get(url);
   //  browser.waitForAngular();
   //  await BrowserWaits.waitForSpinnerToDissappear();
   // var text= await hearingsPage.isTextVisible();
   // text.equals("Current and Upcoming");
   // await hearingsPage.requestHearingButton.click();
    await hearingsPage.headerTab.click();
    browser.sleep(10000);
    await hearingsPage.hearingsTab.click();
    browser.sleep(10000);
    //await BrowserWaits.waitForSpinnerToDissappear();


  });



  When('I see hearings Summary', async function () {
    // expect(await caseListPage.amOnPage()).to.be.true;
    await BrowserWaits.waitForSpinnerToDissappear();
    var text= await hearingsPage.isTextVisible();
    await BrowserWaits.waitForSpinnerToDissappear();
    expect(text).equal("Current and upcoming");
    await hearingsPage.requestHearingButton.click();
    await BrowserWaits.waitForSpinnerToDissappear();
    // await hearingsPage.hearingAttendance

  });


  When('I select search criteria jurisdiction {string} case type {string} Region {string} Benefit {string} Issue {string} in case list page and click apply',
    async function (jurisdiction, caseType, Region, Benefit, Issue) {

    await BrowserWaits.retryWithActionCallback(async () => {
      try {
        await caseListPage.selectJurisdiction(jurisdiction);
    await caseListPage.selectCaseType(caseType);
    await hearingsPage.enterRegion(Region);
    await hearingsPage.enterBenefitCode(Benefit);
    await hearingsPage.enterIssueCode(Issue);
    await caseListPage.clickSearchApplyBtn();
  } catch (err) {
      await headerPage.refreshBrowser();
      await browserUtil.waitForLD();
      await BrowserWaits.waitForSpinnerToDissappear();
      await headerPage.clickCaseList();
      throw new Error(err);
    }

  });

  });

  // When('I click search Apply in case list page', async function(){
  //   await BrowserWaits.retryWithActionCallback(async  () => {
  //     await caseListPage.clickSearchApplyBtn();
  // });
  //
  // });

  Then('I request hearing with preloaded values', async function () {
    await BrowserWaits.waitForSpinnerToDissappear();
    await hearingsPage.hearingsContinue.click();
    await BrowserWaits.waitForElement(hearingsPage.hearingsHeading1);
    await hearingsPage.hearingsContinue.click();
    // await BrowserWaits.waitForElement(hearingsPage.hearingsHeading2);
    await hearingsPage.hearingsContinue.click();
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.waitForElement(hearingsPage.hearingsHeadingAttendance);
    // await hearingsPage.hearingAttendance.click();
    await hearingsPage.hearingsContinue.click();
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.waitForElement(hearingsPage.hearingsHeading3);
    // BrowserWaits.waitForSeconds (20000);
    await hearingsPage.hearingsContinue.click();
    await BrowserWaits.waitForElement(hearingsPage.hearingsHeading4);
    await hearingsPage.hearingsContinue.click();
    await BrowserWaits.waitForSpinnerToDissappear();
   // BrowserWaits.waitForElement(hearingsPage.hearingsHeading5);
    BrowserWaits.waitForSeconds (10000);
    // BrowserWaits.waitForElement(hearingsPage.specificJudge);
    await hearingsPage.specificJudge.click();
    BrowserWaits.waitForSeconds (5000);
    await hearingsPage.enterJudgeName.sendKeys("Pratik");
    BrowserWaits.waitForSeconds (5000);
    await hearingsPage.selectJudge.click();
    await hearingsPage.hearingsContinue.click();


  });

  // Then('I wait to see case results displayed', {timeout : 180*1000} ,async function(){
  //   await BrowserWaits.retryWithActionCallback(async () => {
  //     try{
  //       await CucumberReportLogger.AddMessage("Step started");
  //   await caseListPage.waitForCaseResultsToDisplay();
  //
  // }catch(err){
  //     await caseListPage.clickSearchApplyBtn();
  //     throw new Error(err);
  //   }
  // });


 // });

  When('I open first case in case list page', async function () {
    await caseListPage.clickFirstCaseLink();
  })

  Then('I wait to see no case results displayed', async function () {
    await caseListPage.waitForNoCaseResultsToDisplay();

  });

  Then('I see cases in case list page', async function(){
    expect(await caseListPage.hasCaseListAnyResults()).to.be.true;
  });

  Then('I see no cases in case list page', async function () {
    validateNoResultsDisplayed();
  });

  Then('I see search results on case list page are reset', async function () {
    validateNoResultsDisplayed();
  });

  Then('I see case list table header has Select all checkbox column', async function () {
    expect(await caseListPage.isSelectAllColumnDisplayed(),"Case list selection Select all column/checkbox not present ").to.be.true;
  });

  Then('I see case list table header does not have Select all checkbox column', async function () {
    expect(await caseListPage.isSelectAllColumnDisplayed(), "Case list selection Select all column/checkbox not present ").to.be.true;
  });

  Then('I see case list table each case row has checkbox column', async function () {
    expect(await caseListPage.isSelectCheckboxDisplayedForAllCases(), "Case select checkbox not displayed for all acses").to.be.true;
  });

  When('I select case at row {int} in case list page', async function (rownum) {
    if(await caseListPage.isCaseSelectCheckboxSelected(rownum)){
      this.attach("Case checkbox already selected");
    }else{
      await caseListPage.clickCaseSelectCheckBoxAtRow(rownum);
    }
  });

  When('I unselect case at row {int} in case list page', async function (rownum) {
    if (await caseListPage.isCaseSelectCheckboxSelected(rownum)) {
      await caseListPage.clickCaseSelectCheckBoxAtRow(rownum);
    } else {
      this.attach("Case checkbox already un-selected");
    }
  });


  Then('I see case list table has case at row {int} selected', async function (rowNum) {
    expect(await caseListPage.isCaseSelectCheckboxSelected(rowNum), "Case select checkbox not selected for case at row " + rowNum).to.be.true;
  });

  Then('I see case list table has case at row {int} un-selected', async function (rowNum) {
    expect(await caseListPage.isCaseSelectCheckboxSelected(rowNum), "Case select checkbox still selected for case at row " + rowNum).to.be.false;
  });

  When('I click case list pagination {string} page', async function (prevnext) {
    if (prevnext.toLowerCase() === "next"){
      await caseListPage.clickPaginationNextPage();
    } else if (prevnext.toLowerCase() === "previous"){
      await caseListPage.clickPaginationPreviousPage();
    }
  });


  Then('I see case list table has {int} rows selected', async function (selectedCasesCount) {
    expect(await caseListPage.getCountOfCasesSelectedInPage(), "Selected cases count does not match expected count" + selectedCasesCount).to.be.equal(selectedCasesCount);
  });

  When('I sort case list table by column at position {int}', async function (colPos) {
    await caseListPage.sortTableByColAt(colPos);
  });

  When('I click case at row {int} and navigate to case view page', async function (rowNum) {
    await caseListPage.clickCaseLinkAtRow(rowNum);
  });

  Then('I see case list selection feature {string} available', async function (featureCondition) {
    this.tableHeaderSelectAllInput = $(".govuk-table__header #select-all");
    this.shareCaseButton = $("#btn-share-button");
    this.resetCaseSelectionLink = $("a.search-result-reset-link");

    if (featureCondition.toLowerCase() === "is"){
      expect(await caseListPage.tableHeaderSelectAllInput.isPresent(), "Table header Select All check box not present").to.be.true;
      expect(await caseListPage.shareCaseButton.isPresent(), "Share Case button not present").to.be.true;
      expect(await caseListPage.resetCaseSelectionLink.isPresent(), "Reset selection button not present").to.be.true;
    }else{
      expect(await caseListPage.tableHeaderSelectAllInput.isPresent(), "Table header Select All check box should not be  present").to.be.false;
      expect(await caseListPage.shareCaseButton.isPresent(), "Share Case button should not be  present").to.be.false;
      expect(await caseListPage.resetCaseSelectionLink.isPresent(), "Reset selection button should not be  present").to.be.false;
    }
  });

  When('I click Share Case button', async function () {
    await caseListPage.clickShareCaseButton();
  });

  async function validateNoResultsDisplayed(){
    expect(await caseListPage.hasCaseListAnyResults()).to.be.false;
  }
});
