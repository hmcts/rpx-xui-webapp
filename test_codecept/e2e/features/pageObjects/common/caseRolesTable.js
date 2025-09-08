const { elementByXpath, elementsByXpath, getText, isPresent } = require('../../../../helpers/globals');

const BrowserWaits = require('../../../support/customWaits');
const reportLogger = require('../../../../codeceptCommon/reportLogger');
const BrowserUtil = require('../../../../ngIntegration/util/browserUtil');
const { LOG_LEVELS } = require('../../../support/constants');
class CaseRolesTable {
  constructor(parentXpath) {
    this.parentXpath = parentXpath;
  }

  get container() { return elementByXpath(`${this.parentXpath}`); }
  get table() { return elementByXpath(`${this.parentXpath}//table`); }
  get headers() { return elementsByXpath(`${this.parentXpath}//table//thead//tr//th`); }
  get rows() { return elementsByXpath(`${this.parentXpath}//table//tbody//tr[contains(@class,'govuk-table__row')]`); }
  get summaryMessage() { return elementByXpath(`${this.parentXpath}//dd`); }

  async getHeaderTexts() {
    return await this.headers.allTextContents();
  }

  rowCells(index) {
    return this.rows.nth(index).locator('td');
  }

  async isTableDisplayed() {
    reportLogger.AddMessage(
      `Table locator: ${this.table.locator().toString()}`,
      LOG_LEVELS.Debug
    );
    return isPresent(this.table);
  }

  async isNoDataSummaryMessageDisplayed() {
    reportLogger.AddMessage(`No data summary locator: ${this.summaryMessage.locator().toString()}`, LOG_LEVELS.Debug);
    return isPresent(this.summaryMessage);
  }

  async getNoDataSummaryMessage() {
    reportLogger.AddMessage(`No data summary locator: ${this.summaryMessage.locator().toString()}`, LOG_LEVELS.Debug);
    return getText(this.summaryMessage);
  }

  async getRowsCount() {
    return await this.rows.count();
  }

  async getTableRowAtIndex(index) {
    const rowCount = await this.getRowsCount();
    if (index - 1 >= rowCount) {
      throw new Error(`Cannot get row at index ${index}, table has total rows ${rowCount}`);
    }
    return this.rows.nth(index - 1);
  }

  async getHeaderColumnPos(header) {
    const colsCount = await this.headers.count();
    let colIndex = -1;
    for (let i = 0; i < colsCount; i++) {
      const headerColElement = this.headers.nth(i);
      const headerText = await getText(headerColElement);
      if (headerText === header) {
        colIndex = i;
        break;
      }
    }
    return colIndex;
  }

  async getColumnElementAtRow(rowIndex, header) {
    const pos = await this.getHeaderColumnPos(header);
    const rowElement = await this.getTableRowAtIndex(rowIndex);

    if (pos === -1) throw new Error(`Table header "${header}" not found`);

    const rowColumns = rowElement.locator('td');
    return rowColumns.nth(pos);
  }

  async getColumnValueAtRow(rowIndex, header) {
    const colElement = await this.getColumnElementAtRow(rowIndex, header);
    const coltext = await getText(colElement);
    return coltext;
  }

  async getLinkElementWithTextAtRow(rowIndex, linkText) {
    const linkElement = elementByXpath(`${this.parentXpath}//table//tbody//tr[contains(@class,'govuk-table__row')][${rowIndex}]//td//span[not(contains(@class,'hidden'))]//a[contains(text(),'${linkText}')]`);

    reportLogger.AddMessage(`Case role table link with text element at row : ${linkElement.selector.xpath}`, LOG_LEVELS.Debug);
    return linkElement;
  }

  async isLinkWithTextPresentAtRow(rowIndex, linkText) {
    const linkElement = await this.getLinkElementWithTextAtRow(rowIndex, linkText);
    try {
      return await linkElement.isVisible(linkElement);
    } catch (err) {
      reportLogger.AddMessage(`error checking ${linkElement.selector}`, LOG_LEVELS.Error);

      return false;
    }
  }

  async clickLinkWithTextAtRow(rowIndex, linkText) {
    const linkElement = await this.getLinkElementWithTextAtRow(rowIndex, linkText);
    await BrowserWaits.waitForElement(linkElement);

    await BrowserUtil.scrollToElement(linkElement);
    await linkElement.click();
  }

  async isTableHeaderDisplayed(headerCol) {
    const colheaderPos = await this.getHeaderColumnPos(headerCol);
    return colheaderPos != -1;
  }

  async isActionRowDisplayed(atRow) {
    const actionRowDatas = elementsByXpath(`${this.parentXpath}//table//tbody//tr[contains(@class,'govuk-table__row')][${atRow}]/following-sibling::tr[position()=1]//td`);
    const tdCountOfRow = await actionRowDatas.count();
    return tdCountOfRow === 1;
  }

  async isManageActionLinkDisplayed(actionLinkLabel) {
    const actionLink = elementByXpath(
      `${this.parentXpath}//table//tbody//tr//td//a[contains(text(),'${actionLinkLabel}')]`
    );
    return isPresent(actionLink);
  }

  async clickManageActionLink(actionLinkLabel) {
    const actionLink = elementByXpath(`${this.parentXpath}//table//tbody//tr//td//a[contains(text(),'${actionLinkLabel}')]`);
    await BrowserUtil.scrollToElement(actionLink);

    await actionLink.click();
  }
}

module.exports = CaseRolesTable;
