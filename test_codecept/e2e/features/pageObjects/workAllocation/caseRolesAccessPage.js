const { $, elementByXpath, isPresent } = require('../../../../helpers/globals');
const BrowserUtil = require('../../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../../support/customWaits');
const CaseRolesTable = require('../common/caseRolesTable');

class CaseRolesAccessPage{
  constructor(){
    this.legalOpsRolesAccessTable = new CaseRolesTable('//h2[contains(text(),\'Legal Ops\')]/following-sibling::exui-case-roles-table[position()=1]');

    this.adminRolesAccessTable = new CaseRolesTable('//h2[contains(text(),\'Admin\')]/following-sibling::exui-case-roles-table[position()=1]');

    this.judicialRolesAccessTable = new CaseRolesTable('//h2[contains(text(),\'Judiciary\')]/following-sibling::exui-case-roles-table[position()=1]');

    this.exclusionTable = new CaseRolesTable('//h2[contains(text(),\'Exclusions\')]/following-sibling::exui-exclusions-table[position()=1]');
  }

  get container() { 
    return $('exui-roles-and-access-container'); 
  }

  get addLegalOpsRoleLink() {
    return elementByXpath(
      '//h2[contains(text(),\'Legal Ops\')]/following-sibling::p[position()=1]' +
      '//exui-allocate-a-role-link//a[contains(text(),\'Allocate a legal ops role\')]'
    );
  }

  get addAdminRoleLink() {
    return elementByXpath(
      '//h2[contains(text(),\'Admin\')]/following-sibling::p[position()=1]' +
      '//exui-allocate-a-role-link//a[contains(text(),\'Allocate an admin role\')]'
    );
  }

  get addJudicialRoleLink() {
    return elementByXpath(
      '//h2[contains(text(),\'Judiciary\')]/following-sibling::p[position()=1]' +
      '//exui-allocate-a-role-link//a[contains(text(),\'Allocate a judicial role\')]'
    );
  }

  get addExcluusionLink() {
    return elementByXpath(
      '//h2[contains(text(),\'Exclusions\')]/following-sibling::p[position()=1]//a[contains(text(),\'Add\')]'
    );
  }

  async waitForPage(){
    await BrowserWaits.waitForElement(this.pageContainer);
  }

  async isPageDisplayed(){
    try {
      await this.waitForPage();
      return true;
    } catch (err){
      return false;
    }
  }

  getTableForRoleACcessType(type){
    let rolesForNormalizedCaseAndSpace = type.toLowerCase();
    let table = null;
    rolesForNormalizedCaseAndSpace = rolesForNormalizedCaseAndSpace.split(' ').join('');
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

  async getTableColumnValueForAccessRoleType(rolesFor, atRow, headerText) {
    const table = this.getTableForRoleACcessType(rolesFor);
    return await table.getColumnValueAtRow(atRow, headerText);
  }

  async isTableColumnLinkPresentForAccessRoleType(rolesFor, atRow, linktext) {
    const table = this.getTableForRoleACcessType(rolesFor);
    return await table.isLinkWithTextPresent(atRow, linktext);
  }

  async clickTableColumnLinkForAccessRoleType(rolesFor, atRow, linktext) {
    const table = this.getTableForRoleACcessType(rolesFor);
    return table.clickLinkWithText(atRow, linktext);
  }

  async isAllocateRoleLinkPresentForCategory(rolecategory){
    const isPresent = await isPresent(this.getAllocateRoleLinkForCategory(rolecategory));
    if (!isPresent){
      return false;
    }
    return await this.getAllocateRoleLinkForCategory(rolecategory).isVisible();
  }

  async clickAllocateRoleLinkForCategory(rolecategory){
    const element = this.getAllocateRoleLinkForCategory(rolecategory);
    await BrowserUtil.scrollToElement(element);
    await element.click();
  }

  async isExclusionAddLinkPresent(){
    return isPresent(this.getExclusionAddLink());
  }

  async clickAddExclusionLink(){
    await this.getExclusionAddLink().click();
  }

  getAllocateRoleLinkForCategory(rolecategory){
    let allLink = null;
    const normalisedRoleCategory = rolecategory.toLowerCase().split(' ').join('');
    if (normalisedRoleCategory.includes('legalops')) {
      allLink = this.addLegalOpsRoleLink;
    } else if (normalisedRoleCategory.includes('jud')) {
      allLink = this.addJudicialRoleLink;
    } else if (normalisedRoleCategory.includes('exclusion')) {
      allLink = this.addExcluusionLink;
    } else if (normalisedRoleCategory.includes('admin')) {
      allLink = this.addAdminRoleLink;
    } else {
      throw new Error(`${rolecategory} is not recognized as valid role type`);
    }
    return allLink;
  }

  getExclusionAddLink() {
    return $('exui-roles-and-access p a[href*="add-exclusion"]');
  }
}

module.exports = new CaseRolesAccessPage();
