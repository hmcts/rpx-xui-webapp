import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getUserId, getXSRFToken } from '../utils/authUtil';
import { reporterMsg, setTestContext } from '../utils/helper';

import Request from '../utils/request';

import TaskRequestBody from '../utils/wa/taskRequestBody';
const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocations Release 2', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    const caseOfficer = config.users[config.testEnv].caseOfficer_r2.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r2.sec;

    beforeEach(function () {
        setTestContext(this);
        Request.clearSession();
    });

    // tslint:disable-next-line: only-arrow-functions
    it('case officer,get locations /workallocation2/location', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation2/location`, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
        if (response.data.length > 0){
            const actualLocationObjKeys = Object.keys(response.data[0]);
            const expectedLocationObjKeys = Object.keys(workAllocationDataModels.getLocation());
            expect(actualLocationObjKeys).to.include.members(expectedLocationObjKeys);
        }else{
            reporterMsg(`No locations returned`);
        }
        
    });

    it('case officer,get caseworkers /workallocation2/caseworker', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation2/caseworker`, headers, 200);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');

        const actual = response.data[0];
        const expected = workAllocationDataModels.getCaseWorkerOrperson();
        expect(actual).to.have.all.keys(Object.keys(expected));
        expect(actual.location).to.have.all.keys(Object.keys(expected.location));

    });


    // tslint:disable-next-line: only-arrow-functions
    it('case officer,search for completable tasks of a case /workallocation2/searchForCompletable' , async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const reqBody = {
            searchRequest: {
                ccdId: '1547565484535828',
                jurisdiction: 'IA',
                caseTypeId: 'Asylum',
                eventId: 'addCaseNote',
            }
        };

        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(reqBody).length
        };

        const response = await Request.post(`workallocation2/searchForCompletable`, reqBody, headers, 200);
        expect(response.status).to.equal(200);

        const actual = response.data;
        const expected = workAllocationDataModels.getCompletableTasks();
        expect(actual).to.have.all.keys(Object.keys(expected));
        expect(actual.tasks).to.be.an('array');

    });

    it('case officer,get exclusion roles categories /workallocation2/exclusion/rolesCategory', async function() {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const response = await Request.get(`workallocation2/exclusion/rolesCategory`, headers, 200);
        expect(response.status).to.equal(200);
        const actual = response.data;
        const expected = workAllocationDataModels.getRoleCategory();
        expect(actual).to.be.an('array');
        expect(actual[0]).to.have.all.keys(Object.keys(expected));
    });

    it('case officer,get case roles workallocation2/roles/:caseId', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
        };

        const caseId = '1547565764480315';
        const response = await Request.post(`api/role-access/roles/post`, { caseId: caseId, caseType: "Asylum", jurisdiction:"IA"  } ,headers, 200);
        expect(response.status).to.equal(200);
        const actual = response.data;
        const expected = workAllocationDataModels.getCaseRole();
        expect(actual).to.be.an('array');
        if (actual.length > 0) {
            expect(actual[0]).to.have.all.keys(Object.keys(expected));
        }
    });

});


