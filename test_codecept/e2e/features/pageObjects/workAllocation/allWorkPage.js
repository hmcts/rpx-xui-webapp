const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const { $, $$, elementByXpath, getText, isPresent, selectOption } = require('../../../../helpers/globals');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');
const { Select, GovUKRadios } = require('../../../utils/domElements');
const TaskMessageBanner = require('../messageBanner');
const TaskList = require('./taskListTable');

class AllWork extends TaskList {
  constructor() {
    super();
    this.containerTag = 'exui-all-work-home';
    this.taskInfoMessageBanner = new TaskMessageBanner(`${this.containerTag} exui-all-work-tasks`);

    this.selectOrRadioFilterItems = [
      'Service',
      'Case Location',
      'Tasks by role type',
      'Task type',
      'Priority',
      'Person',
      'Tasks',
      'Select a role type',
      'Location radios'
    ];
  }

  get FILTER_ITEMS() {
    return {
      'Service': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Service")]/../..//select'),
      'Location': $('.all-work-filter #selectLocation'),
      'Location radios': new GovUKRadios('css', '.all-work-filter #selectLocation .govuk-radios'),
      'Location search': $('.all-work-filter  #location xuilib-find-location .search-location exui-search-location input'),
      'Person': new GovUKRadios('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Person")]/..//div[contains(@class,"govuk-radios")]'),
      'Tasks': new GovUKRadios('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Tasks")]/../..//div[contains(@class,"govuk-radios")]'),
      'Tasks by role type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//select[contains(@id,"select_role")]'),
      'Person input': elementByXpath('//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//xuilib-find-person//input'),
      'Task type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Task type")]/..//select'),
      'Priority': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Priority")]/..//select'),
      'Select a role type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Select a role type")]/../..//select'),
      'Person': elementByXpath('//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//xuilib-find-person//input')
    };
  }

  get pageHeader() {
    return $(`${this.containerTag} h3.govuk-heading-xl`);
  }

  get subNavListContainer() {
    return $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');
  }

  get bannerMessageContainer() {
    return $('exui-info-message');
  }

  get infoMessages() {
    return $$('exui-info-message .hmcts-banner__message');
  }

  // Tasks container
  get tasksContainer() {
    return $('exui-all-work-tasks');
  }

  // Cases container
  get casesContainer() {
    return $('exui-all-work-cases exui-work-case-list');
  }

  get allworkCasesMessage() {
    return $('exui-all-work-cases .hmcts-filter-layout__content p');
  }

  // Filter actions
  get filterApplyBtn() {
    return $('exui-all-work-home xuilib-generic-filter #applyFilter');
  }

  get filterResetBtn() {
    return $('exui-all-work-home xuilib-generic-filter #cancelFilter');
  }

  get filterSearchResults() {
    return $$('.cdk-overlay-container mat-option');
  }

  async isFilterItemDisplayed(filterItem) {
    const filtersItems = Object.keys(this.FILTER_ITEMS);
    if (!filtersItems.includes(filterItem)) {
      throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
    }

    if (this.selectOrRadioFilterItems.includes(filterItem)) {
      return await this.FILTER_ITEMS[filterItem].isVisible();
    }
    return await isPresent(this.FILTER_ITEMS[filterItem]);
  }

  async isFilterItemEnbled(filterItem) {
    const filtersItems = Object.keys(this.FILTER_ITEMS);
    if (!filtersItems.includes(filterItem)) {
      throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
    }
    return await this.FILTER_ITEMS[filterItem].isVisible()
      && await this.FILTER_ITEMS[filterItem].isEnabled();
  }

  async getFilterSelectOrRadioOptions(filterItem) {
    const filtersItems = Object.keys(this.FILTER_ITEMS);
    if (!filtersItems.includes(filterItem)) {
      throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
    }
    if (this.selectOrRadioFilterItems.includes(filterItem)) {
      let options = await this.FILTER_ITEMS[filterItem].getOptions();
      options = options.filter((opt) => opt !== '');
      return options;
    }
    throw new Error(`filter item ${filterItem} is not a select or a Radio item.`);
  }

  async setFilterSelectOrRadioOptions(filterItem, option) {
    const filtersItems = Object.keys(this.FILTER_ITEMS);
    if (!filtersItems.includes(filterItem)) {
      throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
    }
    if (this.selectOrRadioFilterItems.includes(filterItem)) {
      return await selectOption(this.FILTER_ITEMS[filterItem], option);
    }
    throw new Error(`filter item ${filterItem} is not a select or a Radio item..${filtersItems}`);
  }

  async inputFilterItem(filterItem, inputText) {
    await await this.FILTER_ITEMS[filterItem].fill(inputText);
  }

  getSubNavigationTabElement(tabLabel) {
    return elementByXpath(`//${this.containerTag}//a[contains(text(),'${tabLabel}')]`);
  }

  async isSubNavigationTabPresent(tabLabel) {
    return await isPresent(this.getSubNavigationTabElement(tabLabel));
  }

  async clickSubNavigationTab(tabLabel) {
    await BrowserWaits.waitForElement(this.subNavListContainer);
    await this.getSubNavigationTabElement(tabLabel).click();
  }

  async isSubNavigationTabSelected(tabLabel) {
    return this.getSubNavigationTabElement(tabLabel).getAttribute('aria-current') !== null;
  }

  async amOnPage () {
  try {
    await BrowserWaits.waitForSpinnerToDissappear();

    await this.pageHeader.waitFor({ state: 'visible', timeout: 20_000 });

    await BrowserWaits.waitForConditionAsync(
      async () => (await getText(this.pageHeader)).includes('All work'),
      20_000
    );

    return true;
  } catch (err) {
    cucumberReporter.AddMessage('All work page not displayed ' + err.stack,
                                LOG_LEVELS.Error);
    return false;
  }
}

  // Task container methods
  async isTasksContainerDisplayed() {
    return await isPresent(this.tasksContainer) && await this.tasksContainer.isVisible();
  }

  //Cases container methods
  async isCasesContainerDisplayed() {
    return await this.casesContainer.isVisible();
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

  async getSearchResults() {
    const count = await this.filterSearchResults.count();
    const results = [];
    for (let i = 0; i < count; i++) {
      const e = await this.filterSearchResults.nth(i);
      results.push(await getText(e));
    }
    return results;
  }

  async isSearchResultPresent(result) {
    const searchResults = await this.getSearchResults();
    for (const searchResult of searchResults) {
      if (searchResult.includes(result)) {
        return true;
      }
    }
    return false;
  }

  async selectSearchResult(result) {
    const count = await this.filterSearchResults.count();
    const results = [];
    for (let i = 0; i < count; i++) {
      const e = await this.filterSearchResults.nth(i);
      const eText = await getText(e);
      results.push(eText);
      if (eText.includes(result)) {
        await e.click();
        return;
      }
    }
    throw new Error(`Search result ${result} not found in results ${results}`);
  }
}

module.exports = new AllWork();

