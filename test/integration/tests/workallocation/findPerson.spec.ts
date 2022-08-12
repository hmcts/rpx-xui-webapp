import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
import { setTestContext } from '../utils/helper';

import Request from '../utils/request';

const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2: Find person', () => {
    const caseOfficer = 'xui_auto_co_r2@justice.gov.uk';
    const caseofficerPass = 'Welcome01';

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
                jurisdiction : 'All',
                searchTerm : 'pri'
            }
        };

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation2/findPerson`, reqBody, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');

        const expectedCases = workAllocationDataModels.getFindPersonObj();
        expect(response.data[0]).to.have.all.keys(Object.keys(expectedCases));

    });

});


