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

const actorId = "12345";
describe("access management service, get role assignemnts of actor", () => {


    const RESPONSE_BODY = {
        "roleAssignmentResponse": [
            {
                "roleType":"",
                "roleName":"",
                "attributes": {
                    "caseId":somethingLike("1234567812345678"),
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

    describe("get /am/role-assignments/actors/${actorId}", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned role assignments for actorId",
                uponReceiving: "get roles assignments for actorId",
                withRequest: {
                    method: "GET",
                    path: `/am/role-assignments/actors/${actorId}`,
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

            const { refreshRoleAssignmentForUser } = requireReloaded('../../../../user/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                params: {
                    actorId: actorId
                }

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            const userInfo = {
                uid:'12345',
                roles: []
            }
            let roleAssignments = null;
            try {
                roleAssignments = await refreshRoleAssignmentForUser(userInfo, req);

                assertResponses(roleAssignments);
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
    expect(dto[0].caseId).to.be.equal("1234567812345678");
    expect(dto[0].caseType).to.be.equal("test-case-type");
    expect(dto[0].jurisdiction).to.be.equal("IA");
    expect(dto[0].substantive).to.be.equal("Y");

    expect(dto[1].caseId).to.be.equal("1234567812345679");
    expect(dto[1].caseType).to.be.equal("test-case-type");
    expect(dto[1].jurisdiction).to.be.equal("IA");
    expect(dto[1].substantive).to.be.equal("Y");
}

