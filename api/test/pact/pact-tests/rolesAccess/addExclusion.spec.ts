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
const pactSetUp = new PactTestSetup({ provider: 'am_api_add_role_type_exclusion', port: 8000 });

const caseId = "10bac6bf-80a7-4c81-b2db-516aba826be6";
const jurisdicton = 'IA';
const assigneeId = '10bac6bf-80a7-4c81-b2db-516aba826be0';
const roleCategory = 'LEGAL_OPERATIONS';
const currentUserId = '10bac6bf-80a7-4c81-b2db-516aba826be1';
const exclusionDescriptionNotes = 'test eclusion description notes';
describe("access management service, add exclusion", () => {

  

    const REQUEST_BODY = {
        roleRequest: {
            assignerId: currentUserId,
            replaceExisting: false,
        },
        requestedRoles: [{
            roleType: 'CASE',
            grantType: 'EXCLUDED',
            classification: 'RESTRICTED',
            attributes: {
                caseId: caseId,
                jurisdiction: jurisdicton,
                notes: somethingLike(exclusionDescriptionNotes),
            },
            roleCategory: somethingLike(roleCategory),
            roleName: somethingLike('conflict-of-interest'),
            actorIdType: 'IDAM',
            actorId: somethingLike(assigneeId),
        }],
    };
    
    const RESPONSE_BODY = {};

    describe("post /am/role-assignments", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "added role assignments for exclusion",
                uponReceiving: "add role assignment for exclusion",
                withRequest: {
                    method: "POST",
                    path: `/am/role-assignments`,
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
                        "Content-Type": "application/json",
                    },
                    body: RESPONSE_BODY,
                },
            };

            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction);


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

            const { confirmUserExclusion } = requireReloaded('../../../../roleAccess/exclusionService');
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
                            userinfo:{
                                id: currentUserId,
                                roleCategory: roleCategory
                            }
                        }
                    }
                },
                body: {
                    caseId:caseId,
                    jurisdiction:'IA',
                    exclusionDescription: exclusionDescriptionNotes,
                    exclusionOption:'',
                    person:{
                        domain:roleCategory,
                        id:assigneeId
                    }
                }

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await confirmUserExclusion(req, response, next);

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

