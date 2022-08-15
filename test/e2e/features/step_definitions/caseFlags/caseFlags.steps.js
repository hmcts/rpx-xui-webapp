var CaseFlagsPages = require("../../pageObjects/CaseFlagsPages");

var { defineSupportCode } = require('cucumber');


defineSupportCode(function ({ Then, When }) {
    var caseFlagsPages = new CaseFlagsPages();

    Then('I am on case flags {string} page', async function (caseFlagsPageHeader) {
        await browser.sleep(15000);
        expect(await caseFlagsPages.amOnCreateACaseFlagPage(caseFlagsPageHeader)).to.be.true;
    });

    When('I select {string} case flag option', async function (caseFlagName) {
        await caseFlagsPages.selectCaseFlagOption(caseFlagName);
    });

    When('I enter {string} in text field', async function (text) {
        await caseFlagsPages.enterTextFieldValue(text);
    });

    When('I submit case flag', async function () {
        await caseFlagsPages.submit();
    });

    Then('I see the case flags banner', async function () {
        expect(await caseFlagsPages.getBannerText()).to.match(/There are \d+ active flags on this case/);
    });

    When('I make flag status {string} if {string} and modify comment {string', async function (statusBefore, statusAfter, comment) {
        await caseFlagsPages.manageFlagStatus(statusBefore, statusAfter, comment);
    });
});
