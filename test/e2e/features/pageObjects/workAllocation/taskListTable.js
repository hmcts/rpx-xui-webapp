const BrowserWaits = require('../../../support/customWaits');


class TaskListTable{

    constructor(){
        this.table = $('exui-task-list');
        this.tableRows = $$('exui-task-list table tbody>tr:not(.actions-row)');
        this.tableHeaderColumns = $$('exui-task-list table thead th');
        this.tableFooter = $('exui-task-list table tfoot td');
        this.taskActionsRows = $$('exui-task-list table tbody>tr.actions-row');
        this.displayedtaskActionRow = $('tr.actions-row[aria-hidden=false]');
    }

    async waitForTable(){
        await BrowserWaits.waitForElement(this.table);
    }

    async isTableDisplayed(){
        return await this.table.isPresent(); 
    }

    async getColumnCount(){
        return await this.tableHeaderColumns.count(); 
    }

    async getTaskListCountInTable(){
        return await this.tableRows.count();
    }

    getHeaderElementWithName(headerName){
        return element(by.xpath(`//exui-task-list//table//thead//th//button[contains(text(),'${headerName}')]`)); 
    }

    async getColumnHeaderNames(){
        const headers = element.all(by.xpath(`//exui-task-list//table//thead//th//button`));
        const names = [];
        const colCount = await headers.count();
        for (let i = 0; i < colCount; i++) {
            const name = await headers.get(i).getText();
            if (name !== ''){
                names.push(name);
            } 
        }
        return names; 
    }    

    async clickColumnHeader(headerName){
        const headerElement = this.getHeaderElementWithName(headerName);
        expect(await headerElement.isPresent(), `Column with header name ${headerName} not present`).to.be.true;
        await headerElement.click();
    }

    async getColumnSortState(headerName){
        const headerElement = this.getHeaderElementWithName(headerName);
        return await headerElement.element(by.xpath("..")).getAttribute("aria-sort");

    }

    async isTableFooterDisplayed(){
        return await this.tableFooter.isDisplayed();
    }

    async getTableFooterMessage(){
        const tableFooterDisplayStatus = await this.isTableFooterDisplayed();
        if (!tableFooterDisplayStatus){
            throw new Error("Table footer not displayed");
        } 
        return await this.tableFooter.getText(); 
    } 

    async getTableRowAt(position){
        await BrowserWaits.waitForCondition(async () => {
            return await this.tableRows.count() > 0; 
        });
        return await this.tableRows.get(position - 1);
    }

    async clickManageLinkForTaskAt(position){
        const taskrow = await this.getTableRowAt(position);
        await taskrow.$('button[id^="manage_"]').click();

    }

    async clickTaskAction(action){
        const actionLink = await this.displayedtaskActionRow.element(by.xpath(`//div[@class = "task-action"]//a[contains(text(),"${action}" )]`))
        await actionLink.click();
    }

    async isTaskActionRowForTaskDisplayed(position){
        const taskrow = this.getTableRowAt(position);
        const taskActionRow = await this.taskActionsRows.get(position - 1);
        return await taskActionRow.isDisplayed(); 

    }

    async getCountOfDisplayedActionsRows(){
        const actionRowsCount = await this.taskActionsRows.count();
        let displayedActionRows = 0;
        for (let rowCtr = 0; rowCtr < actionRowsCount; rowCtr++){
            const actionRow = await this.taskActionsRows.get(rowCtr); 
            if (await actionRow.isDisplayed()){
                displayedActionRows++;
            }
        } 
        return displayedActionRows;
    }
    async getTableRow(index){
        return await this.tableRows.get(index);
    }
}

module.exports = TaskListTable; 