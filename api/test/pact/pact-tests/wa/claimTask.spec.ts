import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { markTaskAs } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_claim_task_by_id', port: 8000 });


describe("Task management api, claim a task", () => {

    const RESPONSE_BODY = {

    }
    const taskId = "121234345656"
    describe("post /task/taskId/claim", () => {

        const jwt = 'some-access-token';

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "some tasks exists on event for case",
                uponReceiving: "a request to search task for case with event",
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

