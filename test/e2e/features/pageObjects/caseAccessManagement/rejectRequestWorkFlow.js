
const rejectionDetailsPage = require('./rejectSpecificAccessRequestDetailsPage')

class RejectSpecificAccessRequest {

    constructor() {
        this.continueBtn = $('');
        this.cancelLink = $('');
        this.backLink = $('');

        this.durationSelectionPage = rejectionDetailsPage;
    }
}

module.exportts = new RejectSpecificAccessRequest(); 
