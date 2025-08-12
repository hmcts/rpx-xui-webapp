const { $, $$, elementByXpath, getText, isPresent } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../../codeceptCommon/reportLogger');

class WorkAccessPage {
  get dateFormat() { return 'YYYY-MM-DD'; }

  get pageContainer() { return $('exui-booking-home'); }

  get radioChooseExistingBooking() {
    return elementByXpath(this.getRadiobuttonXPathWithLabel('Choose an existing booking'));
  }
  get radioCreateNewBooking() {
    return elementByXpath(this.getRadiobuttonXPathWithLabel('Create a new booking'));
  }
  get radioViewtasksAndCases() {
    return elementByXpath(this.getRadiobuttonXPathWithLabel('View tasks and cases'));
  }

  get existingBookingsList() {
    return $('exui-booking-home .govuk-radios__conditional');
  }
  get existingBookings() {
    return $$('exui-booking-home .govuk-radios__conditional .govuk-grid-column-one-third');
  }

  get continueButton() {
    return elementByXpath('//exui-booking-home//form/button[contains(text(),\'Continue\')]');
  }

  getRadiobuttonXPathWithLabel(label) {
    return `//exui-booking-home//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${label}')]`;
  }

  async waitForPage() {
    await BrowserWaits.waitForElement(this.pageContainer);
  }

  async amOnPage() {
    const present = await isPresent(this.pageContainer);
    if (!present) {
      return present;
    }
    return await this.pageContainer.isVisible();
  }

  async isConitnueDisplayed() {
    const present = await isPresent(this.continueButton);
    if (!present) {
      return present;
    }
    return await this.continueButton.isVisible();
  }

  async getExistingBooksingCount() {
    return await this.existingBookings.count();
  }

  async getBookingDetails(index) {
    const allBookings = await this.getExistingBookingsDetails();
    const bookingAtIndex = allBookings[index];
    return {
      location: bookingAtIndex.location,
      fromDate: bookingAtIndex.fromDate,
      toDate: bookingAtIndex.toDate
    };
  }

  async getMatchingBookings(location, fromDate, toDate) {
    const allBookings = await this.getExistingBookingsDetails();
    const matchingBookings = allBookings.filter((booking) => {
      cucumberReporter.AddMessage(`${location} ${fromDate} to ${toDate}`);
      return booking.location.includes(location) && booking.fromDate.includes(fromDate) && booking.toDate.includes(toDate);
    }
    );
    return matchingBookings;
  }

  async isBookingDisplayed(location, fromDate, toDate) {
    const matchingBookings = await this.getMatchingBookings(location, fromDate, toDate);
    return matchingBookings.length > 0;
  }

  async getExistingBookingsDetails() {
    const count = await this.getExistingBooksingCount();
    const bookings = [];
    for (let i = 0; i < count; i++) {
      const booking = await this.existingBookings.nth(i);

      const bookingDatesText = await getText(booking.locator('span.govuk-hint'));
      const bookingDateSplit = bookingDatesText.split(' to ');
      bookings.push({
        location: await getText(booking.locator('span[class*="font-weight-bold"]')),
        fromDate: bookingDateSplit[0],
        toDate: bookingDateSplit[1],
        continueBtnElement: booking.locator('.govuk-button-group button')
      });
    }
    return bookings;
  }
}

module.exports = new WorkAccessPage();
