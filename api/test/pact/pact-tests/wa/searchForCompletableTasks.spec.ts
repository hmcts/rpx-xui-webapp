import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';
import { searchTasks } from "../../pactUtil";
import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getSearchTaskOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';
const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'wa_task_management_api_search_completable', port: 8000 });

const taskId = "f782bde3-8d51-11eb-a9a4-06d032acc76d"

describe("Task management api, Search for completebale tasks on case event", () => {

    const RESPONSE_BODY = {
        "tasks": [
            {
                "assignee": somethingLike("004b7164-0943-41b5-95fc-39794af4a9fe"),
                "auto_assigned": somethingLike(true),
                "case_category": somethingLike("protection"),
                "case_id": somethingLike("1616666869740714"),
                "case_name": somethingLike("Bob Smith"),
                "created_date": somethingLike("2021-06-30T12:32:46Z"),
                "due_date": somethingLike("2021-06-30T12:32:46Z"),
                "execution_type": somethingLike("Case Management Task"),
                "id": somethingLike(taskId),
                "jurisdiction": somethingLike("IA"),
                "location": somethingLike("765324"),
                "location_name": somethingLike("Taylor House"),
                "case_type_id": somethingLike("Asylum"),
                "name": somethingLike("task name"),
                "region": somethingLike("1"),
                "security_classification": somethingLike("PUBLIC"),
                "task_state": somethingLike("assigned"),
                "task_system": somethingLike("SELF"),
                "task_title": somethingLike("Review the appeal"),
                "type": somethingLike("wa-task-configuration-api-task"),
                "warnings": somethingLike(false)
            }
        ]
    }

    const mockRequest = {
        "case_id": "1616666869740714",
        "case_jurisdiction": "IA",
        "case_type": "Asylum",
        "event_id": "f782bde3-8d51-11eb-a9a4-06d032acc76d"
    }

    describe("post /task/search-for-completable", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;
        beforeEach(() => {
            next = sandbox.spy();
        });

        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "appropriate tasks are returned by search for completable",
                uponReceiving: "taskId to search for tasks completable",
                withRequest: {
                    method: "POST",
                    path: "/task/search-for-completable",
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        'content-type': 'application/json',

                    },
                    body: mockRequest
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

        afterEach(() => {
            sandbox.restore();
            sinon.reset();
        });

        it("returns the correct response", async () => {
            const configValues = getSearchTaskOverrides(pactSetUp.provider.mockService.baseUrl)
            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { postTaskSearchForCompletable } = requireReloaded('../../../../workAllocation/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                body: { searchRequest: {
                    ccdId:mockRequest.case_id,
                    jurisdiction:mockRequest.case_jurisdiction,
                    caseTypeId:mockRequest.case_type,
                    eventId:mockRequest.event_id
                } },
            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await postTaskSearchForCompletable(req, response, next);

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
    expect(dto.tasks[0].assignee).to.be.equal("004b7164-0943-41b5-95fc-39794af4a9fe");

    expect(dto.tasks[0].auto_assigned).to.be.equal(true);
    expect(dto.tasks[0].case_category).to.be.equal("protection");
    expect(dto.tasks[0].case_id).to.be.equal("1616666869740714");
    expect(dto.tasks[0].case_name).to.be.equal("Bob Smith");
    expect(dto.tasks[0].case_type_id).to.be.equal("Asylum");
    expect(dto.tasks[0].created_date).to.be.equal("2021-06-30T12:32:46Z");
    expect(dto.tasks[0].due_date).to.be.equal("2021-06-30T12:32:46Z");
    expect(dto.tasks[0].execution_type).to.be.equal("Case Management Task");

    expect(dto.tasks[0].id).to.be.equal(taskId);
    expect(dto.tasks[0].jurisdiction).to.be.equal("IA");
    expect(dto.tasks[0].location).to.be.equal("765324");
    expect(dto.tasks[0].location_name).to.be.equal("Taylor House");
    expect(dto.tasks[0].name).to.be.equal("task name");
    expect(dto.tasks[0].region).to.be.equal("1");
    expect(dto.tasks[0].security_classification).to.be.equal("PUBLIC");
    expect(dto.tasks[0].task_state).to.be.equal("assigned");
    expect(dto.tasks[0].task_system).to.be.equal("SELF");
    expect(dto.tasks[0].task_title).to.be.equal("Review the appeal");
    expect(dto.tasks[0].type).to.be.equal("wa-task-configuration-api-task");
    expect(dto.tasks[0].warnings).to.be.equal(false);
}

