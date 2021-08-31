var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

const exclusionWorkFlow = require("../../pageObjects/workAllocation/exclusionRolesWorkFlow");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    Then('I see Add an exclusion work flow page {string} is displayed', async function (workFlowPage) {
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);


        expect(await workFlowPageObject.isDisplayed(), `${workFlowPage} work flow page not displayed`).to.be.true;
        expect(await workFlowPageObject.getHeaderText(), `${workFlowPage} work flow page header not matching`).to.include(workFlowPage);
        expect(await workFlowPageObject.getHeaderCaption(), `${workFlowPage} work flow page header caption not matching`).to.include("Add an exclusion");

    });


    When('I select Choose who the exclusion is for option {string} in add exclusion work flow', async function (whoTheExclusionIsForOption) {
        await exclusionWorkFlow.chooseWhoExclusion.selectRadioOption(whoTheExclusionIsForOption);
    });

    When('I click continue in add exclusion work flow page {string}', async function (workFlowPage) {
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);
        await workFlowPageObject.clickContinueButton();
    });

    When('I select Choose the person\'s role option {string} in add exclusion work flow', async function (excludeRoleOption) {
        await exclusionWorkFlow.choosePersonRole.selectRadioOption(excludeRoleOption);
    });


    When('I enter description {string} in add exclusion Describe the exclusion page', async function (exclusionDescription) {
        await exclusionWorkFlow.describeExclusion.enterExclusionDescription(exclusionDescription);
    });

    function getWorkflowPageObject(workFlowPage) {
        let workFlowPageObject = null;

        if (workFlowPage === 'Choose who the exclusion is for') {
            workFlowPageObject = exclusionWorkFlow.chooseWhoExclusion;
        } else if (workFlowPage === "Choose the person's role") {
            workFlowPageObject = exclusionWorkFlow.choosePersonRole;
        } else if (workFlowPage === "Find the person") {
            workFlowPageObject = exclusionWorkFlow.findPersonPage;
        } else if (workFlowPage === "Describe the exclusion") {
            workFlowPageObject = exclusionWorkFlow.describeExclusion;
        } else if (workFlowPage === "Check your answers") {
            workFlowPageObject = exclusionWorkFlow.checkYourAnswers;
        } else {
            throw new Error(`work flow page "${workFlowPage}" is not recognised or not implemented in test step definition.`);
        }
        return workFlowPageObject;
    }



});