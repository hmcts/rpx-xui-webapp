import { expect } from 'chai';
import { flagsDto } from '../../pactFixtures';
import { getCaseFlagDetails } from '../../pactUtil';
import { PactTestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, eachLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_location', port: 8000 });

describe('RD commons API call for get Case Flag details', () => {
  describe('Get Case Flags', () => {
    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'Get case flag details',
        uponReceiving: 'On receiving a request for those get case flag details',
        withRequest: {
          method: 'GET',
          path: '/refdata/commondata/caseflags/service-id=ABA1',
          query: 'flag-type=PARTY&welsh-required=Y&available-external-flag=Y',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer some-access-token',
            'ServiceAuthorization': 'serviceAuthToken'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: getFlagDetailsResponse
        }
      };
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      const path: string = `${pactSetUp.provider.mockService.baseUrl}/refdata/commondata/caseflags/service-id=ABA1?flag-type=PARTY&welsh-required=Y&available-external-flag=Y`;

      const resp = getCaseFlagDetails(path);
      resp.then((response) => {
        const responseDto: flagsDto = <flagsDto>response.data;
        assertResponse(responseDto);
      }).then(() => {
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      });
    });
  });
});

function assertResponse(dto: flagsDto): void {
  // eslint-disable-next-line no-unused-expressions
  expect(dto).to.be.not.null;

  expect(dto.flags[0].FlagDetails[0].name).to.equal('Party');
  expect(dto.flags[0].FlagDetails[0].hearingRelevant).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].flagComment).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].defaultStatus).to.equal('Active');
  expect(dto.flags[0].FlagDetails[0].externallyAvailable).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].flagCode).to.equal('CATGRY');

  expect(dto.flags[0].FlagDetails[0].childFlags[0].name).to.equal('Reasonable adjustment');
  expect(dto.flags[0].FlagDetails[0].childFlags[0].hearingRelevant).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].childFlags[0].flagComment).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].childFlags[0].defaultStatus).to.equal('Active');
  expect(dto.flags[0].FlagDetails[0].childFlags[0].flagCode).to.equal('CATGRY');

  expect(dto.flags[0].FlagDetails[0].childFlags[0].childFlags[0].childFlags[0].isParent).to.equal(false);
  expect(dto.flags[0].FlagDetails[0].childFlags[0].childFlags[0].childFlags[0].Path?.[0]).to.equal('Party');
}

const getFlagDetailsResponse: flagsDto = {
  flags: [
    {
      FlagDetails: [
        {
          name: somethingLike('Party'),
          hearingRelevant: somethingLike(false),
          flagComment: somethingLike(false),
          defaultStatus: somethingLike('Active'),
          externallyAvailable: somethingLike(false),
          flagCode: somethingLike('CATGRY'),
          childFlags: [
            {
              name: somethingLike('Reasonable adjustment'),
              hearingRelevant: somethingLike(false),
              flagComment: somethingLike(false),
              defaultStatus: somethingLike('Active'),
              externallyAvailable: somethingLike(false),
              flagCode: somethingLike('CATGRY'),
              childFlags: [
                {
                  name: somethingLike('I need documents in an alternative format'),
                  hearingRelevant: somethingLike(false),
                  flagComment: somethingLike(false),
                  defaultStatus: somethingLike('Active'),
                  externallyAvailable: somethingLike(false),
                  flagCode: somethingLike('CATGRY'),
                  childFlags: [
                    {
                      name: somethingLike('Documents in a specified colour'),
                      hearingRelevant: somethingLike(true),
                      flagComment: somethingLike(false),
                      defaultStatus: somethingLike('Active'),
                      externallyAvailable: somethingLike(true),
                      flagCode: somethingLike('RA0010'),
                      childFlags: [],
                      isParent: somethingLike(false),
                      Path: [
                        somethingLike('Party')
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
