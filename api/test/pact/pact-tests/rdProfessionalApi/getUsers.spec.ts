import { expect } from 'chai';
import { ProfessionalUserResponse } from "../../pactFixtures";
import { getUsers } from '../../pactUtil';
import { PactTestSetup } from '../settings/provider.mock';


const {Matchers} = require('@pact-foundation/pact');
const {somethingLike, like, eachLike} = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_professionalExternalUsers', port: 8000 });


describe("RD Professional API Interactions with webapp", () => {

    describe("Get Users", () => {

        const jwt = 'some-access-token'

        before(async () => {
          await pactSetUp.provider.setup()
            const interaction = {
                state: "Professional users exist for an Active organisation",
                uponReceiving: "a request for those users",
                withRequest: {
                    method: "GET",
                    path: "/refdata/external/v1/organisations/users",
                    query: "returnRoles=true&status=active",
                    headers: {
                        'Authorization': 'Bearer some-access-token',
                        'Content-Type': 'application/json',
                        'ServiceAuthorization': 'serviceAuthToken',
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: getUsersResponse,
                },
            }
            // @ts-ignore
            pactSetUp.provider.addInteraction(interaction)
        })

        it("returns the correct response", async () => {
            const path: string = `${pactSetUp.provider.mockService.baseUrl}/refdata/external/v1/organisations/users?returnRoles=true&status=active`;
            const resp = getUsers(path);
            resp.then((response) => {
                const responseDto: ProfessionalUserResponse = <ProfessionalUserResponse>response.data
                assertResponse(responseDto);
            }).then(() => {
              pactSetUp.provider.verify()
              pactSetUp.provider.finalize()
            })
        })
    })
})

function assertResponse(dto: ProfessionalUserResponse) {
    for (var element of dto.users) {
        expect(element.firstName).to.be.equal('firstName');
        expect(element.lastName).to.be.equal('lastName');
        expect(element.email).to.be.equal('email@org.com');
    }
}

const getUsersResponse = {
    "users": eachLike({
            "userIdentifier": "123456",
            "firstName": "firstName",
            "lastName": "lastName",
            "email": "email@org.com",
            "idamStatus": "ACTIVE",
            "roles": eachLike("pui-user-manage")
        }
    )
}
