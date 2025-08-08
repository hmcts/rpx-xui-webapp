const { elementByXpath, elementsByXpath, getText } = require('../../../../helpers/globals');

class CaseFlagsTabPage{
  constructor(){}

  getFlagTableFor(flagTableFor){
    return new FlagTableFor(flagTableFor);
  }
}

class FlagTableFor {
  constructor(tableFor){
    this.tableFor = tableFor;

    this.tableLocator = `//ccd-case-flag-table//caption[contains(text(),'${this.tableFor}')]/..`;

    this.tableHeader = elementByXpath(this.tableLocator);
    this.tableHeaders = elementsByXpath(`${this.tableLocator}//thead/tr/th`);

    this.tableRows = elementsByXpath(`${this.tableLocator}//tbody/tr`);

    this.tableDataNone = elementByXpath(`${this.tableLocator}//tbody/tr/td[contains(text(),'None')]`);
  }

  async isTableDataNone(){
    return await this.tableDataNone.isVisible();
  }

  async getTableData(){
    const colCount = await this.tableHeaders.count();
    const cols = [];
    for (let i = 0; i< colCount; i++){
      const colName = await getText(this.tableHeaders.nth(i));
      cols.push(colName);
    }

    const rowsCount = await this.tableRows.count();
    const tableObj = [];
    for (let rowCount = 0; rowCount < rowsCount; rowCount++){
      const row = await this.tableRows.nth(rowCount);
      const rowCols = row.locator('//td');

      let colCounter = 0;
      const rowObj = {};
      for (const col of cols){
        const colValue = await getText(rowCols.nth(colCounter));
        rowObj[col] = colValue;
        colCounter++;
      }
      tableObj.push(rowObj);
    }
    return tableObj;
  }
}

module.exports = new CaseFlagsTabPage();

