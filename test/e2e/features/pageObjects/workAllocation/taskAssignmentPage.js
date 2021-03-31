const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../support/reportLogger');
class TaskAssignmentPage extends TaskList {

    constructor() {
        super();
        this.taskAssignmentContainer = $('exui-task-container-assignment');
        this.pageHeaderTitle = $('exui-task-container-assignment #main-content h1');

        this.caseWorkerSelect = $('exui-task-assignment select#task_assignment_caseworker');
        this.locationSelect = $('exui-task-assignment select#task_assignment_location');

        this.reassignBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Reassign")]'));
        this.unassignBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Unassign")]'));

        this.cancelBtn = element(by.xpath('//exui-task-container-assignment//button[contains(text(),"Cancel")]'));

        this.bannerMessageContainer = $('exui-info-message ')
        this.infoMessages = $$('exui-info-message .hmcts-banner__message');

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

    async clickUnassignBtn() {
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.unassignBtn.click();
    }

    async clickCancelBtn(){
        expect(await this.amOnPage(), "Not on task assignment page").to.be.true;
        await this.cancelBtn.click();
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
}

module.exports = new TaskAssignmentPage();
