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
        let workFlowPageObject = null;

        if (workFlowPage === 'Choose who the exclusion is for'){
            expect(await chooseWhoExclusionIsForPage.isDisplayed()).to.be.true;
        } else if (workFlowPage === "Choose the person's role") {
            expect(await choosePersonRolePage.isDisplayed()).to.be.true;
        } else if (workFlowPage === "Find the person") {
            expect(await findThePersonPage.isDisplayed()).to.be.true;
        } else if (workFlowPage === "Describe the exclusion") {
            expect(await describeExclusionPage.isDisplayed()).to.be.true;
        } else if (workFlowPage === "Check your answers") {
            expect(await checkYourAnswersPage.isDisplayed()).to.be.true;
        }else{
            throw new Error(`work flow page "${workFlowPage}" is not recognised or not implemented in test step definition.`);
        }
        
    });

});