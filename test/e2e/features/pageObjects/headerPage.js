'use strict';

const { SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

var BrowserWaits = require('../../support/customWaits');

function HeaderPage() {
    this.primaryNavBar = element(by.css("nav.hmcts-primary-navigation ul"));
    this.manageCases = element(by.css(".hmcts-header .hmcts-header__link"));
    this.caseList = element(by.xpath("//a[contains(text(),'Case list')]"));
    this.createCase = element(by.xpath("//li/a[contains(text(),'Create case')]"));
    this.findCase = element(by.xpath("//a[contains(text(),'Find case')]"));
    this.signOut = element(by.xpath("//a[contains(text(),'Sign out')]"));

    this.contentHeader = $("#content h1");

  this.clickManageCases = function () {
    this.manageCases.click();
    browser.sleep(SHORT_DELAY);
  };

  this.clickCaseList = async function () {
    await this.caseList.click();

    var searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[text() = 'Case List']"));
    await BrowserWaits.waitForElement(searchPageHeader);
  };

  this.clickCreateCase = async function () {
    await this.createCase.click();
    await BrowserWaits.waitForElement($('#cc-jurisdiction'));

  };

  this.clickFindCase = async function () {
    await this.findCase.click();

    var searchPageHeader = element(by.xpath("//*[@id = 'content']//h1[text() = 'Search']"));
    await BrowserWaits.waitForElement(searchPageHeader); 
  };

  this.clickSignOut = function () {
    this.signOut.click();
    browser.sleep(SHORT_DELAY);
  };

  this.isTabPresent = async function(tabDisplatText) {

    return await this.getTabElementWithText(tabDisplatText).isPresent();
  };

  this.waitForPrimaryNavDisplay = async function(){
    await BrowserWaits.waitForElement(this.primaryNavBar);  
  };


  this.getTabElementWithText = function(tabText) {
    return this.primaryNavBar.element(by.xpath('//a[contains(text(),"'+tabText+'")]')); 
  };
}

module.exports = new HeaderPage;
