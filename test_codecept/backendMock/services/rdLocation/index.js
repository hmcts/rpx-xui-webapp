


const courtTypeIds = {
    EMPLOYMENT: ['17'], // 17: Employment Tribunal
    IA: ['4', '23'],      // 4: Asylum Support Appeals 23: Immigration and Asylum Tribunal
    SSCS: ['31'],       // 31: Social Security and Child Support Tribunal
    CIVIL: ['10'],
    PRIVATELAW: ['18'],
}

const locationServiceCodes = {
    "IA": "BFA1"
    }

class RDLocationService{

    constructor(){
        this.allLocations = [];
        this.locationsConfig = [
            {
                service:'IA',
                startIndex:1000
            },
            {
                service: 'CIVIL',
                startIndex: 1000
            }
        ];

        this.setupMockLocations();
    }   

    setupMockLocations(){
        this.locationsConfig.forEach(serviceConf => {
            const service = serviceConf.service;
            const typeIds = courtTypeIds[serviceConf.service];
            const index = serviceConf.startIndex;
            for(let i = 1; i<= 10; i++){
                const temp = this.getMockLocations();
                temp.court_name = `${service} ${i} Center court`;
                temp.court_type_id = typeIds[0];
                temp.court_type = `${service} Court`;
                this.allLocations.push(temp)
            }

        })
    }

    searchLocations(seearchTerm, serviceIds){
        return this.allLocations.filter(court => {
            return serviceIds.include(court.court_type_id) && court.court_name.includes(seearchTerm)
        })
    }

    getServiceLocations(serviceCode){
        return this.allLocations.filter(court => {
            return court.court_type_id === serviceCode;
        })
    }


    getMockLocations(){
        return {
            "cluster_id": null,
            "cluster_name": null,
            "court_address": "Mowatt Room, Assembly Rooms, Sinclair Terrace, Wick",
            "court_location_code": "",
            "court_name": "Wick",
            "court_open_date": null,
            "court_status": "Open",
            "court_type": "Social Security and Child Support Tribunal",
            "court_type_id": "31",
            "court_venue_id": "10770",
            "dx_address": "",
            "epimms_id": "999983",
            "fact_url": "",
            "is_case_management_location": "N",
            "is_hearing_location": "Y",
            "is_nightingale_court": "N",
            "is_temporary_location": "Y",
            "location_type": "COURT",
            "mrd_building_location_id": "MRD-BLD-402",
            "mrd_venue_id": "MRD-CRT-0796",
            "open_for_public": "YES",
            "parent_location": "366559",
            "phone_number": "",
            "postcode": "KW1 5AB",
            "region": "Scotland",
            "region_id": "11",
            "service_url": "",
            "site_name": "Wick",
            "uprn": "",
            "venue_name": "Wick",
            "venue_ou_code": "",
            "welsh_court_address": "",
            "welsh_court_name": "",
            "welsh_site_name": "",
            "welsh_venue_name": "",
            "closed_date": null
        }
    }


}

module.exports = new RDLocationService();
