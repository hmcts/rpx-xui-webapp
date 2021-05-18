const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var TaskMessageBanner = require('./taskMessageBanner');

class TaskManagerPage extends TaskList{
  
    constructor(){
        super();
        this.taskManagerlist = $('exui-task-manager-list');
        this.taskManagerFilter = $('.exui-task-manager-filter');
        this.caseWorkerFilter = $('exui-task-manager-filter select#task_assignment_caseworker');
        this.locationFilter = $('exui-task-manager-filter select#task_assignment_location');

        this.tasksCountInDisplayLabel = $('exui-task-manager-list p span');

        this.taskInfoMessageBanner = new TaskMessageBanner();
    }

    async amOnPage(){
        try{
            await BrowserWaits.waitForElement(this.taskManagerlist); 
            return true;
        }catch(err){
            console.log("Task manager page not displayed : "+err);
            return false;
        }
    }

    async getTaskCountInDisplayLabel(){
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;

        return await this.tasksCountInDisplayLabel.getText(); 
    }

    async getCaseworkerFilterOptions(){
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;
        return this.getFilterOptionsFromSelect(this.caseWorkerFilter);
    }

    async getLocationFilterOptions() {
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;
        return this.getFilterOptionsFromSelect(this.locationFilter);
    }

    async getFilterOptionsFromSelect(selectElement){
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;
        const optionValues = [];
        const optionsCount = await selectElement.$$('option').count();
        for (let i = 0; i < optionsCount; i++) {
            optionValues.push(await selectElement.$$('option').get(i).getText());
        }
        return optionValues 
    }

    async selectCaseworkerFilter(optionDisplayText){
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;
        await this.caseWorkerFilter.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click(); 
    }

    async selectLocationFilter(optionDisplayText) {
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;
        await this.locationFilter.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click();
    }

    async isBannerMessageDisplayed() {
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;

        return this.taskInfoMessageBanner.isBannerMessageDisplayed();
    }

    async getBannerMessagesDisplayed() {
        expect(await this.amOnPage(), "Not on Task manager page ").to.be.true;

        return this.taskInfoMessageBanner.getBannerMessagesDisplayed();
    }
  
}

module.exports = new TaskManagerPage();
