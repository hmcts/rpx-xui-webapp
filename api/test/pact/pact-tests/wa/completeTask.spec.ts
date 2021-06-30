import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { markTaskAs } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_complete_task_by_id', port: 8000 });


describe("Task management api, Complete a task", () => {

    const RESPONSE_BODY = {
       
    }
    const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d"
    describe("post /task/taskId/complete/", () => {

        const jwt = 'some-access-token';

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "complete a task using taskId",
                uponReceiving: "taskId to complete a task",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/complete`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        'Content-Type': 'application/json',
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
        it("returns the correct response", async () => {
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task/${taskId}/complete`;

            const response: Promise<any> = markTaskAs(taskUrl,"complete");

            response.then((axiosResponse) => {
                expect(axiosResponse.status).to.be.equal(204);
                
            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

