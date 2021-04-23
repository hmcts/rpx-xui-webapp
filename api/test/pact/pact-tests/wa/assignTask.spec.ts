import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { assignTaskToUser } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_assign_task_by_id', port: 8000 });


describe("Task management api, assign a task to user", () => {

    const mockRequest = {
        user_id: "004b7164-0943-41b5-95fc-39794af4a9fe"
    }
    const taskId = "12345678";
    describe("post /task/taskId/assign", () => {

        const jwt = 'some-access-token';

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "assign a task using taskId",
                uponReceiving: "taskId to assign a task",
                withRequest: {
                    method: "POST",
                    path: `/task/${taskId}/assign`,
                    headers: {
                        Authorization: "Bearer some-access-token",
                        ServiceAuthorization: "some service authorisation",
                        'Content-Type': 'application/json'
                    },
                    body: mockRequest

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
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task/${taskId}/assign`;

            const response: Promise<any> = assignTaskToUser(taskUrl, mockRequest);

            response.then((axiosResponse) => {
                expect(axiosResponse.status).to.be.equal(204);

            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

