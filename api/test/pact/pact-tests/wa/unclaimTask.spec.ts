import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { markTaskAs } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_unclaim_task_by_id', port: 8000 });


describe("Task management api, Unclaim a task", () => {

    const RESPONSE_BODY = {

    }
    const taskId = "1111222233334444"
    describe("post /task/taskId/unclaim", () => {

        const jwt = 'some-access-token';

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "some tasks exists on event for case",
                uponReceiving: "a request to search task for case with event",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/unclaim`,
                    headers: {
                        Authorization: "Bearer some-access-token"
                    }

                },
                willRespondWith: {
                    status: 204,
                    headers: {
                        "Content-Type": "application/json",
                    }
                },
            }
            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction)
        })
        it("returns the correct response", async () => {
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task/${taskId}/unclaim`;

            const response: Promise<any> = markTaskAs(taskUrl, "unclaim");

            response.then((axiosResponse) => {
                expect(axiosResponse.status).to.be.equal(204);
                console.log("unclaim");

            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

