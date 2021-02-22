import {Pact} from '@pact-foundation/pact'
import {expect} from 'chai'
import * as path from 'path'
import {getIdamUsersByEmail} from '../../pactUtil';
import * as getPort from "get-port";

const {Matchers} = require('@pact-foundation/pact');
const {somethingLike} = Matchers;

let mockServerPort: number;
let provider: Pact;

describe("Idam Get user by email", async () => {
    mockServerPort = await getPort()

    provider = new Pact({
        port: mockServerPort,
        log: path.resolve(process.cwd(), "api/test/pact/logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "api/test/pact/pacts"),
        spec: 2,
        consumer: "xui_webApp",
        provider: "idamApi_users",
        pactfileWriteMode: "merge",
    })

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
    // Setup the provider
    before(() => provider.setup())
    // Write Pact when all tests done
    after(() => provider.finalize())
    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())
    describe("get /users?email", () => {

        before(done => {
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
            provider.addInteraction(interaction).then(() => {
                done()
            })
        })
        it("Returns the correct response", (done) => {
            const taskUrl = `${provider.mockService.baseUrl}/users?email=joe@bloggs.net`;

            const response: Promise<any> = getIdamUsersByEmail(taskUrl);

            response.then((axiosResponse) => {
                const dto: IdamGetDetailsResponseDto = <IdamGetDetailsResponseDto>axiosResponse.data;
                assertResponses(dto);
            }).then(done, done)
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
