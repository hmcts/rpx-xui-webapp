'use strict';

const { SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

var BrowserWaits = require('../../support/customWaits');
var BrowserUtil = require('.././../../ngIntegration/util/browserUtil');

function HeaderPage() {

    this.primaryNavBar = element(by.css(".hmcts-primary-navigation__container"));
    this.primaryNavBar_NavItems = element(by.css(".hmcts-primary-navigation__nav ul"));
    this.primaryNavBar_rightSideItems = element(by.css(".hmcts-primary-navigation__search ul"));

    this.manageCases = element(by.css(".hmcts-header .hmcts-header__link"));

    this.headerAppLogoLink = $('.hmcts-header__logo a');

    this.amOnApp = async function(){
      return await this.headerAppLogoLink.isPresent();
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
    await BrowserWaits.waitForElement(this.manageCases);  
    await this.manageCases.click();
    await BrowserWaits.waitForElement($('exui-case-list'));  
  };

  this.clickCaseList = async function () {
    await BrowserWaits.waitForElement(this.caseList());  
    await this.caseList().click();
    var searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[contains(text(),'Case List')]"));
    await BrowserWaits.waitForElement(searchPageHeader);
  };

  this.clickCreateCase = async function () {
    await BrowserWaits.waitForElement(this.createCase()); 
    await this.createCase().click();
    await BrowserWaits.waitForElement($('#cc-jurisdiction'));
  };

  this.clickTaskList = async function () {
    await BrowserWaits.waitForElement(this.taskList());
    await this.taskList().click();
  };

  this.clickTaskManager = async function () {
    await BrowserWaits.waitForElement(this.taskManager());
    await this.taskManager().click();
  };


  this.clickFindCase = async function () {
    await BrowserWaits.waitForElement(this.findCase);  
    await this.findCase.click();

    var searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[contains(text() , 'Search')]"));
    await BrowserWaits.waitForElement(searchPageHeader); 
  };

  this.clickSignOut = async function () {
    await BrowserWaits.waitForElement(this.signOut);  
    this.signOut.click();
    browser.sleep(SHORT_DELAY);
  };

  this.isTabPresent = async function (tabDisplatText) {
    return await this.getTabElementWithText(tabDisplatText).isPresent();
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
      if (tabEle) {
        await tabEle.click();
      } else {
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

}

module.exports = new HeaderPage;
