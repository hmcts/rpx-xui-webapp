const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../support/reportLogger');
class TaskAssignmentPage extends TaskList {

    constructor() {
        super();
        this.taskAssignmentContainer = $('exui-task-container-assignment');
        this.pageHeaderTitle = $('exui-task-container-assignment #main-content h1');
        this.actionDescription = $('#main-content>div>div>p');

        this.caseWorkerSelect = $('exui-task-assignment select#task_assignment_caseworker');
        this.locationSelect = $('exui-task-assignment select#task_assignment_location');

        this.reassignBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Reassign")]'));
        this.unassignBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Unassign")]'));


        this.cancelBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Cancel")]'));

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskDetailsRow = $('exui-task-container-assignment exui-task-list table tbody tr');
        this.taskColumnHeader = $('exui-task-container-assignment exui-task-list table thead th button');
        this.chooseColleageHeader = element(by.xpath("//exui-task-container-assignment//h2[contains(text(),'Choose a colleague')]"));
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

    async selectLocationAtpos(pos) {
        await $(`#task_assignment_location option:nth-of-type(${pos})`).click();
    }

    async selectcaseworkerAtpos(pos) {
        await $(`#task_assignment_caseworker option:nth-of-type(${pos})`).click();
    }

    async clickReassignBtn(){
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.reassignBtn.click();
    }

    async clickUnassignBtn() {
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.unassignBtn.click();
    }

    async clickCancelBtn(){
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.cancelBtn.click();
    }

    async clickSubmitBtn(action) {
        let verb = this.getSubmitBtnText(action);

        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        const submitBtn = element(by.xpath(`//exui-task-container-assignment//button[contains(text(),"${verb}")]`));
        await submitBtn.click();
    }


    async isBannerMessageDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.bannerMessageContainer);
            return true;
        } catch (err) {
            cucumberReporter.AddMessage("message banner not displayed: " + err);

            return false;
        }
    }

    async getBannerMessagesDisplayed() {
        expect(await this.isBannerMessageDisplayed(), "Message banner not displayed").to.be.true;
        const messagescount = await this.infoMessages.count();
        const messages = [];
        for (let i = 0; i < messagescount; i++) {
            const message = await this.infoMessages.get(i).getText();

            const submessagestrings = message.split("\n");
            messages.push(...submessagestrings);
        }
        return messages;
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

    async isTaskDisplayed(){
        try {
            await BrowserWaits.waitForElement(this.taskDetailsRow);
            return true;
        }
        catch (err) {
            console.log("Task assignment page not displayed: " + err);
            return false;
        }
    }

    async isColumnWithHeaderDisplayed(){
        expect(await this.isTaskDisplayed(), "Task details row not displayed").to.be.true;
        return this.taskColumnHeader.isDisplayed();
    }

    async validatePageContentForAction(action,softAssert){
        let verb = this.getSubmitBtnText(action);

        const submitBtn = element(by.xpath(`//exui-task-container-assignment//button[contains(text(),"${verb}")]`));
        if (softAssert){
            
            await softAssert.assert(async () => expect(await this.pageHeaderTitle.getText()).to.include(`${verb} a task`) );

            await softAssert.assert(async () => expect(await this.actionDescription.getText()).to.include(`${verb} a task to a colleague`));
            await softAssert.assert(async () => expect(await this.chooseColleageHeader.isDisplayed(), "h2 header with text choose a colleague is not displayed").to.be.true);


            await softAssert.assert(async () => expect(await this.caseWorkerSelect.isDisplayed(), "Caseworker select is not displayed").to.be.true);
            await softAssert.assert(async () => expect(await this.locationSelect.isDisplayed(), "Location select is not displayed").to.be.true);

            await softAssert.assert(async () => expect(await this.caseWorkerSelect.isDisplayed(), "Caseworker select is not displayed").to.be.true);


            await softAssert.assert(async () => expect(submitBtn.isDisplayed(), `Submit button with text ${verb} not displayed`).to.be.true);
            await softAssert.assert(async () => expect(this.cancelBtn.isDisplayed(), `Cancel button with not displayed`).to.be.true);
        }else{
            expect(await this.pageHeaderTitle.getText()).to.include(`${verb} a task`);
            expect(await this.actionDescription.getText()).to.include(`${verb} a task to a colleague`);
            expect(await this.chooseColleageHeader.isDisplayed(), "h2 header with text choose a colleague is not displayed").to.be.true;


            expect(await this.caseWorkerSelect.isDisplayed(), "Caseworker select is not displayed").to.be.true;
            expect(await this.locationSelect.isDisplayed(), "Location select is not displayed").to.be.true;

            expect(await this.caseWorkerSelect.isDisplayed(), "Caseworker select is not displayed").to.be.true;

            
            expect(submitBtn.isDisplayed(), `Submit button with text ${verb} not displayed`).to.be.true;
            expect(this.cancelBtn.isDisplayed(), `Cancel button with not displayed`).to.be.true;
        }
        
    }

    getSubmitBtnText(action) {
        let btnTxt = "";
        switch (action) {
            case "Reassign task":
                btnTxt = "Reassign";
                break;
            case "Unassign task":
                btnTxt = "Unassign";
                break;
            case "Mark as done":
                btnTxt = action;
                break;
            case "Cancel task":
                btnTxt = action;
                break;
        }
        return btnTxt;
    }
}

module.exports = new TaskAssignmentPage();
