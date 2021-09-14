const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');

var TaskMessageBanner = require('../messageBanner');

class MyWorkPage extends TaskList {

    constructor() {
        super();
        this.pageHeader = $('exui-work-allocation-home exui-task-home h3.govuk-heading-xl');
        this.showHideWorkFilterBtn = element(by.xpath("//button[contains(text(),'work filter')]"));
        this.showHideFilterBadge = element(by.xpath("//button[contains(text(),'work filter')]/following-sibling::span[contains(text(),'Filtered view')]"));
        this.showHideFilterHint = element(by.xpath("//button[contains(text(),'work filter')]/following-sibling::span[contains(text(),'All of your work may not be visible.')]"));

        this.genericFilterContainer = $('xuilib-generic-filter');
        this.workFilterLocationContainers = $$('.xui-generic-filter .govuk-checkboxes__item');

        this.workFilterApplyBtn = $('xuilib-generic-filter #applyFilter');
        this.workFilterRestBtn = $('xuilib-generic-filter #cancelFilter');

        this.subNavListContainer = $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');
       
        this.myTasksContaine = $('exui-my-tasks');
        this.availableTasksContainer = $('exui-available-tasks');

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskInfoMessageBanner = new TaskMessageBanner("exui-work-allocation-home exui-task-home");
    }

    async waitForWorkFilterToDisplay(){
        await BrowserWaits.waitForElement(this.genericFilterContainer);
    }

    getSubNavigationTabElement(tabLabel){
        return element(by.xpath(`//exui-task-home//a[contains(text(),'${tabLabel}')]`));
    }

    async isSubNavigationTabPresent(tabLabel){
        return await this.getSubNavigationTabElement(tabLabel).isPresent();
    }

    async clickSubNavigationTab(tabLabel){
        await BrowserWaits.waitForElement(this.subNavListContainer);
        await this.getSubNavigationTabElement(tabLabel).click();
    }

    async isSubNavigationTabSelected(tabLabel){
        return this.getSubNavigationTabElement(tabLabel).getAttribute('aria-current') !== null;
    }

    async getWorkFilterLocationsCount(){
        return await this.workFilterLocationContainers.count();
    }

    async clickWorkFilterLoctionInputWithLabel(locationLabel){
        await element(by.xpath(`//div[contains(@class,'xui-generic-filter')]//div[contains(@class,'govuk-checkboxes__item')]/label[contains(text(),'${locationLabel}')]/../input`)).click();
    }

    async selectWorkFilterLocationAtPosition(locationAtPos){
        const locCount = await this.getWorkFilterLocationsCount();
        if (locationAtPos > locCount || locationAtPos <= 0){
            throw Error('location pos is out of bound');
        }
        await this.workFilterLocationContainers.get(locationAtPos - 1).click();
    }

    async getListOfSelectedLocations(){
        const selectedLocations = [];
        const locationsCount = await this.getWorkFilterLocationsCount();
        for (let i = 0; i < locationsCount; i++){
            const locElement = await this.workFilterLocationContainers.get(i);
            const isLocationSelected = await locElement.$('input').isSelected();
            if (isLocationSelected){
                selectedLocations.push(await locElement.$('label').getText());
            }
        }
        return selectedLocations;
    }

    async amOnPage() {
        try{
            await BrowserWaits.waitForConditionAsync(async () => {
                const pageHeaderTitle = await this.pageHeader.getText();
                return pageHeaderTitle.includes('My work');
            });
            return true;
        }catch(err){
            cucumberReporter.AddMessage("My work page not displayed "+err.stack);
            return false;
        }
        
    }

    async clickMyTasks() {
        expect(await this.amOnPage(), "Not on Task lict page ").to.be.true;
        await this.myTasksTab.click();
    }

    async clickAvailableTasks() {
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        await this.availableTasksTab.click();
    }

    async amOnMyTasksTab() {
        return await this.myTasksContaine.isDisplayed();
    }

    async isMyTasksDisplayed() {
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        try {
            await BrowserWaits.waitForElement(this.myTasksContaine);
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("My Tasks list page not displayed: " + err);
            return false;
        }
    }

    async isAvailableTasksDisplayed() {
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        try {
            await BrowserWaits.waitForElement(this.availableTasksContainer);
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("Available Tasks list page not displayed: " + err);
            return false;
        }
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

module.exports = new MyWorkPage();
