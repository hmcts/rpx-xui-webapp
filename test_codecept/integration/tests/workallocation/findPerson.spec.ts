import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
import { setTestContext } from '../utils/helper';

import Request from '../utils/request';

const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2: Find person', () => {
    const caseOfficer = 'CRD_func_test_aat_stcw@justice.gov.uk';
    const caseofficerPass = 'AldgateT0wer';

    beforeEach(function () {
        setTestContext(this);
        Request.clearSession();
    });

    it('Find Person', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = {
            searchOptions : {
                searchTerm : 'pri',
                userRole:'Judicial',
                services:['IA'],
                userIncluded:false,
                assignedUser:null
            }
        };

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation/findPerson`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');

        const expectedCases = workAllocationDataModels.getFindPersonObj();
        expect(response.data[0]).to.have.all.keys(Object.keys(expectedCases));

    });

});


