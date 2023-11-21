const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../../codeceptCommon/reportLogger');

const { Select,GovUKRadios } = require('../../../utils/domElements');

var TaskMessageBanner = require('../messageBanner');
const { LOG_LEVELS } = require('../../../support/constants');

class AllWork extends TaskList {

    constructor() {
        super();
        this.containerTag = 'exui-all-work-home'
        this.pageHeader = $(`${this.containerTag} h3.govuk-heading-xl`);

        this.subNavListContainer = $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskInfoMessageBanner = new TaskMessageBanner(`${this.containerTag} exui-all-work-tasks`);

        //tasks container elements
        this.tasksContainer = $('exui-all-work-tasks');

        //Cases container elements
        this.casesContainer = $('exui-all-work-cases exui-work-case-list');
        this.allworkCasesMessage = $('exui-all-work-cases .hmcts-filter-layout__content p')
        this.FILTER_ITEMS = {
            'Service': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Service")]/../..//select'),
            'Location':  $('.all-work-filter #selectLocation'),
            'Location radios': new GovUKRadios('css', '.all-work-filter #selectLocation .govuk-radios'),
            'Location search': $('.all-work-filter  #location xuilib-find-location .search-location exui-search-location input') ,
            'Person': new GovUKRadios('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Person")]/..//div[contains(@class,"govuk-radios")]'),
            'Tasks': new GovUKRadios('xpath','//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Tasks")]/../..//div[contains(@class,"govuk-radios")]'),
            'Tasks by role type': new Select('xpath','//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//select[contains(@id,"select_role")]'),
            'Person input': element(by.xpath('//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//xuilib-find-person//input')),
            'Task type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Task type")]/..//select'),
            'Priority': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Priority")]/..//select'),
            'Select a role type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Select a role type")]/../..//select'),
            'Person': element(by.xpath('//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//xuilib-find-person//input')),

        } 

        this.selectOrRadioFilterItems = ['Service', 'Case Location', 'Tasks by role type', 'Task type', 'Priority', 'Person', 'Tasks', 'Select a role type','Location radios'];

        this.filterApplyBtn = $('exui-all-work-home xuilib-generic-filter #applyFilter');
        this.filterResetBtn = $('exui-all-work-home xuilib-generic-filter #cancelFilter');

        this.filterSearchResults = $$('.cdk-overlay-container mat-option');
    }


    async isFilterItemDisplayed(filterItem){

        
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)){
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
        }

        if (this.selectOrRadioFilterItems.includes(filterItem)){
            return await this.FILTER_ITEMS[filterItem].isDisplayed();
        }else{
            return await this.FILTER_ITEMS[filterItem].isPresent();
        }
    }

    async isFilterItemEnbled(filterItem) {
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)) {
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
        }
        return await this.FILTER_ITEMS[filterItem].isDisplayed() 
        && await this.FILTER_ITEMS[filterItem].isEnabled();

    }

    async getFilterSelectOrRadioOptions(filterItem){
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)) {
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
        }
        if (this.selectOrRadioFilterItems.includes(filterItem)) {
            let options = await this.FILTER_ITEMS[filterItem].getOptions();
            options = options.filter(opt => opt !== "");
            return options; 
        } else {
            throw new Error(`filter item ${filterItem} is not a select or a Radio item.`);
        }
    }

    async setFilterSelectOrRadioOptions(filterItem,option) {
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)) {
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test.${filtersItems}`);
        }
        if (this.selectOrRadioFilterItems.includes(filterItem)) {
            return await this.FILTER_ITEMS[filterItem].selectOption(option);
        } else {
            throw new Error(`filter item ${filterItem} is not a select or a Radio item..${filtersItems}`);
        }
    }

    async inputFilterItem(filterItem, inputText){
        await await this.FILTER_ITEMS[filterItem].sendKeys(inputText);
    }

    getSubNavigationTabElement(tabLabel) {
        return element(by.xpath(`//${this.containerTag}//a[contains(text(),'${tabLabel}')]`));
    }

    async isSubNavigationTabPresent(tabLabel) {
        return await this.getSubNavigationTabElement(tabLabel).isPresent();
    }

    async clickSubNavigationTab(tabLabel) {
        await BrowserWaits.waitForElement(this.subNavListContainer);
        await this.getSubNavigationTabElement(tabLabel).click();
    }

    async isSubNavigationTabSelected(tabLabel) {
        return this.getSubNavigationTabElement(tabLabel).getAttribute('aria-current') !== null;
    }


    async amOnPage() {
        try {
            await BrowserWaits.waitForSpinnerToDissappear();
            await this.pageHeader.wait()
            await BrowserWaits.waitForConditionAsync(async () => {
                const pageHeaderTitle = await this.pageHeader.getText();
                return pageHeaderTitle.includes('All work');
            });
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("All work page not displayed " + err.stack,LOG_LEVELS.Error);
            return false;
        }

    }

    // Task container methods
    async isTasksContainerDisplayed() {
        return await this.tasksContainer.isPresent() && await this.tasksContainer.isDisplayed();
    }


//Cases container methods
    async isCasesContainerDisplayed() {

        return await this.casesContainer.isDisplayed()
    }


    async isBannerMessageDisplayed() {
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        return this.taskInfoMessageBanner.isBannerMessageDisplayed();
    }

    async getBannerMessagesDisplayed() {
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        return this.taskInfoMessageBanner.getBannerMessagesDisplayed();
    }

    async isBannermessageWithTextDisplayed(messageText) {
        const messages = await this.getBannerMessagesDisplayed();

        for (const message of messages) {
            if (message.includes(messageText)) {
                return true;
            }
        }
        return false;
    }

    async getSearchResults(){
        const count = await this.filterSearchResults.count();
        const results = [];
        for(let i = 0 ; i < count ; i ++){
            const e = await this.filterSearchResults.get(i);
            results.push(await e.getText()); 
        }
        return results;
    }

    async isSearchResultPresent(result){
        const searchResults = await this.getSearchResults();
        for (const searchResult of searchResults){
            if (searchResult.includes(result)){
                return true;
            }
        }
        return false;
    }

    async selectSearchResult(result){
        const count = await this.filterSearchResults.count();
        const results = [];
        for (let i = 0; i < count; i++) {
            const e = await this.filterSearchResults.get(i);
            const eText = await e.getText();
            results.push(eText);
            if (eText.includes(result)){
                await e.click();
                return;
            }
        }
        throw new Error(`Search result ${result} not found in results ${results}`); 
    }


}

module.exports = new AllWork();





