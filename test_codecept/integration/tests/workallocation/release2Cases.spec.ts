import { expect } from 'chai';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getXSRFToken } from '../utils/authUtil';
import { reporterJson, reporterMsg, setTestContext } from '../utils/helper';
import Request from '../utils/request';
import CaseRequestBody from '../utils/wa/caseRequestBody';


const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2:  Cases', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    const caseOfficer = config.users[config.testEnv].caseOfficer_r2.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r2.sec;

    beforeEach(function() {
        setTestContext(this);
        Request.clearSession();
    });

    it('Get My cases', async function() {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);

        const response = await getCases('MyCases', [userDetailsRes.data.userInfo.id]);
        expect(response.status).to.equal(200);

        const expectedCases = workAllocationDataModels.getRelease2Cases();
        let expectedCaseKeys = Object.keys(expectedCases.cases[0]);
        expectedCaseKeys = expectedCaseKeys.filter(key => !['endDate'].includes(key));
        expect(response.data).to.have.all.keys(Object.keys(expectedCases));
        if (response.data.cases.length > 0) {
            const actualKeys = Object.keys(response.data.cases[0]);
            reporterMsg('Actual vs expected keys of case');
            reporterJson(actualKeys);
            reporterJson(expectedCaseKeys);
            expect(actualKeys).to.include.members(expectedCaseKeys);

        }

    });

    it('Get All work cases', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);

        const response = await getCases('AllWorkCases', [userDetailsRes.data.userInfo.id]);
        expect(response.status).to.equal(200);

        const expectedCases = workAllocationDataModels.getRelease2Cases();
        let expectedCaseKeys = Object.keys(expectedCases.cases[0]);
        expectedCaseKeys = expectedCaseKeys.filter(key => !['endDate'].includes(key));

        expect(response.data).to.have.all.keys(Object.keys(expectedCases));
        if (response.data.cases.length > 0) {
            const actualKeys = Object.keys(response.data.cases[0]);

            reporterMsg('Actual vs expected keys of case');
            reporterJson(actualKeys);
            reporterJson(expectedCaseKeys);

            expect(actualKeys).to.include.members(expectedCaseKeys);

        }

    });


    async function getCases(view, users){
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const caseRequestObj = getSearchCaseReqBody(view, users, [config.workallocation[config.testEnv].locationId], 'caseworker');
        caseRequestObj.withSearchBy('caseworker')
            .sortWith('startDate', 'asc')
            .withPageNumber(1);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseRequestObj.getRequestBody()).length
        };

        const response = await Request.post(`workallocation/my-work/cases`, caseRequestObj.getRequestBody(), headers, 200);
        return response;
    }


    function getSearchCaseReqBody(view, users,locations,userType) {
        // const response = await Request.get('api/user/details', null, 200);

        const caseRequestBody = new CaseRequestBody();
        caseRequestBody.inView(view);
        if (locations) {
            locations.forEach(loc => {
                caseRequestBody.searchWithlocation(loc);
            });
        }

        switch (view) {
            case 'MyCases':
                if (users) {
                    users.forEach(user => {
                        caseRequestBody.searchWithUser(user);
                    });
                } else {
                    caseRequestBody.searchWithUser(null);
                }
                caseRequestBody.withSearchBy(userType ? userType : 'caseworker');
                break;

            case 'AllWorkCases':
                caseRequestBody.searchWithlocation(null);
                caseRequestBody.searchWithUser(null);
                break;
            default:
                throw new Error(`${view} is not recognized or not implemented in test`);
        }

        return caseRequestBody;
    }

});


