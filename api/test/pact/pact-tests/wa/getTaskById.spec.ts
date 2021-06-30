import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { getTaskById } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_get_task_by_id', port: 8000 });

const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d"
describe("Task management api, get task by id", () => {
    
    const RESPONSE_BODY = {
        "task": {
            "id": somethingLike("4d4b6fgh-c91f-433f-92ac-e456ae34f72a"),
            "name": somethingLike("Review the appeal"),
            "type": somethingLike("reviewTheAppeal"),
            "task_state": somethingLike("assigned"),
            "task_system": somethingLike("SELF"),
            "security_classification": somethingLike("PUBLIC"),
            "task_title": somethingLike("Review the appeal"),
            "created_date": somethingLike("2021-06-30T12:32:46+0100"),
            "due_date": somethingLike("2021-06-30T12:32:46+0100"),
            "assignee": somethingLike("10bac6bf-80a7-4c81-b2db-516aba826be6"),
            "auto_assigned": somethingLike(false),
            "execution_type": somethingLike("Case Management Task"),
            "jurisdiction": somethingLike("IA"),
            "region": somethingLike("1"),
            "location": somethingLike("765324"),
            "location_name": somethingLike("Taylor House"),
            "case_type_id": somethingLike("Asylum"),
            "case_id": somethingLike("1617708245335311"),
            "case_category": somethingLike("refusalOfHumanRights"),
            "case_name": somethingLike("Bob Smith"),
            "warnings": somethingLike(false)
        }
    }

    describe("get /task/{taskId}", () => {

        const jwt = 'some-access-token';
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "get a task using taskId",
                uponReceiving: "taskId to get a task",
                withRequest: {
                    method: "GET",
                    path: `/task/${taskId}`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "Content-Type": "application/json",
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
        it("returns the correct response", async () => {
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task/${taskId}`;

            const response: Promise<any> = getTaskById(taskUrl);

            response.then((axiosResponse) => {
                const dto: any = axiosResponse;
                assertResponses(dto.data);
                console.log("get task by id");

            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

function assertResponses(dto: any) {
    expect(dto.task.assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6");

  
 
}

