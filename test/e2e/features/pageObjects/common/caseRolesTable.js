
const BrowserWaits = require("../../../support/customWaits"); 

class CaseRolesTable{

    constructor(parentElement){

        this.parent = parentElement;
        this.taskDetailsTable = parentElement.$("table");
        this.tableHeaders = parentElement.$$('table tr th');
        this.tableRows = parentElement.$$('table tr');

    }

    async getRowsCount(){
        return await this.tableRows.count();
    }

    async getTableRowAtIndex(index){
        const rowCount = this.getRowsCount();
        if (index-1 >= rowCount){
            throw new Error(`Cannot get row at index ${index}, table has total rows ${rowCount}`);
        }
        return await this.tableRows.get(index - 1);
    }

    async getHeaderColumnPos(header) {
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


    async getColumnElementAtRow(rowIndex , header) {
        const pos = await this.getHeaderColumnPos(header);
        const rowElement = await this.getTableRowAtIndex(rowIndex);

        if (pos === -1) {
            throw new Error(`Table header "${header}" not found`);
        }
        const rowColumns = rowElement.$$('td');
        const col = await rowColumns.get(pos);
        return col;
    }

    async getColumnValueAtRow(rowIndex,header) {
        const colElement = await this.getColumnElement(rowIndex,header);
        const coltext = await colElement.getText();
        return coltext;
    }

    async getLinkElementWithTextAtRow(rowIndex,linkText){
        const rowElement = await this.getTableRowAtIndex(rowIndex);
        return rowElement.element(by.xpath(`//td//a[contains(text(),'${linkText}')]`));
    }

    async isLinkWithTextPresentAtRow(rowIndex,linkText){
        const linkElement = this.getLinkElementWithTextAtRow(rowIndex,linkText);
        try{
            await BrowserWaits.waitForElement(linkElement);
            return true;
        }
        catch(err){
            return false;
        }
    }

    async clickLinkWithTextAtRow(rowIndex,linkText) {
        const linkElement = this.getLinkElementWithTextAtRow(rowIndex,linkText);
        await BrowserWaits.waitForElement(linkElement);
        await linkElement.click();
    }

    async isTableHeaderDisplayed(headerCol) {
        const colheaderPos = await this.getHeaderColumnPos(headerCol);
        return colheaderPos !== -1;
    }


}

module.exports = CaseRolesTable;
