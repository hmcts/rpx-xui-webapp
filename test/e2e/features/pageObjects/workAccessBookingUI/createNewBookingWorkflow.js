

const LocationPage = require('./searchLocationPage');
const ChooseDurationPage = require('./chooseDurationPage');
const checkAnswersPage = require('./checkAnswersPage');

class CreateNewBookingWorkFlow{

    constructor(){
        this.searchLocation = new LocationPage();
        this.chooseDurationPage = new ChooseDurationPage();
        this.checkAnswersPage = new CheckAnswersPage();

        this.continueButton = $('');
        this.cancelLink = $('');
        this.backLink = $('');
    }

}

module.exports = new CreateNewBookingWorkFlow();
