const c = require('config');
const { constants } = require('karma');
const { browser } = require('protractor');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../../support/customWaits');
const ArrayUtil = require('../../../utils/ArrayUtil');
const Spinner = require('../../pageObjects/common/spinner');

var cucumberReporter = require('../../../support/reportLogger');
const WATable = require("./waTable");

class TaskListTable extends WATable{

    constructor(){
        super('exui-task-list');
       
    }
 
    async getTaskListCountInTable(){
        return await this.getListCountInTable();
    }

    async getColumnValueForTaskAt(columnName, taskAtPos){
        
        return this.getColumnValueAt(columnName, taskAtPos);
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