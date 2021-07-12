const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');

class TaskActionPage extends TaskList {

    constructor() {
        super();
        this.taskAssignmentContainer = $('exui-task-action-container');
        this.pageHeaderTitle = $('exui-task-action-container #main-content h1');
        this.actionDescription = $('#main-content>div>div>p');
  
        this.unassignBtn = element(by.xpath('//exui-task-action-container//button[contains(text(),"Unassign")]'));

        //In release 1
        this.cancelBtn = element(by.xpath('//exui-task-action-container//button[contains(text(),"Cancel")]'));

        //From release2
        this.submitBtn = $("exui-task-action-container button[id = 'submit-button']");
        this.cancelLink = element(by.xpath('//exui-task-action-container//p/a[contains(text(),"Cancel")]'));

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

        this.taskDetailsRow = $('exui-task-action-container exui-task-list table tbody tr');
        this.taskColumnHeader = $('exui-task-action-container exui-task-list table thead th button');
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

    async isManageLinkPresent() {
        const task = await this.getTableRowAt(1);
        return await task.$('button[id^="manage_"]').isPresent();
    }

    async getPageHeader() {
        await BrowserWaits.waitForElement(this.pageHeaderTitle);
        return await this.pageHeaderTitle.getText();
    }

    async getActionDescription(){
        await BrowserWaits.waitForElement(this.actionDescription);
        return await this.actionDescription.getText();
    }

    async clickCancelLink(){
        await BrowserWaits.waitForElement(this.cancelLink);
        await this.cancelLink.click();
    }

    async getSubmitBtnActionLabel(){
        await BrowserWaits.waitForElement(this.submitBtn);
        return await this.submitBtn.getText();
    }

    async clickSubmit(){
        await BrowserWaits.waitForElement(this.submitBtn);
        await this.submitBtn.click();
    }

    async clickUnassignBtn() {
        expect(await this.amOnPage(), "Not on task action page").to.be.true;
        await this.unassignBtn.click();
    }

    async clickCancelBtn() {
        expect(await this.amOnPage(), "Not on task action page").to.be.true;
        await this.cancelBtn.click();
    }

    async clickSubmitBtn(action) {
        let verb = this.getSubmitBtnText(action);
        expect(await this.amOnPage(), "Not on task action page").to.be.true;
        this.unassignBtn = element(by.xpath(`//exui-task-action-container//button[contains(text(),"${verb}")]`));
        await this.unassignBtn.click();
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

    async getColumnValue(columnHeader){
        await this.waitForTable();
        return await this.getColumnValueForTaskAt(columnHeader,1);
    }

    async isTaskDisplayed() {
        try {
            await BrowserWaits.waitForElement(this.taskDetailsRow);
            return true;
        }
        catch (err) {
            console.log("Task assignment page not displayed: " + err);
            return false;
        }
    }

    async isColumnWithHeaderDisplayed() {
        expect(await this.isTaskDisplayed(), "Task details row not displayed").to.be.true;
        return this.taskColumnHeader.isDisplayed();
    }

    async validatePageContentForAction(action, softAssert) {
        let verb = this.getSubmitBtnText(action);
        const submitBtn = element(by.xpath(`//exui-task-action-container//button[contains(text(),"${verb}")]`));
        if (softAssert){
            await BrowserWaits.waitForElement(this.pageHeaderTitle);
           
            await softAssert.assert(async () => expect(await submitBtn.isDisplayed(), `Submit button with text ${verb} not displayed`).to.be.true);
            await softAssert.assert(async () => expect(await this.cancelBtn.isDisplayed(), `Cancel button with not displayed`).to.be.true);
        }else{

            expect(await submitBtn.isDisplayed(), `Submit button with text ${verb} not displayed`).to.be.true;
            expect(await this.cancelBtn.isDisplayed(), `Cancel button with not displayed`).to.be.true;
        }
       
    }

    getSubmitBtnText(action){
        let btnTxt = "";
        switch (action){
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

module.exports = new TaskActionPage();
