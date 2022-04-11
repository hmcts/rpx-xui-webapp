var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

const workFlowPage = require("../../pageObjects/caseAccessManagement/approveRequestWorkflow");


defineSupportCode(function ({ And, But, Given, Then, When }) {
    const durationSelectionPage = workFlowPage.durationSelectionPage; 

    Then('I see Approve specific access work flow page {string} with caption {string} is displayed', async function (header, captionHeader) {
        await BrowserWaits.retryWithActionCallback(async () => {
            expect(await durationSelectionPage.isDisplayed(), `${header} work flow page not displayed`).to.be.true;
            expect(await durationSelectionPage.getHeaderText(), `${header} work flow page header not matching`).to.include(header);
            expect(await durationSelectionPage.getHeaderCaption(), `${header} work flow page header caption not matching`).to.include(captionHeader);

        });
       

    });


    When('I click continue in approve pecific access  request work flow page {string}', async function (workFlowPageType) {
        await workFlowPage.continueBtn.click();
    });

    When('I select duration option {string} in approve speific access request work flow', async function (durationOption) {
        await durationSelectionPage.selectRadioOption(durationOption);
    });

    Then('I validate duration option {string} has caption text {string} in approve speific access request work flow', async function (durationOption, caption) {
        const actualCaption = await durationSelectionPage.getRadioOptionCaptionText(durationOption);
        expect(actualCaption).to.include(caption);
    });


    Then('I validate date input field {string} is displayed {string} in approve pecific access  request work flow page', async function (dateInputLabel, displayStatus) {
        const isDisplayed = await durationSelectionPage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.equal(displayStatus.toLowerCase().includes('yes'))
    });

    Then('I validate date input field {string} displayed in approve pecific access request work flow page', async function (dateInputLabel) {
        const isDisplayed = await durationSelectionPage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.be.true
    });

    Then('I validate date input field {string} NOT displayed in approve pecific access request work flow page', async function (dateInputLabel) {
        const isDisplayed = await durationSelectionPage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.be.false
    });

    When('I enter duration date for field {string} with current date plus {int} days in approve speific access request work flow', async function (dateInputField, bydays) {
        let dateToEnter = new Date();
        dateToEnter.setDate(dateToEnter.getDate() + bydays);
        await durationSelectionPage.enterDayInDateInputWithLabel(dateInputField, dateToEnter.getDate());
        await durationSelectionPage.enterMonthInDateInputWithLabel(dateInputField, dateToEnter.getMonth() + 1);
        await durationSelectionPage.enterYearInDateInputWithLabel(dateInputField, dateToEnter.getFullYear());

    });

    When('I enter duration date for field {string} with current date minus {int} days in approve speific access request work flow', async function (dateInputField, bydays) {
        let dateToEnter = new Date();
        dateToEnter.setDate(dateToEnter.getDate() - bydays);
        await durationSelectionPage.enterDayInDateInputWithLabel(dateInputField, dateToEnter.getDay());
        await durationSelectionPage.enterMonthInDateInputWithLabel(dateInputField, dateToEnter.getMonth() + 1);
        await durationSelectionPage.enterYearInDateInputWithLabel(dateInputField, dateToEnter.getFullYear());
    });

    Then('I validate another period field {string} validation error displayed is {string} in approve speific access request work flow', async function (field, isDisplayed) {
        expect(await durationSelectionPage.isValidationErrorDisplayedForDateInput(field)).to.equal(isDisplayed.toLowerCase().includes('true'))
    });

    Then('I validate another period field {string} validation error message is {string} in approve speific access request work flow', async function (field, validationMessage) {
        expect(await durationSelectionPage.getAnotherPeriodValidationMessageForField(field)).to.contains(validationMessage);
    });


    Then('I see option {string} selected in duration selection of approve speific access request work flow', async function (durationOption) {
        const durationOptionInput = durationSelectionPage.getRadioOptionInputElement(durationOption);
        expect(await durationOptionInput.isSelected()).to.be.true;
    });

});

