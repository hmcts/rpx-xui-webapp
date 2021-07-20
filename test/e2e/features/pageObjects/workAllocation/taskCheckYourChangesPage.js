
const BrowserWaits = require("../../../support/customWaits");
const CucumberReporter = require("../../../support/reportLogger");

class TaskCheckYourChangesPage{
    constructor(){
        this.pageContainer = $("exui-task-assignment-confirm");
        this.header = $("exui-task-assignment-confirm h1");
        this.headerCaption = $("exui-task-assignment-confirm h1 span");

        this.checkYourChangesHintText = $("exui-task-assignment-confirm #reassign-confirm-hint|exui-task-assignment-confirm #assign-confirm-hint ");

        this.submitButton = $("exui-task-assignment-confirm button[type = 'submit']");
        this.cancelLink = element(by.xpath("//exui-task-assignment-confirm//p/a[contains(text(),'Cancel')]"));

        this.taskDetailsTable = $("exui-task-assignment-confirm table");
        this.tableHeaders = $$('exui-task-assignment-confirm table tr th');
        this.tableColumnValues = $$('exui-task-assignment-confirm table tr td');

        this.changeLink = $("exui-task-assignment-confirm table tr td #change__link");

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
        const heaerText = await this.header.getText();
        expect(heaerText.includes("Check your answers")).to.be.true;
        expect(await this.taskDetailsTable.isDisplayed()).to.be.true;
        expect(await this.changeLink.isDisplayed()).to.be.true;

    }

    async getHeaderColumnPos(header){
        const colsCount = await this.tableHeaders.count();
        let colIndex = -1;
        for(let i = 0; i < colsCount; i++){
            const headerColElement = await this.tableHeaders.get(i);
            const headerText = await headerColElement.getText();
            if (headerText === header){
               colIndex = i;
               break;
            }
        }
        return colIndex;
    }


    async getColumnElement(header) {
        const pos = await this.getHeaderColumnPos(header);
        if(pos === -1){
            throw new Error(`Table header "${header}" not found`);
        }
        const col = await this.tableColumnValues.get(pos);
        return col;
    }

    async getColumnValue(header) {
        const colElement = await this.getColumnElement(header);
        const coltext = await colElement.getText();
        return coltext;
    }

    async  clickChnageLink(){
        await this.changeLink.click();
    }



    async isTaskTableHeaderDisplayed(headerCol){
        const colheaderPos = await this.getHeaderColumnPos(headerCol);
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
