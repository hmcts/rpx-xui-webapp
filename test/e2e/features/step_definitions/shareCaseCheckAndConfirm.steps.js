
var ShareCaseCheckAndConfirmPage = require("../pageObjects/shareCaseCheckAndConfirmPage");
const BrowserWaits = require("../../support/customWaits");

var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");

defineSupportCode(function ({ And, But, Given, Then, When }) {
    var shareCaseCheckAndConfirmPage = new ShareCaseCheckAndConfirmPage();

    //Share Case Confirm Selection Steps

    Then('I see Share Case check and confirm page', async function () {
        expect(await shareCaseCheckAndConfirmPage.amOnPage(), "Share Case Check and confirm page not displayed").to.be.true;
    });

    Then('I see Share Case changes are listed as modified in share case page', async function () {
        let issues = await shareCaseCheckAndConfirmPage.validateShareCaseChangesForListedCases();
        expect(issues.length, "Share Case check and confirm not matching expected : " + JSON.stringify(issues)).to.equal(0);
    });

});
