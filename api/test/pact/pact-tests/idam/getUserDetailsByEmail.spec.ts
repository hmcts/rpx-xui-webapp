import {Pact} from '@pact-foundation/pact'
import {expect} from 'chai'
import * as path from 'path'
import {getIdamUsersByEmail} from '../../pactUtil';
import * as getPort from "get-port";
import { PactTestSetup } from '../settings/provider.mock';


const {Matchers} = require('@pact-foundation/pact');
const {somethingLike} = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'idamApi_users', port: 8000 });

describe("Idam Get user by email", async () => {

    const RESPONSE_BODY = {
        "id": somethingLike("abc123"),
        "forename": somethingLike("Joe"),
        "surname": somethingLike("Bloggs"),
        "email": somethingLike("joe.bloggs@hmcts.net"),
        "active": somethingLike(true),
        "roles": somethingLike([
            somethingLike("solicitor"), somethingLike("caseworker")
        ])
    }

    describe("get /users?email", () => {

        before(async () => {
          await pactSetUp.provider.setup()
          const interaction = {
                state: "a user exists with email joe@bloggs.net",
                uponReceiving: "a request for that user by email",
                withRequest: {
                    method: "GET",
                    path: "/users",
                    query: "email=joe@bloggs.net",
                    headers: {
                        Authorization: "Bearer some-access-token"
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
        it("Returns the correct response", async () => {
            const taskUrl = `${pactSetUp.provider.mockService.baseUrl}/users?email=joe@bloggs.net`;

            const response: Promise<any> = getIdamUsersByEmail(taskUrl);

            response.then((axiosResponse) => {
                const dto: IdamGetDetailsResponseDto = <IdamGetDetailsResponseDto>axiosResponse.data;
                assertResponses(dto);
            }).then(() => {
              pactSetUp.provider.verify()
              pactSetUp.provider.finalize()
            })
        })
    })
})


function assertResponses(dto: IdamGetDetailsResponseDto) {
    expect(dto.id).to.be.equal('abc123');
    expect(dto.email).to.be.equal('joe.bloggs@hmcts.net');
    expect(dto.forename).to.be.equal('Joe');
    expect(dto.surname).to.be.equal('Bloggs');
    expect(dto.roles[0]).to.be.equal('solicitor');
    expect(dto.roles[1]).to.be.equal('caseworker');
}

export interface IdamGetDetailsResponseDto {
    id: string,
    forename: string,
    surname: string,
    email: string,
    active: boolean,
    roles: string[]
}
