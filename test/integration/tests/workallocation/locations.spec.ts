import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
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


    it('getLocationById', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);


        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`api/locations/getLocationsById?ids=${config.workallocation[config.testEnv].locationId}`, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');

        expect(Object.keys(response.data)).to.have.members(['court_name', 'epimms_id', 'site_name','court_address']);

    });


    it('getLocation', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);


        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`api/locations/getLocationsById?ids=${config.workallocation[config.testEnv].locationId}`, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');

        expect(Object.keys(response.data)).to.have.members(['court_name', 'epimms_id', 'site_name', 'court_address']);

    });



});


