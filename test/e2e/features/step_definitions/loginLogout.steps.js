'use strict';

const loginPage = require('../pageObjects/loginLogoutObjects');
const { defineSupportCode } = require('cucumber');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');
const config = require('../../config/conf.js');
const EC = protractor.ExpectedConditions;
const BrowserWaits = require("../../support/customWaits");
const BrowserUtil = require('../../../ngIntegration/util/browserUtil');

async function waitForElement(el) {
  await browser.wait(result => {
    return element(by.className(el)).isPresent();
  }, 20000);
}

defineSupportCode(function ({ Given, When, Then }) {


  async function loginattemptCheckAndRelogin(username, password, world) {

    let loginAttemptRetryCounter = 1;

    while (loginAttemptRetryCounter < 3) {

      try {
        await BrowserWaits.waitForstalenessOf(loginPage.emailAddress, 5);
        break;
      } catch (err) {
        let emailFieldValue = await loginPage.getEmailFieldValue();
        if (!emailFieldValue.includes(username)) {
          if (loginAttemptRetryCounter === 1) {
            firstAttemptFailedLogins++;
          }
          if (loginAttemptRetryCounter === 2) {
            secondAttemptFailedLogins++;
          }

          console.log(err + " email field is still present with empty value indicating  Login page reloaded due to EUI-1856 : Login re attempt " + loginAttemptRetryCounter);
          world.attach(err + " email field is still present with empty value indicating Login page reloaded due to EUI-1856 : Login re attempt " + loginAttemptRetryCounter);
          await loginPage.loginWithCredentials(username, password);
          loginAttemptRetryCounter++;
        }
      }
    }
    console.log("ONE ATTEMPT:  EUI-1856 issue occured / total logins => " + firstAttemptFailedLogins + " / " + loginAttempts);
    world.attach("ONE ATTEMPT:  EUI-1856 issue occured / total logins => " + firstAttemptFailedLogins + " / " + loginAttempts);

    console.log("TWO ATTEMPT: EUI-1856 issue occured / total logins => " + secondAttemptFailedLogins + " / " + loginAttempts);
    world.attach("TWO ATTEMPT: EUI-1856 issue occured / total logins => " + secondAttemptFailedLogins + " / " + loginAttempts);


  }

  let loginAttempts = 0;
  let firstAttemptFailedLogins = 0;
  let secondAttemptFailedLogins = 0;


  When('I navigate to Expert UI Url', async function () {
    await browser.driver.manage()
      .deleteAllCookies();
    await browser.get(config.config.baseUrl);

    const world = this;
    await BrowserWaits.retryForPageLoad(loginPage.signinTitle,function(message){
      world.attach("Expert UI Url reload attempt : "+message);
    });

    expect(await loginPage.signinBtn.isDisplayed()).to.be.true;

  });

  Then(/^I should see failure error summary$/, async function () {
    await waitForElement('heading-large');
    await expect(loginPage.failure_error_heading.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.failure_error_heading.getText())
      .to
      .eventually
      .equal('Incorrect email or password');
    browser.sleep(SHORT_DELAY);
  });


  Then(/^I am on Idam login page$/, async function () {
    await waitForElement('heading-large');
    await expect(loginPage.signinTitle.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in');
    await expect(loginPage.emailAddress.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.password.isDisplayed()).to.eventually.be.true;
    browser.sleep(SHORT_DELAY);

  });


  When(/^I enter an valid email-address and password to login$/, async function () {
    await loginPage.emailAddress.sendKeys(this.config.username);          //replace username and password
    browser.sleep(MID_DELAY);
    await loginPage.password.sendKeys(this.config.password);
    // browser.sleep(SHORT_DELAY);
    await loginPage.signinBtn.click();
    browser.sleep(SHORT_DELAY);

    loginAttempts++;
    await loginattemptCheckAndRelogin(this.config.username, this.config.password, this);

  });


  When(/^I enter an Invalid email-address and password to login$/, async function () {
    await loginPage.givenIAmUnauthenticatedUser();

  });


  Given(/^I should be redirected to the Idam login page$/, async function () {

    const world = this;
    await BrowserWaits.retryForPageLoad(loginPage.signinTitle, function(message){
      world.attach("Idam login page load attempt : "+message)
    });

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


  Then('I should be redirected to EUI dashboard page', async function () {

    const world = this;
    await BrowserUtil.waitForLD();
    await BrowserWaits.retryForPageLoad($("exui-header"), function(message){
      world.attach("Redirected to EUI dashboard , attempt reload : "+message);
    });

    await expect(loginPage.dashboard_header.isDisplayed()).to.eventually.be.true;
    await expect(loginPage.dashboard_header.getText())
      .to
      .eventually
      .contains('Case List');

  });

  Given('I am logged into Expert UI with valid user details', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.username, config.config.params.password);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.username, config.config.params.password, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given('I am logged into Expert UI with non professional user details', async function () {
    await loginPage.givenIAmLoggedIn(this.config.caseworkerUser, this.config.caseworkerPassword);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(this.config.caseworkerUser, this.config.caseworkerPassword, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });
  });

  Given('I am logged into Expert UI with FPL user details', async function () {
    await loginPage.givenIAmLoggedIn("kurt@swansea.gov.uk", "Password12");
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin("kurt@swansea.gov.uk", "Password12", this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });
  });

  Given('I am logged into Expert UI with valid Case Worker user details', async function () {
    await loginPage.givenIAmLoggedIn(this.config.caseworkerUser, this.config.caseworkerPassword);
    loginAttempts++;
    await loginattemptCheckAndRelogin(this.config.caseworkerUser, this.config.caseworkerPassword, this);
  })

  Given(/^I am logged into Expert UI with Probate user details$/, async function () {
    browser.sleep(MID_DELAY);
    await loginPage.emailAddress.sendKeys(config.config.params.username);
    browser.sleep(MID_DELAY);
    await loginPage.password.sendKeys(config.config.params.password);
    await loginPage.clickSignIn();
    browser.sleep(LONG_DELAY);

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.username, config.config.params.password, this);
  });

  Given(/^I navigate to Expert UI Url direct link$/, async function () {
    await browser.driver.manage()
      .deleteAllCookies();
    await browser.get(config.config.baseUrl + '/cases/case-filter');
  });

  Then(/^I should be redirected back to Login page after direct link$/, async function () {
    await BrowserWaits.waitForElement(loginPage.signinBtn);
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in');
    browser.sleep(LONG_DELAY);
  });

});
