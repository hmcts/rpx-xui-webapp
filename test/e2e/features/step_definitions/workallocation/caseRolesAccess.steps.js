var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');

const caseDetailsPage = require("../../pageObjects/caseDetailsPage");
const caseRolesAndAccessPage = require("../../pageObjects/workAllocation/caseRolesAccessPage");

const ArrayUtil = require('../../../utils/ArrayUtil');


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

});