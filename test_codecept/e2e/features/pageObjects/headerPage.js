'use strict';

const { $, $$, elementByXpath, isPresent } = require('../../../helpers/globals');
const browserUtil = require('../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../support/customWaits');
const CaseListPage = require('./CaseListPage');
const CreateCaseStartPage = require('./createCaseStartPage');
const taskListPage = require('../pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('./workAllocation/taskManagerPage');
const myWorkPage = require('../pageObjects/workAllocation/myWorkPage');
const allWorkPage = require('../../features/pageObjects/workAllocation/allWorkPage');
const globalSearchPage = require('./globalSearchCases');
const staffSearchPage = require('./staffUI/staffUISearchPage');
const SearchCasePage = require('../pageObjects/searchPage');

const createCaseStartPage = new CreateCaseStartPage();
const caseListPage = new CaseListPage();
const searchCasePage = new SearchCasePage();

class HeaderSearch {
  get container() {
    return elementByXpath("//div[@class='hmcts-primary-navigation__search']//exui-case-reference-search-box");
  }
  get label() {
    return this.container.locator('span');
  }
  get input() {
    return this.container.locator("input#caseReference");
  }
  get button() {
    return this.container.locator("button");
  }

  async waitForContainer() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.container);
    });
  }

  async searchInput(input) {
    await this.waitForContainer();
    await this.input.fill('');
    await this.input.type(input);
  }

  async clickFind() {
    await this.waitForContainer();
    await this.button.click();
  }
}

class HeaderPage {
  constructor() {
    this.headerCaseRefSearch = new HeaderSearch();
  }

  getJcmLogoImg() {
    return elementByXpath("//img[@src='/assets/images/govuk-crest-jcm.png']");
  }

  getMyHMCTSHeader() {
    return elementByXpath("//span[contains(text(),'MyHMCTS')]");
  }

  getHeaderLink() {
    return $('div.hmcts-header__container a.hmcts-header__link');
  }

  getGlobalHeaderContainerWithStyle() {
    return elementByXpath('//exui-hmcts-global-header/..');
  }

  getHeaderAppLogoLink() {
    return $('.hmcts-header__logo a, .hmcts-header__container a.hmcts-header__link');
  }

  getHeaderBanner() {
    return $('exui-header header > div');
  }

  getCaseReferenceSearchBox() {
    return $('.hmcts-primary-navigation__search exui-case-reference-search-box');
  }

  getPrimaryNavBar() {
    return $('.hmcts-primary-navigation__container');
  }

  getPrimaryNavBarNavItems() {
    return $('.hmcts-primary-navigation__nav ul');
  }

