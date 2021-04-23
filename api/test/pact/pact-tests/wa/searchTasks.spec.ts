import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { searchTasks } from "../../pactUtil";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_search', port: 8000 });


describe("Task management api, Search task", () => {

    const RESPONSE_BODY = {
        "tasks":[
                {
                "assignee": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
                "auto_assigned": somethingLike(true),
                "case_category": somethingLike("protection"),
                "case_id": somethingLike("1616666869740714"),
                "case_name": somethingLike("Bob Smith"),
                "case_type_id": somethingLike("Asylum"),
                "created_date": somethingLike("2020-09-05T14:47:01.250542+01:00"),
                "due_date": somethingLike("2020-09-25T14:47:01.250542+01:00"),
                "execution_type": somethingLike("Case Management Task"),
                "id": somethingLike("f782bde3-8d51-11eb-a9a4-06d032acc76d"),
                "jurisdiction": somethingLike("IA"),
                "location": somethingLike("765324"),
                "location_name": somethingLike("Taylor House"),
                "name": somethingLike("task name"),
                "region": somethingLike("1"),
                "security_classification": somethingLike("PUBLIC"),
                "task_state": somethingLike("assigned"),
                "task_system": somethingLike("SELF"),
                "task_title": somethingLike("task name"),
                "type": somethingLike("wa-task-configuration-api-task"),
                "warnings": somethingLike(false)
            }
        ]
    }

    const mockRequest = {
        "search_parameters": [
            {
                "key": "CASE_ID",
                "operator": "AFTER",
                "values": [
                    "f782bde3-8d51-11eb-a9a4-06d032acc76d"
                ]
            }
        ],
        "sorting_parameters": [
            {
                "sort_by": "CASE_CATEGORY",
                "sort_order": "ASCENDANT"
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
                        'Authorization': 'Bearer some-access-token',
                        'ServiceAuthorization': 'some service authorisation',
                        'Content-Type': 'application/json'
                    },
                    body : mockRequest
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
    expect(dto.tasks[0].assignee).to.be.equal("004b7164-0943-41b5-95fc-39794af4a9fe");

    expect(dto.tasks[0].auto_assigned).to.be.equal(true);
    expect(dto.tasks[0].case_category).to.be.equal("protection");
    expect(dto.tasks[0].case_id).to.be.equal("1616666869740714");
    expect(dto.tasks[0].case_name).to.be.equal("Bob Smith");
    expect(dto.tasks[0].case_type_id).to.be.equal("Asylum");
    expect(dto.tasks[0].created_date).to.be.equal("2020-09-05T14:47:01.250542+01:00");
    expect(dto.tasks[0].due_date).to.be.equal("2020-09-25T14:47:01.250542+01:00");
    expect(dto.tasks[0].execution_type).to.be.equal("Case Management Task");

    expect(dto.tasks[0].id).to.be.equal("f782bde3-8d51-11eb-a9a4-06d032acc76d");
    expect(dto.tasks[0].jurisdiction).to.be.equal("IA");
    expect(dto.tasks[0].location).to.be.equal("765324");
    expect(dto.tasks[0].location_name).to.be.equal("Taylor House");
    expect(dto.tasks[0].name).to.be.equal("task name");
    expect(dto.tasks[0].region).to.be.equal("1");
    expect(dto.tasks[0].security_classification).to.be.equal("PUBLIC");
    expect(dto.tasks[0].task_state).to.be.equal("assigned");
    expect(dto.tasks[0].task_system).to.be.equal("SELF");
    expect(dto.tasks[0].task_title).to.be.equal("task name");
    expect(dto.tasks[0].type).to.be.equal("wa-task-configuration-api-task");
    expect(dto.tasks[0].warnings).to.be.equal(false);

}

