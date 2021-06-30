import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { searchTasks } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_search', port: 8000 });

const taskId1 = "4d4b6fgh-c91f-433f-92ac-e456ae34f72a"
const taskId2 = "fda422de-b381-43ff-94ea-eea5790188a3"

describe("Task management api, Search task", () => {

    const RESPONSE_BODY = {
        "tasks":[
                {
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
            },
            {
                "id": somethingLike("fda422de-b381-43ff-94ea-eea5790188a3"),
                "name": somethingLike("Review the appeal"),
                "type": somethingLike("reviewTheAppeal"),
                "task_state": somethingLike("unassigned"),
                "task_system": somethingLike("SELF"),
                "security_classification": somethingLike("PUBLIC"),
                "task_title": somethingLike("Review the appeal"),
                "created_date": somethingLike("2021-06-30T12:32:46+0100"),
                "due_date": somethingLike("2021-06-30T12:32:46+0100"),
                "assignee": null,
                "auto_assigned": somethingLike(true),
                "execution_type": somethingLike("Case Management Task"),
                "jurisdiction": somethingLike("IA"),
                "region": somethingLike("1"),
                "location": somethingLike("765324"),
                "location_name": somethingLike("Taylor House"),
                "case_type_id": somethingLike("Asylum"),
                "case_id": somethingLike("1617708245308495"),
                "case_category": somethingLike("refusalOfHumanRights"),
                "case_name": somethingLike("John Doe"),
                "warnings": somethingLike(true)
            }
        ]
    }

    const mockRequest = {
        "search_parameters": [
            {
                "key": "caseId",
                "operator": "AFTER",
                "values": [
                    "f782bde3-8d51-11eb-a9a4-06d032acc76d"
                ]
            }
        ],
        "sorting_parameters": [
            {
                "sort_by": "case_category",
                "sort_order": "asc"
            }
        ]
    }

    describe("post /task", () => {

        const jwt = 'some-access-token';
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "appropriate tasks are returned by criteria",
                uponReceiving: "filters to search tasks",
                withRequest: {
                    method: "POST",
                    path: "/task",
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        'Content-Type': 'application/json',

                    },
                    body : mockRequest
                },
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
        it("returns the correct response", async () => {
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/task`;

            const response: Promise<any> = searchTasks(taskUrl,mockRequest);

            response.then((axiosResponse) => {
                const dto: any = axiosResponse;
                assertResponses(dto.data);
                console.log("search");

            }).then(() => {
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            })
        })
    })
})

function assertResponses(dto: any) {
    expect(dto.tasks[0].assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6");


}

