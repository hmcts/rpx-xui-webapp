const { isPresent } = require('../../../../helpers/globals');
const WATable = require('./waTable');

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
    const isLink = await isPresent(taskRow.locator(`td:nth-of-type(${columnPos}) exui-url-field`));
    return isLink;
  }

  async clickTaskColLink(columnName, taskAtPos){
    const taskRow = await this.getTableRowAt(taskAtPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    await taskRow.locator(`td:nth-of-type(${columnPos}) exui-url-field a`).click();
  }

  async getColumnValueElementForTaskAt(columnName, taskAtPos) {
    const taskRow = await this.getTableRowAt(taskAtPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    return taskRow.locator(`td:nth-of-type(${columnPos})`);
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
