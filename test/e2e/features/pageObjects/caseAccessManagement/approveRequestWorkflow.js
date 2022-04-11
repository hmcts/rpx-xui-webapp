
const specificAccessDurationSelectionPage = require('./durationSelectionPage')

class ApproveSpecificAccessRequest{

    constructor(){
        this.continueBtn = $('');
        this.cancelLink = $('');
        this.backLink = $('');
         
        this.durationSelectionPage = specificAccessDurationSelectionPage; 
    }
}

module.exports = new ApproveSpecificAccessRequest(); 