Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')
var BrowserWaits = require("../../support/customWaits");

class SearchPage {

  constructor(){
    this.header = '#content h1';
    this.jurisdiction = $('#s-jurisdiction');
    this.searchFilterContainer= $("ccd-search-filters form");
    this.caseType = $('#s-case-type');
    this.applyButton = $('ccd-search-filters button:not(.button-secondary)');
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
    this.evidencePresentYes='#evidencePresent-Yes'
    this.evidencePresentNo='#evidencePresent-No';
    this.isCORDecisionYes='#isCorDecision-Yes';
    this.isCORDecisionNo='#isCorDecision-No';
    this.documentsSentToDWPYes='#documentSentToDwp-Yes';
    this.documentsSentToDWPNo='#documentSentToDwp-No';

    this.searchResultsTopPagination = $("ccd-search-result .pagination-top");
    this.noResultsNotification = $("ccd-search-result .notification");
    this.searchResultComponent = $('.search-block');

    this.firstResultCaseLink = $("ccd-search-result>table>tbody>tr:nth-of-type(1)>td:nth-of-type(1)>a"); 
  }

  async _waitForSearchComponent() {
    await BrowserWaits.waitForElement(this.searchFilterContainer);
    await this.waitForSpinnerToDissappear();
  }

  async waitForSpinnerToDissappear() {
    await BrowserWaits.waitForCondition(async () => {
      return !(await $(".loading-spinner-in-action").isPresent());
    });
  }
  async selectJurisdiction(option){
    await this._waitForSearchComponent();

    await BrowserWaits.waitForElement(this.jurisdiction);

    var optionElement = this.jurisdiction.element(by.xpath("//*[text() ='" + option + "']"));
    await BrowserWaits.waitForElement(optionElement);
 
    await optionElement.click();
  }

  async selectCaseType(option){
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.caseType);

    var optionElement = this.caseType.element(by.xpath("//*[text() = '" + option + "']"));
    await BrowserWaits.waitForElement(optionElement);

    await optionElement.click();
  }

  async clickApplyButton() {
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.applyButton);
    await BrowserWaits.waitForElementClickable(this.applyButton);

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.applyButton); 
    await this.applyButton.click();
  }

  async clickResetButton() {
    await this._waitForSearchComponent();
    await BrowserWaits.waitForElement(this.resetButton);
    await browser.executeScript('arguments[0].scrollIntoView()',
      this.resetButton); 
    await this.resetButton.click();
  }

  async openFirstCaseInResults(){
    await this.searchResultsTopPagination.isPresent();
    await BrowserWaits.waitForElement(this.firstResultCaseLink);
    var thisPageUrl = await browser.getCurrentUrl();

    await browser.executeScript('arguments[0].scrollIntoView()',
      this.firstResultCaseLink);
    await this.firstResultCaseLink.click();

    await BrowserWaits.waitForPageNavigation(thisPageUrl);
  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    await this._waitForSearchComponent();
    let header = await this.getPageHeader();
    console.log("Header test : "+header);
    return header === 'Search'
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

