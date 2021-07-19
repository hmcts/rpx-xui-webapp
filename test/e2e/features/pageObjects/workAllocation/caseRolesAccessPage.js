
const CaseRolesTable = require("../common/caseRolesTable");

class CaseRolesAccessPage{
    constructor(){
        this.legalOpsRolesAccessTable = new CaseRolesTable($('exui-role-'));
        this.addLegalOpsRoleLink = element(by.xpath("//<place holder>/p/a[contains(text(),'Add')]"));

        this.judicialRolesAccessTable = new CaseRolesTable($('exui-role-'));
        this.addJudicialRoleLink = element(by.xpath("//<place holder>/p/a[contains(text(),'Add')]"));

        this.exclusionTable = new CaseRolesTable($('exui-role-exclusions'));
        this.addExcluusionLink = element(by.xpath("//exui-role-exclusions/p/a[contains(text(),'Add')]"));

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

    async getTableColumnValueForAccessRoleType(rolesFor,headerText) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.getColumnValue(headerText);
    }


    async isTableColumnLinkPresentForAccessRoleType(rolesFor,linktext) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.isLinkWithTextPresent(linktext);
    }

    async clickTableColumnLinkForAccessRoleType(linktext) {
        const table = this.getTableForRoleACcessType(rolesFor);
        return await table.clickLinkWithText(linktext);
    }


}

module.exports = new CaseRolesAccessPage();
