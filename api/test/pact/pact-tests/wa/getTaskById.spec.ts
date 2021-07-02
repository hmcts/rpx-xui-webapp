import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { getTaskById } from "../../pactUtil";

import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getSearchTaskOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

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
            "created_date": somethingLike("2021-06-30T12:32:46Z"),
            "due_date": somethingLike("2021-06-30T12:32:46Z"),
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
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
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
                        "content-type": "application/json",
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


        afterEach(() => {
            sandbox.restore();
            sinon.reset();
        });


        it("returns the correct response", async () => {
            const configValues = getSearchTaskOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });
            
            const { getTask } = requireReloaded('../../../../workAllocation/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                params:{
                    taskId: taskId 
                }
               
            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getTask(req, response, next);

                assertResponses(returnedResponse);
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

function assertResponses(dto: any) {
    expect(dto.task.assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6");
    expect(dto.task.case_name).to.be.equal("Bob Smith");
    expect(dto.task.case_category).to.be.equal("refusalOfHumanRights");
    expect(dto.task.case_id).to.be.equal("1617708245335311");
    expect(dto.task.location_name).to.be.equal("Taylor House");
    expect(dto.task.task_title).to.be.equal("Review the appeal");
    expect(dto.task.dueDate).to.be.equal("2021-06-30T12:32:46Z");
    expect(dto.task.assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6"); 
}

