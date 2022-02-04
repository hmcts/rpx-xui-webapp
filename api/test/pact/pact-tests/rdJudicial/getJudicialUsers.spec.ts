import { expect } from 'chai';
import { PactTestSetup } from '../settings/provider.mock';

import * as sinon from 'sinon'

import * as config from 'config'
import { mockReq, mockRes } from 'sinon-express-mock';

import { getJudicialRefDataAPIOverrides } from '../utils/configOverride';
import { requireReloaded } from '../utils/moduleUtil';

const { Matchers } = require('@pact-foundation/pact');
import { DateTimeMatcher } from '../utils/matchers';
const { somethingLike, iso8601DateTime, term } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'rd_judicial_ref_api_get_users_by_userIds', port: 8000 });

const MockApp = require('../../../../../test/nodeMock/app');

const locationId = "123456";

const REQUEST_BODY = {
    sidam_ids: ['004b7164-0943-41b5-95fc-39794af4a9fe', '004b7164-0943-41b5-95fc-39794af4a9ff'],
    serviceCode: 'BFA1'
};

const user1 = getDumyJudgeUserDetails();
user1.sidam_id = somethingLike(REQUEST_BODY.sidam_ids[0]);
user1.known_as = somethingLike('Lead judge');
user1.surname = somethingLike('cruz');
user1.full_name = somethingLike('Tom cruz');
user1.email_id = somethingLike('tom.cruz@hmcts.net');


const user2 = getDumyJudgeUserDetails();
user2.sidam_id = somethingLike(REQUEST_BODY.sidam_ids[1]);
user2.known_as = somethingLike('Hearing judge');
user2.surname = somethingLike('hanks');
user2.full_name = somethingLike('Tom hanks');
user2.email_id = somethingLike('tom.hanks@hmcts.net');

describe("Judicial ref data api, get all judge users", () => {

    
    const RESPONSE_BODY = [];
    RESPONSE_BODY.push(user1); 
    RESPONSE_BODY.push(user2); 

    describe("post /refdata/judicial/users", () => {
        let sandbox: sinon.SinonSandbox = sinon.createSandbox();
        let next;

        beforeEach(() => {
            next = sandbox.spy();
        });
        before(async () => {
            await pactSetUp.provider.setup()
            const interaction = {
                state: "returned list of judicial users",
                uponReceiving: "get list of judicial users",
                withRequest: {
                    method: "POST",
                    path: `/refdata/judicial/users`,
                    headers: {
                        'Authorization': 'Bearer someAuthorizationToken',
                        'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                        "content-type": "application/json",
                    },
                    body: REQUEST_BODY
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
            MockApp.stopServer();
        });


        it("returns the correct response", async () => {
           
            const configValues = getJudicialRefDataAPIOverrides(pactSetUp.provider.mockService.baseUrl)
            configValues['services.role_assignment.roleApi'] = 'http://localhost:8080';
            configValues['serviceRefDataMapping'] = [{ "IA": "BFA1" }];

            sandbox.stub(config, 'get').callsFake((prop) => {
                return configValues[prop];
            });

            const { getJudicialUsers } = requireReloaded('../../../../roleAccess/index');

            const req = mockReq({
                headers: {
                    'Authorization': 'Bearer someAuthorizationToken',
                    'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
                    'content-type': 'application/json',
                },
                body: {
                    userIds: ['004b7164-0943-41b5-95fc-39794af4a9fe', '004b7164-0943-41b5-95fc-39794af4a9ff'],
                    services:['IA']
                } 

            });
            let returnedResponse = null;
            const response = mockRes();
            response.send = (ret) => {
                returnedResponse = ret
            };

            try {
                await getJudicialUsers(req, response, next);

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
    console.log(JSON.stringify(dto));
    expect(dto[0].sidam_id).to.be.equal(REQUEST_BODY.sidam_ids[0]);
    expect(dto[0].known_as).to.be.equal("Lead judge");
    expect(dto[0].surname).to.be.equal("cruz");
    expect(dto[0].full_name).to.be.equal("Tom cruz");
    expect(dto[0].email_id).to.be.equal("tom.cruz@hmcts.net");

    expect(dto[1].sidam_id).to.be.equal(REQUEST_BODY.sidam_ids[1]); 
    expect(dto[1].known_as).to.be.equal("Hearing judge");
    expect(dto[1].surname).to.be.equal("hanks");
    expect(dto[1].full_name).to.be.equal("Tom hanks");
    expect(dto[1].email_id).to.be.equal("tom.hanks@hmcts.net");


}



function getDumyJudgeUserDetails(){
    return {
            "sidam_id": "018a0310-f122-4377-9504-f635301f39ed-test2",
            "object_id": "018a0310-f122-4377-9504-f635301f39ed-test2",
            "known_as": "Joe",
            "surname": "snjudge",
            "full_name": 'fntest',
            "post_nominals": "Ms",
            "email_id":  'test@judicial.com',
            "appointments": [
                {
                    "base_location_id": "1032",
                    "epimms_id": null,
                    "court_name": "Social Entitlement",
                    "cft_region_id": "2",
                    "cft_region": "London",
                    "location_id": "14",
                    "location": "London",
                    "is_principal_appointment": "true",
                    "appointment": "Tribunal Member Disability",
                    "appointment_type": "Fee Paid",
                    "service_code": null,
                    "roles": [],
                    "start_date": "2018-12-05",
                    "end_date": null
                }
            ],
            "authorisations": [
                {
                    "jurisdiction": "Authorisation Tribunals",
                    "ticket_description": "Social Security and Child Support",
                    "ticket_code": "357",
                    "service_code": "BBA3",
                    "start_date": "2013-12-05T00:00",
                    "end_date": null
                },
                {
                    "jurisdiction": "Authorisation Tribunals",
                    "ticket_description": "03 - Disability Living Allowance",
                    "ticket_code": "365",
                    "service_code": "BBA3",
                    "start_date": "1901-01-01T00:00",
                    "end_date": null
                }
            ]
        };
    
}

