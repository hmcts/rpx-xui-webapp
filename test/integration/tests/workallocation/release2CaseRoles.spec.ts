import { expect } from 'chai';
// import mocha from 'mocha';
import { config } from '../config/config';
import { getAuthorisation, getXSRFToken } from '../utils/authUtil';
import { reporterMsg, setTestContext } from '../utils/helper';
import Request from '../utils/request';
import CaseRequestBody from '../utils/wa/caseRequestBody';


const workAllocationDataModels = require('../../../dataModels/workAllocation');

describe('Work allocation Release 2:  Case roles', () => {
    const userName = config.users[config.testEnv].solicitor.e;
    const password = config.users[config.testEnv].solicitor.sec;

    const caseOfficer = config.users[config.testEnv].caseOfficer_r2.e;
    const caseofficerPass = config.users[config.testEnv].caseOfficer_r2.sec;

    const caseId = config.workallocation[config.testEnv].iaCaseIds[0];

    beforeEach(function () {
        setTestContext(this);
        Request.clearSession();
    });


    after(async function () {
        const authToken = await getAuthorisation(caseOfficer, caseofficerPass);
        const roleAssignmentCleanUp = require('../../../dataCleanup/roleAssignments');
        await roleAssignmentCleanUp.runCleanup(authToken);
    });


    it('Get Case roles', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);

        const response = await getCases('AllWorkCases', [userDetailsRes.data.userInfo.id]);
        expect(response.status).to.equal(200);

        if (response.data.cases.length > 0 ) {
           const caseId = response.data.cases[0].case_id;

           const caseRolesRequest = {
                caseId: caseId,
                caseType: 'Asylum',
                jurisdiction: 'IA'
            };
           const headers = {
                'X-XSRF-TOKEN': xsrfToken,
                'content-length': JSON.stringify(caseRolesRequest).length
            };
           const caseRolesResponse = await Request.post(`api/role-access/roles/post`, caseRolesRequest, headers, 200);
           const expectedCaseRoleKeys = Object.keys(workAllocationDataModels.getCaseRole());
            if (caseRolesResponse.data.length > 0){
                expect(Object.keys(caseRolesResponse.data[0])).to.include.members(expectedCaseRoleKeys);
            }else{
                reporterMsg(`No cases roles returned`)
            }

       } else {
           reporterMsg(`No cases available or retuned for user in AllWorkCases, skip case roles request.`)
       }
    });

    it('Get Case exclusions', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);

        const caseRolesRequest = {
            caseId: caseId,
            caseType: 'Asylum',
            jurisdiction: 'IA'
        };
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseRolesRequest).length
        };
        const caseExclusionResponse = await Request.post(`api/role-access/exclusions/post`, caseRolesRequest, headers, 200);
        const expectedCaseRoleKeys = Object.keys(workAllocationDataModels.getCaseExclusion());
        if (caseExclusionResponse.data.length > 0) {
            expect(Object.keys(caseExclusionResponse.data[0])).to.include.members(expectedCaseRoleKeys);
        } else {
            reporterMsg(`No cases exclusions returned`)
        }


    });

    it(' allocate role', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);


        const caseRolesRequest = {
            "caseId": caseId.toString(),
            "state": 4,
            "typeOfRole": {
                "id": "ftpa-judge",
                "name": "FTPA Judge"
            },
            "allocateTo": "Allocate to another person",
            "person": config.workallocation[config.testEnv].judgeUser,
            "durationOfRole": "Indefinite",
            "action": "allocate",
            "period": {
                "startDate": "2022-01-14T00:00:00.000Z",
                "endDate": null
            },
            "lastError": null,
            "roleCategory": "JUDICIAL"
        };
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseRolesRequest).length
        };
        const caseExclusionResponse = await Request.post(`api/role-access/allocate-role/confirm`, caseRolesRequest, headers, 201);
        addAssignmentIdToCleanUp(caseExclusionResponse);

        const expectedCaseRoleKeys = Object.keys(workAllocationDataModels.getCaseExclusion());
        if (caseExclusionResponse.data.length > 0) {
            expect(Object.keys(caseExclusionResponse.data[0])).to.include.members(expectedCaseRoleKeys);
        } else {
            reporterMsg(`No cases exclusions returned`);
        }



    });


    it('Remove allocate ', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);


        const caseRolesRequest = {
            caseId: caseId,
            caseType: 'Asylum',
            jurisdiction: 'IA'
        };
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseRolesRequest).length
        };
        const caseRolesResponse = await Request.post(`api/role-access/roles/post`, caseRolesRequest, headers, 200);
        if (caseRolesResponse.data.length > 0) {
            const removeAllocateRequestBody = {
                assigmentId: caseRolesResponse.data[0].id
            };
            const headersForRemoveAllocate = {
                'X-XSRF-TOKEN': xsrfToken,
                'content-length': JSON.stringify(removeAllocateRequestBody).length
            };
            const caseREmoveRolesResponse = await Request.post(`api/role-access/allocate-role/delete`, removeAllocateRequestBody, headersForRemoveAllocate, 204);
        } else {
            reporterMsg(`No cases roles returned`);
        }



    });



    it('Get exclusion', async function () {
        this.timeout(60000);
        await Request.withSession(caseOfficer, caseofficerPass);
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);
        const userDetailsRes = await Request.get('api/user/details', { 'X-XSRF-TOKEN': xsrfToken }, 200);



        const caseExclusionAddRequest = {
            caseId: caseId.toString(),
            exclusionDescription: "test",
            exclusionOption: "Exclude me",
            jurisdiction: "IA",
            lastError: null,
            person: null,
            personRole: null,
            state: 4
        };
        const headers = {
            'X-XSRF-TOKEN': xsrfToken,
            'content-length': JSON.stringify(caseExclusionAddRequest).length
        };
        const caseRoleExclusion = await Request.post(`api/role-access/exclusions/confirm`, caseExclusionAddRequest, headers, 201);
        addAssignmentIdToCleanUp(caseRoleExclusion);


    });


    async function getCases(view, users) {
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


    function getSearchCaseReqBody(view, users, locations, userType) {
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


    function addAssignmentIdToCleanUp(assignmentResponse){
        const roleAssignmentCleanUp = require('../../../dataCleanup/roleAssignments');
        const assignmentId = assignmentResponse.data.roleAssignmentResponse.requestedRoles[0].id;
        roleAssignmentCleanUp.addRoleAssignmentid(assignmentId);
    }

    async function getIACases() {
        const xsrfToken = await getXSRFToken(caseOfficer, caseofficerPass);

        const body = { size: 25 };

        const headers = {
            'x-xsrf-token': xsrfToken,
            'content-length': JSON.stringify(body).length,
            'accept' : 'application/json',
            'content-type': 'application/json'

        };
        const response = await Request.post(`data/internal/searchCases?ctid=Asylum&use_case=WORKBASKET&view=WORKBASKET&state=Any&page=1`, body,headers, 200);

        return response;
    }


});


