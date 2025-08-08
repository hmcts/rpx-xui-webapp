const cucumberReporter = require('../../../codeceptCommon/reportLogger');
const { $, elementByXpath } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');

class GlobalSearchResultsPage {
  get pageHeader() { return elementByXpath('//exui-search-results//exui-page-wrapper//h1[contains(text(),"Search results")]'); }
  get changeSearchLink() { return elementByXpath('//exui-search-results//exui-page-wrapper//p//a[contains(text(),"Change search")]'); }

  get previousPageLink() { return elementByXpath('//exui-search-results//xuilib-pagination//*[contains(@class,"hmcts-pagination__link") and contains(text(),"Previous page")]'); }
  get nextpageLink() { return elementByXpath('//exui-search-results//xuilib-pagination//*[contains(@class,"hmcts-pagination__link") and contains(text(),"Next page")]'); }

  get table() { return $('exui-search-results exui-page-wrapper table'); }
  get tableHeaderColumns() { return $$('exui-search-results exui-page-wrapper table thead tr th'); }
  get tableDataRows() { return $$('exui-search-results exui-page-wrapper table tbody tr'); }

  get noResultsPageHeader() { return elementByXpath('//exui-no-results//exui-page-wrapper//h1[contains(text(),"No results found")]'); }
  get noResultsPageContainer() { return elementByXpath('//exui-no-results//exui-page-wrapper//h1[contains(text(),"No results found")]/..'); }
  get noResultsPageBackLink() { return elementByXpath('//exui-no-results//a[contains(text(),"Back")]'); }

  async amOnPage() {
    try {
      await BrowserWaits.waitForElement(this.pageHeader);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async isNoResultsPageDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.noResultsPageHeader, null, 120);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage(err);
      return false;
    }
  }

  async getNoResultsPageMessage() {
    expect(await this.isNoResultsPageDisplayed()).to.be.true;
    return await this.noResultsPageContainer.textContent();
  }

  async getTableColumns() {
    await BrowserWaits.waitForElement(this.table);
    const columnsCount = await this.tableHeaderColumns.count();
    const colNames = [];
    for (let i = 0; i < columnsCount; i++) {
      const colElement = await this.tableHeaderColumns.nth(i);
      const columnName = await colElement.textContent();

      if (columnName === '') {
        colNames.push('ACTION_LINK_COLUMN');
      } else {
        colNames.push(columnName);
      }
    }
    return colNames;
  }

  async getColumnIndex(columnName) {
    const columns = await this.getTableColumns();
    let index = -1;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i] === columnName) {
        index = i;
        break;
      }
    }
    return index;
  }

  async getTableRowsCount() {
    return await this.tableDataRows.count();
  }

  async getTableRowColumnValue(rowNum, columnName) {
    const columnElement = await this.getTableRowColumnElement(rowNum, columnName);
    return await columnElement.textContent();
  }

  async getTableRowColumnElement(rowNum, columnName) {
    const totalRowsCount = await this.getTableRowsCount();
    if (rowNum > totalRowsCount) {
      throw new Error(`Index outof bound : Total rows in table ${totalRowsCount} , requested row ${rowNum} `);
    }

    const tableRow = await this.tableDataRows.nth(rowNum - 1);

    const colIndex = await this.getColumnIndex(columnName);
    if (colIndex === -1) {
      throw new Error(`Column with name not found in table : ${columnName} `);
    }
    return await tableRow.locator('td').nth(colIndex);
  }
}

module.exports = new GlobalSearchResultsPage();

