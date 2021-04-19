const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');
const { $ } = require('protractor');

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

        
    }

    async validateViewForRelease(release){
        if(release === "wa_release_1"){

        }
    }

    getFilterContainerForRelease(release){ 
       let filterContainer = null;
       if (release === "wa_release_1") {
           filterContainer = $('exui-available-tasks-filter');
       } else if (release === "wa_release_2") {
           filterContainer = $('');
       } else {
           throw new Error("Test input error. Unrecognized WA release provided." + release);
       }
    return filterContainer;
   } 

    async isTasksFilterDisplayedFromRelease(release){ 
        return await this.getFilterContainerForRelease(release).isDisplayed();
    }

    async isAVailableTaskFilterOpenFromRelease(release){
        return await this.getFilterContainerForRelease(release).$('xuilib-checkbox-list').isDisplayed();
    }

    async toggleAvailableTaskFilterFromRelease(release) {
        return await this.getFilterContainerForRelease(release).$('exui-available-tasks-filter summary').click();
    }
    
    async filterLocationClickSelectAllFromRelease(release){
        return await this.getFilterContainerForRelease(release).$('select-all input').click();
    }

    async filterLocationClickLocationAtIndexFromRelease(index, release) {
        return await this.getFilterContainerForRelease(release).$(`input[id=select_${index}]`).click();
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
        try{
            await BrowserWaits.waitForElement(this.bannerMessageContainer);
            return true;
        }catch(err){
            cucumberReporter.AddMessage("message banner not displayed: " + err);

            return false;
        }
    }

    async getBannerMessagesDisplayed(){
        expect(await this.isBannerMessageDisplayed(),"Message banner not displayed").to.be.true; 
        const messagescount = await this.infoMessages.count();
        const messages = [];
        for (let i = 0; i < messagescount; i++){
            const message = await this.infoMessages.get(i).getText();

            const submessagestrings = message.split("\n");
            messages.push(...submessagestrings); 
        } 
        return messages;
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
