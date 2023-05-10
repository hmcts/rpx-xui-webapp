
const CaseRolesTable = require("../common/caseRolesTable");
const BrowserWaits = require('../../../support/customWaits');
const BrowserUtil = require('../../../../ngIntegration/util/browserUtil');

class CaseRolesAccessPage{
    constructor(){
        this.pageContainer = $('exui-roles-and-access-container');
        
        this.legalOpsRolesAccessTable = new CaseRolesTable(`//h2[contains(text(),'Legal Ops')]/following-sibling::exui-case-roles-table[position()=1]`);
        this.addLegalOpsRoleLink = element(by.xpath(`//h2[contains(text(),'Legal Ops')]/following-sibling::p[position()=1]//exui-allocate-a-role-link//a[contains(text(),'Allocate a legal ops role')]`));

        this.adminRolesAccessTable = new CaseRolesTable(`//h2[contains(text(),'Admin')]/following-sibling::exui-case-roles-table[position()=1]`);
        this.addAdminRoleLink = element(by.xpath(`//h2[contains(text(),'Admin')]/following-sibling::p[position()=1]//exui-allocate-a-role-link//a[contains(text(),'Allocate an admin role')]`));

        this.judicialRolesAccessTable = new CaseRolesTable(`//h2[contains(text(),'Judiciary')]/following-sibling::exui-case-roles-table[position()=1]`);
        this.addJudicialRoleLink = element(by.xpath(`//h2[contains(text(),'Judiciary')]/following-sibling::p[position()=1]//exui-allocate-a-role-link//a[contains(text(),'Allocate a judicial role')]`));

        
        this.exclusionTable = new CaseRolesTable(`//h2[contains(text(),'Exclusions')]/following-sibling::exui-exclusions-table[position()=1]`);
        this.addExcluusionLink = element(by.xpath(`//h2[contains(text(),'Exclusions')]/following-sibling::p[position()=1]//a[contains(text(),'Add')]`));

    }

    async waitForPage(){
        await BrowserWaits.waitForElement(this.pageContainer);
    }

    async isPageDisplayed(){
        try{
            await this.waitForPage();
            return true;
        }catch(err){
            return false;
        }
    }

    getTableForRoleACcessType(type){
        let rolesForNormalizedCaseAndSpace = type.toLowerCase();
        let table = null;
        rolesForNormalizedCaseAndSpace = rolesForNormalizedCaseAndSpace.split(" ").join("");
        if (rolesForNormalizedCaseAndSpace.includes('legalops')) {
            table = this.legalOpsRolesAccessTable;
        } else if (rolesForNormalizedCaseAndSpace.includes('jud')) {
            table = this.judicialRolesAccessTable;
        } else if (rolesForNormalizedCaseAndSpace.includes('exclusion')) {
            table = this.exclusionTable;
        } else {
            throw new Error(`${rolesFor} is not recognized as valid role type`);
        }
        return table;
    }

    async isTableColumnDisplayedForAccessRoleType(rolesFor, headerText){
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.isTableHeaderDisplayed(headerText); 
    }

    async getTableColumnValueForAccessRoleType(rolesFor,atRow,headerText) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.getColumnValueAtRow(atRow,headerText);
    }


    async isTableColumnLinkPresentForAccessRoleType(rolesFor, atRow,linktext) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.isLinkWithTextPresent(atRow, linktext);
    }

    async clickTableColumnLinkForAccessRoleType(rolesFor,atRow,linktext) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return table.clickLinkWithText(atRow,linktext);
    }

    async isAllocateRoleLinkPresentForCategory(rolecategory){
        const isPresent = await this.getAllocateRoleLinkForCategory(rolecategory).isPresent();
        if (!isPresent){
            return false;
        }
        return await this.getAllocateRoleLinkForCategory(rolecategory).isDisplayed();
    }

    async clickAllocateRoleLinkForCategory(rolecategory){
        const element = this.getAllocateRoleLinkForCategory(rolecategory);
        await BrowserUtil.scrollToElement(element);
        await element.click();
    }

    async isExclusionAddLinkPresent(){
        return this.getExclusionAddLink().isPresent();
    }

    async clickAddExclusionLink(){
        await this.getExclusionAddLink().click();
    }

    getAllocateRoleLinkForCategory(rolecategory){
        let allLink = null;
        const normalisedRoleCategory = rolecategory.toLowerCase().split(" ").join("");
        if (normalisedRoleCategory.includes('legalops')) {
            allLink = this.addLegalOpsRoleLink;
        } else if (normalisedRoleCategory.includes('jud')) {
            allLink = this.addJudicialRoleLink;
        } else if (normalisedRoleCategory.includes('exclusion')) {
            allLink = this.addExcluusionLink;
        } else if (normalisedRoleCategory.includes('admin')) {
            allLink = this.addAdminRoleLink;
        }  else {
            throw new Error(`${rolecategory} is not recognized as valid role type`);
        }
        return allLink;
    }

    getExclusionAddLink() {
        return $(`exui-roles-and-access p a[href*="add-exclusion"]`);
    }

}

module.exports = new CaseRolesAccessPage();
