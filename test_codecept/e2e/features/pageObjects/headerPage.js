'use strict';

const browserUtil = require('../../../ngIntegration/util/browserUtil');
const { SHORT_DELAY, MID_DELAY, LONG_DELAY, LOG_LEVELS } = require('../../support/constants');

var BrowserWaits = require('../../support/customWaits');
var BrowserUtil = require('.././../../ngIntegration/util/browserUtil');
var CaseListPage = require('./CaseListPage');
var CreateCaseStartPage = require('./createCaseStartPage');
const SearchCasePage = require('../pageObjects/searchPage');
const taskListPage = require('../pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('./workAllocation/taskManagerPage');
const myWorkPage = require('../pageObjects/workAllocation/myWorkPage');
const allWorkPage = require("../../features/pageObjects/workAllocation/allWorkPage");
const globalSearchPage = require('./globalSearchCases');
const CucumberReporter = require('../../../codeceptCommon/reportLogger');


const staffSearchPage = require('./staffUI/staffUISearchPage')

const createCaseStartPage = new CreateCaseStartPage();
const caseListPage = new CaseListPage();
const searchCasePage = new SearchCasePage();

function HeaderSearch(){

  this.container = element(by.xpath("//div[@class ='hmcts-primary-navigation__search']//exui-case-reference-search-box"));
  this.label = element(by.xpath("//div[@class ='hmcts-primary-navigation__search']//exui-case-reference-search-box//span"));
  this.input = element(by.xpath("//div[@class ='hmcts-primary-navigation__search']//exui-case-reference-search-box//input[@id='caseReference']"));
  this.button = element(by.xpath("//div[@class ='hmcts-primary-navigation__search']//exui-case-reference-search-box//button"));
  
  this.waitForContainer = async function() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.container);
    });
  }

  this.searchInput = async function(input) {
    await this.waitForContainer()
    await this.input.clear()
    await this.input.sendKeys(input);
  }

  this.clickFind = async function() {
    await this.waitForContainer()

    await this.button.click();
  }

}

