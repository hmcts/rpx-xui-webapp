var CaseFlagsPages = require("../../pageObjects/CaseFlagsPages");

var { defineSupportCode } = require('cucumber');


defineSupportCode(function ({ Then, When }) {
    var caseFlagsPages = new CaseFlagsPages();

    When('I create a case flags case with the following data', async function(caseFlagsDataTable){
        await caseFlagsPages.createCaseLevelCaseFlags(caseFlagsDataTable);
    });

    When('I navigate to the created case flags case details page', async function(){
        await caseFlagsPages.navigateToCreatedCaseFlagsPage();
    });

    Then('I am on create a case flag page', async function () {
        await browser.sleep(15000);
        expect(await caseFlagsPages.amOnCreateACaseFlagPage("Where should this flag be added")).to.be.true;
    });

    Then('I check for case flag fields', async function(caseFlagsFields){
        let fieldsToCheck = caseFlagsFields.rows().map( row =>  row[0] );
        fieldsToCheck.forEach( async field =>  {
            let text = await caseFlagsPages.caseFlagFields[field].getText();
            console.log('text is : ' + text);
            //expect(await caseFlagsPages.caseFlagFields[field].getText()).to.not.be.null;
        });
    });

    Then('I see the following case flags options', async function(caseFlagsOptions){
        await browser.sleep(5000);
        let listedOptions = await caseFlagsPages.getCaseFlagOptions();
        let expectedOptions = caseFlagsOptions.rows().map( row =>  row[0] );
        expect(listedOptions).to.deep.equal(expectedOptions);
    });

    Then('I am on manage case flags page', async function () {
        await browser.sleep(15000);
        expect(await caseFlagsPages.amOnManageCaseFlagsPage("Manage case flags")).to.be.true;
    });

    When('I select {string} case flag option', async function (caseFlagName) {
        await caseFlagsPages.selectCaseFlagOption(caseFlagName);
    });

    When('I select case flag option {int}', async function(count){
        await caseFlagsPages.selectCaseFlagOptionNumber(count);
    });

    Then('I am on case flags {string} page', async function(pageHeader){
        await browser.sleep(5000);
        expect (await caseFlagsPages.caseEditPageHeader.getText()).to.include(pageHeader);
    });

    When('I enter {string} in text field', async function (text) {
        await caseFlagsPages.enterTextFieldValue(text);
    });

    When('I submit case flag', async function () {
        await caseFlagsPages.submit();
    });

    Then('I see the case flags banner', async function () {
        expect(await caseFlagsPages.getBannerText()).to.match(/\d+ active flag.? on this case/);
    });

    When('I make flag status {string} if {string} and modify comment {string', async function (statusBefore, statusAfter, comment) {
        await caseFlagsPages.manageFlagStatus(statusBefore, statusAfter, comment);
    });
});
