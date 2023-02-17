
const { LOG_LEVELS } = require("../../../support/constants");
const BrowserWaits = require("../../../support/customWaits");
const CucumberReporter = require("../../../../codeceptCommon/reportLogger");
const CheckyourChangesTable = require("../common/checkYourChangesTable");
class TaskCheckYourChangesPage{
    constructor(){
        this.pageContainer = $("exui-task-assignment-confirm");
        this.header = $("exui-task-assignment-confirm h1");
        this.headerCaption = $("exui-task-assignment-confirm h1 span");

        this.checkYourChangesHintText = $("exui-task-assignment-confirm #reassign-confirm-hint|exui-task-assignment-confirm #assign-confirm-hint ");

        this.submitButton = $("exui-task-assignment-confirm button[type = 'submit']");
        this.cancelLink = element(by.xpath("//exui-task-assignment-confirm//p/a[contains(text(),'Cancel')]"));

        this.checkYourChangesTable = new CheckyourChangesTable(this.pageContainer);
    }


    async amOnPage() {
        try {
            await BrowserWaits.waitForElement(this.pageContainer);
            return true;
        } catch (err) {
            CucumberReporter.AddMessage(err.stack, LOG_LEVELS.Error);
            return false;
        }
    }

    async validatePage() {
        const heaerText = await this.header.getText();
        expect(heaerText).to.contains("Check your answers");
        await BrowserWaits.waitForElement(this.checkYourChangesTable.changesTable);
        expect(await this.checkYourChangesTable.isLinkWithTextPresentAtRow(1,'Change')).to.be.true;

    }

    async getColumnValue(header) {
        const coltext = await this.checkYourChangesTable.getColumnValueAtRow(1,header);
        return coltext;
    }

    async clickChangeLink() {
        await this.checkyourChangesTable.clickLinkWithTextAtRow(1,"change");
    }



    async isTaskTableHeaderDisplayed(headerCol) {
        const colheaderPos = await this.checkyourChangesTable.isTableHeaderDisplayed(headerCol);
        return colheaderPos !== -1;
    }

    async getHeaderText() {
        return await this.header.getText();
    }

    async getHeaderCaption() {
        return await this.headerCaption.getText();
    }

    async clickContinueButton() {
        expect(await this.amOnPage(), "Not on Check your changes page").to.be.true;
        await this.submitButton.click();
    }

    async clickCancelLink() {
        expect(await this.amOnPage(), "Not on Check your changes page").to.be.true;
        await this.cancelLink.click();
    }


}

module.exports = new TaskCheckYourChangesPage();
