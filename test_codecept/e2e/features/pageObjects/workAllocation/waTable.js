const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const reportLogger = require('../../../../codeceptCommon/reportLogger');
const { $, $$, elementByXpath, elementsByXpath, isPresent } = require('../../../../helpers/globals');
const browserUtil = require('../../../../ngIntegration/util/browserUtil');
const { LOG_LEVELS } = require('../../../support/constants');
const BrowserWaits = require('../../../support/customWaits');
const Spinner = require('../../pageObjects/common/spinner');

class WAListTable {
  constructor(baseCssLocator) {
    this.baseCssLocator = baseCssLocator;
    this.spinner = new Spinner();
  }

  get table() {
    return $(this.baseCssLocator);
  }

  get tableRows() {
    return $$(`${this.baseCssLocator} table tbody > tr:not(.actions-row)`);
  }

  get tableHeaderColumns() {
    return $$(`${this.baseCssLocator} table thead th`);
  }

  get tableFooter() {
    return $(`${this.baseCssLocator} table tfoot td`);
  }

  get actionsRows() {
    return $$(`${this.baseCssLocator} table tbody > tr.actions-row`);
  }

  get selectedActionRow() {
    return $(`${this.baseCssLocator} table tbody > tr.actions-row.selected`);
  }

  get selectedActions() {
    return $$(`${this.baseCssLocator} table tbody > tr.actions-row.selected .task-action a`);
  }

  get displayedActionRow() {
    return $(`tr.actions-row[aria-hidden=false]`);
  }

  get paginationContainer() {
    return $(`ccd-pagination .ngx-pagination`);
  }

  get paginationResultText() {
    return $(`${this.baseCssLocator} .task-list-header div, ${this.baseCssLocator} .pagination-top`).first();
  }

  get pagePreviousLink() {
    return $(`${this.baseCssLocator} pagination-template .pagination-previous a`);
  }

  get pageNextLink() {
    return $(`${this.baseCssLocator} pagination-template .pagination-next a`);
  }

  get resetSortButton() {
    return $(`${this.baseCssLocator} .reset-sort-button button`);
  }

  async isSpinnerDisplayed() {
    return await this.spinner.isSpinnerDisplayed();
  }

  async waitForSpinnerToDissappear() {
    await this.spinner.waitForSpinnerToDissappear();
  }

  async waitForTable() {
    await BrowserWaits.waitForElement(this.table);
    await BrowserWaits.waitForConditionAsync(async () => {
      const tableRowsCount = await this.tableRows.count();
      const isTableFooterDispayed = await this.tableFooter.isVisible();
      // cucumberReporter.AddMessage(`Waiting for WA list table condition : row count is ${tableRowsCount} or table foorter displayed ${isTableFooterDispayed}`, LOG_LEVELS.Info);
      return tableRowsCount > 0 || isTableFooterDispayed;
    }, BrowserWaits.waitTime);
  }

  async isTableDisplayed() {
    return await isPresent(this.table);
  }

  async getColumnCount() {
    return await this.tableHeaderColumns.count();
  }

  async getListCountInTable() {
    await this.waitForTable();
    return await this.tableRows.count();
  }

  async getHeaderColumnWidth(headerName) {
    let headerElement = null;
    try {
      headerElement = elementByXpath(`//${this.baseCssLocator}//table//thead//th//button[contains(text(),'${headerName}')]/..`);
      const dim = await headerElement.getSize();
      return dim.width;
    } catch (err) {
      console.log(err);
      console.log('retrying with header element as non-clickable element');
      headerElement = elementByXpath(`//${this.baseCssLocator}//table//thead//th//h1[contains(text(),'${headerName}')]/..`);
      const dim = await headerElement.getSize();
      return dim.width;
    }
  }

  getHeaderElementWithName(headerName) {
    return elementByXpath(`//${this.baseCssLocator}//table//thead//th//button[contains(text(),'${headerName}')]`);
  }

  getHeaderSortElementWithName(headerName) {
    return $(
      `${this.baseCssLocator} table thead th:has(button:has-text("${headerName}"))`
    );
  }

  getNonClickableHeaderElementWithName(headerName) {
    return elementByXpath(`//${this.baseCssLocator}//table//thead//th[contains(text(),'${headerName}')]`);
  }

  async getHeaderPositionWithName(headerName) {
    const headerNames = await $(`${this.baseCssLocator} table thead th`).allInnerTexts();
    for (let i = 0; i < headerNames.length; i++) {
      if (headerNames[i].includes(headerName)) {
        return i + 1;
      }
    }
    return -1;
  }

