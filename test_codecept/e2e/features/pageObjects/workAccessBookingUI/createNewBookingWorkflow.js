const { $ } = require('../../../../helpers/globals');
const LocationPage = require('./searchLocationPage');
const ChooseDurationPage = require('./chooseDurationPage');
const checkAnswersPage = require('./checkAnswersPage');

class CreateNewBookingWorkFlow {
  get searchLocation() { return LocationPage; }
  get chooseDurationPage() { return ChooseDurationPage; }
  get checkAnswersPage() { return checkAnswersPage; }

  get continueButton() { return $('exui-booking-location button, exui-booking-date button'); }
  get confirmBookingButton() { return $('exui-booking-check button'); }
  get backLink() { return $('.govuk-back-link'); }
}

module.exports = new CreateNewBookingWorkFlow();
