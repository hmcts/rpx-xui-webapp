'use strict';

const loginPage = require('../pageObjects/loginLogoutObjects');
const headerPage = require('../pageObjects/headerPage');

const { defineSupportCode } = require('cucumber');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');
const config = require('../../config/conf.js');
const EC = protractor.ExpectedConditions;
const BrowserWaits = require("../../support/customWaits");
const CucumberReportLogger = require('../../support/reportLogger');

const BrowserUtil = require('../../../ngIntegration/util/browserUtil');
const testConfig = require('../../config/appTestConfig');

async function waitForElement(el) {
  await browser.wait(result => {
    return element(by.className(el)).isPresent();
  }, 20000);
}

defineSupportCode(function ({ Given, When, Then }) {
  let invalidCredentialsCounter = 0;
  let testCounter = 0;

  async function loginattemptCheckAndRelogin(username, password, world) {
    testCounter++;
    let loginAttemptRetryCounter = 1;

    while (loginAttemptRetryCounter < 5) {
      let emailFieldValue = "";

      try {
        // await BrowserWaits.waitForstalenessOf(loginPage.emailAddress, 5);
        await BrowserWaits.waitForCondition(async () => {
          let isEmailFieldDisplayed = await loginPage.emailAddress.isPresent() ;
          let credentialsErrorPresent = await loginPage.isLoginCredentialsErrorDisplayed();
          let isEmailValuePresent = false;
          if (isEmailFieldDisplayed){
            let isEmailValuePresent = (await loginPage.emailAddress.getText()) !== "";
          }
          let errorMessage = "";
          if (credentialsErrorPresent){
            invalidCredentialsCounter++;
            errorMessage = testCounter + " Credentials error occured " + invalidCredentialsCounter;
          }

          if (isEmailFieldDisplayed && !isEmailValuePresent){
            errorMessage = errorMessage +" : " +testCounter+" login page refresh ";
          }

          const currentUrl = await browser.getCurrentUrl();
          if (!isEmailFieldDisplayed && currentUrl.includes("idam-web-public")){
            errorMessage = errorMessage + ":" +testCounter+" Unknown IDAM service error occured. See attached screenshot ";
          }
          // console.log(testCounter +" : error message =>"+errorMessage+"<=");
          if (errorMessage !== ""){
            throw new Error(errorMessage);
          } else if (isEmailFieldDisplayed && emailValuePresent){
            console.log(testCounter + "  ");

            return false;
          }else{
            return true;
          }

        });

        break;
      } catch (err) {
        if (!emailFieldValue.includes(username)) {
          if (loginAttemptRetryCounter === 1) {
            firstAttemptFailedLogins++;
          }
          if (loginAttemptRetryCounter === 2) {
            secondAttemptFailedLogins++;
          }


          console.log(err + " : Login re attempt " + loginAttemptRetryCounter);
          world.attach(err + " : Login re attempt " + loginAttemptRetryCounter);
        console.log(err);
          await browser.driver.manage()
            .deleteAllCookies();
          const baseUrl = process.env.TEST_URL || 'http://localhost:3000/'

          await browser.get(baseUrl);
          await BrowserWaits.waitForElement(loginPage.emailAddress);
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
    await BrowserWaits.retryWithActionCallback(async function(){
      await browser.driver.manage()
        .deleteAllCookies();
      CucumberReportLogger.AddMessage("App base url : " + config.config.baseUrl);
      await browser.get(config.config.baseUrl);
      await BrowserWaits.waitForElement(loginPage.signinTitle);
      expect(await loginPage.signinBtn.isDisplayed()).to.be.true;
    });

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
      .equal('Sign in or create an account');
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

    await BrowserWaits.retryWithActionCallback(async () => {
      await BrowserWaits.waitForElement(loginPage.signinTitle);
      await expect(loginPage.signinTitle.getText())
        .to
        .eventually
        .equal('Sign in or create an account');
    });
    browser.sleep(LONG_DELAY);

  });


  Then(/^I select the sign out link$/, async function () {

    await BrowserWaits.retryWithActionCallback(async () => {
      await browser.sleep(SHORT_DELAY);
      await expect(loginPage.signOutlink.isDisplayed()).to.eventually.be.true;
      await browser.sleep(SHORT_DELAY);
      await BrowserWaits.waitForElementClickable(loginPage.signOutlink);
      await loginPage.signOutlink.click();
    });

    browser.sleep(SHORT_DELAY);
  });


  Then('I should be redirected to EUI dashboard page', async function () {

    const world = this;

    await BrowserWaits.retryWithActionCallback(async () => {
      try{
        await BrowserUtil.waitForLD();
        await BrowserWaits.waitForElement($("exui-header .hmcts-primary-navigation__item"));
        await expect(loginPage.dashboard_header.isDisplayed()).to.eventually.be.true;
        
        await BrowserUtil.waitForLD();
      }catch(err){
        await browser.get(config.config.baseUrl);
        throw new Error(err);
      }

    });

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

  Given('I am logged into Expert UI with valid Probate back office user credentials', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.usernameProbate, config.config.params.password);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.usernameProbate, config.config.params.password, this);

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
    await loginPage.emailAddress.sendKeys(config.config.params.probate_username);
    browser.sleep(MID_DELAY);
    await loginPage.password.sendKeys(config.config.params.probate_password);
    await loginPage.clickSignIn();
    browser.sleep(LONG_DELAY);

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.probate_username, config.config.params.probate_password, this);
  });

  Given('I am logged into Expert UI as IA {string}', async function (usertype) {
    browser.sleep(MID_DELAY);
    await loginPage.emailAddress.sendKeys(config.config.params.ia_users_credentials[usertype].username);
    browser.sleep(MID_DELAY);
    await loginPage.password.sendKeys(config.config.params.ia_users_credentials[usertype].password);
    await loginPage.clickSignIn();
    browser.sleep(LONG_DELAY);
    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.username, config.config.params.password, this);
  });

  Then('I should see the expected banner for IA {string}', async function (usertype) {
    let bannerElementBgColor = await headerPage.headerBanner.getAttribute('style');
    let navItems =  await headerPage.primaryNavBar_NavItems.getText();
    if(usertype === 'judge') {
      // expect(bannerElementBgColor).to.equal('background-color: rgb(141, 15, 14);');
      expect(navItems).to.not.include('Create case');
      return;
    }
    expect(bannerElementBgColor).to.equal('background-color: rgb(32, 32, 32);');
});

  Given('I am logged into Expert UI caseworker-ia-adm user details', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.caseworker_iac_adm_username, config.config.params.caseworker_iac_adm_password);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.caseworker_iac_adm_username, config.config.params.caseworker_iac_adm_password, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given('I am logged into Expert UI caseworker-ia-caseofficer user details', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.caseworker_iac_off_username, config.config.params.caseworker_iac_off_password);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.caseworker_iac_off_username, config.config.params.caseworker_iac_off_password, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given('I am logged into Expert UI with test user identified as {string}', async function (testUserIdentifier) {
    const world = this;

    const matchingUsers = testConfig.users[testConfig.testEnv].filter(user => user.userIdentifier === testUserIdentifier);
    if (matchingUsers.length === 0 ){
      throw new Error(`Test user with identifier ${testUserIdentifier} is not found, check app test config anf fix test issue`);
    }

    const userEmail = matchingUsers[0].email;
    const key = matchingUsers[0].key;

    await loginPage.givenIAmLoggedIn(userEmail, key);

    loginAttempts++;
    await loginattemptCheckAndRelogin(userEmail, key, this);
    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given('I am logged into Expert UI with hrs testes user details', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.hrsTesterUser, config.config.params.hrsTesterPassword);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.hrsTesterUser, config.config.params.hrsTesterPassword, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given('I am logged into Expert UI with case flags user details', async function () {
    await loginPage.givenIAmLoggedIn(config.config.params.caseFlagsUser, config.config.params.caseFlagsPassword);
    const world = this;

    loginAttempts++;
    await loginattemptCheckAndRelogin(config.config.params.caseFlagsUser, config.config.params.caseFlagsPassword, this);

    await BrowserWaits.retryForPageLoad($("exui-app-header"), function (message) {
      world.attach("Login success page load load attempt : " + message)
    });

  });

  Given(/^I navigate to Expert UI Url direct link$/, async function () {
    await browser.driver.manage()
      .deleteAllCookies();
    const baseUrl = process.env.TEST_URL || 'http://localhost:3000/'
    await browser.get(baseUrl + '/cases/case-filter');
  });

  Then(/^I should be redirected back to Login page after direct link$/, async function () {
    await BrowserWaits.waitForElement(loginPage.signinBtn);
    await expect(loginPage.signinTitle.getText())
      .to
      .eventually
      .equal('Sign in or create an account');
    browser.sleep(LONG_DELAY);
  });

});
