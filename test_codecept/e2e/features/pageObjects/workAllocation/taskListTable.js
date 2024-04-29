const c = require('config');
const { constants } = require('karma');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../../support/customWaits');
const ArrayUtil = require('../../../utils/ArrayUtil');
const Spinner = require('../../pageObjects/common/spinner');
const Application = require('../../pageObjects/common/application');

var cucumberReporter = require('../../../../codeceptCommon/reportLogger');

var cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const WATable = require("./waTable");

class TaskListTable extends WATable{

    constructor(){
        super('exui-task-list');
       
    }
 
    async getTaskListCountInTable(){
        return await this.getListCountInTable();
    }

    async getColumnValueForTaskAt(columnName, taskAtPos){
        
        return await this.getColumnValueAt(columnName, taskAtPos);
    }

    async isColValForTaskALink(columnName, taskAtPos) {
        return this.isColValALink(columnName, taskAtPos);
    }

    async clickTaskColLink(columnName, taskAtPos){
        await this.clickColLink(columnName, taskAtPos);
        
    }

    async getColumnValueElementForTaskAt(columnName, taskAtPos) {
        return this.getColumnValueElementAt(columnName, taskAtPos);
    }

    async isColValForTaskALink(columnName, taskAtPos) {
        const taskRow = await this.getTableRowAt(taskAtPos);
        const columnPos = await this.getHeaderPositionWithName(columnName);
        const isLink = await taskRow.$(`td:nth-of-type(${columnPos}) exui-url-field`).isPresent();
        return isLink;
    }

    async clickTaskColLink(columnName, taskAtPos){
        const taskRow = await this.getTableRowAt(taskAtPos);
        const columnPos = await this.getHeaderPositionWithName(columnName);
        await taskRow.$(`td:nth-of-type(${columnPos}) exui-url-field a`).click();
        
    }

    async getColumnValueElementForTaskAt(columnName, taskAtPos) {
        const taskRow = await this.getTableRowAt(taskAtPos);
        const columnPos = await this.getHeaderPositionWithName(columnName);
        return taskRow.$(`td:nth-of-type(${columnPos})`);
    }

    async getTaskRowWithColumnValue(columnName, columnValue){
        return this.getRowWithColumnValue(columnName, columnValue);
    }


    async clickManageLinkForTaskAt(position){
        await this.clickManageLinkForRowAt(position);
    }

    async isManageLinkOpenForTaskAtPos(position){
        return await this.isManageLinkOpenAtPos(position);
        
        
    }

    async isTaskActionPresent(taskAction){ 
        return this.isRowActionPresent(taskAction);
    }

    async clickTaskAction(action){ 
        await this.clickRowAction(action);
    }

    async isTaskActionRowForTaskDisplayed(position){
        return await this.isRowActionRowForRowDisplayed();

    }

    async isTaskActionBarDisplayed(){
       return await this.isRowActionBarDisplayed();
    }

    async isTaskActionBarDisplayedForAtPos(row) {
        return await this.isRowActionBarDisplayedForAtPos(row);
    }

    async getTaskActions(){
        return await this.getRowActions();
    }


}

module.exports = TaskListTable; 