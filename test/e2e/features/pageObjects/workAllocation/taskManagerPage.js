const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');

class TaskManagerPage extends TaskList{
  
    constructor(){
        super();
        this.taskManagerlist = $('exui-task-manager-list');
        this.taskManagerFilter = $('.exui-task-manager-filter');
        this.caseWorkerFilter = $('exui-task-manager-filter select#task_assignment_caseworker');
        this.locationFilter = $('exui-task-manager-filter select#task_assignment_location');

        this.tasksCountInDisplayLabel = $('exui-task-manager-list p span');
    }

    async amOnPage(){
        await BrowserWaits.waitForElement(this.taskManagerlist); 
    }

    async getTaskCountInDisplayLabel(){
        return await this.tasksCountInDisplayLabel.getText(); 
    }

    async getCaseworkerFilterOptions(){
        return this.getFilterOptionsFromSelect(this.caseWorkerFilter);
    }

    async getLocationFilterOptions() {
        return this.getFilterOptionsFromSelect(this.locationFilter);
    }

    async getFilterOptionsFromSelect(selectElement){
        const optionValues = [];
        const optionsCount = await selectElement.$$('option').count();
        for (let i = 0; i < optionsCount; i++) {
            optionValues.push(await selectElement.$$('option').get(i).getText());
        }
        return optionValues 
    }

    async selectCaseworkerFilter(optionDisplayText){
        await this.caseWorkerFilter.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click(); 
    }

    async selectLocationFilter(optionDisplayText) {
        await this.locationFilter.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click();
    }
  
}

module.exports = new TaskManagerPage();
