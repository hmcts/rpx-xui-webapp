import { expect } from 'chai';
import * as config from 'config';
// import { searchTasks } from "../../pactUtil";
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { PactTestSetup } from '../settings/provider.mock';
import { getWorkAllocationAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';




const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_work_types', port: 8000 });


const taskId1 = "4d4b6fgh-c91f-433f-92ac-e456ae34f72a"
const taskId2 = "fda422de-b381-43ff-94ea-eea5790188a3"

describe("Task management api, work types", () => {

    const RESPONSE_BODY = {
        "work_types": [
           {
                id: somethingLike('1234'),
                label: somethingLike('test'),
           },
        ],
    };

    describe("get /work-types", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;
        beforeEach(() => {
            next = sandbox.spy();
        });

        before(async () => {

            await pactSetUp.provider.setup()
            const interaction = {
                state: "retrieve all work types",
                uponReceiving: "retrieve all work types",
                withRequest: {
                    method: "GET",
                    path: "/work-types",
                    query: "filter-by-user=true",
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        // 'content-Type': 'application/json',

                    }                },
                willRespondWith: {
                    status: 200,
                    headers: {
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
            const configValues = getWorkAllocationAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getTypesOfWork } = requireReloaded('../../../../workAllocation/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    // 'content-Type': 'application/json',
                },
            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getTypesOfWork(req, response, next);

                assertResponses(returnedResponse);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            } catch (err) {
                console.log(err.stack);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
                throw new Error(err);
            }

        });
    });
});

function assertResponses(dto: any) {
    expect(dto[0].key).to.be.equal("1234");
    expect(dto[0].label).to.be.equal("test");
}
