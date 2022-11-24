
const ExuiChooseRadioOption = require('../common/chooseRadioOptionComponent');

class ReviewSARPage{

    constructor(){
        this.containerTag = 'exui-specific-access-review';
        this.container = $(this.containerTag);
        this.header = $(`${this.containerTag} legend.govuk-fieldset__legend--l h1`);

        this.requestDetails = $$(`${this.containerTag} table tbody tr`);
        this.requestActionsheader = $(`${this.containerTag} legend.govuk-fieldset__legend--m h1`);
        this.chooseRadioOptionsContainer = new ExuiChooseRadioOption(this.containerTag); 
    }


    async getAccessRequestDetails(){
        const requestDetails = {};
        const rowsCount = await this.requestDetails.count();
        for(let i = 0; i < rowsCount; i++){
            const row = await this.requestDetails.get(i);
            const name = await row.$('th').getText(); 
            const value = await row.$('td').getText(); 
            requestDetails[name] = value;
        }
        return requestDetails; 
    }



}
module.exports = new ReviewSARPage(); 
