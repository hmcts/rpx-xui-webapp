

const BrowserWaits = require("../../support/customWaits");
const ArrayUtil = require("../../utils/ArrayUtil");
var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I save current window handle reference {string}', async function (windowReference) {
        global.scenarioData["window." + windowReference] = await browser.driver.getWindowHandle();
    });

    Given('I navigate to page route {string}', async function (pageRoute) {
        await browser.get(pageRoute);

    });

    Then('I see page with css locator {string}', async function(cssLocator){
        await BrowserWaits.waitForElement($(cssLocator),10);
    });


});
