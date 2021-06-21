const c = require('config');
const { constants } = require('karma');
const { browser } = require('protractor');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../../support/customWaits');
var cucumberReporter = require('../../../support/reportLogger');


class TaskListTable{

    constructor(){
        this.table = $('exui-task-list');
        this.tableRows = $$('exui-task-list table tbody>tr:not(.actions-row)');
        this.tableHeaderColumns = $$('exui-task-list table thead th');
        this.tableFooter = $('exui-task-list table tfoot td');
        this.taskActionsRows = $$('exui-task-list table tbody>tr.actions-row');
        this.selectedTaskActioRow = $('exui-task-list table tbody>tr.actions-row.selected') 
        this.displayedtaskActionRow = $('tr.actions-row[aria-hidden=false]');

        this.paginationContainer = $('ccd-pagination');
        this.paginationResultText = $('exui-task-list .pagination-top span');
        this.pagePreviousLink = $('exui-task-list pagination-template .pagination-previous a');
        this.pageNextLink = $('exui-task-list pagination-template .pagination-next a');

    }

    async waitForTable(){
        await BrowserWaits.waitForElement(this.table);
        await BrowserWaits.waitForConditionAsync(async ()=>{
            await BrowserWaits.waitForSeconds(2);
            let tableRowsCount = await this.tableRows.count();
            let isTableFooterDispayed = await this.tableFooter.isDisplayed();
            cucumberReporter.AddMessage(`Waiting for task list table condition : row count is ${tableRowsCount} or table foorter displayed ${isTableFooterDispayed}`);
            return tableRowsCount > 0 || isTableFooterDispayed; 
        },45000);
    }

    async isTableDisplayed(){
        return await this.table.isPresent(); 
    }

    async getColumnCount(){
        return await this.tableHeaderColumns.count(); 
    }

    async getTaskListCountInTable(){
        await this.waitForTable();
        return await this.tableRows.count();
    }

    async getHeaderElementWithName(headerName){
        return element(by.xpath(`//exui-task-list//table//thead//th//button[contains(text(),'${headerName}')]`)); 
    }

    async getHeaderPositionWithName(headerName) {
        const headers = element.all(by.xpath(`//exui-task-list//table//thead//th`));
        const colCount = await headers.count();
        for (let i = 0; i < colCount; i++) {
            const name = await headers.get(i).getText();
            if (name.includes(headerName)) {
                return i + 1;
            }
        }
        return -1;   
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
        const headerElement = await this.getHeaderElementWithName(headerName);
        expect(await headerElement.isPresent(), `Column with header name ${headerName} not present`).to.be.true;
        await headerElement.click();
    }

    async getColumnSortState(headerName){
        const headerElement = await this.getHeaderElementWithName(headerName);
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

    async getColumnValueForTaskAt(columnName, taskAtPos){
        const taskRow = await this.getTableRowAt(taskAtPos); 
        const columnPos = await this.getHeaderPositionWithName(columnName);
        const columnValue = await taskRow.$(`td:nth-of-type(${columnPos})`).getText();
        return columnValue;
    }

    async getColumnValueElementForTaskAt(columnName, taskAtPos) {
        const taskRow = await this.getTableRowAt(taskAtPos);
        const columnPos = await this.getHeaderPositionWithName(columnName);
        return taskRow.$(`td:nth-of-type(${columnPos})`);
    }

    async getTaskRowWithColumnValue(columnName, columnValue){
        const tasksCount = await this.tableRows.count();
        for(let i = 0; i < tasksCount; i++){
            let thisTaskColValue = this.getColumnValueForTaskAt(columnName,i+1); 
            if (thisTaskColValue.includes(columnValue)){
                return i + 1;
            }
        } 
        return -1;
    }

    async isManageLinkPresent(position){
        return await browserUtil.stepWithRetry(async () => {
            const taskrow = await this.getTableRowAt(position);
            return await taskrow.$('button[id^="manage_"]').isPresent();
        });
    }

    async clickManageLinkForTaskAt(position){
        await browserUtil.stepWithRetry(async () => {
            const taskrow = await this.getTableRowAt(position);

            await BrowserWaits.waitForElementClickable(taskrow);
            await taskrow.$('button[id^="manage_"]').click();
        });
    }

    async isManageLinkOpenForTaskAtPos(position){
        const task = element(by.xpath(`//tr[contains(@class,'cdk-row') and not(contains(@class,'actions-row'))][${position}]/following-sibling::tr[contains(@class,'actions-row')]`));
        return await task.isDisplayed();
    }

    async isTaskActionPresent(taskAction){ 
        await BrowserWaits.waitForElement(this.displayedtaskActionRow);
        const actionLink = this.displayedtaskActionRow.element(by.xpath(`//div[@class = "task-action"]//a[contains(text(),"${taskAction}" )]`))
        return actionLink.isPresent();
    }

    async clickTaskAction(action){
        
        await BrowserWaits.waitForConditionAsync(async () => await this.isTaskActionPresent(action),5000);

        const actionLink = this.displayedtaskActionRow.element(by.xpath(`//div[@class = "task-action"]//a[contains(text(),"${action}" )]`))
        await browser.executeScript('arguments[0].scrollIntoView()',
            actionLink.getWebElement());
        await actionLink.click();
    }

    async isTaskActionRowForTaskDisplayed(position){
        return await this.displayedtaskActionRow.isPresent();

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

    async isTaskActionBarDisplayed(){
       try{
           await BrowserWaits.waitForElement(this.selectedTaskActioRow);
           return true; 
       }
       catch(err){
           cucumberReporter.AddMessage("Task Action bar not displayed "+err);
            return false;
       }
    }

    async isTaskActionBarDisplayedForAtPos(row) {

        const taskRow = await this.taskActionsRows.get(row - 1);
        await BrowserWaits.waitForSeconds(1);
        return await taskRow.isDisplayed();
    }

    async getPaginationResultText() {
        return await this.paginationResultText.getText();
    }



    async isPaginationPageNumEnabled(pageNum) {
        const pageNumWithoutLink = element(by.xpath(`//exui-task-list//pagination-template//li//span[contains(text(),'${pageNum}')]`));
        const pageNumWithLink = element(by.xpath(`//exui-task-list//pagination-template//li//a//span[contains(text(),'${pageNum}')]`));

        return (await pageNumWithLink.isPresent()) && (await pageNumWithoutLink.isPresent());
    }

    async clickPaginationPageNum(pageNum) {
        if (!(await this.isPaginationPageNumEnabled(pageNum))) {
            throw new Error("Page num is not present or not enabled: " + pageNum);
        }
        const pageNumWithLink = element(by.xpath(`//exui-task-list//pagination-template//li//a//span[contains(text(),'${pageNum}')]`));
        await pageNumWithLink.click();

    }

    async getTaskActions(){
        return await this.selectedTaskActioRow.getText();
    }

    async clickPaginationLink(linkText){
        let linkElement = null;
        if (linkText.toLowerCase() === 'next'){
            linkElement = this.pageNextLink;
        } else if (linkText.toLowerCase() === 'previous'){
            linkElement = this.pagePreviousLink;
        }else{
            linkElement = element(by.xpath(`//exui-task-list//pagination-template//li//a//span[contains(text(),'${linkText}')]`));
        }

        await BrowserWaits.waitForElement(linkElement);
        await browserUtil.scrollToElement(linkElement);
        await BrowserWaits.waitForElementClickable(linkElement);
        await linkElement.click();

    }
}

module.exports = TaskListTable; 