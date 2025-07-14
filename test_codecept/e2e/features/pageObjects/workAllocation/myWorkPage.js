const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const { $, $$, elementByXpath, getText, isPresent } = require('../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');
const TaskMessageBanner = require('../messageBanner');
const TaskList = require('./taskListTable');

class MyWorkPage extends TaskList {
  constructor() {
    super();
    this.taskInfoMessageBanner = new TaskMessageBanner('exui-work-allocation-home exui-task-home');
  }

  get pageHeader() {
    return $('exui-work-allocation-home exui-task-home h3.govuk-heading-xl');
  }

  get showHideWorkFilterBtn() {
    return elementByXpath("//button[contains(text(),'work filter')]");
  }

  get showHideFilterBadge() {
    return elementByXpath("//button[contains(text(),'work filter')]/following-sibling::span[contains(text(),'Filtered view')]");
  }

  get showHideFilterHint() {
    return elementByXpath("//button[contains(text(),'work filter')]/following-sibling::span[contains(text(),'All of your work may not be visible.')]");
  }

  get genericFilterContainer() {
    return $('xuilib-generic-filter');
  }

  // Services filters
  get workFilterServicesContainer() {
    return $('.xui-generic-filter#services');
  }

  get workFilterServicesHeader() {
    return $('.xui-generic-filter#services h3');
  }

  get workFilterServiceCheckboxeItems() {
    return $$('.xui-generic-filter#services .govuk-checkboxes__item');
  }

  get workFilterServiceErrorMessage() {
    return $('.xui-generic-filter#services #services-error');
  }

  // Locations filters
  get workFiltersLocationsContainer() {
    return $('.xui-generic-filter#locations');
  }

  get workFilterSearchLocationInput() {
    return $('.xui-generic-filter#locations exui-search-location input');
  }

  get workFilterLocationSearchResults() {
    return $$('.cdk-overlay-container .mat-autocomplete-panel mat-option span');
  }

  get addLocationButton() {
    return $('.xui-generic-filter#locations xuilib-find-location .location-picker-custom a');
  }

  get selectedLocations() {
    return $$('.xui-generic-filter#locations xuilib-find-location .location-picker-custom .location-selection a');
  }

  get workFilterlocationErrorMessage() {
    return $('.xui-generic-filter#locations #locations-error');
  }

  // Work type filters
  get workFilterWorkTypesContainer() {
    return $('.xui-generic-filter#types-of-work');
  }

  get workFilterTypesOfWork() {
    return $$('.xui-generic-filter #checkbox_types-of-work .govuk-checkboxes__item');
  }

  get workFilterApplyBtn() {
    return $('xuilib-generic-filter #applyFilter');
  }

  get workFilterRestBtn() {
    return $('xuilib-generic-filter #cancelFilter');
  }

  // Sub navigation & main sections
  get subNavListContainer() {
    return $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');
  }

  get myTasksContaine() {
    return $('exui-my-tasks');
  }

  get availableTasksContainer() {
    return $('exui-available-tasks');
  }

  get bannerMessageContainer() {
    return $('exui-info-message');
  }

  get infoMessages() {
    return $$('exui-info-message .hmcts-banner__message');
  }

  async waitForWorkFilterToDisplay(){
    await BrowserWaits.waitForElement(this.genericFilterContainer);
  }

  getSubNavigationTabElement(tabLabel){
    return elementByXpath(`//exui-task-home//a[contains(text(),'${tabLabel}')]`);
  }

  async isSubNavigationTabPresent(tabLabel){
    return await isPresent(this.getSubNavigationTabElement(tabLabel));
  }

  async clickSubNavigationTab(tabLabel){
    await BrowserWaits.waitForElement(this.subNavListContainer);
    await this.getSubNavigationTabElement(tabLabel).click();
  }

  async isSubNavigationTabSelected(tabLabel){
    return this.getSubNavigationTabElement(tabLabel).getAttribute('aria-current') !== null;
  }

  async getWorkFilterLocationsCount(){
    return await this.workFilterLocationContainers.count();
  }

  async getWorkFilterTypesOfCount() {
    return await this.workFilterTypesOfWork.count();
  }

  async OpenWorkFilter(){
    const isOpen = await isPresent(this.genericFilterContainer) && await this.genericFilterContainer.isVisible();

    if (!isOpen){
      await this.showHideWorkFilterBtn.click();
    }
  }

