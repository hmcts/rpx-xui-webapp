'use strict';

const { SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

var BrowserWaits = require('../../support/customWaits');

function loginLogoutObjects() {

  this.emailAddress = element(by.css("[id='username']"));
  this.password = element(by.css("[id='password']"));
  this.signinTitle = element(by.xpath("//*[@id=\"authorizeCommand\"]/h1"));
  this.signinBtn = element(by.css("input.button"));
  this.signOutlink = element(by.xpath("//a[@class='hmcts-header__navigation-link']"));
  this.failure_error_heading = element(by.css("[id='validation-error-summary-heading']"));
  this.dashboard_header= element(by.css("[class='govuk-heading-xl']"));


  this.givenIAmLoggedIn = async function (email,password) {
    BrowserWaits.waitForElement(this.signinTitle);
    await this.enterUrEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
    BrowserWaits.waitForElement(this.signOutlink);


  };

  this.givenIAmUnauthenticatedUser = async function () {
    await this.enterUrEmail("test@gmail.com");
    await this.enterPassword("123");
    await this.clickSignIn();
  };

  this.enterUrEmail = async function (email) {
    await this.emailAddress.sendKeys(email);
  };

  this.enterPassword = async function (password) {
    await this.password.sendKeys(password);
  };

  this.clickSignIn = function () {
    this.signinBtn.click();
    browser.sleep(SHORT_DELAY);
  };

  this.waitFor = function (selector) {
    return browser.wait(function () {
      return browser.isElementPresent(selector);
    }, LONG_DELAY);
  };


  this.defaultTime = function () {
    this.setDefaultTimeout(60 * 1000);
  };


}

module.exports = new loginLogoutObjects;
