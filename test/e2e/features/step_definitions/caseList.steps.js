
var CaseListPage = require("../pageObjects/CaseListPage");

var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    var caseListPage = new CaseListPage();

    Then('I am on case list page', async function () {
        expect(await caseListPage.amOnPage()).to.be.true;
    });

    When('I select search criteria jurisdiction {string} case type {string} state {string} in case list page', 
    async function(jurisdiction,caseType,state){
        await caseListPage.selectJurisdiction(jurisdiction);
        await caseListPage.selectCaseType(caseType);
        await caseListPage.selectState(state);
    });

    When('I click search Apply in case list page', async function(){
        await caseListPage.clickSearchApplyBtn();
    });

    When('I click search Reset in case list page', async function () {
        await caseListPage.clickSearchResetBtn();
    });

    Then('I wait to see case results displayed', async function(){
        await caseListPage.waitForCaseResultsToDisplay();
    });

    When('I open first case in case list page', async function () {
        await caseListPage.clickFirstCaseLink();
    })

    Then('I wait to see no case results displayed', async function () {
        await caseListPage.waitForNoCaseResultsToDisplay();

    });

    Then('I see cases in case list page', async function(){
        expect(await caseListPage.hasCaseListAnyResults()).to.be.true;
    });

    Then('I see no cases in case list page', async function () {
        expect(await caseListPage.hasCaseListAnyResults()).to.be.false;
    });
    

});
