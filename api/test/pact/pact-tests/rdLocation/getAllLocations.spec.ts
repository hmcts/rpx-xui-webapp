import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';

import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getLocationsRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
import { DateTimeMatcher } from '../utils/matchers';
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'rd_locations_ref_api_get_locations', port: 8000 });

const serviceCode = "BFA1";
describe("Locations ref data api, get all locations for service", () => {


    const RESPONSE_BODY = {
        "court_venues": [
           {
                "is_case_management_location": 'Y',
                "epimms_id": '1234',
                "site_name": 'test loc 1'
           },
            {
                "is_case_management_location": 'Y',
                "epimms_id": '1235',
                "site_name": 'test loc 2'
            },
        ]
    };

    describe("get /locations}", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned list of locations",
                uponReceiving: "get list of locations",
                withRequest: {
                    method: "GET",
                    path: `/refdata/location/court-venues/services`,
                    query: `service_code=${serviceCode}`,
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
            const configValues = getLocationsRefDataAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getLocations } = requireReloaded('../../../../workAllocation2/locationController');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getLocations(req, response, next);

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
    expect(dto[0].id).to.be.equal("1234");
    expect(dto[0].locationName).to.be.equal("test loc 1");
    expect(dto[1].id).to.be.equal("1235");
    expect(dto[1].locationName).to.be.equal("test loc 2");
}

