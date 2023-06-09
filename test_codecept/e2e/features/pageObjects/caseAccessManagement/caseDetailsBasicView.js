const browserWaits = require('../../../support/customWaits')

class CaseDetailsBasicView{


    constructor(){
        this.container = $('ccd-case-basic-access-view')
        this.bannerMessageContainer = $('ccd-case-basic-access-view .hmcts-banner__message')
        this.requestAccessButton = $('ccd-case-basic-access-view button')
    }

    async isRowDisplayedWithAttribute(key){
        const e =  element(by.xpath(`//div[contains(@class,'govuk-summary-list__row')]/dt[contains(text(),'${key}')]`))
        return await e.isPresent() 
    }

    async getAttributeValues(key){
        const e = element(by.xpath(`//div[contains(@class,'govuk-summary-list__row')]/dt[contains(text(),'${key}')]/../dd`))
        return await e.getText() 
    }

    
}

module.exports = new CaseDetailsBasicView();
