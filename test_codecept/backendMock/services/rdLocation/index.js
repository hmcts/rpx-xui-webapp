


const courtTypeIds = {
    EMPLOYMENT: ['17'], // 17: Employment Tribunal
    IA: ['4', '23'],      // 4: Asylum Support Appeals 23: Immigration and Asylum Tribunal
    SSCS: ['31'],       // 31: Social Security and Child Support Tribunal
    CIVIL: ['10'],
    PRIVATELAW: ['18'],
}

const locationServiceCodes = {
    "IA": ["BFA1"]
    }

class RDLocationService{

    constructor(){
        this.caseManagementLocations = [];
        this.locationsConfig = [
            {
                service:'IA',
                startIndex:20000
            },
            {
                service: 'CIVIL',
                startIndex: 10000
            },
            {
                service: 'SSCS',
                startIndex: 30000
            }
        ];

        this.setupMockCaseManagementLocations();
    }   

    setupMockCaseManagementLocations(){
        this.locationsConfig.forEach(serviceConf => {
            const service = serviceConf.service;
            const typeIds = courtTypeIds[serviceConf.service];
            let index = serviceConf.startIndex;
            for(let i = 1; i<= 10; i++){
                index++;
                const temp = this.getMockLocations();
                temp.epimms_id = index+'';
                temp.is_case_management_location = 'Y';
                temp.court_name = `${service} Court Center ${i}`;
                temp.venue_name = `${service} Court Center ${i}`;
                temp.site_name = `${service} Court Center ${i}`;
                temp.court_type_id = typeIds[0];
                temp.court_type = `${service} Court`;
                this.caseManagementLocations.push(temp)
            }

        })
    }

    getLocationById(epimms_id){
        const results = this.caseManagementLocations.filter(loc => loc.epimms_id === epimms_id);
        return results;
    }

    searchLocations(seearchTerm, courtTypeIds){
        const results = [];
        for (const court of this.caseManagementLocations){
            if (courtTypeIds.includes(court.court_type_id) && court.court_name.toLowerCase().includes(seearchTerm.toLowerCase())){
                results.push(court);
            }
        }
        return results;
    }

    getServiceLocations(serviceCode){

        const services = Object.keys(locationServiceCodes)
        const courtTypeIds = []
        for(const service of services){
            if(locationServiceCodes[service].includes(serviceCode)){
                courtTypeIds.push(courtTypeIds[service])
            }
        }
        const results = [];
        for (const court of this.caseManagementLocations) {
            if (courtTypeIds.includes(court.court_type_id) && court.court_name.includes(seearchTerm)) {
                results.push(court);
            }
        }
        return {
            "service_code": serviceCode,
            "court_type_id": courtTypeIds[0],
            "court_type": "CASE_MANAGEMENT",
            "welsh_court_type": "N",
            "court_venues": results
        };
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
            "is_case_management_location": "Y",
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
