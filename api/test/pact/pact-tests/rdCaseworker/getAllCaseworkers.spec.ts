import { expect } from 'chai';
import { PactV3TestSetup } from '../settings/provider.mock';
import {fetchUserDetails} from "../../pactUtil";
import {CaseworkerUserDetailsDto} from "../../pactFixtures";

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike } = Matchers;
const pactSetUp = new PactV3TestSetup({ provider: 'referenceData_caseworkerRefUsers', port: 8000 });

describe('Caseworker ref data api, get all caseworkers', () => {
  const REQUEST_BODY = {
    userIds: [somethingLike('004b7164-0943-41b5-95fc-39794af4a9fe'), somethingLike('004b7164-0943-41b5-95fc-39794af4a9fe')]
   };

  const baseLocations = [
    { location_id: somethingLike(1),
      location: somethingLike('National'),
      is_primary: somethingLike(true) }
  ];
  const RESPONSE_BODY = [
    {
      'email_id': somethingLike('test_person@test.gov.uk'),
      'first_name': somethingLike('testFN'),
      'last_name': somethingLike('testLN'),
      'user_type': somethingLike('HMCTS'),
      'base_location': baseLocations
    }
  ];

  describe('get all the caseworker', () => {
     before(async () => {
      const interaction = {
        states: [{ description: 'A list of users for CRD request' }],
        uponReceiving: 'get list of caseworkers',
        withRequest: {
          method: 'POST',
          path: '/refdata/case-worker/users/fetchUsersById',
          headers: {
            'Authorization': 'Bearer someAuthorizationToken',
            'ServiceAuthorization': 'Bearer someServiceAuthorizationToken',
            'content-type': 'application/json'
          },
          body: REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: RESPONSE_BODY
        }
      };

      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      return pactSetUp.provider.executeTest(async (mockServer) => {
        const path: string = `${mockServer.url}/refdata/case-worker/users/fetchUsersById`;
        const payload = {
          userIds: ["userId1","userId2"]
        };
        const resp = await fetchUserDetails(path,payload);
        const responseDto = <CaseworkerUserDetailsDto[]> resp.data;
        assertUserDetailsResponse(responseDto);
        });
     });
    });
});

function assertUserDetailsResponse(responseDto: CaseworkerUserDetailsDto[]): void {
  // eslint-disable-next-line no-unused-expressions
  expect(responseDto).to.be.not.null;
  for (const element of responseDto) {
    expect(element.first_name).to.equal('testFN');
    expect(element.last_name).to.equal('testLN');
    expect(element.user_type).to.equal('HMCTS');
  }
}
