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
const pactSetUp = new PactTestSetup({ provider: 'test_am_roleAssignment_deleteAssignment', port: 8000 });

const allocateRoleData = {
    caseId: '10bac6bf-80a7-4c81-b2db-516aba826be6',
    jurisdiction: 'IA',
    roleCategory: 'LEGAL_OPERATIONS',
    typeOfRole: {
        id: 'allocate-case-worker'
    },
    period: {
        startDate: '',
        endDate: ''
    },
    allocateTo: 'Allocate to another person',
    person: {
        id: '10bac6bf-80a7-4c81-b2db-516aba826be1'
    }

}
const currentUserId = '10bac6bf-80a7-4c81-b2db-516aba826be0';
describe("access management service, allocate role", () => {

    const REQUEST_BODY = {
        assigmentId: '10bac6bf-80a7-4c81-b2db-516aba826be0',
    };

    const RESPONSE_BODY = {};

    const RESPONSE_BODY_ACTOR_ROLES = {
        "roleAssignmentResponse": [
            {
                "roleType": "",
                "roleName": "",
                "attributes": {
                    "caseId": somethingLike("1234567812345678"),
                    "caseType": somethingLike("test-case-type"),
                    "jurisdiction": somethingLike("IA"),
                    "substantive": somethingLike("Y")
                }
            },
            {
                "roleType": "",
                "roleName": "",
                "attributes": {
                    "caseId": somethingLike("1234567812345679"),
                    "caseType": somethingLike("test-case-type"),
                    "jurisdiction": somethingLike("IA"),
                    "substantive": somethingLike("Y")
                }
            }
        ]
    };

    describe("delete /am/role-assignments/{roleAssignmentId}", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "An actor with provided id is available in role assignment service",
                uponReceiving: "delete role assignment",
                withRequest: {
                    method: "DELETE",
                    path: `/am/role-assignments/${REQUEST_BODY.assigmentId}`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    },
                    body: REQUEST_BODY,
                },
                willRespondWith: {
                    status: 204
                },
            };


            const getActorRolesInteraction = {
                state: "returned role assignments for actorId",
                uponReceiving: "get roles assignments for actorId",
                withRequest: {
                    method: "GET",
                    path: `/am/role-assignments/actors/${currentUserId}`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: RESPONSE_BODY_ACTOR_ROLES,
                },
            }

            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction);
            // @ts-ignore
            pactSetUp.provider.addInteraction(getActorRolesInteraction);

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

            const { deleteRoleByCaseAndRoleId } = requireReloaded('../../../../roleAccess/index');
            'req.session.passport.user.userinfo'
            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/vnd.uk.gov.hmcts.role-assignment-service.post-assignment-query-request+json;charset=UTF-8;version=2.0',
                },
                session: {
                    passport: {
                        user: {
                            userinfo: {
                                id: currentUserId,
                                roleCategory: allocateRoleData.roleCategory,
                                roles: []
                            }
                        }
                    }
                },
                body: REQUEST_BODY

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await deleteRoleByCaseAndRoleId(req, response, next);

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

}


function getDummyCaseRole() {
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