  async CloseWorkFilter() {
    const isOpen = await isPresent(this.genericFilterContainer) && await this.genericFilterContainer.isVisible();

    if (isOpen) {
      await this.showHideWorkFilterBtn.click();
    }
  }

  async clickWorkFilterLoctionInputWithLabel(locationLabel){
    await elementByXpath(`//div[contains(@class,'xui-generic-filter')]//div[contains(@class,'govuk-checkboxes__item')]/label[contains(text(),'${locationLabel}')]/../input`).click();
  }

  async selectWorkFilterLocationAtPosition(locationAtPos){
    const locCount = await this.getWorkFilterLocationsCount();
    if (locationAtPos > locCount || locationAtPos <= 0){
      throw Error('location pos is out of bound');
    }

    const locInput = await this.workFilterLocationContainers.nth(locationAtPos - 1);
    if (!(await locInput.isChecked())){
      await locInput.click();
    }
  }

  async getListOfSelectedLocations(){
    const selectedLocations = [];
    const locationsCount = await this.getWorkFilterLocationsCount();
    for (let i = 0; i < locationsCount; i++){
      const locElement = await this.workFilterLocationContainers.nth(i);
      const isLocationSelected = await locElement.locator('input').isChecked();
      if (isLocationSelected){
        selectedLocations.push(await getText(locElement.locator('label')));
      }
    }
    return selectedLocations;
  }

  async getListOfSelectedTypesOfWork() {
    const selectedLocations = [];
    const locationsCount = await this.getWorkFilterTypesOfCount();
    for (let i = 0; i < locationsCount; i++) {
      const locElement = await this.workFilterTypesOfWork.nth(i);
      const isLocationSelected = await locElement.locator('input').isChecked();
      if (isLocationSelected) {
        selectedLocations.push(await getText(locElement.locator('label')));
      }
    }
    return selectedLocations;
  }

  async amOnPage() {
    try {
      await BrowserWaits.waitForSpinnerToDissappear();
      await this.pageHeader.wait(20);
      await BrowserWaits.waitForConditionAsync(async () => {
        const pageHeaderTitle = await getText(this.pageHeader);
        return pageHeaderTitle.includes('My work');
      });
      return true;
    } catch (err){
      cucumberReporter.AddMessage('My work page not displayed '+err.stack, LOG_LEVELS.Error);
      return false;
    }
  }

  async clickMyTasks() {
    expect(await this.amOnPage(), 'Not on Task lict page ').to.be.true;
    await this.myTasksTab.click();
  }

  async clickAvailableTasks() {
    expect(await this.amOnPage(), 'Not on Task list page ').to.be.true;
    await this.availableTasksTab.click();
  }

  async amOnMyTasksTab() {
    return await this.myTasksContaine.isVisible();
  }

