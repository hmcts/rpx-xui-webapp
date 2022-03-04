import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';

import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getAccessManagementServiceAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
import { DateTimeMatcher } from '../utils/matchers';
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'test_am_roleAssignment_queryAssignment', port: 8000 });

const caseId = "12345";
describe("access management service, query role assignments", () => {

    const roles = [{ roleName: 'lead-judge', roleCategory: 'JUDICIAL', displayName:'Lead judge' }, 
        { roleName: 'hearing-judge', roleCategory: 'JUDICIAL', displayName: 'Hearing judge' }, 
        { roleName: 'case-worker', roleCategory: 'LEGAL_OPERATIONS', displayName: 'Case worker'}];

    const REQUEST_BODY = {
        queryRequests: [
            {
                attributes: {
                    caseId: [caseId],
                    caseType: ['asylum'],
                    jurisdiction: ['IAC'],
                },
                roleCategory: ['LEGAL_OPERATIONS', 'JUDICIAL'],
            },
        ],
    };
    const RESPONSE_BODY = {
        "roleAssignmentResponse": []
    };
    for(const role of roles){
        const roleAssognmentRole = {
            'id': '1234',
            'actorId': '5678',
            "roleCategory": "LEGAL_OPERATIONS",
            "roleName": "case-worker",
            "beginTime": term(DateTimeMatcher("2022-01-11T00:00:00Z")),
            "endTime": term(DateTimeMatcher("2022-01-11T00:00:00Z")),
        };
        roleAssognmentRole.roleName = role.roleName;
        roleAssognmentRole.roleCategory = role.roleCategory;

        RESPONSE_BODY.roleAssignmentResponse.push(roleAssognmentRole);
    }
    describe("post /am/role-assignments/query", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "A list of role assignments for the search query",
                uponReceiving: "query role assignments for caseId",
                withRequest: {
                    method: "POST",
                    path: `/am/role-assignments/query`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    },
                    body: REQUEST_BODY,
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    },
                    body: RESPONSE_BODY,
                },
            };

            const rolesResponseBody = [];
            for (const role of roles){
                const dummyRole = getDummyCaseRole();
                dummyRole.name = role.roleName;
                dummyRole.category = role.roleCategory;
                dummyRole.label  = role.displayName
                rolesResponseBody.push(dummyRole);

            }
          

            const getRolesInteraction = {
                state: "A list of role assignments for the search query",
                uponReceiving: "query role assignments for caseId",
                withRequest: {
                    method: "GET",
                    path: `/am/role-assignments/roles`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    },
                    body: rolesResponseBody, 
                },
            };

            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction);
            // @ts-ignore
            pactSetUp.provider.addInteraction(getRolesInteraction);

        })


        afterEach(() => {
            sandbox.restore();
            sinon.reset();
        });


        it("returns the correct response", async () => {
            const configValues = getAccessManagementServiceAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getRolesByCaseId } = requireReloaded('../../../../roleAccess/index');

          
            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                },
                body:{
                    caseId: caseId,
                   jurisdiction: 'IAC',
                   caseType: 'asylum',
                }

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            const userInfo = {
                uid: '12345',
                roles: []
            }
            try {
                await getRolesByCaseId(req, response, next);

                assertResponses(returnedResponse);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            } catch (err) {
                console.log(err.stack);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
                throw new Error(err);
            }
        })
    })
})

function assertResponses(dto: any) {

    console.log(JSON.stringify(dto));
    expect(dto[0].actorId).to.be.equal("5678");
    expect(dto[0].end).to.be.equal("2022-01-11T00:00:00Z");
    expect(dto[0].start).to.be.equal("2022-01-11T00:00:00Z");
    expect(dto[0].roleCategory).to.be.equal("JUDICIAL");
    expect(dto[0].roleName).to.be.equal("Lead judge");
}


function getDummyCaseRole(){
    return {
        "name": "[PETSOLICITOR]",
        "label": "Petitioner's Solicitor",
        "description": "Petitioner's Solicitor",
        "category": "PROFESSIONAL",
        "substantive": true,
        "patterns": [
            {
                "roleType": {
                    "mandatory": true,
                    "values": [
                        "CASE"
                    ]
                },
                "grantType": {
                    "mandatory": true,
                    "values": [
                        "SPECIFIC"
                    ]
                },
                "classification": {
                    "mandatory": true,
                    "values": [
                        "RESTRICTED"
                    ]
                },
                "attributes": {
                    "jurisdiction": {
                        "mandatory": true
                    },
                    "caseType": {
                        "mandatory": true
                    },
                    "caseId": {
                        "mandatory": true
                    }
                },
                "substantive": false
            }
        ]
    };
}

