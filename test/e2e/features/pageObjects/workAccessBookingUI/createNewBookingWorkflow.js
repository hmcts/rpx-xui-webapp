

const LocationPage = require('./searchLocationPage');
const ChooseDurationPage = require('./chooseDurationPage');
const checkAnswersPage = require('./checkAnswersPage');

class CreateNewBookingWorkFlow{

    constructor(){
        this.searchLocation = LocationPage;
        this.chooseDurationPage = ChooseDurationPage;
        this.checkAnswersPage = checkAnswersPage;

        this.continueButton = $('exui-booking-location button,exui-booking-date button')
        this.confirmBookingButton = $('exui-booking-check button');

        this.cancelLink = $('');
        this.backLink = $('.govuk-back-link');
    }



}

module.exports = new CreateNewBookingWorkFlow();
