import { expect } from 'chai';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getXSRFToken } from '../utils/authUtil';
import { setTestContext } from '../utils/helper';
import Request from '../utils/request';


const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2: locations search', () => {
    const caseOfficer = config.users[config.testEnv].caseOfficer_r2.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r2.sec;

    beforeEach(function () {
        setTestContext(this);
        Request.clearSession();
    });



    // [
    //     {
    //         serviceIds: "IA",
    //         bookingLocations: ['765324'],
    //         userLocations: [{ service: 'IA', bookable: true, locationIds: ['765324']}],
    //         resultLocationsFromFilter:{ minCount:1, andMore:false}
    //     },
    //     {
    //         serviceIds: "IA,CIVIL",
    //         bookingLocations: ['765324'],
    //         userLocations: [{ service: 'IA', bookable: true, locationIds: ['765324'] }],
    //         resultLocationsFromFilter: { minCount: 1, andMore: true }
    //     },
    //     {
    //         serviceIds: "IA,CIVIL",
    //         bookingLocations: ['765324'],
    //         userLocations: [
    //             { service: 'IA', bookable: true, locationIds: ['765324'] },
    //             { service: 'CIVIL', bookable: false, locationIds: ['229786'] }
    //         ],
    //         resultLocationsFromFilter: { minCount: 2, andMore: false }
    //     },
    //     {
    //         serviceIds: "IA,CIVIL,PRIVATELAW",
    //         bookingLocations: ['765324'],
    //         userLocations: [
    //             { service: 'IA', bookable: true, locationIds: ['765324'] },
    //             { service: 'CIVIL', bookable: false, locationIds: ['229786'] }
    //         ],
    //         resultLocationsFromFilter: { minCount: 2, andMore: true }
    //     }
    // ].forEach(scr => {
    //     it('getLocations', async function () {
    //         this.timeout(60000);
    //         await Request.withSession(caseOfficer, caseofficerPass);
    //         const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);


    //         const headers = {
    //             'X-XSRF-TOKEN': xsrfToken,
    //         };

    //         const userlocations = scr.userLocations.map(inputUserlocations => {
    //             return {
    //                 service: inputUserlocations.service,
    //                 bookable: inputUserlocations.bookable,
    //                 locations: inputUserlocations.locationIds.map(locationId => {
    //                     return { id: locationId, locationId: locationId , locationName:""}
    //                 })

    //             }
    //         })
    //         const requestBody = {
    //             "serviceIds": scr.serviceIds,
    //             "locationType": "case-management",
    //             "searchTerm": "cen",
    //         };

    //         if (scr.bookingLocations.length > 0){
    //             requestBody['bookingLocations'] = scr.bookingLocations;
    //         }
    //         if (userlocations.length > 0){
    //             requestBody['userLocations'] = userlocations;
    //         }

    //         const response = await Request.post(`api/locations/getLocations`, requestBody ,headers, 200);
    //         expect(response.status).to.equal(200);

    //         const resultLocationids = response.data.map(loc => loc.epimms_id)
    //         // console.log(resultLocationids);

    //         const expectedMinLocations = [];
    //         expectedMinLocations.push(scr.bookingLocations);
    //         for(const serviceLocations of scr.userLocations){
    //             if (!serviceLocations.bookable){
    //                 serviceLocations.locationIds.forEach(loc => expectedMinLocations.push(loc))
    //             }
    //         }

    //         if(scr.resultLocationsFromFilter.andMore){
    //             expect(resultLocationids.length).to.be.above(expectedMinLocations.length)
    //         }else{
    //             expect(resultLocationids.length).to.equal(expectedMinLocations.length)
    //         }

    //     });
    // });





});


