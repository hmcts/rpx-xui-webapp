import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';

import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getCaseworkerRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
import { DateTimeMatcher } from '../utils/matchers';
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'rd_caseworker_ref_api_get_caseworkers_by_userIds', port: 8000 });

const MockApp = require('../../../../../test/nodeMock/app');

const locationId = "123456";
describe("Caseworker ref data api, get all caseworkers", () => {

    const REQUEST_BODY = {
        userIds: ['004b7164-0943-41b5-95fc-39794af4a9fe', '004b7164-0943-41b5-95fc-39794af4a9fe'],
    };

    const baselocations = [
        { location_id: '12345', location: 'test location', services: ['IA', 'IAC'], is_primary: true }
    ];
    const RESPONSE_BODY = [
        {
            "email_id": somethingLike("test_person@test.gov.uk"),
            "first_name": somethingLike("testfn"),
            "last_name": somethingLike("testln"),
            "id": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
            "base_location": baselocations,
        },
        {
            "email_id": somethingLike("test_person2@test.gov.uk"),
            "first_name": somethingLike("testfn"),
            "last_name": somethingLike("testln"),
            "id": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
            "base_location": baselocations,
        },
    ]

    describe("get /caseworker", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned list of caseworkers",
                uponReceiving: "get list of caseworkers",
                withRequest: {
                    method: "POST",
                    path: `/refdata/case-worker/users/fetchUsersById`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/json",
                    },
                    body: REQUEST_BODY
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
            MockApp.stopServer();
        });


        it("returns the correct response", async () => {
            MockApp.setServerPort(8080);
            MockApp.init();
            
            MockApp.onPost('/am/role-assignments/query', (req , res) => {
                res.send({
                    roleAssignmentResponse : [
                        { actorId: '004b7164-0943-41b5-95fc-39794af4a9fe', roleCategory: 'case-worker' },
                        { actorId: '004b7164-0943-41b5-95fc-39794af4a9fe', roleCategory: 'case-worker' },
                    ]
                });
            });
            await MockApp.startServer(); 
            const configValues = getCaseworkerRefDataAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            configValues['services.role_assignment.roleApi'] = 'http://localhost:8080';
            

            configValues['waSupportedJurisdictions'] = ['IA'];
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getAllCaseWorkers } = requireReloaded('../../../../workAllocation2/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                }

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getAllCaseWorkers(req, response, next);

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
    expect(dto[0].email).to.be.equal("test_person@test.gov.uk");
    expect(dto[0].firstName).to.be.equal("testfn");
    expect(dto[0].lastName).to.be.equal("testln");
    expect(dto[0].roleCategory).to.be.equal("case-worker");
    expect(dto[0].idamId).to.be.equal("004b7164-0943-41b5-95fc-39794af4a9fe");
    expect(dto[0].location.id).to.be.equal("12345");
    expect(dto[0].location.locationName).to.be.equal("test location");

}

