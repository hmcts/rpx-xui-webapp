import { expect } from 'chai';
import * as config from 'config';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getLocationsRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';




const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_location', port: 8000 });

const serviceCode = "BFA1";
xdescribe("Locations ref data api, get all locations for service", () => {

    const RESPONSE_BODY = {
        "court_venues": [
           {
                "is_case_management_location": somethingLike('Y'),
                "epimms_id": somethingLike('12345'),
                "site_name": somethingLike('siteName1')
           }
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
                state: "Court Venues exist for the service code provided",
                uponReceiving: "get list of court venues for given service code",
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

            const { getLocations } = requireReloaded('../../../../workAllocation/locationController');

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
    expect(dto[0].id).to.be.equal("12345");
    expect(dto[0].locationName).to.be.equal("siteName1");

}

