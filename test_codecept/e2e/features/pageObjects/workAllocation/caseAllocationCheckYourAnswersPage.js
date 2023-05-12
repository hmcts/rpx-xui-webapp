
const { LOG_LEVELS } = require("../../../support/constants");
const BrowserWaits = require("../../../support/customWaits");
const CucumberReporter = require("../../../../codeceptCommon/reportLogger");
const CheckyourChangesTable = require("../common/checkYourChangesTable");
class CaseAllocationCheckYourChangesPage {
    constructor() {
        this.pageContainer = $("exui-allocate-role-check-answers");
        this.header = $("exui-allocate-role-check-answers h1");
        this.headerCaption = $("exui-allocate-role-check-answers h1 span");

        this.checkYourChangesHintText = $("exui-allocate-role-check-answers #reassign-confirm-hint|exui-allocate-role-check-answers #assign-confirm-hint");

        this.submitButton = $("exui-allocate-role-navigation button");
        this.cancelLink = element(by.xpath("/exui-allocate-role-check-answers//p/a[contains(text(),'Cancel')]"));

        this.checkYourChangesTable = $('.govuk-summary-list')
        this.answerRows = $('.govuk-summary-list .govuk-summary-list__row')
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
        expect(heaerText).to.contains("Check your");
        await BrowserWaits.waitForElement(this.checkYourChangesTable);

        const answerRow = await this.answerRows.get(1)
        const answerRowActionLink = answerRow.$('.govuk-summary-list__actions')
        expect(await answerRow.isDisplayed()).to.be.true;

    }

    async getColumnValue(header) {
        const rowsCount = await this.answerRows.count();
        let colvalue = null;
        for(let i = 0; i< rowsCount; i++){
            const row = await this.answerRows.get(i)
            const headerName = row.$('.govuk-summary-list__key');
            const thisHeadername = await headerName.getText();

            if (thisHeadername === header){
                const headerValue = row.$('.govuk-summary-list__value');
                colvalue = await headerValue.getText();
            }
        }   
        if (colvalue === null){
            throw new Error(`${header} is not found`)
        }
        return colvalue;
    }

    async clickChangeLink() {
        await this.checkyourChangesTable.clickLinkWithTextAtRow(1, "change");
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

module.exports = new CaseAllocationCheckYourChangesPage();
