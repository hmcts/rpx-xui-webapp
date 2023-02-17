

const BrowserWaits = require('../../../support/customWaits');
const cucumberReporter = require('../../../../codeceptCommon/reportLogger');
const locators = {
    existingBooking: {
        location:'',
        fromDate:'',
        toDate:''
    }
}

class WorkAccessPage{

    constructor(){
        this.dateFormat = 'YYYY-MM-DD';


        this.pageContainer = $('exui-booking-home');
        this.radioChooseExistingBooking = element(by.xpath(this.getRadiobuttonXPathWithLabel('Choose an existing booking')));
        this.radioCreateNewBooking = element(by.xpath(this.getRadiobuttonXPathWithLabel('Create a new booking')));
        this.radioViewtasksAndCases = element(by.xpath(this.getRadiobuttonXPathWithLabel('View tasks and cases')));

        this.existingBookingsList = $('exui-booking-home .govuk-radios__conditional');
        this.existingBookings = $$('exui-booking-home .govuk-radios__conditional .govuk-grid-column-one-third');

        this.continueButton = element(by.xpath(`//exui-booking-home//form/button[contains(text(),'Continue')]`));

    }

    getRadiobuttonXPathWithLabel(label){
        return `//exui-booking-home//div[contains(@class,'govuk-radios__item')]//label[contains(text(),'${label}')]`
    }

    async waitForPage(){
        await BrowserWaits.waitForElement(this.pageContainer);
    }

    async amOnPage(){
        const isPresent = await this.pageContainer.isPresent();
        if (!isPresent) {
            return isPresent;
        }
        return await this.pageContainer.isDisplayed(); 
    }

    async isConitnueDisplayed(){
        const isPresent =  await this.continueButton.isPresent();
        if (!isPresent){
            return isPresent;
        }
        return await this.continueButton.isDisplayed(); 
    }

    async getExistingBooksingCount(){
        return await this.existingBookings.count();
    }

    async getBookingDetails(index){
        const allBookings = await this.getExistingBookingsDetails();
        const bookingAtIndex = allBookings[index];
        return {
            location: bookingAtIndex.location,
            fromDate: bookingAtIndex.fromDate,
            toDate: bookingAtIndex.toDate 
        } 
    }

    async getMatchingBookings(location, fromDate, toDate){
        const allBookings = await this.getExistingBookingsDetails();
        const matchingBookings = allBookings.filter(booking =>{
                cucumberReporter.AddMessage(`${location} ${fromDate} to ${toDate}`) 
                return booking.location.includes(location) && booking.fromDate.includes(fromDate) && booking.toDate.includes(toDate)
            }
        );
        return matchingBookings; 
    }

    async isBookingDisplayed(location, fromDate, toDate){
        const matchingBookings = await this.getMatchingBookings(location, fromDate, toDate);
        return matchingBookings.length > 0; 
    }

    async getExistingBookingsDetails(){
        const count = await this.getExistingBooksingCount();
        const bookings = []; 
        for(let i = 0; i < count ; i++){
            const booking = await this.existingBookings.get(i);
            
            const bookingDatesText = await booking.$('span.govuk-hint').getText();
            const bookingDateSplit = bookingDatesText.split(' to ');
            bookings.push({
                location: await booking.$('span[class*="font-weight-bold"]').getText(),
                fromDate: bookingDateSplit[0],
                toDate: bookingDateSplit[1],
                continueBtnElement: booking.$('.govuk-button-group button') 
            }); 
        }
        return bookings; 
    }

}

module.exports = new WorkAccessPage();
