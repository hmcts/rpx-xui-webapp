'use strict';

const { SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

var BrowserWaits = require('../../support/customWaits');

function HeaderPage() {

    this.manageCases = element(by.css(".hmcts-header .hmcts-header__link"));
    this.caseList = element(by.xpath("//a[contains(text(),'Case list')]"));
    this.createCase = element(by.xpath("//li/a[contains(text(),'Create case')]"));
    this.findCase = element(by.xpath("//a[contains(text(),'Find case')]"));
    this.signOut = element(by.xpath("//a[contains(text(),'Sign out')]"));


  this.clickManageCases = function () {
    this.manageCases.click();
    browser.sleep(SHORT_DELAY);
  };

  this.clickCaseList = function () {
    this.caseList.click();
    browser.sleep(SHORT_DELAY);
  };

  this.clickCreateCase = async function () {
    await this.createCase.click();
    await BrowserWaits.waitForElement($('#cc-jurisdiction'));

  };

  this.clickFindCase = function () {
    this.findCase.click();
    browser.sleep(LONG_DELAY);
  };

  this.clickSignOut = function () {
    this.signOut.click();
    browser.sleep(SHORT_DELAY);
  };
}

module.exports = new HeaderPage;
