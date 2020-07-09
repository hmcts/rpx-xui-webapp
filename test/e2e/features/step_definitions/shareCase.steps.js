
var ShareCasePage = require("../pageObjects/shareCasePage");

var { defineSupportCode } = require('cucumber');
const { browser } = require("protractor");

defineSupportCode(function ({ And, But, Given, Then, When }) {
    var shareCasePage = new ShareCasePage();

    Then('I see Share Case page is displayed', async function () {
        expect(await shareCasePage.amOnPage()).to.be.true;
    });

    Then('I see Share case page has {int} cases listed', async function (selectedCasesCount) {
        expect(await shareCasePage.casesCount(),"Cases count listed does not match expected").to.be.equal(selectedCasesCount);
    });

});
