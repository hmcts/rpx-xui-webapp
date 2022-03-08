import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { markTaskAs } from "../../pactUtil";

import * as sinon from 'sinon'
import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';
import { getSearchTaskOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_claim_task_by_id', port: 8000 });


describe("Task management api, claim a task", () => {
    let sandbox: sinon.SinonSandbox;
    let next;
    const RESPONSE_BODY = {

    }
    const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d"
    describe("post /task/taskId/claim", () => {
        const sandbox: sinon.SinonSandbox = sinon.createSandbox();

        const jwt = 'some-access-token';
        beforeEach(() => {
            next = sandbox.spy();
        });

        before(async () => {
            
            await pactSetUp.provider.setup()
            const interaction = {
                state: "claim a task using taskId",
                uponReceiving: "taskId to claim a task",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/claim`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        'content-type': 'application/json',
                    }

                },
                willRespondWith: {
                    status: 204,
                    headers: {
                    }
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
            const configValues = getSearchTaskOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });
            
            const { postTaskAction } = requireReloaded('../../../../workAllocation2/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                params: {
                    taskId: taskId,
                    action: "claim"
                }

            });
            let resStatus = null;
            const response = mockRes();
            response.status = (ret) => {
                resStatus = ret
            };

            try {
                await postTaskAction(req, response, next);
                expect(resStatus).to.equal(204);
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

