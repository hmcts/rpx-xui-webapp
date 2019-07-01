'use strict';

const loginPage = require('../pageObjects/loginLogoutObjects');
const { defineSupportCode } = require('cucumber');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');
const config = require('../../config/conf.js');
const EC = protractor.ExpectedConditions;

async function waitForElement(el) {
  await browser.wait(result => {
    return element(by.className(el)).isPresent();
  }, 600000);
}

defineSupportCode(function ({ Given, When, Then }) {

  When(/^I navigate to Expert UI Url$/, { timeout: 600 * 1000 }, async function () {
    await browser.get(config.config.baseUrl);
    await browser.driver.manage()
      .deleteAllCookies();
    await browser.refresh();
    browser.sleep(AMAZING_DELAY);
  });

  Then(/^I should see failure error summary$/, async function () {
    await waitForElement('heading-large');
    await expect(loginPage.failure_error_heading.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.failure_error_heading.getText())
      .to
      .eventually
      .equal('Incorrect email or password');
  });


  Then(/^I am on Idam login page$/, { timeout: 600 * 1000 }, async function () {
    await waitForElement('heading-large');
    await expect(loginPage.signinTitle.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in');
    await expect(loginPage.emailAddress.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.password.isDisplayed()).to.eventually.be.true;

  });


  When(/^I enter an valid email-address and password to login$/, async function () {
    await loginPage.emailAddress.sendKeys(this.config.username);          //replace username and password
    await loginPage.password.sendKeys(this.config.password);
    // browser.sleep(SHORT_DELAY);
    await loginPage.signinBtn.click();
    browser.sleep(SHORT_DELAY);

  });


  When(/^I enter an Invalid email-address and password to login$/, async function () {
    await loginPage.givenIAmUnauthenticatedUser();

  });


  Given(/^I should be redirected to the Idam login page$/, async function () {
    browser.sleep(LONG_DELAY);
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in');
    browser.sleep(LONG_DELAY);
  });


  Then(/^I select the sign out link$/, async function () {
    browser.sleep(SHORT_DELAY);
    await expect(loginPage.signOutlink.isDisplayed()).to.eventually.be.true;
    browser.sleep(SHORT_DELAY);
    await loginPage.signOutlink.click();
    browser.sleep(SHORT_DELAY);
  });


  Then(/^I should be redirected to EUI dashboard page$/, async function () {
    await waitForElement('govuk-heading-xl');
    await expect(loginPage.dashboard_header.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.dashboard_header.getText())
      .to
      .eventually
      .equal('Case List');

  });

  Given(/^I am logged into Expert UI with SSCS judge details$/, async function () {
    browser.sleep(LONG_DELAY);
    await loginPage.emailAddress.sendKeys(this.config.username);
    await loginPage.password.sendKeys(this.config.password);
    await loginPage.clickSignIn();
    browser.sleep(MID_DELAY);
  });

  Given(/^I am logged into Expert UI with FR judge details$/, async function () {
    browser.sleep(LONG_DELAY);
    await loginPage.emailAddress.sendKeys(this.config.username);
    await loginPage.password.sendKeys(this.config.password);
    await loginPage.clickSignIn();
    browser.sleep(LONG_DELAY);
  });

  Given(/^I navigate to Expert UI Url direct link$/, { timeout: 600 * 1000 }, async function () {
    await browser.get(config.config.baseUrl + '/cases/case-filter');
    await browser.driver.manage()
      .deleteAllCookies();
    await browser.refresh();
    browser.sleep(AMAZING_DELAY);
  });

  Then(/^I should be redirected back to Login page after direct link$/, async function () {
    browser.sleep(LONG_DELAY);
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in');
    browser.sleep(LONG_DELAY);
  });

});
