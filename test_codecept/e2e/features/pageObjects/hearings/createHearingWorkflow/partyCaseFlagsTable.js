const { elementsByXpath, getText } = require('../../../../../helpers/globals');

class PartyCaseFlags{
  async getPartiesWithCaseFlagsDisplayed() {
    const partiesElements = elementsByXpath('//table[contains(@class,\'govuk-table\')]//th[contains(@class,\'govuk-table__header_name\')]');
    const count = await partiesElements.count();
    const partNames = [];
    for (let i = 0; i < count; i++) {
      const e = await partiesElements.nth(i);
      partNames.push(await getText(e));
    }
    return partNames;
  }

  async getCaseFlagsDisplayedForParty(partyName) {
    const caseFlagsTableXpath = `//table[contains(@class,'govuk-table')]//th[contains(text(),'${partyName}')]/../../../tbody`;
    const caseFlags = [];
    const flagRows = elementsByXpath(`${caseFlagsTableXpath}//tr`);
    const flagsCount = await flagRows.count();
    for (let flagCtr = 0; flagCtr < flagsCount; flagCtr++) {
      const flagRowEle = await flagRows.nth(flagCtr);
      const flagDataCells = flagRowEle.locator('//td[1]//label');
      caseFlags.push(await getText(flagDataCells));
    }
    return caseFlags;
  }
}

module.exports = new PartyCaseFlags();
