
const SummaryTable = require('../common/summaryTable')

class ViewOrEditHearingPage{

    constructor(){
        this.container = $('exui-hearing-view-edit-summary')
        this.headerElement = $('exui-hearing-view-edit-summary exui-hearing-summary h1')

        this.summaryTable = new SummaryTable('exui-hearing-view-edit-summary')

        
    }

    async getHeader(){
        return await this.headerElement.getText()
    }

    async isKeyFieldDisplayed(field){
        return await this.summaryTable.isFieldDisplayed(field)
    }

    async getKeyFieldValue(field) {
        return await this.summaryTable.getValueForField(field)
    }

    async isChangeLinkDisplayedForKeyField(field){
        return await this.summaryTable.isChangeLinkDisplayedForField(field)
    }

    async clickChangeLinkForField(field) {
        return await this.summaryTable.clickChangeLinkForField(field)
    }

    async isAmendedFlagDisplayedForKeyField(field) {
        return await this.summaryTable.isAmendedFlagDisplayedForField(field)
    }

}

module.exports = new ViewOrEditHearingPage();
