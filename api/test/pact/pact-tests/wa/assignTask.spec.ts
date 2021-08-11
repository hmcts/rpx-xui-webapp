import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { assignTaskToUser } from "../../pactUtil";

import * as sinon from 'sinon'
import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getSearchTaskOverrides } from '../utils/configOverride';
import {requireReloaded} from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_assign_task_by_id', port: 8000 });


describe("Task management api, assign a task to user", () => {
    let next;
    const mockRequest = {
        user_id: "004b7164-0943-41b5-95fc-39794af4a9fe"
    }
    const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d";
    describe("post /task/taskId/assign", () => {

        const jwt = 'some-access-token';
        const sandbox: sinon.SinonSandbox = sinon.createSandbox();

        beforeEach(() => {
            next = sandbox.spy();
        });

        before(async () => {
           
            await pactSetUp.provider.setup()
            const interaction = {
                state: "assign a task using taskId",
                uponReceiving: "taskId to assign a task",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/assign`,
                    headers: {
                        Authorization: "Bearer someAuthorizationToken",
                        ServiceAuthorization: "Bearer someServiceAuthorizationToken",
                    },
                    body: mockRequest

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
            await sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { postTaskAction } = requireReloaded('../../../../workAllocation/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                params: {
                    taskId: taskId,
                    action:"assign"
                },
                body: mockRequest

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

