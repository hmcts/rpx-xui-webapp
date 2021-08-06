var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

const allocateRoleWorkFlow = require("../../pageObjects/workAllocation/allocateRoleWorkFlow");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see Allocate role work flow page {string} with caption {string} is displayed', async function (workFlowPage,captionHeader) {
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);


        expect(await workFlowPageObject.isDisplayed(), `${workFlowPage} work flow page not displayed`).to.be.true;
        expect(await workFlowPageObject.getHeaderText(), `${workFlowPage} work flow page header not matching`).to.include(workFlowPage);
        expect(await workFlowPageObject.getHeaderCaption(), `${workFlowPage} work flow page header caption not matching`).to.include(captionHeader);

    });

    When('I click continue in Allocate role work flow page {string}', async function (workFlowPage) {
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);
        await workFlowPageObject.clickContinueButton();
    });


    When('I select Choose a role option {string} in Allocate role work flow', async function (role) {
        await allocateRoleWorkFlow.chooseRolesPage.selectRadioOption(role);
    });

    When('I select Choose how to allocate option {string} in Allocate role work flow', async function (howTo) {
        await allocateRoleWorkFlow.chooseHowToAllocateRolePage.selectRadioOption(howTo);
    });


    When('I select Choose how to allocate option {string} in Allocate role work flow', async function (howTo) {
        await allocateRoleWorkFlow.chooseHowToAllocateRolePage.selectRadioOption(howTo);
    });

    When('I select duration option {string} in Allocate role work flow', async function(durationOption){
        await allocateRoleWorkFlow.durationOfRolePage.selectRadioOption(durationOption);
    });

    Then('I validate duration option {string} in Allocate role work flow has caption text {string}', async function (durationOption,caption){
        const actualCaption = await allocateRoleWorkFlow.durationOfRolePage.getRadioOptionCaptionText(durationOption);
        expect(actualCaption).to.include(caption);
    });


    Then('I validate date input field {string} is displayed {string} in Allocate role work flow page', async function (dateInputLabel,displayStatus) {
        const isDisplayed = await allocateRoleWorkFlow.durationOfRolePage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.equal(displayStatus.toLowerCase().includes('yes'))
    });

    Then('I validate date input field {string} displayed in Allocate role work flow page', async function(dateInputLabel){
        const isDisplayed = await allocateRoleWorkFlow.durationOfRolePage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.be.true
    });

    Then('I validate date input field {string} NOT displayed in Allocate role work flow page', async function (dateInputLabel) {
        const isDisplayed = await allocateRoleWorkFlow.durationOfRolePage.isDateInputWithLabelDisplayed(dateInputLabel);
        expect(isDisplayed).to.be.false
    });

    When('I enter duration date for field {string} with current date plus {int} in Allocate role work flow', async function(dateInputField, bydays){
        let dateToEnter = new Date();
        dateToEnter.setDate(dateToEnter.getDate() + bydays);
        await allocateRoleWorkFlow.durationOfRolePage.enterDayInDateInputWithLabel(dateInputField, dateToEnter.getDay());
        await allocateRoleWorkFlow.durationOfRolePage.enterMonthInDateInputWithLabel(dateInputField, dateToEnter.getMonth());
        await allocateRoleWorkFlow.durationOfRolePage.enterYearInDateInputWithLabel(dateInputField, dateToEnter.getFullYear());

    });

    When('I enter duration date for field {string} with current date minus {int} in Allocate role work flow', async function (dateInputField, bydays) {
        let dateToEnter = new Date();
        dateToEnter.setDate(dateToEnter.getDate() - bydays);
        await allocateRoleWorkFlow.durationOfRolePage.enterDayInDateInputWithLabel(dateInputField, dateToEnter.getDay());
        await allocateRoleWorkFlow.durationOfRolePage.enterMonthInDateInputWithLabel(dateInputField, dateToEnter.getMonth());
        await allocateRoleWorkFlow.durationOfRolePage.enterYearInDateInputWithLabel(dateInputField, dateToEnter.getFullYear());
    });

    When('I click continue in Allocate role work flow page {string}', async function (workFlowPage) {
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);
        await workFlowPageObject.clickContinueButton();
    });

    When('I select Choose the person\'s role option {string} in add exclusion work flow', async function (excludeRoleOption) {
        await exclusionWorkFlow.choosePersonRole.selectRadioOption(excludeRoleOption);
    });

    function getWorkflowPageObject(workFlowPage) {
        let workFlowPageObject = null;

        if (workFlowPage === 'Choose a role') {
            workFlowPageObject = allocateRoleWorkFlow.chooseRolesPage;
        } else if (workFlowPage === "Choose how to allocate the role") {
            workFlowPageObject = allocateRoleWorkFlow.chooseHowToAllocateRolePage;
        } else if (workFlowPage === "Find the person") {
            workFlowPageObject = allocateRoleWorkFlow.findPersonPage;
        } else if (workFlowPage === "Duration of role") {
            workFlowPageObject = allocateRoleWorkFlow.durationOfRolePage;
        } else if (workFlowPage === "Check your answers") {
            workFlowPageObject = allocateRoleWorkFlow.checkYourAnswers;
        } else {
            throw new Error(`work flow page "${workFlowPage}" is not recognised or not implemented in test step definition.`);
        }
        return workFlowPageObject;
    }



});

