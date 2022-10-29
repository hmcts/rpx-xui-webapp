
const ReviewRequestPage = require('./reviewSARPage')
const specificAccessDurationSelectionPage = require('./durationSelectionPage')
const requestMoreInformationPage = require('./requestMoreInformationPage');

const ActionConfirmationPage = require('./SARActionConfirmationPage');
class SpecificAccessRequestWorkflow{

    constructor(){
        this.continueBtn = $('exui-specific-access-navigation .govuk-button-group button');
        this.cancelLink = $('exui-specific-access-navigation .govuk-button-group a');
        this.backLink = $('exui-specific-access-navigation a.govuk-back-link');
        
        this.reviewRequestPage = ReviewRequestPage; 
        this.durationSelectionPage = specificAccessDurationSelectionPage;
        
        this.approveConfirmationPage = new ActionConfirmationPage('approved');
        this.rejectConfirmationPage = new ActionConfirmationPage('denied');

        this.requestMoreInfoPage = requestMoreInformationPage;

    }
}

module.exports = new SpecificAccessRequestWorkflow(); 