  async isMyTasksDisplayed() {
    expect(await this.amOnPage(), 'Not on Task list page ').to.be.true;
    try {
      await BrowserWaits.waitForElement(this.myTasksContaine);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage('My Tasks list page not displayed: ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async isAvailableTasksDisplayed() {
    expect(await this.amOnPage(), 'Not on Task list page ').to.be.true;
    try {
      await BrowserWaits.waitForElement(this.availableTasksContainer);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage('Available Tasks list page not displayed: ' + err, LOG_LEVELS.Error);
      return false;
    }
  }

  async isBannerMessageDisplayed() {
    expect(await this.amOnPage(), 'Not on Task list page ').to.be.true;
    return this.taskInfoMessageBanner.isBannerMessageDisplayed();
  }

  async getBannerMessagesDisplayed() {
    expect(await this.amOnPage(), 'Not on Task list page ').to.be.true;
    return this.taskInfoMessageBanner.getBannerMessagesDisplayed();
  }

  async isBannermessageWithTextDisplayed(messageText) {
    const messages = await this.getBannerMessagesDisplayed();

    for (const message of messages) {
      if (message.includes(messageText)) {
        return true;
      }
    }
    return false;
  }

  async getWorkFilterServicesList(){
    const servicesCheckBoxItemsCount = await this.workFilterServiceCheckboxeItems.count();
    const returnValues = [];
    for (let i = 0; i < servicesCheckBoxItemsCount; i++){
      const checkBoxItem = await this.workFilterServiceCheckboxeItems.nth(i);
      returnValues.push(await getText(checkBoxItem.locator('label')));
    }
    return returnValues;
  }

  async selectWorkFilterService(service){
    const serviceCheckBox = await this.getServiceCheckBox(service);
    const isChecked = await serviceCheckBox.isChecked();
    if (!isChecked) {
      await serviceCheckBox.click();
    }
  }

  async unselectWorkFilterService(service) {
    const serviceCheckBox = await this.getServiceCheckBox(service);
    const isChecked = await serviceCheckBox.isChecked();
    if (isChecked) {
      await serviceCheckBox.click();
    }
  }

  async isWorkFilterServiceSelected(service){
    const serviceCheckBox = await this.getServiceCheckBox(service);
    return serviceCheckBox.isChecked();
  }

  async getServiceCheckBox(service) {
    const servicesCheckBoxItemsCount = await this.workFilterServiceCheckboxeItems.count();
    let serviceCheckBox = null;
    for (let i = 0; i < servicesCheckBoxItemsCount; i++) {
      const checkBoxItem = await this.workFilterServiceCheckboxeItems.nth(i);
      const serviceName = await getText(checkBoxItem.locator('label'));
      if (serviceName.includes(service)) {
        serviceCheckBox = checkBoxItem.locator('input');
        break;
      }
    }
    if (!serviceCheckBox){
      throw new Error(`Services check box with label ${service} is not found`);
    }
    return serviceCheckBox;
  }

  async getWorkFilterLocationSearchResults(){
    const count = await this.workFilterLocationSearchResults.count();
    const locations = [];
    for (let i = 0; i < count; i++){
      const loc = await await this.workFilterLocationSearchResults.nth(i);
      locations.push(await getText(loc));
    }
    return locations;
  }

  async selectWorkFilterLocationSearchResult(location){
    const locationResult = elementByXpath(`//div[contains(@class,'cdk-overlay-container')]//div[contains(@class,'mat-autocomplete-panel')]//mat-option//span[contains(text(),'${location}')]`);
    await locationResult.click();
  }

  async getWorkFilterSelectedLocations(){
    const count = await this.selectedLocations.count();
    const returnValue = [];
    for (let i = 0; i < count; i++){
      const e = await this.selectedLocations.nth(i);
      returnValue.push(await getText(e));
    }
    return returnValue;
  }

  async clickSelectedLocationFromWorkFilter(location){
    const count = await this.selectedLocations.count();
    const actualLocations = [];
    for (let i = 0; i < count; i++){
      const e = await this.selectedLocations.nth(i);
      const locationName = await getText(e);
      actualLocations.push(locationName);
      if (locationName.includes(location)){
        await e.click();
        return;
      }
    }
    throw new Error(`location conating text ${location} is not found in selected location "${actualLocations}"`);
  }

  async clearAllSelectedLocations() {
    let count = await this.selectedLocations.count();

    while (count > 0){
      const e = await this.selectedLocations.nth(0);
      await e.click();
      count = await this.selectedLocations.count();
    }
  }

  getFilterContainer(filterType){
    const filterTypeNormalized = filterType.toLowerCase().split(' ').join('');

    let filterContainer = null;
    if (filterTypeNormalized.includes('service')) {
      filterContainer = this.workFilterServicesContainer;
    } else if (filterTypeNormalized.includes('location')) {
      filterContainer = this.workFiltersLocationsContainer;
    } else if (filterTypeNormalized.includes('worktype')) {
      filterContainer = this.workFilterWorkTypesContainer;
    } else {
      throw new Error(`${filterType} is not implemented in test. Please check Page object myWorkPage.js`);
    }
    return filterContainer;
  }

  async isWorkFilterOfTypeDisplayed(filterType){
    const filterContainer = this.getFilterContainer(filterType);

    return (await isPresent(filterContainer)) && (await filterContainer.isVisible());
  }

  async isWorkFilterOfTypeDisplayed(filterType){
    const filterTypeNormalized = filterType.toLowerCase().split(' ').join('');

    let filterContainer = null;
    if (filterTypeNormalized.includes('service')){
      filterContainer = this.workFilterServicesContainer;
    } else if (filterTypeNormalized.includes('location')){
      filterContainer = this.workFiltersLocationsContainer;
    } else if (filterTypeNormalized.includes('worktype')) {
      filterContainer = this.workFilterWorkTypesContainer;
    } else {
      throw new Error(`${filterType} is not implemented in test. Please check Page object myWorkPage.js`);
    }

    return (await isPresent(filterContainer)) && (await filterContainer.isVisible());
  }
}

module.exports = new MyWorkPage();
