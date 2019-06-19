BasePage = require('./basePage.js');
Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');


class CaseDetailsPage extends BasePage {

  constructor() {
    super();

    this._latestHistoryEventLink = '.EventLogTable tbody > tr:nth-of-type(1) a';
    this._events = 'ccd-event-log-table tbody tr > td:nth-of-type(1)';
    this._endStateValue = '.EventLogDetails tbody > tr:nth-of-type(3) > td > span';
    this._actionsDropdown = new Dropdown('ccd-event-trigger select');
    this._goButton = new Button('ccd-event-trigger button');
    this._tabs = '.tabs-list li';
    this._accordians = 'ccd-read-complex-field-collection-table img';
    this._currentTabFieldKeys = '.tabs-panel:not(.js-hidden) tr > th';
    this._printButton = '#case-viewer-control-print';
    this._caseReference = 'ccd-case-header .heading-h1';
    this._alertSuccessBar = '.alert-success';

    this._currentTabNestedFieldKeys = '.tabs-panel:not(.js-hidden) tr > th > td > tbody > tr > th';
    //Details Box
    this._detailsBox = '.EventLog-DetailsPanel';
    this._detailsBoxDate = '.EventLog-DetailsPanel tbody > tr:nth-of-type(1) > td span';
    this._detailsBoxAuthor = '.EventLog-DetailsPanel tbody > tr:nth-of-type(2) > td span';
    this._detailsBoxEndState = '.EventLog-DetailsPanel tbody > tr:nth-of-type(3) > td span';
    this._detailsBoxEvent = '.EventLog-DetailsPanel tbody > tr:nth-of-type(4) > td span';
    this._detailsBoxSummary = '.EventLog-DetailsPanel tbody > tr:nth-of-type(5) > td span';
    this._detailsBoxComment = '.EventLog-DetailsPanel tbody > tr:nth-of-type(6) > td span';


  }


  async waitForPageToLoad(){
    await this.waitForElementToBeVisibleWithTimeout($('ccd-case-header'),10000)
  }

  /**
   * Check if case reference is visible
   * @returns {Promise<boolean>}
   */

  async isCaseReferenceVisible() {
    return await $(this._caseReference).isDisplayed();
  }

  /**
   * Check if case reference is matching right format
   * @returns {Promise<boolean>}
   */

  async isCaseReferenceOfCorrectFormat() {
    let caseReferenceText = await $(this._caseReference).getText();
    let matched = caseReferenceText.match(/^#\d{4}-\d{4}-\d{4}-\d{4}$/);
    return matched && matched.length === 1;
  }

  /**
   * Check if print button is ready to click
   * @returns {Promise<boolean>}
   */

  async isPrintButtonReady() {
    try {
      return await $(this._printButton).isDisplayed()
        && await $(this._printButton).isEnabled();
    } catch (e) {
      return false;
    }
  }

  /**
   * Get text value for the latest event in the History tab
   * @returns {Promise<String>}
   */
  async getSuccessAlertBarText(){
    let text = await $(this._alertSuccessBar).getText();
    return text
  }

  /**
   * Get text value for the latest event in the History tab
   * @returns {Promise<String>}
   */
  async getLatestHistoryEvent(){
    let text = await $(this._latestHistoryEventLink).getText();
    return text
  }

  /**
   * Get the value for 'End State' as listed in the Details box of the History tab
   * @returns {Promise<void>}
   */
  async getEndStateValue(){
    let text = await $(this._endStateValue).getText();
    return text
  }

  /**
   * Get available actions from the 'Next Step' dropdown box
   * @returns String Array
   */
  async getActions(){
    let options = await this._actionsDropdown.getOptionsTextValues()
    return options
  }

  /**
   * Select event from the actions dropdown and click go button
   * @param event
   * @returns {Promise<void>}
   */
  async startEvent(event){
    await this._actionsDropdown.selectFromDropdownByText(event);
    await this._goButton.click()
  }


  async clickTab(tabName){
    let element = await this.getElementWithText(await $$(this._tabs),tabName);
    await element.click();
  }

  /**
   * Get list of tabs
   * @returns Array of Strings
   */
  async getTabsText(){
    let tabs = await $$(this._tabs);
    return await this.getElementsText(tabs);
  }

  /**
   * Get list of event names in the Event History timeline
   * @returns Array of Strings
   */
  async getTimelineEvents(){
    let events = await $$(this._events);
    return await this.getElementsText(events);
  }

  /**
   * Click event box to render details for event. This does NOT click link
   * navigating to event history details
   * @param eventName
   * @returns {Promise<void>}
   */
  async selectTimelineEvent(eventName){
    let events = await $$(this._events);
    let eventFound = false;
    for(const event of events){
      if (await event.getText() === eventName){
        eventFound = true;
        await event.click();
        break;
      }
    }

    if (!eventFound){
      throw new CustomError(`Event ${eventName} not found in event timeline`)
    }
  }

  /**
   * Get list of the fields displayed on the currency viewed tab
   * @returns Array of Strings
   */
  async getTabFields(){
    return await this.getElementsText(await $$(this._currentTabFieldKeys))
  }

  /**
   * Get list of the fields displayed on the currency viewed tab
   * @returns Array of Strings
   */
  async getTabNestedFields(){
    return await this.getElementsText(await $$(this._currentTabNestedFieldKeys))
  }

  /**
   * Get the value for an item in the details box by parsing the name of the detail
   * @param detailKey
   * @returns {Promise<string>}
   */
  async getDetailsValueFor(detailKey){
    switch (detailKey.toLowerCase()){
      case 'date' : return await $(this._detailsBoxDate).getText();
      case 'author' :  return await $(this._detailsBoxAuthor).getText();
      case 'end state' :  return await $(this._detailsBoxEndState).getText();
      case 'event' :  return await $(this._detailsBoxEvent).getText();
      case 'summary' :  return await $(this._detailsBoxSummary).getText();
      case 'comment' :  return await $(this._detailsBoxComment).getText();
      default:
        throw new CustomError(`could not find a details box item called '${detailKey}'`)
    }

  }

  async clickFirstAccordian(){
    let first = await $$(this._accordians).first();
    await first.click();
  }

}

module.exports = CaseDetailsPage;
