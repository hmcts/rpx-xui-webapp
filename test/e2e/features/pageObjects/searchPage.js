Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')

class SearchPage {

  constructor(){
    this.header = '#content h1';
    this.jurisdiction = new Dropdown('#s-jurisdiction');
    this.caseType = new Dropdown('#s-case-type');
    this.applyButton = new Button('#content exui-ccd-connector > ccd-search-filters-wrapper > ccd-search-filters > form > button:nth-child(4)');
    this.resetButton = new Button('#reset');
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
  }

  async selectJurisdiction(option){
    await this.jurisdiction.selectFromDropdownByText(option);
  }

  async selectCaseType(option){
    await this.caseType.selectFromDropdownByIndex(option);
  }

  async clickApplyButton() {
    await this.applyButton.waitForElementToBeClickable();
    await this.applyButton.click();
  }

  async clickResetButton() {
    await this.resetButton.waitForElementToBeClickable();
    await this.resetButton.click();
  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Search'
  }
}
module.exports = SearchPage;

