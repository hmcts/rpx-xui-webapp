

const BookingDataModel = require('../../../dataModels/bookings');
class BookingsData{

    constructor(){
        this.bookingResponse = [];
        this.allLocations = [];
        this.setUpBookings([
            { appointmentId : "100"},
            { appointmentId: "101" },
            { appointmentId: "102" },
            { appointmentId: "103" }
        ]);
         
    }


    getBookings(){
        return this.bookingResponse;
    }

    setupLocations(inputLocations){
        this.allLocations = inputLocations.map(location => {
            const locationModel = BookingDataModel.getLocationDetails();
            for (const locationKey of Object.keys(location)) {
                locationModel[locationKey] = location[locationKey];
            }
            return locationModel;
        });
    }

    setUpBookings(bookings){
        this.bookingResponse = bookings.map(booking => {
            const bookingModel = BookingDataModel.getBooking();
            for (const bookingKey of Object.keys(booking)){
                bookingModel[bookingKey] = booking[bookingKey]; 
            }    
            return bookingModel;
        });
       
    }

    updateAllLocationsFromBookings(){
        const locationIds = this.bookingResponse.bookings.map(booking => booking.base_location_id);
        this.allLocations = locationIds.map(locationId => {
            const locationDetailsTemplate = BookingDataModel.getLocationDetails();
            locationDetailsTemplate.epimms_id = locationId;
            return locationDetailsTemplate; 
        }); 

    }

    getAllLocationDetails(){
        return this.allLocations; 
    }

}

module.exports = new BookingsData(); 
