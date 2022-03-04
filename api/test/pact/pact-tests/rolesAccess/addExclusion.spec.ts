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
const pactSetUp = new PactTestSetup({ provider: 'test_am_roleAssignment_createAssignment', port: 8000 });

const caseId = "1212121212121213";
const jurisdicton = 'IA';
const assigneeId = '14a21569-eb80-4681-b62c-6ae2ed069e5f';
const roleCategory = 'JUDICIAL';
const currentUserId = '3168da13-00b3-41e3-81fa-cbc71ac28a0f';
const exclusionDescriptionNotes = 'test eclusion description notes';
describe("access management service, add exclusion", () => {

  

    const REQUEST_BODY = {
        roleRequest: {
            assignerId: somethingLike(currentUserId),
            replaceExisting: somethingLike(false),
           
        },
        requestedRoles: [{
            roleType: somethingLike('CASE'),
            grantType: somethingLike('EXCLUDED'),
            classification: somethingLike('RESTRICTED'),
            attributes: {
                caseId: somethingLike(caseId),
                // caseType: somethingLike('Asylum'),
                jurisdiction: somethingLike(jurisdicton),
                notes: somethingLike(exclusionDescriptionNotes),
            },
            roleCategory: somethingLike(roleCategory),
            roleName: somethingLike('conflict-of-interest'),
            actorIdType: somethingLike('IDAM'),
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
                state: "The assignment request is valid with one requested role and replaceExisting flag as false",
                uponReceiving: "add role assignment for exclusion",
                withRequest: {
                    method: "POST",
                    path: `/am/role-assignments`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/json",
                    },
                    body: REQUEST_BODY,
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        "Content-Type": "application/vnd.uk.gov.hmcts.role-assignment-service.create-assignments+json",
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
                    'content-type': 'application/json',
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
                    caseeType:'Asylum',
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

