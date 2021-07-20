'use strict';

var { defineSupportCode } = require('cucumber')

const BrowserUtil = require('../../../ngIntegration/util/browserUtil');
const errorPage = require('../pageObjects/common/errorPage');

defineSupportCode(function ({ Given, When, Then }) {
    Then('I see error message of type {string} with message {string}', async function(errorMessageType,errorMessage){
       const errorMessageDisplayed = await errorPage.getErrorMessage(); 
        expect(errorMessageDisplayed).to.include(errorMessage);
    });
});