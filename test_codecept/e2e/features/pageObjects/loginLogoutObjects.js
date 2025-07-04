'use strict';

const { $, elementByXpath } = require('../../../helpers/globals');
const { SHORT_DELAY, MID_DELAY, LONG_DELAY, LOG_LEVELS } = require('../../support/constants');
const BrowserWaits = require('../../support/customWaits');
const CucumberReportLogger = require('../../../codeceptCommon/reportLogger');

class LoginLogout {
  get emailAddress() {
    return $('#username');
  }

  get password() {
    return $('#password');
  }

  get signinTitle() {
    return elementByXpath('//*[@id="authorizeCommand"]/h1');
  }

  get signinBtn() {
    return $('input.button');
  }

  get signOutlink() {
    return elementByXpath('//a[@class="hmcts-header__navigation-link"]');
  }

  get failure_error_heading() {
    return $('#validation-error-summary-heading');
  }

  get dashboard_header() {
    return $('.govuk-heading-xl');
  }

  get incorrectCredentialsErrorHeader() {
    return elementByXpath('//h2[@id = "validation-error-summary-heading"][contains(text(),"Incorrect email or password")]');
  }

  async reuseLoginSession(email) {
    const { users, reuseCounter } = inject();
    const matchingSession = users.filter((user) => user.email === email);
    CucumberReportLogger.AddMessage(`Users sessions available ${users.length}`);
    CucumberReportLogger.AddMessage(`User ${email} session ${matchingSession.length > 0 ? 'exists' : 'does not exist'}`);
    share({ reuseCounter: matchingSession.length > 0 ? (reuseCounter + 1) : reuseCounter });
  }

  async givenIAmLoggedIn(email, password) {
    await this.reuseLoginSession(email);
    await BrowserWaits.waitForElement(this.signinTitle);
    await this.loginWithCredentials(email, password);
  }

  async isLoginCredentialsErrorDisplayed() {
    return await this.incorrectCredentialsErrorHeader.isVisible();
  }

  async givenIAmUnauthenticatedUser() {
    await this.enterUrEmail('test_nonexisting_or_invalid@gmail.com');
    await this.enterPassword('123');
    await this.clickSignIn();
    await BrowserWaits.waitForElement($('.error-summary'));
  }

  async enterUrEmail(email) {
    await BrowserWaits.waitForElement(this.emailAddress);
    await this.emailAddress.fill('');
    await this.emailAddress.type(email);
  }

  async enterPassword(password) {
    await BrowserWaits.waitForElement(this.password);
    await this.password.fill('');
    await this.password.type(password);
  }

  async clickSignIn() {
    await BrowserWaits.retryWithActionCallback(async () => {
      await this.signinBtn.click();
    });
  }

  async waitFor(selector) {
    return await page.waitForSelector(selector, { timeout: LONG_DELAY });
  }

  defaultTime() {
    this.setDefaultTimeout(60 * 1000);
  }

  async getEmailFieldValue() {
    return await this.emailAddress.getAttribute('value');
  }

  async loginWithCredentials(username, password) {
    await BrowserWaits.waitForElement(this.emailAddress);
    await this.enterUrEmail(username);
    await this.enterPassword(password);
    await this.clickSignIn();

    try {
      await BrowserWaits.waitForElement($('exui-app-header'));
      const { users } = inject();
      const cookies = await page.context().cookies();
      users.push({ email: username, cookies });
      share({ users });
    } catch (err) {
      // Silent catch for login redirect failures
    }
  }
}

module.exports = new LoginLogout();