const BrowserWaits = require('../../../support/customWaits');
var CaseFlagsPages = require("../../pageObjects/CaseFlagsPages");

var { defineSupportCode } = require('cucumber');
const { Browser } = require('protractor');


defineSupportCode(function ({ Then, When }) {
    var caseFlagsPages = new CaseFlagsPages();

    When('I create a case flags case with the following data', async function (caseFlagsDataTable) {
        await caseFlagsPages.createCaseLevelCaseFlags(caseFlagsDataTable);
    });

    When('I navigate to the created case flags case details page', async function () {
        await caseFlagsPages.navigateToCreatedCaseFlagsPage();
    });

    Then('I am on create a case flag page', async function () {
        //await browser.sleep(10000);
        expect(await caseFlagsPages.amOnCreateACaseFlagPage("Where should this flag be added")).to.be.true;
    });

    Then('I check for case flag fields', async function (caseFlagsFields) {
        await BrowserWaits.waitForSpinnerToDissappear();
        let fieldsToCheck = caseFlagsFields.rows().map(row => row[0]);
        fieldsToCheck.forEach(async field => {
            let text = await caseFlagsPages.caseFlagFields[field].getText();
            console.log('text is : ' + text);
            //expect(await caseFlagsPages.caseFlagFields[field].getText()).to.not.be.null;
        });
    });

    Then('I see the following case flags options', async function (caseFlagsOptions) {
        //await browser.sleep(5000);
        let listedOptions = await caseFlagsPages.getCaseFlagOptions();
        let expectedOptions = caseFlagsOptions.rows().map(row => row[0]);
        expect(listedOptions).to.deep.equal(expectedOptions);
    });

    Then('I am on manage case flags page', async function () {
        //await browser.sleep(10000);
        expect(await caseFlagsPages.amOnManageCaseFlagsPage("Manage case flags")).to.be.true;
    });

    When('I select {string} case flag option', async function (caseFlagName) {
        await caseFlagsPages.selectCaseFlagOption(caseFlagName);
    });

    Then('I am on case flags {string} page', async function (pageHeader) {
        //await browser.sleep(5000);
        await BrowserWaits.waitForElement(caseFlagsPages.caseEditPageHeader);
        expect(await caseFlagsPages.caseEditPageHeader.getText()).to.include(pageHeader);
    });

    When('I make the case flag inactive', async function () {
        expect(await caseFlagsPages.statusField.getText()).to.equal('ACTIVE');
        await caseFlagsPages.deactivateFlag();
        expect(await caseFlagsPages.statusField.getText()).to.equal('INACTIVE');
    });

    When('I enter {string} in text field', async function (text) {
        await caseFlagsPages.enterTextFieldValue(text);
    });

    Then('I am on Review Flag Details Page', async function (datatable) {
        const flagDetails = datatable.hashes();
        flagDetails.forEach(async (row, index) => {
            await BrowserWaits.waitForElement(caseFlagsPages.reviewCreateCaseFlagsFields.get(index));
            console.log(await caseFlagsPages.reviewCreateCaseFlagsFields.get(index).getText());
            console.log([row['field']][0]);
            console.log(await caseFlagsPages.reviewCreatedCaseFlagsValues.get(index).getText());
            console.log([row['value']][0]);
            expect(await caseFlagsPages.reviewCreateCaseFlagsFields.get(index).getText()).to.equal([row['field']][0]);
            expect(await caseFlagsPages.reviewCreatedCaseFlagsValues.get(index).getText()).to.include([row['value']][0]);
            //await this.caseCreationData[ row ['field']].sendKeys(row ['value']);
        });
    });

    When('I click change', async function () {
        await BrowserWaits.waitForElementClickable(caseFlagsPages.changeButton);
        await caseFlagsPages.changeButton.click();
    });

    When('I click case flags previous button', async function () {
        await BrowserWaits.waitForElementClickable(caseFlagsPages.previousButton);
        await caseFlagsPages.previousButton.click();
    });

    When('I click case flags cancel link', async function () {
        await BrowserWaits.waitForElementClickable(caseFlagsPages.cancelOption);
        await caseFlagsPages.cancelOption.click();
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

    When('I enter Other flag type {string}', async function (otherFlagType) {
        await caseFlagsPages.enterOtherFlagType(otherFlagType);
        await caseFlagsPages.nextButton.click();
    });

    When('I click {string} button and check for {string} error notification', async function (buttonToClick, errorMessage) {
        if (buttonToClick === "Next") {
            await BrowserWaits.waitForElementClickable(caseFlagsPages.nextButton);
            await caseFlagsPages.nextButton.click();
            let errHeading = await caseFlagsPages.errorSummaryHeadings.getText();
            let errMsg = await caseFlagsPages.errorSummaryField.getText()
            console.log(errMsg);
            expect((await caseFlagsPages.errorSummaryHeadings.getText()).join(':')).to.include(errorMessage);
            expect(await caseFlagsPages.errorSummaryField.getText()).to.include(errorMessage);
        }
        else if (buttonToClick === "Continue") {
            await BrowserWaits.waitForElementClickable(caseFlagsPages.continueButton);
            await caseFlagsPages.continueButton.click();
            let errMsg = await caseFlagsPages.errorSummaryHeadings.getText();
            console.log(errMsg);
            expect((await caseFlagsPages.errorSummaryHeadings.getText()).join(':')).to.include(errorMessage);
        }
    });
});
