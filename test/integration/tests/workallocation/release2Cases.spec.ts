import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
import { setTestContext } from '../utils/helper';

import Request from '../utils/request';

import CaseRequestBody from '../utils/wa/caseRequestBody';
const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2:  Cases', () => {
    const userName = 'lukesuperuserxui@mailnesia.com';
    const password = 'Monday01';

    const caseOfficer = 'xui_auto_co_r2@justice.gov.uk';
    const caseofficerPass = 'Welcome01';

    beforeEach(function() {
        setTestContext(this);
        Request.clearSession();
    });

    it('Get My cases', async function() {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const caseRequestObj = getSearchCaseReqBody('MyCases', ['77f9a4a4-1bf1-4903-aa6c-cab334875d91']);
        caseRequestObj.withSearchBy('caseworker')
            .sortWith('startDate', 'asc')
            .withPageNumber(1);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseRequestObj.getRequestBody()).length
        };

        const response = await Request.post(`workallocation2/my-cases`, caseRequestObj.getRequestBody(), headers, 200);
        expect(response.status).to.equal(200);

        const expectedCases = workAllocationDataModels.getRelease2Cases();
        expect(response.data).to.have.all.keys(Object.keys(expectedCases));
        if (response.data.cases.length > 0){
            expect(response.data.cases[0]).to.have.all.keys(Object.keys(expectedCases.cases[0]));

        }

    });


    function getSearchCaseReqBody(view, users) {
        // const response = await Request.get('api/user/details', null, 200); 

        const caseRequestBody = new CaseRequestBody();
        caseRequestBody.inView(view);
        switch (view) {
            case 'MyCases':
                if (users) {
                    users.forEach(user => {
                        caseRequestBody.searchWithUser(user);
                    });
                } else {
                    caseRequestBody.searchWithUser(null);
                }
                break;
            case 'AvailableTasks':
                caseRequestBody.searchWithlocation(null);
                caseRequestBody.searchWithState('unassigned');
                break;

            case 'TaskManager':
                caseRequestBody.searchWithlocation(null);
                caseRequestBody.searchWithUser(null);
                break;
            default:
                throw new Error(`${view} is not recognized or not implemented in test`);
        }

        return caseRequestBody;
    }

});


