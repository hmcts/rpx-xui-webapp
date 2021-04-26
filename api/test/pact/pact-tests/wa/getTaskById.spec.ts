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
            "assignee": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
            "auto_assigned": somethingLike(true),
            "case_category": somethingLike("protection"),
            "case_id": somethingLike("1616666869740714"),
            "case_name": somethingLike("Bob Smith"),
            "case_type_id": somethingLike("Asylum"),
            "created_date": somethingLike("2020-09-05T14:47:01.250542+01:00"),
            "due_date": somethingLike("2020-09-25T14:47:01.250542+01:00"),
            "execution_type": somethingLike("Case Management Task"),
            "id": somethingLike(taskId),
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
    }

    describe("get /task/{taskId}", () => {

        const jwt = 'some-access-token';
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "appropriate task is returned",
                uponReceiving: "tasId to get task",
                withRequest: {
                    method: "GET",
                    path: `/task/${taskId}`,
                    headers: {
                        'Authorization': 'Bearer some-access-token',
                        'ServiceAuthorization': 'some service authorisation',
                        'Content-Type': 'application/json'
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
    expect(dto.task.assignee).to.be.equal("004b7164-0943-41b5-95fc-39794af4a9fe");

    expect(dto.task.auto_assigned).to.be.equal(true);
    expect(dto.task.case_category).to.be.equal("protection");
    expect(dto.task.case_id).to.be.equal("1616666869740714");
    expect(dto.task.case_name).to.be.equal("Bob Smith");
    expect(dto.task.case_type_id).to.be.equal("Asylum");
    expect(dto.task.created_date).to.be.equal("2020-09-05T14:47:01.250542+01:00");
    expect(dto.task.due_date).to.be.equal("2020-09-25T14:47:01.250542+01:00");
    expect(dto.task.execution_type).to.be.equal("Case Management Task");
    
    expect(dto.task.id).to.be.equal(taskId);
    expect(dto.task.jurisdiction).to.be.equal("IA");
    expect(dto.task.location).to.be.equal("765324");
    expect(dto.task.location_name).to.be.equal("Taylor House");
    expect(dto.task.name).to.be.equal("task name");
    expect(dto.task.region).to.be.equal("1");
    expect(dto.task.security_classification).to.be.equal("PUBLIC");
    expect(dto.task.task_state).to.be.equal("assigned");
    expect(dto.task.task_system).to.be.equal("SELF");
    expect(dto.task.task_title).to.be.equal("task name");
    expect(dto.task.type).to.be.equal("wa-task-configuration-api-task");
    expect(dto.task.warnings).to.be.equal(false);
 
}

