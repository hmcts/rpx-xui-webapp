'use strict';

const loginPage = require('../../pages/loginPage');
const { defineSupportCode } = require('cucumber');
const { AMAZING_DELAY, SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../../support/constants');

const config = require('../../../config/conf.js');
const EC = protractor.ExpectedConditions;

async function waitForElement(el) {
    await browser.wait(result => {
        return element(by.className(el)).isPresent();
    }, 600000);
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I navigate to the XUI url$/, { timeout: 600 * 1000 }, async function () {
        await browser.get(config.config.baseUrl);
        await browser.driver.manage()
            .deleteAllCookies();
        await browser.refresh();
        browser.sleep(SHORT_DELAY);
    });

    When(/^I am redirected to the IDAM login page$/, { timeout: 600 * 1000 }, async function () {
        await waitForElement('heading-large');
        await expect(loginPage.signinTitle.isDisplayed()).to.eventually.be.true;
        await expect(loginPage.signinTitle.getText())
            .to
            .eventually
            .equal('Sign in');
        await expect(loginPage.emailAddress.isDisplayed()).to.eventually.be.true;
        await expect(loginPage.password.isDisplayed()).to.eventually.be.true;
    });

    When(/^I enter valid credentials$/, async function () {
        await loginPage.emailAddress.sendKeys(this.config.username);          //replace username and password
        await loginPage.password.sendKeys(this.config.password);
        // browser.sleep(SHORT_DELAY);
        await loginPage.signinBtn.click();
        browser.sleep(SHORT_DELAY);
    });

    Then(/^I should be redirected to the XUI home page$/, async function () {
        await waitForElement('XUI');
    });

});
