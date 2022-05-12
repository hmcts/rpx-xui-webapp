

const BookingDataModel = require('../../dataModels/bookings');
class BookingsData{

    constructor(){
        this.bookingResponse = { bookings:[]};
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

    setUpBookings(bookings){
        this.bookingResponse.bookings = bookings.map(booking => {
            const bookingModel = BookingDataModel.getBooking();
            for (const bookingKey of Object.keys(booking)){
                bookingModel[bookingKey] = booking[bookingKey]; 
            }    
            return bookingModel;
        });
        this.updateAllLocationsFromBookings();
       
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
