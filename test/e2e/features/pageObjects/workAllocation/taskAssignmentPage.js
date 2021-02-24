const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');

class TaskAssignmentPage extends TaskList {

    constructor() {
        super();
        this.taskAssignmentContainer = $('exui-task-container-assignment');
        this.pageHeaderTitle = $('exui-task-container-assignment #main-content h1');

        this.caseWorkerSelect = $('exui-task-assignment select#task_assignment_caseworker');
        this.locationSelect = $('exui-task-assignment select#task_assignment_location');

        this.reassignBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Reassign")]'));
        this.cancelBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Cancel")]'));

    }

    async amOnPage() {
        try {
            await BrowserWaits.waitForElement(this.taskAssignmentContainer);
            return true;
        }
        catch (err) {
            console.log("Task assignment page not displayed: " + err);
            return false;
        }
    }

    async isManageLinkPresent(){
        const task = await this.getTableRowAt(1);
        return await task.$('button[id^="manage_"]').isPresent();
    }

    async getPageHeader(){
        return await this.pageHeaderTitle.getText(); 
    }

    async getCaseworkerOptions() {
        expect(await this.amOnPage(), "Not on Task assignment page ").to.be.true;
        return this.getOptionsFromSelect(this.caseWorkerSelect);
    }

    async getLocationOptions() {
        expect(await this.amOnPage(), "Not on Task assignment page ").to.be.true;
        return this.getOptionsFromSelect(this.locationSelect);
    }

    async getOptionsFromSelect(selectElement) {
        expect(await this.amOnPage(), "Not on Task assignment page ").to.be.true;
        const optionValues = [];
        const optionsCount = await selectElement.$$('option').count();
        for (let i = 0; i < optionsCount; i++) {
            optionValues.push(await selectElement.$$('option').get(i).getText());
        }
        return optionValues
    }

    async selectCaseworker(optionDisplayText) {
        expect(await this.amOnPage(), "Not on Task assignment page ").to.be.true;
        await this.caseWorkerSelect.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click();
    }

    async selectLocation(optionDisplayText) {
        expect(await this.amOnPage(), "Not on Task assignment page ").to.be.true;
        await this.locationSelect.element(by.xpath(`//option[text() = '${optionDisplayText}']`)).click();
    }

    async clickReassignBtn(){
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.reassignBtn.click();
    }

    async clickCancelBtn(){
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.cancelBtn.click();
    }


}

module.exports = new TaskAssignmentPage();
