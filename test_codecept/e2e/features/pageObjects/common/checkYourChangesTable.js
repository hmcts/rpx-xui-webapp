
const BrowserWaits = require("../../../support/customWaits");

class CheckYourChangesAnswersTable {

    constructor(parentlocator) {

        this.changesTable = $("table");
        this.tableHeaders = $$('table tr th');
        this.tableRows = $$('table tbody tr');

    }

    async getRowsCount() {
        return await this.tableRows.count();
    }

    async getTableRowAtIndex(index) {
        await this.waitForTableRows();

        const rowCount = this.getRowsCount();
        if (index - 1 >= rowCount) {
            throw new Error(`Cannot get row at index ${index}, table has total rows ${rowCount}`);
        }
        return await this.tableRows.get(index - 1);
    }

    async getHeaderColumnPos(header) {
        await this.waitForTableRows();

        const colsCount = await this.tableHeaders.count();
        let colIndex = -1;
        for (let i = 0; i < colsCount; i++) {
            const headerColElement = await this.tableHeaders.get(i);
            const headerText = await headerColElement.getText();
            if (headerText === header) {
                colIndex = i;
                break;
            }
        }
        return colIndex;
    }

    async getHeaders() {
        await this.waitForTableRows();
        const headers = [];
        const colsCount = await this.tableHeaders.count();
        for (let i = 0; i < colsCount; i++) {
            const headerColElement = await this.tableHeaders.get(i);
            const headerText = await headerColElement.getText();
            headers.push(headerText);
           
        }
        return headers;
    }


    async getColumnElementAtRow(rowIndex, header) {
        await this.waitForTableRows();

        const pos = await this.getHeaderColumnPos(header);
        const rowElement = await this.getTableRowAtIndex(rowIndex);

        if (pos === -1) {
            throw new Error(`Table header "${header}" not found`);
        }
        const rowColumns = rowElement.$$('td');
        const col = await rowColumns.get(pos);
        return col;
    }

    async getColumnValueAtRow(rowIndex, header) {
        await this.waitForTableRows();
        const colElement = await this.getColumnElementAtRow(rowIndex, header);
        const coltext = await colElement.getText();
        return coltext;
    }

    async getLinkElementWithTextAtRow(rowIndex, linkText) {
        await this.waitForTableRows();

        const rowElement = await this.getTableRowAtIndex(rowIndex);
        return rowElement.element(by.xpath(`//td//a[contains(text(),'${linkText}')]`));
    }

    async isLinkWithTextPresentAtRow(rowIndex, linkText) {
        await this.waitForTableRows();

        const linkElement = await this.getLinkElementWithTextAtRow(rowIndex, linkText);
        try {
            await BrowserWaits.waitForElement(linkElement);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    async clickLinkWithTextAtRow(rowIndex, linkText) {
        await this.waitForTableRows();

        const linkElement = this.getLinkElementWithTextAtRow(rowIndex, linkText);
        await BrowserWaits.waitForElement(linkElement);
        await linkElement.click();
    }

    async isTableHeaderDisplayed(headerCol) {
        await this.waitForTableRows();

        const colheaderPos = await this.getHeaderColumnPos(headerCol);
        return colheaderPos !== -1;
    }

    async waitForTableRows(){
        await BrowserWaits.waitForConditionAsync(async () => {
            return (await this.getRowsCount()) > 0
        });
    }


}

module.exports = CheckYourChangesAnswersTable;
