'use strict';

const { SHORT_DELAY, MID_DELAY, LONG_DELAY } = require('../../support/constants');

function loginPage() {

    this.emailAddress = element(by.css("input#username"));
    this.password = element(by.css("[id='password']"));
    this.signinTitle = element(by.css("h1.heading-large"));
    this.signinBtn = element(by.css("input.button"));
    this.signOutlink = element(by.css("a.hmcts-header__navigation-link"));
    this.failure_error_heading = element(by.css("[id='validation-error-summary-heading']"));


    this.givenIAmLoggedIn = async function () {
        await this.enterUrEmail('');
        await this.enterPassword('');
        await this.clickSignIn();
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

module.exports = new loginPage;
