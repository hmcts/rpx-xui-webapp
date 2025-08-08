const { $, elementByXpath, isPresent } = require('../../../helpers/globals');
const { LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
const CucumberReporter = require('../../../codeceptCommon/reportLogger');

const MessageBanner = require('./messageBanner');
class CaseDetailsPage{
  constructor(){
    this.messageBanner = new MessageBanner();
  }

  get caseDetailsContainer() {
    return $('exui-case-details-home');
  }

  get tabsContainer() {
    return $('mat-tab-header .mat-tab-label-container');
  }

  async isDisplayed(){
    return isPresent(this.caseDetailsContainer);
  }

  async amOnPage(){
    try {
      await BrowserWaits.waitForElement(this.caseDetailsContainer);
      return true;
    } catch (err){
      CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
      return false;
    }
  }

  async waitForTabHeader(){
    await BrowserWaits.waitForElement(this.tabsContainer);
  }

  async isTabWithLabelPresent(tabLabel){
    await this.waitForTabHeader();
    const tabElement = this.getTabElementWithLabel(tabLabel);
    return await isPresent(tabElement);
  }

  async isTabWithLabelSelected(tabLabel){
    await this.waitForTabHeader();
    const tabElement = this.getTabElementWithLabel(tabLabel);
    return (await tabElement.getAttribute('class')).includes('mat-tab-label-active');
  }

  async clickTabWithLabel(tabLabel){
    await this.waitForTabHeader();
    const tabElement = this.getTabElementWithLabel(tabLabel);
    await tabElement.click();
  }

  getTabElementWithLabel(tabLabel){
    return elementByXpath(`//mat-tab-header//div[contains(@class,'mat-tab-list')]//div[contains(text(),'${tabLabel}')]//ancestor::div[contains(@class,'mat-tab-label') and @role='tab']`);
  }

  async openLinkedDocument() {
    const documentLink = $('tr.complex-panel-simple-field ccd-read-document-field a');
    await BrowserWaits.waitForElement(documentLink);
    await documentLink.click();
  }

  async openDummyFile() {
    const dummyLink = $('#case-viewer-field-read--DocumentUrl a');
    await BrowserWaits.waitForElement(dummyLink);
    await dummyLink.click();
  }
}

module.exports = new CaseDetailsPage();
