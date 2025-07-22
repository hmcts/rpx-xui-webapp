const { elementByXpath, elementsByXpath, getText } = require('../../../../helpers/globals');

class GovUKTable{
  constructor(tableXpath){
    this.tableXpath = tableXpath;
  }

  async getTableHeadersByColumn(){
    const headers = elementsByXpath(`${this.tableXpath}//th`);
    const columnHeaderMap = {};
    const colCount = await headers.count();
    for (let i = 0; i < colCount; i++){
      const e = await headers.nth(i);
      columnHeaderMap[await getText(e)] = i+1;
    }
    return columnHeaderMap;
  }

  async getTableHeaders(){
    const headersColMap = await this.getTableHeadersByColumn();
    return Object.keys(headersColMap);
  }

  async getTableDataElements(){
    const columnHeaderMap = await this.getTableHeadersByColumn();
    const rows = elementsByXpath(`${this.tableXpath}//tbody//tr`);
    const rowsCount = await rows.count();
    const rowsDataElements = [];
    for (let rowCounter = 0; rowCounter < rowsCount; rowCounter++){
      const row = elementByXpath(`${this.tableXpath}//tbody//tr[position()=${rowCounter+1}]`);
      const rowDataElements = {};
      for (const column of Object.keys(columnHeaderMap)){
        rowDataElements[column] = elementByXpath(`${this.tableXpath}//tbody//tr[position()=${rowCounter + 1}]//td[position()=${columnHeaderMap[column]}]`);
        rowsDataElements.push(rowDataElements);
      }
    }
    return rowsDataElements;
  }
}

module.exports = GovUKTable;

