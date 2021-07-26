
const BrowserWaits = require("../../../support/customWaits");
const CucumberReporter = require("../../../support/reportLogger");
const checkyourChangesTable = require("../common/checkYourChangesTable");
class TaskCheckYourChangesPage{
    constructor(){
        this.pageContainer = $("exui-task-assignment-confirm");
        this.header = $("exui-task-assignment-confirm h1");
        this.headerCaption = $("exui-task-assignment-confirm h1 span");

        this.checkYourChangesHintText = $("exui-task-assignment-confirm #reassign-confirm-hint|exui-task-assignment-confirm #assign-confirm-hint ");

        this.submitButton = $("exui-task-assignment-confirm button[type = 'submit']");
        this.cancelLink = element(by.xpath("//exui-task-assignment-confirm//p/a[contains(text(),'Cancel')]"));
    }


    async amOnPage() {
        try {
            await BrowserWaits.waitForElement(this.pageContainer);
            return true;
        } catch (err) {
            CucumberReporter.AddMessage(err.stack);
            return false;
        }
    }

    async validatePage() {
        const headerText = await this.header.getText();
        expect(headerText.includes("Check your answers")).to.be.true;
        expect(await checkyourChangesTable.isDisplayed()).to.be.true;
        expect(await this.changeLink.isDisplayed()).to.be.true;

    }

    async getColumnValue(header) {
        const colElement = await checkyourChangesTable.getColumnValueAtRow(1,header);
        const coltext = await colElement.getText();
        return coltext;
    }

    async clickChangeLink() {
        await checkyourChangesTable.clickLinkWithTextAtRow(1,"change");
    }



    async isTaskTableHeaderDisplayed(headerCol) {
        const colheaderPos = await checkyourChangesTable.isTableHeaderDisplayed(headerCol);
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
