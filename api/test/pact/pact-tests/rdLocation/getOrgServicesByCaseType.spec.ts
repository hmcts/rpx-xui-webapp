import { expect } from 'chai';
import { OrgServicesDto } from '../../pactFixtures';
import { getOrgServices } from '../../pactUtil';
import { PactTestSetup } from '../settings/provider.mock';

const { Matchers } = require('@pact-foundation/pact');
const { somethingLike, eachLike } = Matchers;
const pactSetUp = new PactTestSetup({ provider: 'referenceData_location', port: 8000 });

describe('RD Locations API call for get OrgServices by case type', () => {
  describe('Get OrgServices by case type', () => {
    before(async () => {
      await pactSetUp.provider.setup();
      const interaction = {
        state: 'Get list of OrgServices',
        uponReceiving: 'On receiving a request for those OrgServices',
        withRequest: {
          method: 'GET',
          path: '/refdata/location/orgServices',
          query: 'ccdCaseType=CaseViewCallbackMessages2',
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
          body: getOrgServicesResponse
        }
      };
      // @ts-ignore
      pactSetUp.provider.addInteraction(interaction);
    });

    it('returns the correct response', async () => {
      const path: string = `${pactSetUp.provider.mockService.baseUrl}/refdata/location/orgServices?ccdCaseType=CaseViewCallbackMessages2`;

      const resp = getOrgServices(path);
      resp.then((response) => {
        const responseDto: OrgServicesDto[] = <OrgServicesDto[]>response.data;
        assertResponse(responseDto);
      }).then(() => {
        pactSetUp.provider.verify();
        pactSetUp.provider.finalize();
      });
    });
  });
});

function assertResponse(dto: OrgServicesDto[]): void {
  // eslint-disable-next-line no-unused-expressions
  expect(dto).to.be.not.null;
  for (const element of dto) {
    expect(element.jurisdiction).to.equal('Family');
    expect(element.service_id).to.equal(8);
  }
}

const getOrgServicesResponse: OrgServicesDto[] = [
  {
    jurisdiction: somethingLike('Family'),
    service_id: somethingLike(8),
    org_unit: somethingLike('HMCTS'),
    business_area: somethingLike('Civil, Family and Tribunals'),
    sub_business_area: somethingLike('Civil and Family'),
    service_description: somethingLike('Divorce'),
    service_code: somethingLike('ABA1'),
    service_short_description: somethingLike('Divorce'),
    ccd_service_name: somethingLike('DIVORCE'),
    last_update: somethingLike('2020-11-02T16:28:37.259752'),
    ccd_case_types: [
      somethingLike('DIVORCE')
    ]
  }
];
