
var CaseListPage = require("../pageObjects/CaseListPage");

var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    var caseListPage = new CaseListPage();

    Then('I am on case list page', async function () {
        expect(await caseListPage.amOnPage()).to.be.true;
    });
    

});
