import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { markTaskAs } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_claim_task_by_id', port: 8000 });


describe("Task management api, claim a task", () => {

    const RESPONSE_BODY = {

    }
    const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d"
    describe("post /task/taskId/claim", () => {

        const jwt = 'some-access-token';

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "claim a task using taskId",
                uponReceiving: "taskId to claim a task",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/claim`,
                    headers: {
                        'Authorization': 'Bearer some-access-token',
                        'ServiceAuthorization': 'some service authorisation',
                        'Content-Type': 'application/json',
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
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task/${taskId}/claim`;

            const response: Promise<any> = markTaskAs(taskUrl, "claim");

            response.then((axiosResponse) => {
                expect(axiosResponse.status).to.be.equal(204);

            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