function HeaderPage() {
    this.jcmLogoImg = element(by.xpath("//div[contains(@class,'hmcts-header__container')]//a//img[@src='/assets/images/govuk-crest-jcm.png']"));
    this.myHMCTSHeader = element(by.xpath("//div[contains(@class,'hmcts-header__container')]//a//span[contains(text(),'MyHMCTS')]"));
    this.headerLink = $('div.hmcts-header__container a.hmcts-header__link');
    this.globalHeaderContainerWithStyle = element(by.xpath("//exui-hmcts-global-header/.."));

    this.caseReferenceSearchBox = $('.hmcts-primary-navigation__search exui-case-reference-search-box');
    
    this.primaryNavBar = element(by.css(".hmcts-primary-navigation__container"));
    this.primaryNavBar_NavItems = element(by.css(".hmcts-primary-navigation__nav ul"));
    
    this.headerMenuItems = $$('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
    this.primaryNavBar_rightSideItems = element(by.css(".hmcts-primary-navigation__search ul"));

    this.manageCases = element(by.css(".hmcts-header .hmcts-header__link"));

    this.headerAppLogoLink = $('.hmcts-header__logo a,.hmcts-header__container a.hmcts-header__link');
    this.headerBanner = $('exui-header header > div');

    this.headerCaseRefSearch = new HeaderSearch(); 

    this.navigateToRoute = async function(route){
      let currentUrl = await browser.getCurrentUrl();
      const protocol = currentUrl.split(":")[0];
      const domain = currentUrl.replace(`${protocol}://`,'').split("/")[0];

      CucumberReporter.AddMessage(`appProtocol: ${protocol}, domain ${domain}`);
      const baseUrl = `${protocol}://${domain}`

      await browser.get(baseUrl + route);
      await browserUtil.waitForLD();
      await this.waitForPrimaryNavDisplay(); 
    }

    this.getMenuItemsCount = async function(){
      return await this.headerMenuItems.count();
    }

    this.refreshBrowser = async function(){
      await browser.get(await browser.getCurrentUrl());
      await browserUtil.waitForLD();
      await this.waitForPrimaryNavDisplay();
    }


    this.amOnPage = async function(){
      return await this.headerAppLogoLink.isPresent();
    }

    this.validateHeaderDisplayedForUserType = async function(userType){
      if (userType.toLowerCase() === 'caseworker') {
        expect(await this.jcmLogoImg.isPresent(), "JCM logo displayed").to.be.false;
        expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS is displayed").to.be.false;
        expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Manage Cases");
        // expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(32, 32, 32);");

      } else if (userType.toLowerCase() === 'judicial') {
        await BrowserWaits.waitForElement(this.jcmLogoImg);
        expect(await this.jcmLogoImg.isPresent(), "JCM logo not displayed").to.be.true;
        expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS is displayed").to.be.false;
        expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Judicial Case Manager");
        // expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(141, 15, 14);");

      } else if (userType.toLowerCase() === 'solicitor') {
        await BrowserWaits.waitForElement(this.myHMCTSHeader);
        expect(await this.jcmLogoImg.isPresent(), "JCM displayed").to.be.false;
        expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS displayed").to.be.true;
        expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Manage Cases");
        // expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(32, 32, 32);");

      } else {
        throw new Error(`User type ${userType} is not recognized`);
      }
    }

    this.clickPrimaryNavigationWithLabel = async function(label){
      const ele = element(by.xpath(`//exui-hmcts-global-header//a[contains(@class,'hmcts-primary-navigation__link') and contains(text(),'${label}')]`));
      await BrowserWaits.retryWithActionCallback(async () => {
        if (userType.toLowerCase() === 'caseworker') {
          expect(await this.jcmLogoImg.isPresent(), "JCM logo displayed").to.be.false;
          expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS is displayed").to.be.false;
          expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Manage Cases");
          expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(32, 32, 32);");

        } else if (userType.toLowerCase() === 'judicial') {
          await BrowserWaits.waitForElement(this.jcmLogoImg);
          expect(await this.jcmLogoImg.isPresent(), "JCM logo not displayed").to.be.true;
          expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS is displayed").to.be.false;
          expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Judicial Case Manager");
          expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(141, 15, 14);");

        } else if (userType.toLowerCase() === 'solicitor') {
          await BrowserWaits.waitForElement(this.myHMCTSHeader);
          expect(await this.jcmLogoImg.isPresent(), "JCM displayed").to.be.false;
          expect(await this.myHMCTSHeader.isPresent(), "MyHMCTS displayed").to.be.true;
          expect(await this.headerLink.getText(), "Header link mismatch").to.includes("Manage Cases");
          expect(await this.globalHeaderContainerWithStyle.getAttribute('style')).to.includes("background-color: rgb(32, 32, 32);");

        } else {
          throw new Error(`User type ${userType} is not recognized`);
        }
      });

    }



    this.clickPrimaryNavigationWithLabel = async function(label){
      const ele = element(by.xpath(`//exui-hmcts-global-header//a[contains(@class,'hmcts-primary-navigation__link') and contains(text(),'${label}')]`));
      await BrowserWaits.waitForElement(ele)
      await ele.click()
      
    }

    this.clickAppLogoLink = async function(){
       await this.headerAppLogoLink.click();
    }

    this.caseList = function(){
      return element(by.xpath("//a[contains(text(),'Case list')]"))
    };
    this.createCase =  function() {
      return element(by.xpath("//li/a[contains(text(),'Create case')]"))
    };

    this.clickRefunds = async function () {
      let refundsLink = element(by.xpath("//li/a[contains(text(),'Refunds')]"));
      await BrowserWaits.waitForElementClickable(refundsLink);
      await refundsLink.click();
      let searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[text() = 'Refund list']"));
      await BrowserWaits.waitForElement(searchPageHeader); 
    };

    this.taskList = function(){
      return element(by.xpath("//li/a[contains(text(),'Task list')]"))
    };
    this.taskManager = function() {
      return element(by.xpath("//li/a[contains(text(),'Task manager')]"))
    };


    this.findCase = element(by.xpath("//a[contains(text(),'Find case')]"));
    this.signOut = element(by.xpath("//a[contains(text(),'Sign out')]"));

    this.contentHeader = $("#content h1");

  this.clickManageCases = async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.manageCases);
      await this.manageCases.click();
      await browserUtil.waitForLD();
    });
    //await BrowserWaits.waitForElement($('exui-case-list'));
  };

  this.clickCaseList = async function () {
    await BrowserWaits.waitForSpinnerToDissappear();
    await BrowserWaits.waitForElement(this.caseList());  
    await BrowserWaits.waitForElementClickable(this.caseList());
    await this.caseList().click();
    await browserUtil.waitForLD();
    expect(await caseListPage.amOnPage(), 'Case list page not loaded').to.be.true
  };

  this.clickCreateCase = async function () {
    await BrowserWaits.waitForSpinnerToDissappear();

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForSpinnerToDissappear(); 
      await BrowserWaits.waitForElement(this.createCase()); 
      await BrowserWaits.waitForElementClickable(this.createCase());
      await this.createCase().click();
      await browserUtil.waitForLD();
      expect(await createCaseStartPage.amOnPage()).to.be.true
    });
  };

  this.clickTaskList = async function () {
    await BrowserWaits.waitForSpinnerToDissappear();

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.taskList());
      await BrowserWaits.waitForElementClickable(this.taskList());
      await this.taskList().click();
      await browserUtil.waitForLD();
    });

  };

  this.clickTaskManager = async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.taskManager());
      await BrowserWaits.waitForElementClickable(this.taskManager());
      await this.taskManager().click();
      await browserUtil.waitForLD();
    });
  };


  this.clickFindCase = async function () {
    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(this.findCase);
      await this.findCase.click();

      var searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[contains(text() , 'Search')]"));
      await BrowserWaits.waitForElement(searchPageHeader);
    });
  };

  this.clickSignOut = async function () {
    await BrowserWaits.waitForElement(this.signOut);
    this.signOut.click();
    // browser.sleep(SHORT_DELAY);
  };

  this.isTabPresent = async function (tabDisplatText) {
    return await this.getTabElementWithText(tabDisplatText).isPresent();
  };

  this.isTabPresentInMainNav = async function (tabText) {
    return await this.primaryNavBar_NavItems.element(by.xpath('//a[contains(text(),"' + tabText + '")]')).isPresent();
  };

  this.isTabPresentInRightNav = async function (tabText) {
    return await this.primaryNavBar_rightSideItems.element(by.xpath('//a[contains(text(),"' + tabText + '")]')).isPresent();
  };


  this.waitForPrimaryNavDisplay = async function () {
    await BrowserWaits.waitForElement(this.primaryNavBar);
  };


  this.getTabElementWithText = function (tabText) {
    return this.primaryNavBar.element(by.xpath('//a[contains(text(),"' + tabText + '")]'));
  };

  this.clickTabWithText = async function (tabText) {
    await BrowserWaits.retryWithActionCallback(async () => {
      const primaryTabs = this.getPrimaryTabsDisplayed();
      const tabEle = this.getTabElementWithText(tabText).click();
      await BrowserWaits.waitForElement(tabEle);
      if (tabEle) {
        await tabEle.click();
      } else {
        await this.refreshBrowser(); 
        throw new Error(`Tab ${tabText} is not present in navigation tabs headers ${primaryTabs} `);
      }
    });
  };

  this.getPrimaryTabsDisplayed = async function  () {
    return await BrowserUtil.stepWithRetry(async () => {
      const tabsText = [];
      const tablinks = this.primaryNavBar.$$('a');
      const tabsCount = await tablinks.count();
      for (let i = 0; i < tabsCount; i++) {
        let tabLink = await tablinks.get(i);
        tabsText.push(await tabLink.getText());
      }
      return tabsText;
    });

  }


  this.getPrimaryRightSideItems = async function () {
    return await BrowserUtil.stepWithRetry(async () => {
      const tabsText = [];
      const tablinks = this.primaryNavBar_rightSideItems$$('a');
      const tabsCount = await tablinks.count();
      for (let i = 0; i < tabsCount; i++) {
        let tabLink = await tablinks.get(i);
        tabsText.push(await tabLink.getText());
      }
      return tabsText;
    });

  }

  this.isPrimaryTabPageDisplayed = async function(primaryTab){
    let retValue = null;
    switch (primaryTab){
      case 'Case list':
        retValue = await caseListPage.amOnPage();
        break;
      case 'Create case':
        const isOnpage = await createCaseStartPage.amOnPage();
        retValue =  await BrowserWaits.retryWithActionCallback(async () => {
          const juridictiosnLoaded = await createCaseStartPage.getLoadedJurisdictionsCount();
          const val =  juridictiosnLoaded > 1;
          if (!val){
            await BrowserWaits.waitForSeconds(10);
            throw Error("Waiting for jusdictions to load")
          }
          return val
        });
       
        break;
      case 'Find case':
        retValue = await searchCasePage.amOnPage();
        break;
      case 'Task list':
        retValue = await taskListPage.amOnPage();
        break;
      case 'Task manager':
        retValue = await taskManagerPage.amOnPage();
        break;
      case 'My work':
        retValue = await myWorkPage.amOnPage();
        break;
      case 'Search':
        retValue = await globalSearchPage.amOnPage();
        break;
      case 'All work':
        retValue = await allWorkPage.amOnPage();
        break;
      case 'Staff':
        retValue = await staffSearchPage.amOnPage();
        break;
      default:
        throw new Error(`Tab "${primaryTab}" is not recognised or not implemeted in test to handle.`);

    }
    return retValue;

  }

}

module.exports = new HeaderPage;
