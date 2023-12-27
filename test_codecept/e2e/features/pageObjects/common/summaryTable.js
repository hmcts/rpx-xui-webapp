
class SummaryTable{

    constructor(pageElementTag){
        this.pageElementTag = pageElementTag
        this.summaryContainer = $(`${this.pageElementTag ? this.pageElementTag : ''} .govuk-summary-list`);
    }

    getTableKeyElementXpath(key) {
        return `//*[contains(@class,'govuk-summary-list__key')][contains(text(),'${key}')]`
    }

    getTableValueElementXpath(forKey) {
        const keyElement = this.getTableKeyElementXpath(forKey)
        return `${keyElement}/../*[contains(@class,'govuk-summary-list__value')]`
    }

    getTableChangeLinkElementXpath(forKey) {
        const keyElement = this.getTableKeyElementXpath(forKey)
        return `${keyElement}/../*[contains(@class,'govuk-summary-list__actions')]//a`
    }

    getTableAmendedElementXpath(forKey) {
        const keyElement = this.getTableKeyElementXpath(forKey)
        return `${keyElement}/..//exui-amendment-label//strong`;
    }

    async isFieldDisplayed(forKey) {
        const e = element(by.xpath(this.getTableKeyElementXpath(forKey)))
        return await e.isDisplayed();
    }

    async getValueForField(forKey) {
        const e = element(by.xpath(this.getTableValueElementXpath(forKey)))
        return await e.getText();
    }

    async isChangeLinkDisplayedForField(forKey) {
        const e = element(by.xpath(this.getTableChangeLinkElementXpath(forKey)))
        return await e.isDisplayed();
    }

    async clickChangeLinkForField(forKey){
        const e = element(by.xpath(this.getTableChangeLinkElementXpath(forKey)))
        await e.click();
    }

    async isAmendedFlagDisplayedForField(forKey){
        const e = element(by.xpath(this.getTableAmendedElementXpath(forKey)))
        return await e.isDisplayed();
    }

}

module.exports = SummaryTable 
