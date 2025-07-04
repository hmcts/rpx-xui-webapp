const { $, $$, elementByXpath } = require('../../../../helpers/globals');

const reportLogger = require('../../../../codeceptCommon/reportLogger');
const BrowserWaits = require('../../../support/customWaits');

const addUserPage = require('./adduserPage');

const MessageBanner = require('../messageBanner');
class StaffSearchPage{
  constructor() {
    this.messageBanner = new MessageBanner();
    this.advancedSearchFilter = new AdvancedSearch();
    this.staffUsersList = new StaffUsersList();
  }

  get pageContainer() {
    return $('exui-staff-users');
  }

  get addUserButton() {
    return elementByXpath("//button[contains(text(),'Add new user')]");
  }

  get basicSearch() {
    return $('exui-staff-search');
  }

  get advancedSearchContainer() {
    return $('exui-staff-adv-filter');
  }

  get searchButton() {
    return $('exui-staff-users #applyFilter');
  }

  get advancedSearchLink() {
    return elementByXpath("//exui-staff-users//a[contains(text(),'Advanced search')]");
  }

  get hideAdvancedSearchLink() {
    return elementByXpath("//exui-staff-users//a[contains(text(),'Hide advanced search')]");
  }

  get partialNameField() {
    return $('input#user-partial-name');
  }

  async validateSuccessMessageBanner(message){
    const isDisplayed = await this.messageBanner.isBannerMessageDisplayed();
    expect(isDisplayed, 'Success message banner not displayed').to.be.true;

    const messages = await this.messageBanner.getBannerMessagesDisplayed();
    const expectedMessage = messages.filter((msg) => msg.includes(message));
    expect(expectedMessage !== undefined, `expected message ${message} not displayed, actual ${JSON.stringify(messages)}`).to.be.true;
  }

  async amOnPage(){
    await this.pageContainer.wait();
    return await this.pageContainer.isDisplayed();
  }

  async isBasicSearchDisplayed(){
    return await this.basicSearch.isDisplayed();
  }

  async clickAdvancedSearchLink(){
    await this.advancedSearchLink.click();
  }

  async clickHideAdvancedSearchLink(){
    await this.hideAdvancedSearchLink.click();
  }

  async validateBasicSearchPage(){
    expect(await this.basicSearch.isDisplayed()).to.be.true;
    expect(await this.partialNameField.isDisplayed()).to.be.true;
    expect(await this.advancedSearchLink.isDisplayed()).to.be.true;
  }

  async validateAdvancedSearchPage() {
    expect(await this.advancedSearchContainer.isDisplayed()).to.be.true;
    expect(await this.serviceFilter.isDisplayed()).to.be.true;
    expect(await this.locationFilter.isDisplayed()).to.be.true;
    expect(await this.roleFilter.isDisplayed()).to.be.true;
    expect(await this.skillFilter.isDisplayed()).to.be.true;

    expect(await this.hideAdvancedSearchLink.isDisplayed()).to.be.true;
  }

  async isAdvancedSearchDisplayed() {
    return await this.advancedSearchContainer.isDisplayed();
  }

  async performBasicSearch(searchTerm){
    expect(await this.isBasicSearchDisplayed(), 'Not in basic search page').to.be.true;
    await await this.partialNameField.sendKeys(searchTerm);
    await this.searchButton.click();
  }

  async performAdvancedSearch(searchInputs) {
    const inputKeys = Object.keys(searchInputs);
    expect(await this.isAdvancedSearchDisplayed(), 'Not in advanced search page').to.be.true;
    for (const filterItem of inputKeys){
      const inputVal = searchInputs[filterItem];
      reportLogger.AddMessage(`Staff UI advanced search: select filter ${filterItem}: ${JSON.stringify(inputVal)}`);
      switch (filterItem){
        case 'Services':
          for (const service of inputVal) {
            await this.advancedSearchFilter.selectService(service);
          }

          break;
        case 'Locations':
          for (const location of inputVal) {
            await this.advancedSearchFilter.selectLocation(location);
          }
          break;
        case 'Job title':
          await this.advancedSearchFilter.selectJobTitle(inputVal);
          break;
        case 'User type':
          await this.advancedSearchFilter.selectUserType(inputVal);
          break;
        case 'Roles':
          await this.advancedSearchFilter.selectRoles(inputVal);
          break;
        case 'Skills':
          await this.advancedSearchFilter.selectskills(inputVal);
          break;
      }
    }
    await this.searchButton.click();
  }

