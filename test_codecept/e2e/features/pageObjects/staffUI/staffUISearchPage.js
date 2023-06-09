


const reportLogger = require('../../../../codeceptCommon/reportLogger')
const BrowserWaits = require('../../../support/customWaits')

const addUserPage = require('./adduserPage')

const MessageBanner = require('../messageBanner')
class StaffSearchPage{
    
    constructor(){
        this.messageBanner = new MessageBanner();

        this.pageContainer = $('exui-staff-users');
        this.addUserButton = element(by.xpath("//button[contains(text(),'Add new user')]"));

        this.basicSearch = $('exui-staff-search')
        this.advancedSearchContainer = $('exui-staff-adv-filter')
        this.searchButton = $('exui-staff-users #applyFilter')


        this.advancedSearchLink = element(by.xpath(`//exui-staff-users//a[contains(text(),'Advanced search')]`))
        this.hideAdvancedSearchLink = element(by.xpath(`//exui-staff-users//a[contains(text(),'Hide advanced search')]`))

        this.partialNameField = $('input#user-partial-name');

       this.advancedSearchFilter = new AdvancedSearch()
        this.staffUsersList = new StaffUsersList()
       
    }

    async validateSuccessMessageBanner(message){
        const isDisplayed = await this.messageBanner.isBannerMessageDisplayed();
        expect(isDisplayed, 'Success message banner not displayed').to.be.true

        const messages = await this.messageBanner.getBannerMessagesDisplayed()
        const expectedMessage = messages.filter(msg => msg.includes(message))
        expect(expectedMessage !== undefined, `expected message ${message} not displayed, actual ${JSON.stringify(messages)}`).to.be.true

    }

    async amOnPage(){
        await this.pageContainer.wait();
        return await this.pageContainer.isDisplayed()
    }

    async isBasicSearchDisplayed(){
        return await this.basicSearch.isDisplayed();
    }

    async clickAdvancedSearchLink(){
        await this.advancedSearchLink.click()

    }

    async clickHideAdvancedSearchLink(){
        await this.hideAdvancedSearchLink.click()
    }

    async validateBasicSearchPage(){
        
        expect(await this.basicSearch.isDisplayed()).to.be.true
        expect(await this.partialNameField.isDisplayed()).to.be.true
        expect(await this.advancedSearchLink.isDisplayed()).to.be.true;
    }


    async validateAdvancedSearchPage() {
        expect(await this.advancedSearchContainer.isDisplayed()).to.be.true
        expect(await this.serviceFilter.isDisplayed()).to.be.true
        expect(await this.locationFilter.isDisplayed()).to.be.true
        expect(await this.roleFilter.isDisplayed()).to.be.true
        expect(await this.skillFilter.isDisplayed()).to.be.true

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
        const inputKeys = Object.keys(searchInputs)
        expect(await this.isAdvancedSearchDisplayed(), 'Not in advanced search page').to.be.true;
        for (const filterItem of inputKeys){
            const inputVal = searchInputs[filterItem];
            reportLogger.AddMessage(`Staff UI advanced search: select filter ${filterItem}: ${JSON.stringify(inputVal)}`);
            switch (filterItem){
                case "Services":
                    for (const service of inputVal)
                    {
                        await this.advancedSearchFilter.selectService(service)
                    } 

                    break;
                case "Locations":
                    for (const location of inputVal) {
                        await this.advancedSearchFilter.selectLocation(location)
                    } 
                    break;
                case "Job title":
                    await this.advancedSearchFilter.selectJobTitle(inputVal)
                    break;
                case "User type":
                    await this.advancedSearchFilter.selectUserType(inputVal)
                    break;
                case "Roles":
                    await this.advancedSearchFilter.selectRoles(inputVal)
                    break;
                case "Skills":
                    await this.advancedSearchFilter.selectskills(inputVal)
                    break;
            }
        }
        await this.searchButton.click();
    }


    async isStaffUserListContainerDisplayed(){
        return await this.staffUsersList.isDisplayed();
    }

    async validateListValuesNotEmpty(){
        await this.staffUsersList.validateResultRowDisplaysValues()

    }

    async clickAddNewUser(){
        await this.addUserButton.click();
        await addUserPage.container.wait();
        expect(await addUserPage.isDisplayed()).to.be.true
    }

    

}


class AdvancedSearch{
    constructor(){
        this.locator = $('exui-staff-adv-filter')

        this.searchService = {
            serviceInput: this.locator.$('exui-search-service input'),
            addButton: this.locator.$('xuilib-find-service #add-service'),
            selectedValues: this.locator.$('.selection-container a'),
            searchResults: $$('.mat-option-text')
        }

        this.searchLocation = {
            serchInput: this.locator.$('exui-search-location input'),
            addButton: this.locator.$('.location-picker-custom a'),
            searchResults: $$('.mat-option-text'),
            selectedValues: this.locator.$('.selection-container a')
        }

        this.userType = this.locator.$('select#select_user-type')
        this.jobTitle = this.locator.$('select#select_user-job-title')

        this.skills = this.locator.$('select#select_user-skills')
        this.roles = this.locator.$$('#user-role #checkbox_user-role .govuk-checkboxes__item')
    }

    async selectService(servicename){
        await this.searchService.serviceInput.sendKeys(servicename)
        // await this.searchService.searchResults.wait();
        await browser.sleep(2)
        const result = await this.searchService.searchResults.getItemWithText(servicename)
        await result.click();
        await this.searchService.addButton.click()

    }

    async selectLocation(locationName) {
        await this.searchLocation.serchInput.sendKeys(locationName)
        await BrowserWaits.retryWithActionCallback(async () => {
            await browser.sleep(2)
            const result = await this.searchLocation.searchResults.getItemWithText(locationName)
            await result.click();
        })
     
        await this.searchLocation.addButton.click()
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
    constructor(){
        this.staffUsersList = $('exui-staff-user-list')

        this.nameColumn = this.staffUsersList.$$('td.cdk-column-name');
        this.servicesColumn = this.staffUsersList.$$('td.cdk-column-services');
        this.locationsColumn = this.staffUsersList.$$('td.cdk-column-locations');
        this.jobTitleColumn = this.staffUsersList.$$('td.cdk-column-jobTitle');
        this.statusColumn = this.staffUsersList.$$('td.cdk-column-status');

    }

    async isDisplayed(){
        return await this.staffUsersList.isDisplayed();
    }

    async validateResultRowDisplaysValues(){
        const count = this.nameColumn.count();
        for(let i = 0; i< count; i++){
            const name = await this.nameColumn.get(i).getText();
            const services = await this.servicesColumn.get(i).getText();
            const locations = await this.locationsColumn.get(i).getText();

            const status = await this.statusColumn.get(i).getText();

            expect(name !== '',`at row ${i} missing name`).to.be.true;
            expect(services !== '', `at row ${i} missing services`).to.be.true;
            expect(locations !== '', `at row ${i} missing locations`).to.be.true;
            expect(status !== '', `at row ${i} missing status`).to.be.true;

        }
    }


    async clickUserNameAtRow(atRow){
        const columnElement = this.nameColumn.get(atRow);
        const link = columnElement.$('a')
        await link.wait()
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
