import * as chai from 'chai';
import { expect } from 'chai'

import { PactTestSetup } from '../settings/provider.mock';
// import { searchTasks } from "../../pactUtil";
import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getSearchTaskOverrides} from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
import { DateTimeMatcher } from '../utils/matchers';
const { somethingLike, iso8601DateTime, term } = Matchers;
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
                "created_date": term(DateTimeMatcher("2021-06-30T16:53:10+0100")),
                "due_date": term(DateTimeMatcher("2021-06-30T16:53:10+0100")),
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
                "created_date": term(DateTimeMatcher("2021-06-30T16:53:10+0100")),
                "due_date": term(DateTimeMatcher("2021-06-30T16:53:10+0100")),
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

    const mockSearchRequestBody = {
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
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;
        beforeEach(() => {
            next = sandbox.spy();
        });

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
                        // 'content-Type': 'application/json',

                    },
                    body: mockSearchRequestBody
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
            sandbox.stub(config,'get').callsFake((prop) =>{
                return configValues[prop];
            });
            
            const { searchTaskWithPagination } = requireReloaded('../../../../workAllocation/index');

            const req = mockReq({
                headers:{
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    // 'content-Type': 'application/json',
                },
                body: { searchRequest: {
                    ...mockSearchRequestBody,
                    pagination_parameters : {
                        page_number : 1,
                        page_size : 25
                    }
                }, view: 'task view' },
            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try{
                await searchTaskWithPagination(req, response, next);
              
                assertResponses(returnedResponse);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
            }catch(err){
                console.log(err.stack);
                pactSetUp.provider.verify()
                pactSetUp.provider.finalize()
                throw new Error(err);
            }
          
        })
    })
})

function assertResponses(dto: any) {
    expect(dto.tasks[0].assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6");
    expect(dto.tasks[0].case_name).to.be.equal("Bob Smith");
    expect(dto.tasks[0].case_category).to.be.equal("refusalOfHumanRights");


    expect(dto.tasks[0].case_id).to.be.equal("1617708245335311");
    expect(dto.tasks[0].location_name).to.be.equal("Taylor House");
    expect(dto.tasks[0].task_title).to.be.equal("Review the appeal");
    expect(dto.tasks[0].dueDate).to.be.equal("2021-06-30T16:53:10+0100");

    expect(dto.tasks[0].assignee).to.be.equal("10bac6bf-80a7-4c81-b2db-516aba826be6");


}

