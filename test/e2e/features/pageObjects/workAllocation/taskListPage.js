const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');
const { $ } = require('protractor');

var TaskMessageBanner = require('./taskMessageBanner');

class TaskListPage extends TaskList {

    constructor() {
        super();
        this.subNavListContainer = $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');
        this.myTasksTab = element(by.xpath("//exui-task-home//a[contains(text(),'My tasks')]"));
        this.availableTasksTab = element(by.xpath("//exui-task-home//a[contains(text(),'Available tasks')]"));

        this.myTasksContaine = $('exui-my-tasks');
        this.availableTasksContainer = $('exui-available-tasks');

        this.bannerMessageContainer = $('exui-info-message ') 
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskInfoMessageBanner = new TaskMessageBanner();

        this.pagePreviousLink = $('exui-task-list pagination-template .pagination-previous a');
        this.pageNextLink = $('exui-task-list pagination-template .pagination-next a');
    }

    async amOnPage() {
        try{
            await BrowserWaits.waitForElement(this.myTasksTab);
            return true;
        }
        catch(err){
            cucumberReporter.AddMessage("Task list page not displayed: " + err);
            return false;
        }
    }

    async clickMyTasks(){
        expect(await this.amOnPage(), "Not on Task lict page ").to.be.true;
        await this.myTasksTab.click();
    }

    async clickAvailableTasks(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        await this.availableTasksTab.click();
    }

    async amOnMyTasksTab(){
        return await this.myTasksContaine.isDisplayed();
    }

    async isMyTasksDisplayed(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        try {
            await BrowserWaits.waitForElement(this.myTasksContaine);
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("My Tasks list page not displayed: " + err);
            return false;
        }
    }

    async isAvailableTasksDisplayed(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        try{
            await BrowserWaits.waitForElement(this.availableTasksContainer); 
            return true;
        }catch(err){
            cucumberReporter.AddMessage("Available Tasks list page not displayed: " + err);
            return false;
        }
    }

    async isBannerMessageDisplayed(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
      return this.taskInfoMessageBanner.isBannerMessageDisplayed();
    }

    async getBannerMessagesDisplayed(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        return this.taskInfoMessageBanner.getBannerMessagesDisplayed();
    }

    async isBannermessageWithTextDisplayed(messageText) {
        const messages = await this.getBannerMessagesDisplayed();

        for(const message of messages){
            if (message.includes(messageText)){
                return true;
            }
        }
        return false;
    }


  

}

module.exports = new TaskListPage();