  async isStaffUserListContainerDisplayed(){
    return await this.staffUsersList.isDisplayed();
  }

  async validateListValuesNotEmpty(){
    await this.staffUsersList.validateResultRowDisplaysValues();
  }

  async clickAddNewUser(){
    await this.addUserButton.click();
    await addUserPage.container.wait();
    expect(await addUserPage.isDisplayed()).to.be.true;
  }
}

class AdvancedSearch{
  constructor() {}

  get locator() {
    return $('exui-staff-adv-filter');
  }

  get searchService() {
    return {
      serviceInput: this.locator.locator('exui-search-service input'),
      addButton: this.locator.locator('xuilib-find-service #add-service'),
      selectedValues: this.locator.locator('.selection-container a'),
      searchResults: $$('.mat-option-text')
    };
  }

  get searchLocation() {
    return {
      serchInput: this.locator.locator('exui-search-location input'),
      addButton: this.locator.locator('.location-picker-custom a'),
      searchResults: $$('.mat-option-text'),
      selectedValues: this.locator.locator('.selection-container a')
    };
  }

  get userType() {
    return this.locator.locator('select#select_user-type');
  }

  get jobTitle() {
    return this.locator.locator('select#select_user-job-title');
  }

  get skills() {
    return this.locator.locator('select#select_user-skills');
  }

  get roles() {
    return this.locator.locator('#user-role #checkbox_user-role .govuk-checkboxes__item');
  }

  async selectService(servicename){
    await this.searchService.serviceInput.sendKeys(servicename);
    // await this.searchService.searchResults.wait();
    await browser.sleep(2);
    const result = await this.searchService.searchResults.getItemWithText(servicename);
    await result.click();
    await this.searchService.addButton.click();
  }

  async selectLocation(locationName) {
    await this.searchLocation.serchInput.sendKeys(locationName);
    await BrowserWaits.retryWithActionCallback(async () => {
      await browser.sleep(2);
      const result = await this.searchLocation.searchResults.getItemWithText(locationName);
      await result.click();
    });

    await this.searchLocation.addButton.click();
  }

  async selectUserType(userType){
    await this.userType.selectOptionWithLabel(userType);
  }

  async selectJobTitle(jobTitle) {
    await this.jobTitle.selectOptionWithLabel(jobTitle);
  }

  async selectSkill(skill) {
    const skillElement = await this.skills.selectOptionWithLabel(skill);
  }

  async selectRoles(roles) {
    const allRolesCount = await this.roles.count();

    for (let i = 0; i < allRolesCount; i++){
      const roleElement = this.roles.get(i);
      const label = await roleElement.$('label').getText();
      if (roles.includes(label.trim())){
        const input = roleElement.$('input');
        await input.click();
      }
    }
  }
}

class StaffUsersList {
  constructor() {}

  get staffUsersList() {
    return $('exui-staff-user-list');
  }

  get nameColumn() {
    return this.staffUsersList.locator('td.cdk-column-name');
  }

  get servicesColumn() {
    return this.staffUsersList.locator('td.cdk-column-services');
  }

  get locationsColumn() {
    return this.staffUsersList.locator('td.cdk-column-locations');
  }

  get jobTitleColumn() {
    return this.staffUsersList.locator('td.cdk-column-jobTitle');
  }

  get statusColumn() {
    return this.staffUsersList.locator('td.cdk-column-status');
  }

  async isDisplayed(){
    return await this.staffUsersList.isDisplayed();
  }

  async validateResultRowDisplaysValues(){
    const count = this.nameColumn.count();
    for (let i = 0; i< count; i++){
      const name = await this.nameColumn.get(i).getText();
      const services = await this.servicesColumn.get(i).getText();
      const locations = await this.locationsColumn.get(i).getText();

      const status = await this.statusColumn.get(i).getText();

      expect(name !== '', `at row ${i} missing name`).to.be.true;
      expect(services !== '', `at row ${i} missing services`).to.be.true;
      expect(locations !== '', `at row ${i} missing locations`).to.be.true;
      expect(status !== '', `at row ${i} missing status`).to.be.true;
    }
  }

  async clickUserNameAtRow(atRow){
    const columnElement = this.nameColumn.get(atRow);
    const link = columnElement.$('a');
    await link.wait();
    const linkText = await link.getText();
    await link.click();
    return linkText;
  }

  async paginationText(){

  }

  async getCount(){

  }

  async selectUser() {

  }
}

module.exports = new StaffSearchPage();
