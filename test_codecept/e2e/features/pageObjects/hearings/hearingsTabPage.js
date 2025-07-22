const reportLogger = require('../../../../codeceptCommon/reportLogger');
const { $, elementByXpath, elementsByXpath, getText } = require('../../../../helpers/globals');

class HearingsTabPage{
  constructor(){
    this.currentAndUpcomingHearings = new HearingsTable('Current and upcoming');
    this.pastOrCancelledHearings = new HearingsTable('Past or cancelled');
  }

  get tabContainer() {
    return $('exui-case-hearings');
  }

  get requesthearingBtn() {
    return elementByXpath('//exui-case-hearings//a[contains(text(),\'Request a hearing\')]');
  }

  isDisplayed() {
    return this.tabContainer.isVisible();
  }

  getTableObject(tableName){
    return new HearingsTable(tableName);
  }

  getTableObject(tableName) {
    return new HearingsTable(tableName);
  }
}

class HearingsTable {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async isDisplayed() {
    const tableEle = elementByXpath(`//exui-case-hearings-list//th[contains(text(),'${this.tableName}')]`);
    return tableEle.isVisible();
  }

  async getTableHeaders() {
    const headers = elementsByXpath(`//exui-case-hearings-list//th[contains(text(),'${this.tableName}')]/../th`);
    const count = headers.count();

    const headerNames = [];
    for (let i = 0; i < count; i++) {
      const headerEle = await headers.nth(i);
      headerNames.push(await getText(headerEle));
    }
    return headerNames;
  }

  getColNumberForheaderName(headerName) {
    let colNum = -1;
    switch (headerName) {
      case 'Hearing date':
        colNum = 3;
        break;
      case 'Status':
        colNum = 4;
        break;
      case 'Actions':
        colNum = 5;
        break;
      default:
        colNum = -1;
    }
    return colNum;
  }

  getHearingTypeColumnElement(hearingType, valueForHeader) {
    const colNum = this.getColNumberForheaderName(valueForHeader);
    const tdXpath = `//exui-case-hearings-list//th[contains(text(),'${this.tableName}')]/../../..//tbody/tr/td[contains(text(),'${hearingType}')]/../td[position()=${colNum}]`;
    if (valueForHeader === 'Hearing date') {
      const xPath = tdXpath;
      return elementByXpath(xPath);
    } else if (valueForHeader === 'Status') {
      const xPath = `${tdXpath}/strong`;
      return elementByXpath(xPath);
    } else if (valueForHeader === 'Actions') {
      const xPath = `${tdXpath}/div[contains(@class,'div-action')]/a`;
      return elementsByXpath(xPath);
    }
    throw new Error(`Unknown column ${valueForHeader}`);
  }

  async clickActionLinkForHearing(hearing, action){
    const elements = this.getHearingTypeColumnElement(hearing, 'Actions');

    let actionLinkEle = null;

    const actionsCount = await elements.count();
    if (actionsCount === 0){
      reportLogger.AddMessage(`no actions forund for ${JSON.stringify(elements.selector)}`);
    }
    const actionNames = [];
    for (let i = 0; i < actionsCount; i++) {
      const e = await elements.nth(i);

      const name = await getText(e);
      reportLogger.AddMessage(`action "${name}", to click "${action}"`);
      if (name === action){
        actionLinkEle = e;
        break;
      }
    }
    await actionLinkEle.click();
  }

  async isHearingDisplayed(hearingType) {
    const tdXpath = `//exui-case-hearings-list//th[contains(text(),'${this.tableName}')]/../../..//tbody/tr/td[contains(text(),'${hearingType}')]`;
    const ele = elementByXpath(tdXpath);
    return ele.isVisible();
  }

  async getHearingTypeColumnValue(hearingType, valueForHeader) {
    const elements = this.getHearingTypeColumnElement(hearingType, valueForHeader);
    if (valueForHeader === 'Actions') {
      const actionsCount = await elements.count();
      const actionNames = [];
      for (let i = 0; i < actionsCount; i++) {
        const e = await elements.nth(i);
        actionNames.push(await getText(e));
      }
      return actionNames;
    }
    return getText(elements);
  }
}

module.exports = new HearingsTabPage();
