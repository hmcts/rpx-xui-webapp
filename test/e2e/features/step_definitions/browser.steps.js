

const BrowserWaits = require("../../support/customWaits");
const ArrayUtil = require("../../utils/ArrayUtil");
var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const browserutl = require('../../../ngIntegration/util/browserUtil');
const headerPage = require('../../../e2e/features/pageObjects/headerPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I save current window handle reference {string}', async function (windowReference) {
        global.scenarioData["window." + windowReference] = await browser.driver.getWindowHandle();
    });

    Given('I navigate to page route {string}', async function (pageRoute) {
        await BrowserWaits.retryWithActionCallback(async () => {
            await headerPage.navigateToRoute(pageRoute);
        });
    });

    Then('I see page with css locator {string}', async function(cssLocator){

        await BrowserWaits.waitForElement($(cssLocator),60*1000);
    });

    Given('I set debug text {string} in element with css selector {string}', async function(debugtext, cssSelector){
        await browserutl.addTextToElementWithCssSelector(cssSelector, debugtext, true);
    });

    Then('I validate debug text {string} not present in element with css selector {string}', async function (debugtext, cssSelector){
        expect(await browserutl.isTextPresentInElementWithCssSelector(cssSelector, debugtext)).to.be.false
    });


});
