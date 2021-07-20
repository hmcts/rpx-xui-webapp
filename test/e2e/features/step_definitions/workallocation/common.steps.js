
var { defineSupportCode } = require('cucumber');
const reportLogger = require('../../../support/reportLogger');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const TaskListTable = require('../../pageObjects/workAllocation/taskListTable');

const ArrayUtil = require('../../../utils/ArrayUtil');

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();


    Then('I validate task list page results text displayed as {string}', async function (pagnationResultText) {
        expect(await taskListTable.getPaginationResultText()).to.include(pagnationResultText);
    });

    When('I click task list pagination link {string}', async function (paginationLinktext) {
        await BrowserWaits.waitForSeconds(1);
        

        await BrowserWaits.waitForConditionAsync(async () => {
            const colCount = await taskListTable.getColumnCount();
            const rowCount = await taskListTable.getTaskListCountInTable();
            return colCount > 0 && rowCount > 0;
        });
        if (paginationLinktext.toLowerCase() === "next") { 
            await taskListTable.pageNextLink.click();
        } else if (paginationLinktext.toLowerCase() === "previous") { 
            await taskListTable.pagePreviousLink.click();
        } else {
            await taskListTable.clickPaginationPageNum(paginationLinktext);
        }
    });

    Then('I validate task search request with reference {string} has pagination parameters', async function (requestReference, datatable) {
        const reqBody = global.scenarioData[requestReference];
        const datatableHash = datatable.hashes()[0];
        expect(reqBody.searchRequest.pagination_parameters.page_number).to.equal(parseInt(datatableHash.PageNumber));
        expect(reqBody.searchRequest.pagination_parameters.page_size).to.equal(parseInt(datatableHash.PageSize));
    });


    When('I click task list table header column {string}', async function(columnHeaderLabel){
        await taskListTable.clickColumnHeader(columnHeaderLabel);
    });

    Then('I validate task list table sorted with column {string} in order {string}', async function(columnheaderlabel, sortOrder){
        const columnSortVal = await taskListTable.getColumnSortState(columnheaderlabel);
        expect(columnSortVal).to.include(sortOrder.toLowerCase());
    });

    Then('I validate task list table columns displayed', async function (datatable) {
        const columnHeadersHash = datatable.hashes();
        const expectdColHeaders = await ArrayUtil.map(columnHeadersHash, (headerhash) => headerhash.ColumnHeader );  
        const actualHeadeColumns = await taskListTable.getColumnHeaderNames();
        expect(actualHeadeColumns.length, `Actual Cols ||${actualHeadeColumns}|| !== Expected Cols ||${expectdColHeaders}|| `).to.equal(expectdColHeaders.length);
        expect(actualHeadeColumns, `Actual Cols ||${actualHeadeColumns}|| !== Expected Cols ||${expectdColHeaders}|| `).to.include.members(expectdColHeaders);

    });

    Then('I validate task list columns are links', async function(datatable){
        const columnHeadersHash = datatable.hashes();
        const expectdLinkCols = await ArrayUtil.map(columnHeadersHash, (headerhash) => headerhash.ColumnHeader);

        const actualHeadeColumns = await taskListTable.getColumnHeaderNames();

        const actuallinkColumns = await ArrayUtil.filter(actualHeadeColumns,  (headerCol) => {
            return  taskListTable.isColValForTaskALink(headerCol,1);
        });

        expect(actuallinkColumns.length, `Actual Cols ||${actuallinkColumns}|| !== Expected Cols ||${expectdLinkCols}|| `).to.equal(expectdLinkCols.length);
        expect(actuallinkColumns).to.include.members(expectdLinkCols);

    });

    When('I click task column link {string} at row {int}', async function(colName, rowPos){
        await taskListTable.clickTaskColLink(colName,rowPos);
    });


});