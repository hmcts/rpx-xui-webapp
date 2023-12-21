
class BookingsDataModels{

    getBooking(){
        return {
            "appointmentId": "1011",
            "base_location_id": "765324",
            "beginTime": new Date(),
            "contract_type_id": "102",
            "created": new Date(),
            "endTime": new Date(),
            "region_id": "104",
            "roleId": "caseworker",
            "userId": "21334a2b-79ce-44eb-9168-2d49a744be9c"
        }
    }

    getLocationDetails(){
        return {
            "court_venue_id": "4608",
            "epimms_id": "231596",
            "site_name": "Birmingham Civil and Family Justice Centre",
            "region_id": "3",
            "region": "Midlands",
            "court_type": "Immigration and Asylum Tribunal",
            "court_type_id": "23",
            "cluster_id": "18",
            "cluster_name": "West Midlands and Warwickshire",
            "open_for_public": "YES",
            "court_address": "PRIORY COURTS, 33 BULL STREET",
            "postcode": "B4 6DS",
            "phone_number": "",
            "closed_date": null,
            "court_location_code": "",
            "dx_address": "701987 BIRMINGHAM 7",
            "welsh_site_name": "",
            "welsh_court_address": "",
            "court_status": "Open",
            "court_open_date": null,
            "court_name": "BIRMINGHAM CIVIL AND FAMILY JUSTICE CENTRE",
            "venue_name": "Birmingham",
            "is_case_management_location": "Y",
            "is_hearing_location": "Y",
            "welsh_venue_name": "",
            "is_temporary_location": "N",
            "is_nightingale_court": "N",
            "location_type": "COURT",
            "parent_location": "",
            "welsh_court_name": "",
            "uprn": "",
            "venue_ou_code": "",
            "mrd_building_location_id": "",
            "mrd_venue_id": "",
            "service_url": "",
            "fact_url": ""
        }
    }

}
module.exports = new BookingsDataModels(); 
