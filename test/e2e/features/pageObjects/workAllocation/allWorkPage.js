const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');

const { Select,GovUKRadios } = require('../../../utils/domElements');

var TaskMessageBanner = require('../messageBanner');

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

        this.FILTER_ITEMS = {
            'Service': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Service")]/..//select'),
            'Case Location': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Case Location")]/..//select'),
            'Person': new GovUKRadios('xpath','//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Person")]/..//div[contains(@class,"govuk-radios")]'),
            'Person role type': new Select('xpath','//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//select[contains(@id,"select_role")]'),
            'Person input': element(by.xpath('//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//xuilib-find-person//input')),
            'Task type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Task type")]/..//select'),
            'Priority': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Priority")]/..//select'),
            'Role type': new Select('xpath', '//xuilib-generic-filter//div[contains(@class,"govuk-form-group")]//h3[contains(text(),"Role type")]/..//select')
            
        } 

        this.selectOrRadioFilterItems = ['Service', 'Case Location', 'Person role type', 'Task type', 'Priority','Person','Role type'];

        this.filterApplyBtn = $('exui-all-work-home xuilib-generic-filter #applyFilter');
        this.filterResetBtn = $('exui-all-work-home xuilib-generic-filter #cancelFilter');
    }


    async isFilterItemDisplayed(filterItem){
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)){
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test`);
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
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test`);
        }
        return await this.FILTER_ITEMS[filterItem].isEnabled();

    }

    async getFilterSelectOrRadioOptions(filterItem){
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)) {
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test`);
        }
        if (this.selectOrRadioFilterItems.includes(filterItem)) {
            return await this.FILTER_ITEMS[filterItem].getOptions();
        } else {
            throw new Error(`filter item ${filterItem} is not a select or a Radio item.`);
        }
    }

    async setFilterSelectOrRadioOptions(filterItem,option) {
        const filtersItems = Object.keys(this.FILTER_ITEMS);
        if (!filtersItems.includes(filterItem)) {
            throw new Error(`Filter item "${filterItem}" not recognised or not implemented in test`);
        }
        if (this.selectOrRadioFilterItems.includes(filterItem)) {
            return await this.FILTER_ITEMS[filterItem].selectOption(option);
        } else {
            throw new Error(`filter item ${filterItem} is not a select or a Radio item.`);
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
            await BrowserWaits.waitForConditionAsync(async () => {
                const pageHeaderTitle = await this.pageHeader.getText();
                return pageHeaderTitle.includes('All work');
            });
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("All work page not displayed " + err.stack);
            return false;
        }

    }

    // Task container methods
    async isTasksContainerDisplayed() {
        return await this.tasksContainer.isPresent() && await this.tasksContainer.isDisplayed();
    }


//Cases container methods
    async isCasesContainerDisplayed() {
        return await this.casesContainer.isPresent() && await this.casesContainer.isDisplayed();
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


}

module.exports = new AllWork();