  async getColumnHeaderNames() {
    await this.waitForTable();
    const headers = await $(`${this.baseCssLocator} table thead th`).allInnerTexts();

    return headers;
  }

  async clickColumnHeader(headerName) {
    const headerElement = await this.getHeaderElementWithName(headerName);
    expect(await isPresent(headerElement), `Column with header name ${headerName} not present`).to.be.true;
    await browserUtil.scrollToElement(headerElement);
    await headerElement.click();
  }

  async getColumnSortState(headerName) {
    const headerElement = await this.getHeaderSortElementWithName(headerName);
    return await headerElement.getAttribute('aria-sort');
  }

  async isTableFooterDisplayed() {
    return await this.tableFooter.isVisible();
  }

  async getTableFooterMessage() {
    const tableFooterDisplayStatus = await this.isTableFooterDisplayed();
    if (!tableFooterDisplayStatus) {
      throw new Error('Table footer not displayed');
    }
    return await this.tableFooter.textContent();
  }

  async getTableRowAt(position) {
    await BrowserWaits.waitForConditionAsync(async () => {
      return await this.tableRows.count() > 0;
    });
    return await this.tableRows.nth(position - 1);
  }

  async getColumnValueAt(columnName, atPos) {
    const waRow = await this.getTableRowAt(atPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    if (columnPos === -1) {
      throw new Error(`${columnName} is not displayed in table`);
    }
    const columnValue = await waRow.locator(`td:nth-of-type(${columnPos})`).textContent();
    return columnValue;
  }

  async isColValALink(columnName, atPos) {
    const waRow = await this.getTableRowAt(atPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    const isLink = await isPresent(waRow.locator(`td:nth-of-type(${columnPos}) exui-url-field`));
    return isLink;
  }

  async clickColLink(columnName, atPos) {
    const waRow = await this.getTableRowAt(atPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    await waRow.locator(`td:nth-of-type(${columnPos}) exui-url-field a`).click();
  }

  async getColumnValueElementAt(columnName, atPos) {
    const waRow = await this.getTableRowAt(atPos);
    const columnPos = await this.getHeaderPositionWithName(columnName);
    return waRow.locator(`td:nth-of-type(${columnPos})`);
  }

  async getRowWithColumnValue(columnName, columnValue) {
    const rowsCount = await this.tableRows.count();
    for (let i = 0; i < rowsCount; i++) {
      const thisRowColValue = this.getColumnValueAt(columnName, i + 1);
      if (thisRowColValue.includes(columnValue)) {
        return i + 1;
      }
    }
    return -1;
  }

  async isManageLinkPresent(position) {
    return await browserUtil.stepWithRetry(async () => {
      const row = await this.getTableRowAt(position);
      return await isPresent(row.locator('button[id^="manage_"]'));
    });
  }

  async clickManageLinkForRowAt(position) {
    await BrowserWaits.retryWithActionCallback(async () => {
      const row = await this.getTableRowAt(position);
      const rowManageLink = row.locator('button[id^="manage_"]');
      await rowManageLink.scrollIntoViewIfNeeded();
      await rowManageLink.click();
      if (!(await this.isManageLinkOpenAtPos(position))) {
        throw new Error('Manage link not open. retying action');
      }
    });
  }

  async isManageLinkOpenAtPos(position) {
    const waRows = elementsByXpath('//tr[(contains(@class,\'actions-row\'))]');
    const row = await waRows.nth(position - 1);
    try {
      return await row.isVisible();
    } catch (err) {
      return false;
    }
  }

  async isRowActionPresent(rowAction) {
    await BrowserWaits.waitForElement(this.displayedActionRow);
    const actionLink = this.displayedActionRow.locator(`//div[contains(@class,"task-action") or contains(@class,"case-action")]//a[contains(text(),"${rowAction}" )]`);
    return await isPresent(actionLink);
  }

  async clickRowAction(action) {
    expect(await this.isRowActionPresent(action), 'action row not displayed').to.be.true;
    await reportLogger.AddMessage(`Manage links displayed : ${await this.displayedActionRow.textContent()}`, LOG_LEVELS.Debug);
    const actionLink = this.displayedActionRow.locator(`//div[contains(@class,"task-action") or contains(@class,"case-action")]//a[contains(text(),"${action}" )]`).first();
    await actionLink.scrollIntoViewIfNeeded();
    await actionLink.click();
  }

  async isRowActionRowForRowDisplayed(position) {
    return await isPresent(this.displayedActionRow);
  }

  async getCountOfDisplayedActionsRows() {
    const actionRowsCount = await this.actionsRows.count();
    let displayedActionRows = 0;
    for (let rowCtr = 0; rowCtr < actionRowsCount; rowCtr++) {
      const actionRow = await this.actionsRows.nth(rowCtr);
      if (await actionRow.isVisible()) {
        displayedActionRows++;
      }
    }
    return displayedActionRows;
  }

  async getTableRow(index) {
    return await this.tableRows.nth(index);
  }

  async isRowActionBarDisplayed() {
    try {
      await BrowserWaits.waitForElement(this.selectedActioRow);
      return true;
    } catch (err) {
      cucumberReporter.AddMessage(`${this.baseCssLocator} WA Row Action bar not displayed  ${err.stack}`, LOG_LEVELS.Error);
      return false;
    }
  }

  async isRowActionBarDisplayedForAtPos(row) {
    const waRow = await this.actionsRows.nth(row - 1);
    await BrowserWaits.waitForSeconds(1);
    return await waRow.isVisible();
  }

  async getPaginationResultText() {
    return await this.paginationResultText.textContent();
  }

  async isPaginationPageNumEnabled(pageNum) {
    const pageNumWithoutLink = elementByXpath(`//${this.baseCssLocator}//pagination-template//li//span[contains(text(),'${pageNum}')]`);
    const pageNumWithLink = elementByXpath(`//${this.baseCssLocator}//pagination-template//li//a//span[contains(text(),'${pageNum}')]`);

    return (await isPresent(pageNumWithLink)) && (await isPresent(pageNumWithoutLink));
  }

  async clickPaginationPageNum(pageNum) {
    if (!(await this.isPaginationPageNumEnabled(pageNum))) {
      throw new Error('Page num is not present or not enabled: ' + pageNum);
    }
    const pageNumWithLink = elementByXpath(`//${this.baseCssLocator}//pagination-template//li//a//span[contains(text(),'${pageNum}')]`);
    await pageNumWithLink.click();
  }

  async getRowActions() {
    return await this.selectedActioRow.textContent();
  }

  async clickPaginationLink(linkText) {
    let linkElement = null;
    if (linkText.toLowerCase() === 'next') {
      linkElement = this.pageNextLink;
    } else if (linkText.toLowerCase() === 'previous') {
      linkElement = this.pagePreviousLink;
    } else {
      linkElement = elementByXpath(`//${this.baseCssLocator}//pagination-template//li//a//span[contains(text(),'${linkText}')]`);
    }

    await BrowserWaits.waitForElement(linkElement);
    await browserUtil.scrollToElement(linkElement);
    await BrowserWaits.waitForElementClickable(linkElement);
    await linkElement.click();
  }

  async isPaginationControlDisplayed() {
    const isPresentBool = await isPresent(this.paginationContainer);
    let isDisplayed = false;

    if (isPresentBool) {
      isDisplayed = await this.paginationContainer.isVisible();
    }
    return isPresentBool && isDisplayed;
  }

  async getTableDisplayValuesAtRow(rowNum) {
    const displayValuesObject = {};
    const columnHeaders = await this.getColumnHeaderNames();

    for (const column of columnHeaders) {
      displayValuesObject[column] = await this.getColumnValueAt(column, rowNum);
    }
    return displayValuesObject;
  }

  async isResetSortButtonDisplayed() {
    return await isPresent(this.resetSortButton);
  }

  async clickResetSortButton() {
    await this.resetSortButton.click();
  }

  async isHeaderSortable(headerName) {
    const headerElementClickable = this.getHeaderElementWithName(headerName);

    const isDisplayed = await headerElementClickable.isVisible();

    return isDisplayed;
  }

  async getRowActionLinksTexts() {
    const links = await this.getRowActionLinks();
    const linkTexts = [];
    for (const link of links) {
      linkTexts.push(await link.textContent());
    }
    return linkTexts;
  }

  async getRowActionLinks() {
    const linksCount = await this.selectedActions.count();
    const links = [];
    for (let i = 0; i < linksCount; i++) {
      const e = await await this.selectedActions.nth(i);
      links.push(e);
    }
    return links;
  }
}

module.exports = WAListTable;
