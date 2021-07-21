const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');

var TaskMessageBanner = require('../messageBanner');

class AllWork extends TaskList {

    constructor() {
        super();
        this.pageHeader = $('exui-work-allocation-home exui-all-tasks h3.govuk-heading-xl');

        this.subNavListContainer = $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskInfoMessageBanner = new TaskMessageBanner("exui-work-allocation-home exui-all-tasks");

        //tasks container elements
        this.tasksContainer = $('exui-all-work-tasks');
        this.locationsFilterSelect = $('.all-work-filter  #task_assignment_location');
        this.personsFilterSelect = $('.all-work-filter  #task_assignment_caseworker');


        //Cases container elements
        this.casesContainer = $('not implemented yet');

    }


    getSubNavigationTabElement(tabLabel) {
        return element(by.xpath(`//exui-task-home//a[contains(text(),'${tabLabel}')]`));
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

    async selectLocationFilter(value){
        const elementToSelect = this.locationsFilterSelect.element(by.xpath(`option[contains(text(),'${value}')]`));
        await BrowserWaits.waitForElement(elementToSelect);
        await elementToSelect.click();
    }

    async selectPersonFilter(value) {
        const elementToSelect = this.personsFilterSelect.element(by.xpath(`option[contains(text(),'${value}')]`));
        await BrowserWaits.waitForElement(elementToSelect);
        await elementToSelect.click();
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
