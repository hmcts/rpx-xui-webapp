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
const pactSetUp = new PactTestSetup({ provider: 'am_api_get_role_assignments_for_actorId', port: 8000 });

const roles = [
    { roleCategory: 'LEGAL_OPERATIONS', roleId:'case-worker', roleName:'Case worker'},
    { roleCategory: 'JUDICIAL', roleId: 'lead-judge', roleName: 'Lead judge' },
    { roleCategory: 'JUDICIAL', roleId: 'hearing-judge', roleName: 'Hearing judge' }

];

describe("access management service, get roles", () => {
    const RESPONSE_BODY =  [];

    for(const role of roles){
        const dummyRole = getDummyCaseRole();
        dummyRole.name = role.roleId;
        dummyRole.label = role.roleName;
        dummyRole.category = role.roleCategory;
        dummyRole.patterns[0].roleType.values.push('CASE');
        RESPONSE_BODY.push(dummyRole);
    }

    describe("get /am/role-assignments/roles", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned roles",
                uponReceiving: "get roles",
                withRequest: {
                    method: "GET",
                    path: `/am/role-assignments/roles`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/json",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: RESPONSE_BODY,
                },
            }
            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction)
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

            const { getPossibleRoles } = requireReloaded('../../../../roleAccess/roleAssignmentService');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                session:{
                    subStantiveRoles : null 
                },
                body:{
                    serviceIds:["IA"]
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
            let roleAssignments = null;
            try {
                await getPossibleRoles(req, response, next);

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
    console.log(dto);
    let i = 0;
    for (const role of roles) {
        expect(dto[0].roles[i].roleCategory).to.be.equal(role.roleCategory);
        expect(dto[0].roles[i].roleId).to.be.equal(role.roleId);
        expect(dto[0].roles[i].roleName).to.be.equal(role.roleName);
        i++;
   }

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