  getHeaderMenuItems() {
    return $$('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  }

  getPrimaryNavBarRightSideItems() {
    return $('.hmcts-primary-navigation__search ul');
  }

  getManageCases() {
    return $('.hmcts-header .hmcts-header__link');
  }

  getFindCase() {
    return elementByXpath("//a[contains(text(),'Find case')]");
  }

  getSignOut() {
    return elementByXpath("//a[contains(text(),'Sign out')]");
  }

  getContentHeader() {
    return $('#content h1');
  }

  caseList() {
    return elementByXpath("//a[contains(text(),'Case list')]");
  }
  createCase() {
    return elementByXpath("//li/a[contains(text(),'Create case')]");
  }
  taskList() {
    return elementByXpath("//li/a[contains(text(),'Task list')]");
  }
  taskManager() {
    return elementByXpath("//li/a[contains(text(),'Task manager')]");
  }

  async getMenuItemsCount() {
    return await this.getHeaderMenuItems().count();
  };

  async clickCaseList() {
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.waitForElement(this.caseList());
    await BrowserWaits.waitForElementClickable(this.caseList());
    await this.caseList().click();
    await browserUtil.waitForLD();
    expect(await caseListPage.amOnPage(), 'Case list page not loaded').to.be.true;
  }

  async clickCreateCase() {
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.createCase());
      await BrowserWaits.waitForElementClickable(this.createCase());
      await this.createCase().click();
      await browserUtil.waitForLD();
      expect(await createCaseStartPage.amOnPage()).to.be.true;
    });
  }

  async clickTaskList() {
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.taskList());
      await BrowserWaits.waitForElementClickable(this.taskList());
      await this.taskList().click();
      await browserUtil.waitForLD();
    });
  }

  async clickTaskManager() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.taskManager());
      await BrowserWaits.waitForElementClickable(this.taskManager());
      await this.taskManager().click();
      await browserUtil.waitForLD();
    });
  }

  async clickFindCase() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.getFindCase());
      await this.getFindCase().click();
      const searchPageHeader = elementByXpath('//*[@id = \'content\']//h1[contains(text() , \'Search\')]');
      await BrowserWaits.waitForElement(searchPageHeader);
    });
  }

  async clickSignOut() {
    await BrowserWaits.waitForElement(this.getSignOut());
    await this.getSignOut().click();
  }

  async isTabPresent(tabText) {
    const tab = this.getPrimaryNavBar().locator(`xpath=//a[contains(text(),"${tabText}")]`);
    return await tab.isVisible();
  }

  async isTabPresentInMainNav(tabText) {
    return await isPresent(this.getPrimaryNavBarNavItems().locator('//a[contains(text(),"' + tabText + '")]'));
  }

  async isTabPresentInRightNav(tabText) {
    return await isPresent(this.getPrimaryNavBarRightSideItems().locator('//a[contains(text(),"' + tabText + '")]'));
  }

  async waitForPrimaryNavDisplay() {
    await BrowserWaits.waitForElement(this.primaryNavBar);
  }

  getTabElementWithText(tabText) {
    return this.getPrimaryNavBar().locator(`xpath=//a[contains(text(),"${tabText}")]`);
  }

  async clickTabWithText(tabText) {
    await BrowserWaits.retryWithActionCallback(async () => {
      const tab = this.getTabElementWithText(tabText);
      await BrowserWaits.waitForElement(tab);
      await tab.click();
    });
  }

  async getPrimaryTabsDisplayed() {
    return await browserUtil.stepWithRetry(async () => {
      const tabsText = [];
      const tabs = this.getPrimaryNavBar().locator('a');
      const count = await tabs.count();
      for (let i = 0; i < count; i++) {
        tabsText.push(await tabs.nth(i).textContent());
      }
      return tabsText;
    });
  }

  async waitForPrimaryNavDisplay() {
    const nav = this.getPrimaryNavBar();
    await BrowserWaits.waitForElement(nav);
  }

  async isPrimaryTabPageDisplayed(primaryTab) {
    switch (primaryTab) {
      case 'Case list': return await caseListPage.amOnPage();
      case 'Create case':
        await BrowserWaits.retryWithActionCallback(async () => {
          const loaded = await createCaseStartPage.getLoadedJurisdictionsCount() > 1;
          if (!loaded) {
            await BrowserWaits.waitForSeconds(10);
            throw Error('Waiting for jurisdictions to load');
          }
        });
        return true;
      case 'Find case': return await searchCasePage.amOnPage();
      case 'Task list': return await taskListPage.amOnPage();
      case 'Task manager': return await taskManagerPage.amOnPage();
      case 'My work': return await myWorkPage.amOnPage();
      case 'Search': return await globalSearchPage.amOnPage();
      case 'All work': return await allWorkPage.amOnPage();
      case 'Staff': return await staffSearchPage.amOnPage();
      default: throw new Error(`Tab "${primaryTab}" is not recognised.`);
    }
  }

  async clickPrimaryNavigationWithLabel(label) {
    const tab = this.getTabElementWithText(label);
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(tab);
      await tab.click();
    });
  }
  async clickAppLogoLink () {
    await this.getHeaderAppLogoLink().click();
  }
}

module.exports = () => new HeaderPage(); 
