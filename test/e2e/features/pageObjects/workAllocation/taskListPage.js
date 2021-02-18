const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');

class TaskListPage extends TaskList {

    constructor() {
        super();
        this.subNavListContainer = $('xuilib-hmcts-sub-navigation .hmcts-sub-navigation__list');
        this.myTasksTab = element(by.xpath("//exui-task-home//a[contains(text(),'My tasks')]"));
        this.availableTasksTab = element(by.xpath("//exui-task-home//a[contains(text(),'Available tasks')]"));

        this.myTasksContaine = $('exui-my-tasks');
        this.availableTasksContainer = $('exui-available-tasks');
    }

    async amOnPage() {
        try{
            await BrowserWaits.waitForElement(this.myTasksTab);
            return true;
        }
        catch(err){
            console.log("Task list page not displayed: "+err);
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



    async isMyTasksDisplayed(){
        expect(await this.amOnPage(), "Not on Task list page ").to.be.true;
        try {
            await BrowserWaits.waitForElement(this.myTasksContaine);
            return true;
        } catch (err) {
            console.log("My Tasks page not displayed: " + err);
            return false;
        }
    }

    async isAvailableTasksDisplayed(){
        expect(await this.amOnPage(), "Not on Task lict page ").to.be.true;
        try{
            await BrowserWaits.waitForElement(this.availableTasksContainer); 
            return true;
        }catch(err){
            console.log("Available tasks page not displayed: " + err);
            return false;
        }
    }

    // async getTaskCountInDisplayLabel() {
    //     return await this.tasksCountInDisplayLabel.getText();
    // }

}

module.exports = new TaskListPage();
