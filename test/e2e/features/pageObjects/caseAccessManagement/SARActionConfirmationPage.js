
const BrowserWaits = require('../../../support/customWaits');

class SARActionConfirmationPage{


    constructor(action){
        this.tag = this.getContainerTagForAction(action);
        this.header = $(`${this.tag} .govuk-panel--confirmation h1`); 
        this.detailsHeader = $(`${this.tag} h2.govuk-heading-m`);
        this.detailsPara = $(`${this.tag} p`); 
        
        this.returnToMyTasksBtn = element(by.xpath(`//${this.tag}/../../*[contains(@class,'govuk-button-group')]//button`));
        this.returnToTasksTabLink = element(by.xpath(`//${this.tag}/../../*[contains(@class,'govuk-button-group')]//a`));

    }

    async waitForContainer(){
        await BrowserWaits.waitForElement(this.header);
    }

    getContainerTagForAction(action){
       let tag = '';
        action = action.toLowerCase();
        switch(action){
            case 'reject':
            case 'denied':
                tag = 'exui-specific-access-denied';
                break;
            case 'approved':
                tag = 'exui-specific-access-approved';
                break;
            default:
       }
       if(tag === ''){
        throw Error(`SAR action "${action}" not recognised or not implemented in test`);
       }
       return tag;
    }
}

module.exports = SARActionConfirmationPage; 
