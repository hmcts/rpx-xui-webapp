const TaskList = require('./taskListTable');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');

class TaskActionPage extends TaskList {

    constructor() {
        super();
        this.taskAssignmentContainer = $('exui-task-action-container');
        this.pageHeaderTitle = $('exui-task-action-container #main-content h1');

  
        this.unassignBtn = element(by.xpath('//exui-task-action-container//button[contains(text(),"Unassign")]'));

        this.cancelBtn = element(by.xpath('//exui-task-action-container//button[contains(text(),"Cancel")]'));

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

    async isManageLinkPresent() {
        const task = await this.getTableRowAt(1);
        return await task.$('button[id^="manage_"]').isPresent();
    }

    async getPageHeader() {
        return await this.pageHeaderTitle.getText();
    }

    async clickUnassignBtn() {
        expect(await this.amOnPage(), "Not on task action page").to.be.true;
        await this.unassignBtn.click();
    }

    async clickCancelBtn() {
        expect(await this.amOnPage(), "Not on task action page").to.be.true;
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

module.exports = new TaskActionPage();
