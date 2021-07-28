var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');

const chooseWhoExclusionIsForPage = require("../../pageObjects/workAllocation/chooseWhoExclusionIsForPage");
const choosePersonRolePage = require("../../pageObjects/workAllocation/choosePersonRolePage");
const findThePersonPage = require("../../pageObjects/workAllocation/findPersonPage");
const describeExclusionPage = require("../../pageObjects/workAllocation/describeExclusionPage");
const checkYourAnswersPage = require("../../pageObjects/workAllocation/checkYourAnswersPage");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    When('I click add link for {string} in case roles and access page', async function (roleType){
        await caseRolesAndAccessPage.clickTableColumnLinkForAccessRoleType(roleType);

    });

    When('I click delete link for {string} in case roles and access page', async function (roleType) {
        await caseRolesAndAccessPage.clickTableColumnLinkForAccessRoleType(roleType);

    });

    Then('I validate table column displayed for {string} in case roles and access page', async function (roleType){
        expect(await caseRolesAndAccessPage.isTableColumnDisplayedForAccessRoleType(roleType)).to.be.true;
    });

    Then('I validate for {string} table column {string} value is {string} in case roles and access page', async function (roleType,ColumnHeader,columnValue) {
        expect(await caseRolesAndAccessPage.getTableColumnValueForAccessRoleType(roleType, ColumnHeader)).to.includes(columnValue);
    });

    Then('I see Add an exclusion work flow page {string} is displayed', async function(workFlowPage){
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);


        expect(await workFlowPageObject.isDisplayed(), `${workFlowPage} work flow page not displayed`).to.be.true;
        expect(await workFlowPageObject.getHeaderText(), `${workFlowPage} work flow page header not matching`).to.include(workFlowPage);
        expect(await workFlowPageObject.getHeaderCaption(), `${workFlowPage} work flow page header caption not matching`).to.include("Add an exclusion");
        
    });


    When('I select Choose who the exclusion is for option {string} in add exclusion work flow', async function(whoTheExclusionIsForOption){
        await chooseWhoExclusionIsForPage.selectRadioOption(whoTheExclusionIsForOption);
    });

    When('I click continue in add exclusion work flow page {string}', async function (workFlowPage){
        let workFlowPageObject = getWorkflowPageObject(workFlowPage);
        await workFlowPageObject.clickContinueButton();
    });

    When('I select Choose the person\'s role option {string} in add exclusion work flow', async function(excludeRoleOption){
        await choosePersonRolePage.selectRadioOption(excludeRoleOption);
    });


    When('I enter description {string} in add exclusion Describe the exclusion page', async function(exclusionDescription){
        await describeExclusionPage.enterExclusionDescription(exclusionDescription);
    });

    function getWorkflowPageObject(workFlowPage){
        let workFlowPageObject = null;

        if (workFlowPage === 'Choose who the exclusion is for') {
            workFlowPageObject = chooseWhoExclusionIsForPage;
        } else if (workFlowPage === "Choose the person's role") {
            workFlowPageObject = choosePersonRolePage;
        } else if (workFlowPage === "Find the person") {
            workFlowPageObject = findThePersonPage;
        } else if (workFlowPage === "Describe the exclusion") {
            workFlowPageObject = describeExclusionPage;
        } else if (workFlowPage === "Check your answers") {
            workFlowPageObject = checkYourAnswersPage;
        } else {
            throw new Error(`work flow page "${workFlowPage}" is not recognised or not implemented in test step definition.`);
        }
        return workFlowPageObject;
    }



});