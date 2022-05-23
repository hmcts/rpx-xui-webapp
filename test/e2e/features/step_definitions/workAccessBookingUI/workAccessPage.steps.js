
const CucumberReportLogger = require('../../../support/reportLogger');

const moment = require('moment-timezone')

var { defineSupportCode } = require('cucumber');
const BrowserWaits = require("../../../support/customWaits");
const headerPage = require("../../pageObjects/headerPage");
const browserUtil = require("../../../../ngIntegration/util/browserUtil");

const workAccessPage = require('../../pageObjects/workAccessBookingUI/workAccessPage');
const workAllocationDateUtil = require("../../pageObjects/workAllocation/common/workAllocationDateUtil");

defineSupportCode(function ({ And, But, Given, Then, When }) {

    function getWorkAccessRadioButton(radioButtonName){
        const normalisedName = radioButtonName.toLowerCase();
        let retElement = null;
        if (normalisedName.includes('existing')) {
            retElement = workAccessPage.radioChooseExistingBooking
        } else if (normalisedName.includes('create new')) {
            retElement = workAccessPage.radioCreateNewBooking;
        } else if (normalisedName.includes('view')) {
            retElement =  workAccessPage.radioViewtasksAndCases;
        }  
        if (!retElement){
            throw new Error(`Work access radio option "${radioButtonName}" not found in page `);
        } 
        return retElement;
    }

    function getDateWithFormatForDays(inDays){
        let todayObj = moment();
        if (inDays > 0){
            todayObj = todayObj.add(inDays,'days')
        } else if (inDays > 0){
            todayObj = todayObj.substract(inDays, 'days')
        }
        return todayObj.format(workAccessPage.dateFormat);
    }

    Then('I validate work access page isDisplayed is {string}', async function(isDisplayedString){
        const expectedDisplayStatus = isDisplayedString.toLowerCase().includes('true') || isDisplayedString.toLowerCase().includes('yes') 
        expect(await workAccessPage.amOnPage()).to.equal(expectedDisplayStatus); 
    });

    Then('I see work access page displayed', async function(){
        expect(await workAccessPage.amOnPage()).to.be.true;
    });

    Then('I see work access radio button {string} displayed', async function(radioButtonName){
        await BrowserWaits.retryWithActionCallback(async () => {
            const radioButton = getWorkAccessRadioButton(radioButtonName);
            expect(await radioButton.isDisplayed()).to.be.true;
        }); 
    });

    Then('I see work access radio button {string} not displayed', async function (radioButtonName) {
        const radioButton = getWorkAccessRadioButton(radioButtonName);
        expect(await radioButton.isDisplayed()).to.be.false;
    });

    When('I select work access radio button {string}', async function (radioButtonName) {
        const radioButton = getWorkAccessRadioButton(radioButtonName);
        expect((await radioButton.isPresent() && await radioButton.isDisplayed()), `Radio option ${radioButtonName} is not displayed`).to.be.true;
        await radioButton.click();
    });

    Then('I see work access continue button displayed', async function(){
        const ispresent = await workAccessPage.continueButton.isPresent();
        if (ispresent) {
            expect(await workAccessPage.continueButton.isDisplayed()).to.be.true;
        }else{
            throw new Error('Assertion failed. expected false to be true');
        }
    });

    Then('I see work access continue button not displayed', async function () {
        await BrowserWaits.retryWithActionCallback(async () => {
            const ispresent = await workAccessPage.continueButton.isPresent();
            if (ispresent) {
                expect(await workAccessPage.continueButton.isDisplayed()).to.be.false;
            }
        }); 
    });

    When('I click work access continue button', async function(){
        await BrowserWaits.retryWithActionCallback(async () => {
            await workAccessPage.continueButton.click();
        });
    });

    Then('I see work access existing bookings list container', async function(){
        expect(await workAccessPage.existingBookingsList.isDisplayed()).to.be.true
    });

    Then('I see work access existing bookings displayed with details', async function(datatable){
        const bookingsHashes = datatable.hashes();

        for (const booking of bookingsHashes){
            workAllocationDateUtil.getDateFormat_DD_Month_YYYY(booking.fromDate)
            const fromDate = workAllocationDateUtil.getDateFormat_DD_Month_YYYY(booking.fromDate);
            const toDate = workAllocationDateUtil.getDateFormat_DD_Month_YYYY(booking.toDate);
            expect(await workAccessPage.isBookingDisplayed(booking.location, fromDate, toDate),`Booking with details not displayed: ${booking.location}, ${fromDate} to ${toDate}`).to.be.true 
        }
    });

    When('I click continue for any existing booking in work access page', async function(){
        const allBookings = await workAccessPage.getExistingBookingsDetails();
        if (allBookings.length === 0){
            throw new Error('No existing bookings avilable.displayed');
        }
        await allBookings[0].continueBtnElement.click();  
    }); 
    
    When('I click existing booking with matching location {string} from work access page', async function(location){
        const allBookings = await workAccessPage.getExistingBookingsDetails();
        const bookingsForLocation = allBookings.filter(booking => booking.location.includes(location));

        if (bookingsForLocation.length === 0){
            throw new Error(`No maytching bookings for location ${location} found`);
        }
        await bookingsForLocation[0].continueBtnElement.click(); 
    });

});
