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
const pactSetUp = new PactTestSetup({ provider: 'rd_caseworker_ref_api_get_caseworkers_for_location', port: 8000 });

const locationId = "123456";
describe("Caseworker ref data api, get caseworkers for locationId", () => {


    const RESPONSE_BODY = [
        {
            "email": somethingLike("test_person@test.gov.uk"),
            "firstName": somethingLike("testfn"),
            "lastName": somethingLike("testln"),
            "idamId": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
            "roleCategory": somethingLike('case-worker'),
            "location": { 
                "id": somethingLike("12345"),
                "locationName": somethingLike("test location") 
            }
        },
    ]

    describe("get /caseworker/location/${locationId}", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned list of staff for location",
                uponReceiving: "get list of staff for location",
                withRequest: {
                    method: "GET",
                    path: `/caseworker/location/${locationId}`,
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
            const configValues = getCaseworkerRefDataAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getAllCaseWorkersForLocation } = requireReloaded('../../../../workAllocation2/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                params: {
                    locationId: locationId
                }

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getAllCaseWorkersForLocation(req, response, next);

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
    expect(dto[0].email).to.be.equal("test_person@test.gov.uk");
    expect(dto[0].firstName).to.be.equal("testfn");
    expect(dto[0].lastName).to.be.equal("testln");
    expect(dto[0].roleCategory).to.be.equal("case-worker");
    expect(dto[0].idamId).to.be.equal("004b7164-0943-41b5-95fc-39794af4a9fe");
    expect(dto[0].location.id).to.be.equal("12345");
    expect(dto[0].location.locationName).to.be.equal("test location");

}

