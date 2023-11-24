const GovUKTable = require('../../common/govUkTable')

class HearingRequirementsPage {
    constructor() {
        this.pageContainer = $('exui-hearing-requirements')
    }

    async getPartiesWithCaseFlagsDisplayed(){
        const partiesElements = element.all(by.xpath(`//table[contains(@class,'govuk-table')]//th[contains(@class,'govuk-table__header_name')]`))
        const count = await partiesElements.count()
        const partNames = [];
        for(let i = 0 ; i< count; i++){
            const e = await partiesElements.get(i)
            partNames.push(await e.getText())
        }
        return partNames;
    }

    async getCaseFlagsDisplayedForParty(partyName){
        const caseFlagsTableXpath = `//table[contains(@class,'govuk-table')]//th[contains(text(),'${partyName}')]/../../..`
        const govUKTable = new GovUKTable(caseFlagsTableXpath)
        const rowsWithDataElements = await govUKTable.getTableDataElements()
        for (const row of rowsWithDataElements){
            for(const col of Object.keys(row)){
                row[col] = await row[col].getText();
            }
        }
        return rowsWithDataElements;
    }

    async isDisplayed() {
        return await this.pageContainer.isDisplayed();
    }
}

module.exports = HearingRequirementsPage;
