const c = require('config');
const { constants } = require('karma');
const { browser } = require('protractor');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');
const BrowserWaits = require('../../../support/customWaits');
const ArrayUtil = require('../../../utils/ArrayUtil');
const Spinner = require('../../pageObjects/common/spinner');

var cucumberReporter = require('../../../support/reportLogger');
const WATable = require("./waTable");

class WACaseListTable extends WATable {

    constructor() {
        super('exui-my-cases');

    }

    async getCaseListCountInTable() {
        return await this.getListCountInTable();
    }

    async getColumnValueForCaseAt(columnName, caseAtPos) {

        return this.getColumnValueAt(columnName, caseAtPos);
    }

    async isColValForCaseALink(columnName, caseAtPos) {
        return this.isColValALink(columnName, caseAtPos);
    }

    async clickCaseColLink(columnName, caseAtPos) {
        await this.clickColLink(columnName, caseAtPos);

    }

    async getColumnValueElementForCaseAt(columnName, caseAtPos) {
        return this.getColumnValueElementAt(columnName, caseAtPos);
    }

    async getCaseRowWithColumnValue(columnName, columnValue) {
        return this.getRowWithColumnValue(columnName, columnValue);
    }


    async clickManageLinkForCaseAt(position) {
        await this.clickManageLinkForRowAt(position);
    }

    async isManageLinkOpenForCaseAtPos(position) {
        return await this.isManageLinkOpenAtPos(position);


    }

    async isCaseActionPresent(taskAction) {
        return this.isRowActionPresent(taskAction);
    }

    async clickCaseAction(action) {
        await this.clickRowAction(action);
    }

    async isCaseActionRowForTaskDisplayed(position) {
        return await this.isRowActionRowForRowDisplayed();

    }

    async isCaseActionBarDisplayed() {
        return await this.isRowActionBarDisplayed();
    }

    async isCaseActionBarDisplayedForAtPos(row) {
        return await this.isRowActionBarDisplayedForAtPos(row);
    }

    async getCaseActions() {
        return await this.getRowActions();
    }


}

module.exports = TaskListTable;